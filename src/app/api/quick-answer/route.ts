import { NextRequest, NextResponse, after } from "next/server";
import { PHONE_ERROR, buildPhoneEmail, isValidIndianMobile, normalizePhone } from "@/lib/phone";
import { buildQuickAnswerResponse } from "@/lib/service-catalog";
import { sendOrderAlert } from "@/lib/telegram";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, question } = await req.json();

    if (!name || !phone || !question) {
      return NextResponse.json({ success: false, error: "All fields required" }, { status: 400 });
    }

    const p = normalizePhone(String(phone));
    if (!isValidIndianMobile(p)) {
      return NextResponse.json({ success: false, error: PHONE_ERROR }, { status: 400 });
    }

    // Dynamic import to avoid build-time crash
    const { supabaseServer } = await import("@/lib/supabase");
    const { allocateUniquePaiseAmount } = await import("@/lib/paise-allocation");

    // Unique-paise amount so the payment can be auto-matched
    const paymentAmount = await allocateUniquePaiseAmount(99);

    // Generate reference ID
    const referenceId = "SHUBH-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    const { error } = await supabaseServer
      .from("guidance_requests")
      .insert([{
        reference_id: referenceId,
        concern: 'General Guidance',
        full_name: name.trim(),
        email: buildPhoneEmail(p, "quick"),
        date_of_birth: '2000-01-01',
        birth_place: 'N/A',
        current_city: 'N/A',
        preferred_language: 'Hindi',
        privacy_consent: true,
        service: 'quick-answer',
        payment_amount: paymentAmount,
        payment_currency: 'INR',
        payment_status: 'unpaid',
        question: question.trim(),
      }]);

    if (error) {
      console.error("Quick answer insert error:", error);
      return NextResponse.json({ success: false, error: "Failed to save. Please try again." });
    }

    // Owner alert (best-effort, runs after the response is sent)
    try {
      const alertInfo = {
        referenceId,
        service: "quick-answer",
        amount: paymentAmount,
        name: String(name).trim(),
      };
      after(() => sendOrderAlert(alertInfo).catch(() => {}));
    } catch {
      // Never block the response on alert scheduling
    }

    return NextResponse.json(buildQuickAnswerResponse(referenceId, paymentAmount));
  } catch (err) {
    console.error("Quick answer error:", err);
    return NextResponse.json({ success: false, error: "Something went wrong." });
  }
}
