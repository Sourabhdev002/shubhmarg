import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

/**
 * GET /auth/callback
 * Google (and other OAuth providers) redirect here after the user signs in.
 * We exchange the one-time `code` for a session cookie, then send the user
 * on to wherever they were headed (`next`, defaults to /wallet).
 */
export async function GET(req: NextRequest) {
  const { searchParams, origin } = req.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/wallet";

  // Provider returned an error (e.g. user cancelled).
  const providerError = searchParams.get("error_description") || searchParams.get("error");
  if (providerError) {
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(providerError)}`);
  }

  if (code) {
    const supabase = await createSupabaseServer();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Only allow same-site relative redirects to avoid open-redirect abuse.
      const safeNext = next.startsWith("/") ? next : "/wallet";
      return NextResponse.redirect(`${origin}${safeNext}`);
    }
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error.message)}`);
  }

  // No code present — bounce back to login.
  return NextResponse.redirect(`${origin}/login?error=missing_code`);
}
