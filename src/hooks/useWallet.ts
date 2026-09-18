"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";

export interface WalletTransaction {
  id: string;
  created_at: string;
  type: "credit" | "debit" | "refund";
  status: "pending" | "completed" | "failed";
  amount_paise: number;
  balance_after: number | null;
  description: string;
  order_reference: string | null;
  topup_reference: string | null;
}

export interface WalletState {
  balance_paise: number;
  transactions: WalletTransaction[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export function useWallet(): WalletState {
  const { user } = useAuth();
  const [balance_paise, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/wallet/balance");
      if (!res.ok) throw new Error(`${res.status}`);
      const data = await res.json();
      setBalance(data.balance_paise ?? 0);
      setTransactions(data.transactions ?? []);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load wallet");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { balance_paise, transactions, loading, error, refresh };
}

/** Initiate a wallet top-up. Returns UPI payment details. */
export async function initiateTopup(amountInr: number) {
  const res = await fetch("/api/wallet/topup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount: amountInr }),
  });
  return res.json();
}

/** Pay for an order using wallet balance. */
export async function walletSpend(orderReference: string) {
  const res = await fetch("/api/wallet/spend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ order_reference: orderReference }),
  });
  return res.json();
}

/** Customer taps "I have paid" — notifies owner on Telegram for approval. */
export async function claimTopup(topupReference: string, utr?: string) {
  const res = await fetch("/api/wallet/topup-claim", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topup_reference: topupReference, utr }),
  });
  return res.json();
}

/** Poll a single top-up's status (used to detect owner approval). */
export async function checkTopupStatus(topupReference: string): Promise<"pending" | "completed" | "failed" | "unknown"> {
  try {
    const res = await fetch(`/api/wallet/topup-status?ref=${encodeURIComponent(topupReference)}`);
    if (!res.ok) return "unknown";
    const data = await res.json();
    return data.status ?? "unknown";
  } catch {
    return "unknown";
  }
}

/** Format paise to ₹ display string */
export function formatPaise(paise: number): string {
  return (paise / 100).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
}
