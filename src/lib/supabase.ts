import "server-only";
import { createClient } from "@supabase/supabase-js";

// Ensure this is only called on the server
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn("Supabase credentials are not fully configured in environment variables.");
}

// ⚠️ ARCHITECTURE NOTE:
// Relying entirely on the service role key bypasses Row Level Security (RLS).
// It is recommended to configure proper RLS policies in your Supabase dashboard
// and use `supabasePublic` for standard client/server operations, reserving 
// `supabaseServer` only for secure admin tasks like background syncs.

// Service Role Client (Bypasses RLS - Use with caution)
export const supabaseServer = createClient(supabaseUrl || "", supabaseServiceKey || "", {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});

// Standard Public Client (Respects RLS - Recommended for standard data fetching)
export const supabasePublic = createClient(supabaseUrl || "", supabaseAnonKey || "", {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
