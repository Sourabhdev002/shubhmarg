-- Migration 12: Wallets & wallet transactions
-- balance_paise: stored in paise (integer) to avoid float rounding.
-- ₹1 = 100 paise. Display by dividing by 100.

CREATE TABLE wallets (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id       UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
    balance_paise BIGINT NOT NULL DEFAULT 0
        CHECK (balance_paise >= 0),
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER wallets_updated_at
    BEFORE UPDATE ON wallets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-create wallet when user_profile is created
CREATE OR REPLACE FUNCTION create_user_wallet()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.wallets (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_profile_created_create_wallet
    AFTER INSERT ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION create_user_wallet();

-- RLS
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_own_wallet_select" ON wallets
    FOR SELECT USING (auth.uid() = user_id);

-- No direct UPDATE from client — all mutations go through server actions
GRANT ALL ON public.wallets TO service_role;


-- ── Wallet transactions ledger ──────────────────────────────────────────────
CREATE TYPE wallet_tx_type AS ENUM ('credit', 'debit', 'refund');
CREATE TYPE wallet_tx_status AS ENUM ('pending', 'completed', 'failed');

CREATE TABLE wallet_transactions (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    type            wallet_tx_type NOT NULL,
    status          wallet_tx_status NOT NULL DEFAULT 'pending',
    amount_paise    BIGINT NOT NULL CHECK (amount_paise > 0),
    balance_after   BIGINT,          -- snapshot for display; set on completion
    description     TEXT NOT NULL,
    -- For top-up credits: links to UPI payment
    topup_reference TEXT UNIQUE,     -- TOPUP-XXXX reference id
    topup_utr       TEXT,            -- UTR from bank
    topup_amount    NUMERIC(10,2),   -- exact UPI amount paid
    -- For debit: links to guidance order
    order_reference TEXT,            -- guidance_requests.reference_id
    -- For refunds
    refund_reason   TEXT
);

-- Indexes for common queries
CREATE INDEX wallet_tx_user_idx ON wallet_transactions(user_id, created_at DESC);
CREATE INDEX wallet_tx_topup_ref_idx ON wallet_transactions(topup_reference) WHERE topup_reference IS NOT NULL;

-- RLS: users see only their own transactions
ALTER TABLE wallet_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users_own_tx_select" ON wallet_transactions
    FOR SELECT USING (auth.uid() = user_id);

GRANT ALL ON public.wallet_transactions TO service_role;
