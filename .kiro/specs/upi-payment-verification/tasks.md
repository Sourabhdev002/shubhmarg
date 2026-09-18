# Implementation Plan: UPI Payment + Automatic Verification

## Overview

This plan implements gateway-free UPI payment collection with near-instant automatic
verification, using TypeScript (matching the existing Next.js codebase). Work is ordered by
dependency: schema migration first, then shared utilities (UPI URI builder, unique-paise
allocation, matching), then the webhook, then payment-page and report-trigger changes, then the
admin fallback, then the Google Apps Script bridge, then integration wiring and tests.

Property-based tests use `fast-check` (dev dependency) and map to the design's Correctness
Properties. Each optional test sub-task is marked with `*` and may be skipped for a faster MVP.

Codebase notes established during design/requirements review:
- Columns `payment_verified_by` and `payment_verification_note` already exist in
  `database/migrations/02_add_payment_fields.sql`; no new migration is needed for them.
- The migrations directory already contains an `03_add_privacy_consent.sql`, so the amount
  migration is added as `database/migrations/10_payment_amount_decimal.sql` while keeping the
  requirements-named alias `03_payment_amount_decimal.sql` in a header comment for traceability.
- Order-creation paths: `src/app/request-guidance/actions.ts`,
  `src/app/api/quick-answer/route.ts`, `src/app/api/free-reading/route.ts`. The `free-reading`
  path inserts zero-amount, non-payable rows and MUST be excluded from unique-paise allocation.
- Admin lives at `src/app/admin/guidance-requests/` (`actions.ts`, `AdminDashboardClient.tsx`)
  with `updatePaymentStatus`, `triggerAiReportGeneration`, and Basic Auth via
  `src/lib/admin-auth.ts` (`verifyAdminAuth`).

## Tasks

- [ ] 1. Database schema migration for unique-paise amounts
  - [ ] 1.1 Add amount-decimal migration
    - Create `database/migrations/10_payment_amount_decimal.sql` (header comment noting the
      requirements alias `03_payment_amount_decimal.sql`).
    - `ALTER TABLE guidance_requests ALTER COLUMN payment_amount TYPE NUMERIC(10,2) USING payment_amount::NUMERIC(10,2);`
    - Add a CHECK constraint ensuring `payment_amount IS NULL OR payment_amount > 0` and at most
      two decimal places (e.g. `payment_amount = ROUND(payment_amount, 2)`).
    - Confirm (in a comment) that `payment_verified_by`, `payment_verification_note`, and the
      `payment_utr` UNIQUE constraint already exist from migration 02.
    - _Requirements: 16.1, 16.2, 10.3_

- [ ] 2. Environment/config plumbing for VPA, payee name, and webhook secret
  - [ ] 2.1 Add config accessors and `.env.example` documentation
    - Create a small config helper (e.g. `src/lib/upi-config.ts`) exposing `getUpiVpa()` (from
      `NEXT_PUBLIC_UPI_VPA`), `getUpiPayeeName()` (from `UPI_PAYEE_NAME`), and a server-only
      `getWebhookSecret()` (from `UPI_WEBHOOK_SECRET`), with safe fallbacks/validation.
    - Document key names only (no values) in `.env.example`: `UPI_WEBHOOK_SECRET`,
      `NEXT_PUBLIC_UPI_VPA`, `UPI_PAYEE_NAME`.
    - _Requirements: 17.1, 17.2, 17.3, 17.4_

- [ ] 3. Shared UPI URI builder utility
  - [ ] 3.1 Implement `buildUpiUri`
    - Create `src/lib/upi.ts` exporting `buildUpiUri(params: UpiIntentParams): string` per the
      design interface (`payeeVpa`, `payeeName`, `amount`, optional `currency`).
    - Render `am` using `amount.toFixed(2)` (exactly two decimals); URL-encode `pa`, `pn`, `cu`;
      default `cu` to `INR` when unspecified.
    - _Requirements: 3.1, 3.2, 3.3_
  - [ ]* 3.2 Property test: amount always has two decimals
    - **Property 1: UPI URI amount always has two decimals**
    - **Validates: Requirements 3.1, 3.4**
  - [ ]* 3.3 Property test: parameters round-trip through encoding
    - **Property 2: UPI URI parameters round-trip through encoding**
    - **Validates: Requirements 3.2, 3.3**

