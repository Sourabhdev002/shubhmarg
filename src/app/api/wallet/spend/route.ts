import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase-server";
import { supabaseServer } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/**
 * POST /api/wallet/spend
 * Atomically debit wallet and mark an existing guidance_request as paid.
 *
 * Body: { order_reference: string }
 * Auth: session cookie
 */
export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { order_reference?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid body" }, { status: 400 }); }

  const orderRef = (body.order_reference ?? "").trim();
  if (!orderRef) return NextResponse.json({ error: "order_reference required" }, { status: 400 });

  // Debit wallet + mark the order paid + write the ledger row, atomically.
  const { data: newBalance, error } = await supabaseServer
    .rpc("wallet_debit_for_order", { p_user_id: user.id, p_order_ref: orderRef });

  if (error) {
    // Map the function's raised conditions to HTTP status codes.
    const msg = error.message || "";
    if (msg.includes("order_not_found"))    return NextResponse.json({ error: "Order not found" }, { status: 404 });
    if (msg.includes("order_already_paid")) return NextResponse.json({ error: "Order already paid" }, { status: 409 });
    if (msg.includes("wallet_not_found"))   return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
    if (msg.includes("insufficient_balance")) {
      return NextResponse.json({ error: "Insufficient balance" }, { status: 402 });
    }
    console.error("wallet spend failed:", msg);
    return NextResponse.json({ error: "Payment failed — please retry" }, { status: 500 });
  }

  return NextResponse.json({ success: true, balance_paise: Number(newBalance) });
}
