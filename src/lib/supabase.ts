import { createClient } from "@supabase/supabase-js";

// Ensure this is only called on the server
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
  console.warn("Supabase credentials are not fully configured in environment variables.");
}

// Create a single supabase client for interacting with the database securely from server contexts.
// We use the service role key to bypass RLS for insertions from our server action.
export const supabaseServer = createClient(supabaseUrl || "", supabaseServiceKey || "", {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});