- [ ] 4. Unique-paise amount allocation (shared helper used by all order-creation paths)
  - [ ] 4.1 Implement allocation helper
    - Create `src/lib/paise-allocation.ts` exporting an async
      `allocateUniquePaiseAmount(basePriceRupees: number): Promise<number>` that queries
      `guidance_requests` for amounts currently in use among Pending_Orders (`payment_status IN
      ('unpaid','payment_verification')`), picks a paise offset (and rupee band if needed) not
      in use, and returns a `NUMERIC(10,2)`-compatible value.
    - Skip allocation for zero-amount/non-payable services (e.g. `free-reading`); return the base
      amount unchanged when base is 0.
    - _Requirements: 7.1, 16.2_
  - [ ]* 4.2 Property test: allocation avoids collisions
    - **Property 7: Unique-paise allocation avoids collisions**
    - **Validates: Requirements 7.1**

- [ ] 5. Wire unique-paise allocation into order-creation paths
  - [ ] 5.1 Use allocation in guidance-request submission
    - In `src/app/request-guidance/actions.ts`, replace the raw `getServicePrice(...)` amount with
      `await allocateUniquePaiseAmount(getServicePrice(formData.service))` before insert.
    - _Requirements: 7.1_
  - [ ] 5.2 Use allocation in quick-answer route
    - In `src/app/api/quick-answer/route.ts`, allocate a unique-paise amount from the base `99`
      price before insert (replace hardcoded `payment_amount: 99`).
    - _Requirements: 7.1_
  - [ ] 5.3 Confirm free-reading path is excluded
    - In `src/app/api/free-reading/route.ts`, keep `payment_amount: 0` / non-payable status and do
      NOT allocate a unique-paise amount (verify no accidental allocation call).
    - _Requirements: 7.1_

- [ ] 6. Checkpoint - schema, config, and shared utils
  - Ensure the migration applies, config accessors resolve, `buildUpiUri` and allocation compile
    and their property tests pass. Ask the user if questions arise.

- [ ] 7. Matching strategy (pure, testable core of auto-verification)
  - [ ] 7.1 Implement the matcher
    - Create `src/lib/upi-matching.ts` with a pure function that, given a list of Pending_Orders
      and an incoming `{ amount, utr }`, returns a result of the form
      `{ status: 'confirmed'|'duplicate'|'no_match', referenceId? }`.
    - Primary: match on `payment_amount == amount` among pending orders. If exactly one, confirm.
      If more than one, disambiguate by UTR. If zero, try UTR match. Return `no_match` when zero or
      more-than-one candidates remain after both amount and UTR matching.
    - Detect duplicate: incoming UTR already present on any order, or matched order already `paid`.
    - _Requirements: 7.2, 7.3, 7.4, 7.5, 8.1, 8.2, 10.1, 10.2_
  - [ ]* 7.2 Property test: deterministic matching and safe no-match
    - **Property 8: Deterministic matching and safe no-match**
    - **Validates: Requirements 7.2, 7.3, 7.4, 7.5, 8.1, 8.2**
  - [ ]* 7.3 Property test: only legal state transitions occur
    - **Property 13: Only legal state-machine transitions occur**
    - **Validates: Requirements 4.1, 9.1, 14.2, 14.4**

