import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

interface UpiWebhookRequest {
  amount?: number;
  utr?: string;
  payerVpa?: string;
  payerName?: string;
  rawEmailId?: string;
}

// Constant-time secret comparison (length-guarded).
function secretOk(provided: string | null): boolean {
  const expected = process.env.UPI_WEBHOOK_SECRET || "";
  if (!expected || !provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  // 1. Auth — validate secret before any DB access.
  if (!secretOk(req.headers.get("x-webhook-secret"))) {
    return NextResponse.json({ status: "unauthorized", matched: false }, { status: 401 });
  }

  // 2. Parse + validate payload.
  let body: UpiWebhookRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ status: "error", matched: false }, { status: 400 });
  }
  const amount = Number(body.amount);
  if (!amount || isNaN(amount) || amount <= 0) {
    return NextResponse.json({ status: "error", matched: false }, { status: 400 });
  }
  const utr = (body.utr || "").trim() || null;

  try {
    const { supabaseServer } = await import("@/lib/supabase");
    const { matchPayment } = await import("@/lib/upi-matching");

    // 3. Load candidate orders (pending + any that already hold this UTR for dup check).
    const { data: orders, error } = await supabaseServer
      .from("guidance_requests")
      .select("reference_id, payment_amount, payment_utr, payment_status")
      .in("payment_status", ["unpaid", "payment_verification", "paid"]);

    if (error) {
      console.error("upi-webhook load error:", error.message);
      return NextResponse.json({ status: "error", matched: false }, { status: 500 });
    }

    const result = matchPayment(orders || [], { amount, utr });

    if (result.status === "duplicate") {
      return NextResponse.json({ status: "duplicate", matched: false, referenceId: result.referenceId });
    }
    if (result.status === "no_match") {
      // Log for manual reconciliation.
      console.warn("upi-webhook no_match:", { amount, utr, payer: body.payerName });
      return NextResponse.json({ status: "no_match", matched: false });
    }

    // 4. Confirm the matched order (idempotent: only update if not already paid).
    const note = `Auto-verified: received Rs ${amount.toFixed(2)}` +
      (body.payerName ? ` from ${body.payerName}` : "") +
      (body.payerVpa ? ` (${body.payerVpa})` : "");

    const update: Record<string, unknown> = {
      payment_status: "paid",
      paid_at: new Date().toISOString(),
      payment_verified_by: "webhook",
      payment_verification_note: note,
    };
    if (utr) update.payment_utr = utr;

    const { error: updErr } = await supabaseServer
      .from("guidance_requests")
      .update(update)
      .eq("reference_id", result.referenceId)
      .neq("payment_status", "paid"); // idempotency guard

    if (updErr) {
      console.error("upi-webhook update error:", updErr.message);
      return NextResponse.json({ status: "error", matched: false }, { status: 500 });
    }

    // 5. Trigger report generation in the background (fire-and-forget).
    (async () => {
      try {
        const { data: fullReq } = await supabaseServer
          .from("guidance_requests")
          .select("*")
          .eq("reference_id", result.referenceId)
          .single();
        if (fullReq) {
          const { generateVedicGuidanceReport } = await import("@/services/report-generator");
          await generateVedicGuidanceReport(fullReq as never);
        }
      } catch (e) {
        console.error("upi-webhook report trigger error:", e);
      }
    })();

    return NextResponse.json({ status: "confirmed", matched: true, referenceId: result.referenceId });
  } catch (e) {
    console.error("upi-webhook unexpected:", e);
    return NextResponse.json({ status: "error", matched: false }, { status: 500 });
  }
}