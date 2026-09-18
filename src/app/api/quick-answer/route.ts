import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const { name, phone, question } = await req.json();

    if (!name || !phone || !question) {
      return NextResponse.json({ success: false, error: "All fields required" }, { status: 400 });
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
        email: phone.trim() + '@quick.shubhmarg.com',
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

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Quick answer error:", err);
    return NextResponse.json({ success: false, error: "Something went wrong." });
  }
}