- [ ] 8. Auto-verification webhook endpoint
  - [ ] 8.1 Implement secret authentication (constant-time)
    - Create `src/app/api/upi-webhook/route.ts` with `export const dynamic = "force-dynamic"`.
    - Read `X-Webhook-Secret`; compare to `UPI_WEBHOOK_SECRET` via constant-time comparison
      (`crypto.timingSafeEqual` with length guard). On absent/mismatch respond HTTP 401
      `{ status: "unauthorized", matched: false }` with no DB writes and never echo the secret.
    - _Requirements: 6.1, 6.2, 6.3, 6.4_
  - [ ]* 8.2 Property test: webhook authorization
    - **Property 6: Webhook authorization**
    - **Validates: Requirements 6.2, 6.3**
  - [ ] 8.3 Implement payload validation
    - Parse the JSON body into `UpiWebhookRequest`; if `amount` is missing/invalid/non-positive,
      respond HTTP 400 `{ status: "error", matched: false }` with no state change.
    - _Requirements: 11.1_
  - [ ]* 8.4 Property test: malformed payloads rejected without side effects
    - **Property 11: Malformed payloads are rejected without side effects**
    - **Validates: Requirements 11.1**
  - [ ] 8.5 Implement match-and-confirm with idempotency
    - Dynamic-import `supabaseServer`; load Pending_Orders and run `src/lib/upi-matching.ts`.
    - On `duplicate`: respond HTTP 200 `{ status: "duplicate", matched: false }` with no change.
    - On `no_match`: respond HTTP 200 `{ status: "no_match", matched: false }` with no change.
    - On `confirmed`: set `payment_status='paid'`, `paid_at=now`, `payment_verified_by='webhook'`,
      store `payment_utr` when provided, and write a `payment_verification_note` recording incoming
      amount and payer. Respond HTTP 200 `{ status: "confirmed", matched: true, referenceId }`.
    - _Requirements: 7.2, 8.2, 8.3, 9.1, 9.2, 9.5, 10.1, 10.2, 10.4_
  - [ ] 8.6 Trigger report generation on paid (background)
    - After a successful confirm, fire-and-forget `generateVedicGuidanceReport` (matching the
      existing background-catch pattern); a report failure must leave the order `paid` and log.
    - _Requirements: 9.3, 9.4, 15.1_
  - [ ]* 8.7 Property test: confirmation outcome is complete and correct
    - **Property 9: Confirmation outcome is complete and correct**
    - **Validates: Requirements 8.3, 9.1, 9.2, 9.5**
  - [ ]* 8.8 Property test: webhook processing is idempotent
    - **Property 10: Webhook processing is idempotent**
    - **Validates: Requirements 10.1, 10.2, 10.4**

- [ ] 9. Move authoritative report trigger from `payment_verification` to `paid`
  - [ ] 9.1 Remove the report trigger from customer-side actions
    - In `src/app/payment/[reference_id]/actions.ts`, remove the background
      `generateVedicGuidanceReport` calls from `submitPaymentUtr` and `submitPaymentConfirmation`
      so reports are no longer generated at `payment_verification`. Retain the status transition,
      `payment_submitted_at`, UTR storage, and UTR-uniqueness rejection.
    - _Requirements: 4.1, 4.3, 4.4, 9.4_
  - [ ]* 9.2 Property test: customer submission moves order to verification
    - **Property 4: Customer submission moves order to verification**
    - **Validates: Requirements 4.1, 4.4**
  - [ ]* 9.3 Property test: customer UTR uniqueness enforced
    - **Property 5: Customer UTR uniqueness is enforced**
    - **Validates: Requirements 4.3**
  - [ ]* 9.4 Property test / unit test: UTR length validation boundary
    - **Property 3: UTR length validation boundary**
    - **Validates: Requirements 4.2**

- [ ] 10. Payment page updates (QR-first, config-driven, fast-path polling)
  - [ ] 10.1 Render QR + two-decimal amount from config
    - In `src/app/payment/[reference_id]/page.tsx`, build the `upi://pay` URI via `buildUpiUri`
      using `NEXT_PUBLIC_UPI_VPA` / `UPI_PAYEE_NAME` config, render the QR (react-qr-code), and
      display the payable amount with exactly two decimals.
    - _Requirements: 1.1, 3.4, 17.2_
  - [ ] 10.2 Copyable UPI ID and instructions
    - Add a prominent copyable VPA control that writes the VPA to the clipboard, ordered
      step-by-step instructions, the paste-and-pay guidance, and the WhatsApp help fallback
      (`918169382308`).
    - _Requirements: 1.2, 1.3, 1.4, 2.1, 2.2, 2.3_
  - [ ] 10.3 Remove/de-emphasize non-working deep-link buttons
    - Remove or visually de-emphasize the one-tap UPI app deep-link buttons as best-effort-only.
    - _Requirements: 1.5_
  - [ ] 10.4 Poll while unpaid and while verifying
    - Poll `getPaymentRequestByReference` every 5s while status is `unpaid` OR
      `payment_verification`; on `paid`, show the confirmed state and stop polling.
    - _Requirements: 5.1, 5.2, 5.3_

