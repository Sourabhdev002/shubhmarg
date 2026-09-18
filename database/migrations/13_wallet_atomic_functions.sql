-- Migration 13: Atomic wallet money operations
-- These SECURITY DEFINER functions replace the previous read-then-write
-- application logic with single-transaction, row-locked operations so that
-- concurrent credits/debits can never race or leave a half-applied state.
--
-- All functions:
--   * lock the wallet row with SELECT ... FOR UPDATE
--   * update the balance and the ledger row in the same transaction
--   * raise a specific SQLSTATE the API layer maps to an HTTP status
--
-- They are intended to be called with the service role (RPC) from server routes.


-- ── Credit a pending top-up (owner/webhook approval) ──────────────────────────
-- Idempotent: only a still-'pending' credit tx is processed. Re-invocations for
-- an already-'completed' tx return the current balance without double-crediting.
CREATE OR REPLACE FUNCTION wallet_credit_topup(p_tx_id UUID)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_user_id       UUID;
  v_amount_paise  BIGINT;
  v_status        wallet_tx_status;
  v_new_balance   BIGINT;
BEGIN
  -- Lock the ledger row first.
  SELECT user_id, amount_paise, status
    INTO v_user_id, v_amount_paise, v_status
  FROM wallet_transactions
  WHERE id = p_tx_id AND type = 'credit'
  FOR UPDATE;

  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'topup_not_found' USING ERRCODE = 'P0002';
  END IF;

  -- Idempotency: already handled → return the current balance, no double credit.
  IF v_status = 'completed' THEN
    SELECT balance_paise INTO v_new_balance FROM wallets WHERE user_id = v_user_id;
    RETURN v_new_balance;
  END IF;

  IF v_status <> 'pending' THEN
    RAISE EXCEPTION 'topup_not_pending' USING ERRCODE = 'P0001';
  END IF;

  -- Lock + update the wallet row, creating it if missing.
  INSERT INTO wallets (user_id, balance_paise)
  VALUES (v_user_id, 0)
  ON CONFLICT (user_id) DO NOTHING;

  UPDATE wallets
     SET balance_paise = balance_paise + v_amount_paise
   WHERE user_id = v_user_id
  RETURNING balance_paise INTO v_new_balance;

  UPDATE wallet_transactions
     SET status = 'completed',
         balance_after = v_new_balance
   WHERE id = p_tx_id;

  RETURN v_new_balance;
END;
$$;


-- ── Debit the wallet to pay for a guidance order ──────────────────────────────
-- Verifies the order is unpaid and the balance is sufficient, then debits,
-- marks the order paid, and writes a debit ledger row — all atomically.
CREATE OR REPLACE FUNCTION wallet_debit_for_order(
  p_user_id   UUID,
  p_order_ref TEXT
)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_amount_paise   BIGINT;
  v_payment_status TEXT;
  v_balance        BIGINT;
  v_new_balance    BIGINT;
BEGIN
  -- Lock the order row.
  SELECT ROUND(payment_amount * 100)::BIGINT, payment_status
    INTO v_amount_paise, v_payment_status
  FROM guidance_requests
  WHERE reference_id = p_order_ref
  FOR UPDATE;

  IF v_amount_paise IS NULL THEN
    RAISE EXCEPTION 'order_not_found' USING ERRCODE = 'P0002';
  END IF;

  IF v_payment_status = 'paid' THEN
    RAISE EXCEPTION 'order_already_paid' USING ERRCODE = 'P0003';
  END IF;

  -- Lock the wallet row.
  SELECT balance_paise INTO v_balance
  FROM wallets
  WHERE user_id = p_user_id
  FOR UPDATE;

  IF v_balance IS NULL THEN
    RAISE EXCEPTION 'wallet_not_found' USING ERRCODE = 'P0002';
  END IF;

  IF v_balance < v_amount_paise THEN
    RAISE EXCEPTION 'insufficient_balance' USING ERRCODE = 'P0004';
  END IF;

  v_new_balance := v_balance - v_amount_paise;

  UPDATE wallets SET balance_paise = v_new_balance WHERE user_id = p_user_id;

  UPDATE guidance_requests
     SET payment_status = 'paid',
         payment_verified_by = 'wallet',
         payment_verification_note = 'Paid via wallet by user ' || p_user_id::TEXT,
         paid_at = NOW()
   WHERE reference_id = p_order_ref;

  INSERT INTO wallet_transactions (
    user_id, type, status, amount_paise, balance_after, description, order_reference
  ) VALUES (
    p_user_id, 'debit', 'completed', v_amount_paise, v_new_balance,
    'Payment for ' || p_order_ref, p_order_ref
  );

  RETURN v_new_balance;
END;
$$;


-- ── Refund into the wallet ────────────────────────────────────────────────────
-- Credits the wallet and writes a 'refund' ledger row atomically. Optionally
-- links to the original order reference for traceability.
CREATE OR REPLACE FUNCTION wallet_refund(
  p_user_id      UUID,
  p_amount_paise BIGINT,
  p_reason       TEXT,
  p_order_ref    TEXT DEFAULT NULL
)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_new_balance BIGINT;
BEGIN
  IF p_amount_paise IS NULL OR p_amount_paise <= 0 THEN
    RAISE EXCEPTION 'invalid_amount' USING ERRCODE = 'P0005';
  END IF;

  INSERT INTO wallets (user_id, balance_paise)
  VALUES (p_user_id, 0)
  ON CONFLICT (user_id) DO NOTHING;

  UPDATE wallets
     SET balance_paise = balance_paise + p_amount_paise
   WHERE user_id = p_user_id
  RETURNING balance_paise INTO v_new_balance;

  IF v_new_balance IS NULL THEN
    RAISE EXCEPTION 'wallet_not_found' USING ERRCODE = 'P0002';
  END IF;

  INSERT INTO wallet_transactions (
    user_id, type, status, amount_paise, balance_after, description, order_reference, refund_reason
  ) VALUES (
    p_user_id, 'refund', 'completed', p_amount_paise, v_new_balance,
    COALESCE(NULLIF(p_reason, ''), 'Wallet refund'), p_order_ref, p_reason
  );

  RETURN v_new_balance;
END;
$$;


-- Only the service role may execute these (server routes call them via RPC).
REVOKE ALL ON FUNCTION wallet_credit_topup(UUID) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION wallet_debit_for_order(UUID, TEXT) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION wallet_refund(UUID, BIGINT, TEXT, TEXT) FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION wallet_credit_topup(UUID) TO service_role;
GRANT EXECUTE ON FUNCTION wallet_debit_for_order(UUID, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION wallet_refund(UUID, BIGINT, TEXT, TEXT) TO service_role;
