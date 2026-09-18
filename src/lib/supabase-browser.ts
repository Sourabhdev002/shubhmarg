"use client";
import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        // PKCE stores the code verifier in a cookie the server /auth/callback
        // route can read, so exchangeCodeForSession works reliably.
        flowType: "pkce",
      },
    }
  );
}
