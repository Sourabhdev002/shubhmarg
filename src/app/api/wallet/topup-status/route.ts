import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase-server";
import { supabaseServer } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/**
 * GET /api/wallet/topup-status?ref=TUP-XXXX
 * Returns the current status of a top-up so the customer's UI can
 * show "credited" once the owner approves it on Telegram.
 */
export async function GET(req: NextRequest) {
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const ref = req.nextUrl.searchParams.get("ref");
  if (!ref) return NextResponse.json({ error: "ref required" }, { status: 400 });

  const { data: tx } = await supabaseServer
    .from("wallet_transactions")
    .select("status")
    .eq("topup_reference", ref)
    .eq("user_id", user.id)
    .single();

  return NextResponse.json({ status: tx?.status ?? "unknown" });
}
