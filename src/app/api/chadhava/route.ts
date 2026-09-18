import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase-server";
import { supabaseServer } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// Allowed digital-offering amounts (rupees). Keep in sync with the UI.
const ALLOWED_AMOUNTS = [51, 101, 251, 501];

/**
 * POST /api/chadhava
 * Creates a Digital Chadhava / Deepdaan order (a guidance_requests row) so it can
 * then be paid from the wallet via /api/wallet/spend. Requires a logged-in user.
 *
 * Body: { amount: number, offering: string, dedication?: string }
 * Returns: { reference_id }
 */
export async function POST(req: NextRequest) {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  let body: { amount?: number; offering?: string; dedication?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid body" }, { status: 400 }); }

  const amount = Number(body.amount);
  if (!ALLOWED_AMOUNTS.includes(amount)) {
    return NextResponse.json({ error: "Invalid offering amount" }, { status: 400 });
  }
  const offering = (body.offering || "Digital Chadhava").toString().slice(0, 80);
  const dedication = (body.dedication || "").toString().slice(0, 120);

  const referenceId = `CHAD-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  const { error } = await supabaseServer.from("guidance_requests").insert([{
    reference_id: referenceId,
    concern: "Digital Chadhava",
    full_name: user.user_metadata?.full_name || user.email || "Devotee",
    email: user.email || `${user.id}@wallet.shubhmarg.com`,
    date_of_birth: "2000-01-01",
    birth_place: "N/A",
    current_city: "N/A",
    preferred_language: "Hindi",
    privacy_consent: true,
    service: "puja",
    payment_amount: amount,           // whole rupees; wallet_debit_for_order reads this
    payment_currency: "INR",
    payment_status: "unpaid",
    question: `Digital Chadhava · ${offering}${dedication ? ` · Dedication: ${dedication}` : ""}`,
  }]);

  if (error) {
    console.error("chadhava order create failed:", error.message);
    return NextResponse.json({ error: "Could not create offering. Please retry." }, { status: 500 });
  }

  return NextResponse.json({ reference_id: referenceId });
}