- [ ] 11. Admin manual confirm/reject fallback
  - [ ] 11.1 List verification orders with claimed details
    - In `src/app/admin/guidance-requests/AdminDashboardClient.tsx`, surface
      `payment_verification` orders with claimed UTR, amount, and customer name (data from
      `getGuidanceRequests`).
    - _Requirements: 14.1_
  - [ ] 11.2 Confirm/reject actions reusing existing helpers
    - In `src/app/admin/guidance-requests/actions.ts`, add confirm (set `paid`, `paid_at`,
      `payment_verified_by='admin'`, trigger report if not generated) and reject (set
      `payment_failed` with a reason note) flows, reusing `updatePaymentStatus` and
      `triggerAiReportGeneration`. Keep all actions behind `verifyAdminAuth`.
    - _Requirements: 14.2, 14.3, 14.4, 14.5, 15.2_

- [ ] 12. Google Apps Script email→webhook bridge
  - [ ] 12.1 Implement the bridge script skeleton
    - Create `scripts/upi-email-bridge.gs` with a time-triggered `pollPaymentEmails()` that
      searches unread payment-alert emails, extracts amount/UTR via provisional (clearly
      commented) regexes, POSTs `{ amount, utr, payerName, rawEmailId }` to `/api/upi-webhook`
      with the `X-Webhook-Secret` header, and marks processed emails read/labeled.
    - Add a prominent comment: the Paytm alert email format is TBD until a real sample is captured;
      the extraction regexes are provisional placeholders.
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 13.1, 13.2_
  - [ ]* 12.2 Finalize extraction regexes from a real sample (BLOCKED on sample)
    - Once a real Paytm alert sample is captured, finalize `extractAmount`/`extractUtr` and add
      unit tests against the captured body. This sub-task is blocked until a real sample exists.
    - _Requirements: 13.3_

- [ ] 13. Integration wiring and end-to-end tests
  - [ ]* 13.1 Webhook end-to-end integration test (mock report generator)
    - Seed an unpaid order, POST an alert with its unique amount, assert it becomes `paid`,
      `paid_at` set, `payment_verified_by='webhook'`, and the report trigger is invoked (mock
      Gemini). 1-3 representative examples only.
    - _Requirements: 9.1, 9.3, 9.5_
  - [ ]* 13.2 Admin confirm/reject integration test
    - Confirm moves a verification order to `paid` (+report trigger); reject moves it to
      `payment_failed` with a note. Behind Basic Auth.
    - _Requirements: 14.2, 14.3, 14.4_

- [ ] 14. Final checkpoint - ensure all tests pass
  - Ensure the build compiles and all unit/property/integration tests pass. Ask the user if
    questions arise.

## Notes

- Tasks marked with `*` are optional (tests) and can be skipped for a faster MVP.
- Each task references specific requirement clauses for traceability.
- Property tests use `fast-check` and reference the design's Correctness Properties; run a minimum
  of 100 iterations per property. Tag format: **Feature: upi-payment-verification, Property {n}**.
- The amount migration is filed as `10_payment_amount_decimal.sql` because `03_...` is already
  taken by an unrelated privacy-consent migration; the requirements alias is preserved in a header
  comment.
- `payment_verified_by` and `payment_verification_note` already exist (migration 02); no new
  migration is required for them.
- Task 12.2 (regex finalization) is intentionally blocked until a real Paytm alert sample is
  captured, per Requirement 13.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "2.1", "3.1", "12.1"] },
    { "id": 1, "tasks": ["3.2", "3.3", "4.1", "10.3"] },
    { "id": 2, "tasks": ["4.2", "5.1", "5.2", "5.3", "7.1", "9.1"] },
    { "id": 3, "tasks": ["7.2", "7.3", "8.1", "9.2", "9.3", "9.4", "10.1", "11.1"] },
    { "id": 4, "tasks": ["8.2", "8.3", "8.5", "10.2", "10.4", "11.2"] },
    { "id": 5, "tasks": ["8.4", "8.6", "13.2"] },
    { "id": 6, "tasks": ["8.7", "8.8", "13.1"] },
    { "id": 7, "tasks": ["12.2"] }
  ]
}
```
