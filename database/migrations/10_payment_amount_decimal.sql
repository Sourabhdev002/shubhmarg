-- Migration: 10_payment_amount_decimal.sql
-- (requirements alias: 03_payment_amount_decimal.sql)
-- Change payment_amount from INTEGER to NUMERIC(10,2) to support unique-paise
-- amounts (e.g. 99.07) used for automatic payment matching.
--
-- Note: payment_verified_by, payment_verification_note, and the payment_utr
-- UNIQUE constraint already exist from migration 02_add_payment_fields.sql.

ALTER TABLE guidance_requests
  ALTER COLUMN payment_amount TYPE NUMERIC(10,2)
  USING payment_amount::NUMERIC(10,2);

-- Ensure amounts are positive with at most two decimals (NULL allowed for legacy rows).
ALTER TABLE guidance_requests
  ADD CONSTRAINT payment_amount_valid
  CHECK (payment_amount IS NULL OR (payment_amount > 0 AND payment_amount = ROUND(payment_amount, 2)));