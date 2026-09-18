"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { createSupabaseBrowser } from "@/lib/supabase-browser";

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  loading: boolean;
  /** Send OTP to phone (E.164 format: +91XXXXXXXXXX) */
  sendOtp: (phone: string) => Promise<{ error: string | null }>;
  /** Verify the OTP code received via SMS */
  verifyOtp: (phone: string, token: string) => Promise<{ error: string | null }>;
  /** Send a 6-digit OTP code to an email address (free — no SMS provider needed) */
  sendEmailOtp: (email: string) => Promise<{ error: string | null }>;
  /** Verify the OTP code received via email */
  verifyEmailOtp: (email: string, token: string) => Promise<{ error: string | null }>;
  /** Start Google OAuth sign-in (redirects to Google, then back to /auth/callback) */
  signInWithGoogle: (redirectTo?: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null, session: null, loading: true,
  sendOtp: async () => ({ error: null }),
  verifyOtp: async () => ({ error: null }),
  sendEmailOtp: async () => ({ error: null }),
  verifyEmailOtp: async () => ({ error: null }),
  signInWithGoogle: async () => ({ error: null }),
  signOut: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = createSupabaseBrowser();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hydrate from existing session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes (sign in, sign out, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendOtp = useCallback(async (phone: string) => {
    const { error } = await supabase.auth.signInWithOtp({ phone });
    return { error: error?.message ?? null };
  }, [supabase]);

  const verifyOtp = useCallback(async (phone: string, token: string) => {
    const { error } = await supabase.auth.verifyOtp({ phone, token, type: "sms" });
    return { error: error?.message ?? null };
  }, [supabase]);

  const sendEmailOtp = useCallback(async (email: string) => {
    // shouldCreateUser: true lets first-time users sign up with just their email.
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: true },
    });
    return { error: error?.message ?? null };
  }, [supabase]);

  const verifyEmailOtp = useCallback(async (email: string, token: string) => {
    const { error } = await supabase.auth.verifyOtp({ email, token, type: "email" });
    return { error: error?.message ?? null };
  }, [supabase]);

  const signInWithGoogle = useCallback(async (redirectTo?: string) => {
    const next = redirectTo || "/wallet";
    const callbackUrl = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: callbackUrl },
    });
    return { error: error?.message ?? null };
  }, [supabase]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, [supabase]);

  return (
    <AuthContext.Provider value={{ user, session, loading, sendOtp, verifyOtp, sendEmailOtp, verifyEmailOtp, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
