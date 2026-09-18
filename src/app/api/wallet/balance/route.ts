import { NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase-server";
import { supabaseServer } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  // 1. Auth — get user from session cookie
  const supabase = await createSupabaseServer();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // 2. Load wallet (create if missing — edge case on first load)
  const { data: wallet, error } = await supabaseServer
    .from("wallets")
    .select("balance_paise, updated_at")
    .eq("user_id", user.id)
    .single();

  if (error && error.code === "PGRST116") {
    // No wallet yet — create it
    const { data: created } = await supabaseServer
      .from("wallets")
      .insert({ user_id: user.id, balance_paise: 0 })
      .select("balance_paise, updated_at")
      .single();
    return NextResponse.json({ balance_paise: created?.balance_paise ?? 0 });
  }
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // 3. Recent transactions
  const { data: transactions } = await supabaseServer
    .from("wallet_transactions")
    .select("id, created_at, type, status, amount_paise, balance_after, description, order_reference, topup_reference")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(20);

  return NextResponse.json({
    balance_paise: wallet?.balance_paise ?? 0,
    transactions: transactions ?? [],
  });
}
