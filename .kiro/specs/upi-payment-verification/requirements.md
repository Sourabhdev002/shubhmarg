# Requirements Document

## Introduction

ShubhMarg sells Vedic guidance reports but cannot use a conventional payment gateway (Razorpay, Cashfree, PayU reject the astrology category; the operator has no GST and no confirmed Paytm PG approval). This feature delivers reliable payment collection and near-instant automatic confirmation using only gateway-free tools: a UPI QR code, a copyable UPI ID, and email-alert parsing for automation.

The system is composed of five cooperating parts: a QR-first payment page, a secret-protected auto-verification webhook (`/api/upi-webhook`), an email→webhook bridge (Google Apps Script in a private Gmail), a manual admin confirm/reject fallback, and new configuration/secrets. Its two standout mechanisms are unique-paise amount matching (each pending order is charged a slightly unique amount so the incoming payment amount alone identifies the order) and email-driven auto-verification.

This spec is explicitly scoped to what works WITHOUT a payment gateway. No payment-gateway integration is included, and non-working one-tap UPI deep-link buttons are removed or best-effort only. The QR scan and copy-UPI-ID paths are the primary payment methods.

## Glossary

- **System**: The ShubhMarg Next.js web application and its server components as a whole.
- **Payment_Page**: The customer-facing route `src/app/payment/[reference_id]/page.tsx` that presents payment instructions and live-updates to confirmed.
- **Payment_Actions**: Server actions in `src/app/payment/[reference_id]/actions.ts` (`getPaymentRequestByReference`, `submitPaymentUtr`, `submitPaymentConfirmation`).
- **Upi_Uri_Builder**: The shared `buildUpiUri` utility that constructs a `upi://pay` URI.
- **Webhook**: The endpoint `POST /api/upi-webhook` that receives parsed payment data and confirms a matching order.
- **Email_Bridge**: The Google Apps Script (`scripts/upi-email-bridge.gs`) that reads payment-alert emails from a private Gmail and calls the Webhook.
- **Admin_Dashboard**: The admin route(s) under `src/app/admin/guidance-requests/*` and their actions.
- **Report_Generator**: `generateVedicGuidanceReport` from `@/services/report-generator`.
- **Order**: A row in the Supabase `guidance_requests` table, identified by a UNIQUE `reference_id`.
- **UTR**: Unique Transaction Reference for a UPI payment (typically a 12-digit string).
- **VPA**: Virtual Payment Address (the operator's UPI ID).
- **Unique_Paise_Amount**: A per-order payment amount carrying a small unique paise offset (e.g. ₹99.07) so the amount alone identifies a pending order.
- **Webhook_Secret**: The shared secret in the `X-Webhook-Secret` header, compared to `UPI_WEBHOOK_SECRET`.
- **Pending_Order**: An Order whose `payment_status` is `unpaid` or `payment_verification`.

## Requirements

### Requirement 1: QR-first payment experience

**User Story:** As a customer, I want to pay by scanning a UPI QR code, so that I can complete payment in any UPI app without needing a payment gateway.

#### Acceptance Criteria

1. WHEN the Payment_Page loads a valid Order, THE Payment_Page SHALL render a UPI QR code generated from a `upi://pay` URI containing the payee VPA, payee name, order amount, and currency.
2. THE Payment_Page SHALL present the QR scan path and the copy-UPI-ID path as the primary payment methods.
3. THE Payment_Page SHALL display ordered step-by-step payment instructions.
4. THE Payment_Page SHALL display a WhatsApp help contact (`918169382308`) as a fallback.
5. THE Payment_Page SHALL remove or de-emphasize the one-tap UPI deep-link app buttons as best-effort-only.

### Requirement 2: Copyable UPI ID

**User Story:** As a customer, I want to copy the UPI ID with one tap, so that I can paste it into my UPI app when scanning is inconvenient.

#### Acceptance Criteria

1. THE Payment_Page SHALL display the payee VPA in a prominent, copyable control.
2. WHEN the customer activates the copy control, THE Payment_Page SHALL copy the payee VPA to the clipboard.
3. THE Payment_Page SHALL display instructions describing how to paste the VPA into a UPI app and pay the displayed amount.

### Requirement 3: Two-decimal amount formatting

**User Story:** As a customer, I want the payment amount to be formatted correctly, so that my UPI app accepts it without a false "limit exceeded" error.

#### Acceptance Criteria

1. WHEN the Upi_Uri_Builder builds a `upi://pay` URI, THE Upi_Uri_Builder SHALL render the amount with exactly two decimal places.
2. THE Upi_Uri_Builder SHALL URL-encode the payee VPA, payee name, and currency in the generated URI.
3. WHERE no currency is supplied, THE Upi_Uri_Builder SHALL default the currency to `INR`.
4. THE Payment_Page SHALL display the payable amount to the customer with exactly two decimal places.

### Requirement 4: Customer payment confirmation and UTR submission

**User Story:** As a customer, I want to indicate I have paid and optionally enter my UTR, so that my order moves into verification.

#### Acceptance Criteria

1. WHEN the customer submits a payment confirmation via `submitPaymentConfirmation`, THE Payment_Actions SHALL transition the Order from `unpaid` or `payment_failed` to `payment_verification` and set `payment_submitted_at`.
2. WHEN the customer submits a UTR via `submitPaymentUtr`, THE Payment_Actions SHALL validate that the UTR is 8 to 20 characters in length.
3. IF a submitted UTR is already attached to a different Order, THEN THE Payment_Actions SHALL reject the submission and return an error result without changing the Order.
4. WHEN a valid UTR is submitted, THE Payment_Actions SHALL store the UTR on the Order and transition the Order to `payment_verification`.

### Requirement 5: Live status polling

**User Story:** As a customer, I want the payment page to update automatically, so that I see confirmation without refreshing.

#### Acceptance Criteria

1. WHILE the Order status is `payment_verification`, THE Payment_Page SHALL poll `getPaymentRequestByReference` every 5 seconds.
2. WHILE the Order status is `unpaid`, THE Payment_Page SHALL poll `getPaymentRequestByReference` every 5 seconds so the fast-path confirmation surfaces.
3. WHEN a poll returns an Order status of `paid`, THE Payment_Page SHALL display a payment-confirmed state and stop polling.

### Requirement 6: Auto-verification webhook authentication

**User Story:** As the operator, I want the webhook to require a secret, so that only my trusted email bridge can confirm payments.

#### Acceptance Criteria

1. WHEN a request arrives at the Webhook, THE Webhook SHALL read the shared secret from the `X-Webhook-Secret` header and compare it to `UPI_WEBHOOK_SECRET` using a constant-time comparison.
2. IF the `X-Webhook-Secret` header is absent or does not equal `UPI_WEBHOOK_SECRET`, THEN THE Webhook SHALL respond with HTTP 401 and `status: "unauthorized"` and SHALL NOT change any Order state.
3. THE Webhook SHALL validate the Webhook_Secret before performing any privileged database write.
4. THE Webhook SHALL NOT include the Webhook_Secret in any response or log output.

### Requirement 7: Unique-paise amount matching

**User Story:** As the operator, I want the incoming payment amount to identify the order, so that payments are confirmed automatically without manual reconciliation.

#### Acceptance Criteria

1. WHEN an Order is created, THE System SHALL assign a Unique_Paise_Amount that is not currently in use among Pending_Orders and store it in `payment_amount`.
2. WHEN the Webhook receives a payment with an amount matching exactly one Pending_Order, THE Webhook SHALL confirm that Order.
3. IF the incoming amount matches more than one Pending_Order, THEN THE Webhook SHALL attempt to disambiguate using the UTR.
4. IF the incoming amount matches no Pending_Order, THEN THE Webhook SHALL attempt to match using the UTR.
5. IF neither amount nor UTR identifies exactly one Pending_Order, THEN THE Webhook SHALL respond with HTTP 200 and `status: "no_match"` and SHALL NOT auto-confirm any Order.

### Requirement 8: UTR matching and disambiguation

**User Story:** As the operator, I want the UTR to be used as a corroborating match, so that ambiguous or amount-less payments can still be resolved.

#### Acceptance Criteria

1. WHERE the incoming payment includes a UTR, THE Webhook SHALL attempt to match the UTR against the `payment_utr` of Pending_Orders.
2. WHEN the UTR matches exactly one Pending_Order, THE Webhook SHALL confirm that Order.
3. WHEN a Pending_Order is confirmed via the Webhook and the payment includes a UTR, THE Webhook SHALL store the UTR on the confirmed Order.

### Requirement 9: Marking an order paid and triggering the report

**User Story:** As the operator, I want a matched payment to complete the order and generate the report, so that the customer receives their guidance promptly.

#### Acceptance Criteria

1. WHEN the Webhook uniquely matches a Pending_Order, THE Webhook SHALL set `payment_status = paid`, set `paid_at` to the current time, and set `payment_verified_by = 'webhook'`.
2. WHEN the Webhook confirms an Order, THE Webhook SHALL record the incoming amount and payer information in `payment_verification_note`.
3. WHEN an Order transitions to `paid`, THE System SHALL trigger `generateVedicGuidanceReport` in the background.
4. THE System SHALL trigger the authoritative report generation at the moment the Order becomes `paid` rather than at `payment_verification`.
5. WHEN the Webhook successfully confirms an Order, THE Webhook SHALL respond with HTTP 200, `status: "confirmed"`, `matched: true`, and the matched `referenceId`.

### Requirement 10: Duplicate and replay protection

**User Story:** As the operator, I want repeated email alerts to be harmless, so that a payment is never confirmed or reported twice.

#### Acceptance Criteria

1. IF the incoming UTR already exists on any Order, THEN THE Webhook SHALL respond with HTTP 200 and `status: "duplicate"` and SHALL NOT change any Order state.
2. IF the matched Order is already `paid`, THEN THE Webhook SHALL respond with HTTP 200 and `status: "duplicate"` and SHALL NOT change any Order state.
3. THE System SHALL enforce a UNIQUE constraint on `payment_utr` as a database-level backstop against double-processing the same payment.
4. WHEN the same payment alert is delivered to the Webhook more than once, THE Webhook SHALL leave Order state unchanged after the first confirmation.

### Requirement 11: Malformed webhook payload handling

**User Story:** As the operator, I want malformed webhook calls to be rejected cleanly, so that bad data never corrupts an order.

#### Acceptance Criteria

1. IF a webhook request is missing a valid `amount`, THEN THE Webhook SHALL respond with HTTP 400 and `status: "error"` and SHALL NOT change any Order state.

### Requirement 12: Email→webhook bridge

**User Story:** As the operator, I want payment-alert emails converted into webhook calls automatically, so that verification happens without any manual step or Android device.

#### Acceptance Criteria

1. THE Email_Bridge SHALL run on a time-based trigger.
2. WHEN the Email_Bridge runs, THE Email_Bridge SHALL search the private Gmail inbox for unread payment-alert emails using a sender/subject filter.
3. WHEN a payment-alert email is found, THE Email_Bridge SHALL extract the payment amount and, when present, the UTR from the email body.
4. WHEN an amount is extracted, THE Email_Bridge SHALL POST `{ amount, utr, payerName, rawEmailId }` to the Webhook with the `X-Webhook-Secret` header.
5. WHEN an email has been processed, THE Email_Bridge SHALL mark it read or labeled so it is not reprocessed.

### Requirement 13: Paytm alert email format (assumption / TBD)

**User Story:** As the operator, I want the unknown email format captured explicitly, so that the parsing work is not lost and can be finalized from a real sample.

#### Acceptance Criteria

1. THE System SHALL treat the exact Paytm payment-alert email format as an assumption that is TBD until a real Paytm alert sample is captured.
2. WHERE a real Paytm alert sample has not yet been captured, THE Email_Bridge SHALL use placeholder amount and UTR extraction regexes documented as provisional.
3. WHEN a real Paytm alert sample is captured, THE System SHALL finalize the amount and UTR extraction regexes and unit-test them against the captured sample.

### Requirement 14: Manual admin fallback

**User Story:** As the operator, I want to confirm or reject pending payments manually, so that orders still complete when auto-verification does not fire.

#### Acceptance Criteria

1. THE Admin_Dashboard SHALL list `payment_verification` Orders with their claimed UTR, amount, and customer name.
2. WHEN the operator confirms a payment via the Admin_Dashboard, THE System SHALL set the Order to `paid`, set `paid_at`, and set `payment_verified_by = 'admin'`.
3. WHEN the operator confirms a payment and no report has been generated, THE System SHALL trigger `generateVedicGuidanceReport`.
4. WHEN the operator rejects a payment via the Admin_Dashboard, THE System SHALL set the Order to `payment_failed` and record a reason note.
5. THE Admin_Dashboard actions SHALL remain behind the existing admin Basic Auth (`verifyAdminAuth`).

### Requirement 15: Report generation failure resilience

**User Story:** As the operator, I want a report failure to leave the payment confirmed, so that a Gemini error does not undo a valid payment.

#### Acceptance Criteria

1. IF `generateVedicGuidanceReport` fails after a successful match, THEN THE System SHALL keep the Order `paid` and SHALL log the report error.
2. THE System SHALL allow the operator to re-trigger report generation from the Admin_Dashboard after a report failure.

### Requirement 16: Payment amount schema migration

**User Story:** As the operator, I want the amount column to store paise, so that unique-paise matching is possible.

#### Acceptance Criteria

1. THE System SHALL provide a migration (`03_payment_amount_decimal.sql`) that changes `guidance_requests.payment_amount` from `INTEGER` to `NUMERIC(10,2)`.
2. THE System SHALL ensure `payment_amount` values are greater than zero with at most two decimal places.

### Requirement 17: Configuration and secrets

**User Story:** As the operator, I want secrets and the VPA to be configurable, so that nothing sensitive is hardcoded or committed.

#### Acceptance Criteria

1. THE System SHALL read the webhook secret from the `UPI_WEBHOOK_SECRET` environment variable.
2. THE System SHALL read the payee VPA from the `NEXT_PUBLIC_UPI_VPA` environment variable rather than a hardcoded value.
3. THE System SHALL read the payee name from the `UPI_PAYEE_NAME` environment variable.
4. THE System SHALL document the required environment variable key names in `.env.example` without including their values.
