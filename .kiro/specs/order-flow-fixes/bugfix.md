# Bugfix Requirements Document

## Introduction

Seven defects in the ShubhMarg order flow (request form, Quick Answer, price display, owner alerts, payment screen) make customers fail to order, see one price and pay another, hit a dead end after the Rs 99 Quick Answer, or lose their "payment pending" state. The owner also gets no alert for new orders or "I've paid" claims.

The Supabase insert itself is verified to work. The `guidance_requests.concern` column is `TEXT NOT NULL`, so a null or undefined `concern` fails with code 23502. The form sends `concern: ""`, and that must stay a string.

Bug tags in brackets: [B1] phone format, [B2] short question, [B3] form price/name fallback, [B4] CTA labels vs charged price, [B5] Quick Answer dead end, [B6] no owner alert, [B7] payment screen flips back.

Each Current Behavior clause 1.N has a matching Expected Behavior clause 2.N. The formal bug conditions, the full CTA price audit and the owner decisions are in design.md.

## Bug Analysis

### Current Behavior (Defect)

1.1 [B1] WHEN a user types the phone number with spaces or a country prefix (for example "98765 43210", "+91 98765 43210", "098765 43210") THEN the system builds the email from the raw text, the server rejects it with "A valid email address is required.", and the user is told about a field they never saw

1.2 [B1] WHEN the phone contains 10 or more characters that are not a valid Indian mobile number (for example letters, "12345678901234", or a number starting with 1-5) THEN the client check (`length < 10` only) lets it through and the server accepts or rejects it by email-regex luck, so a garbage identifier can be saved

1.3 [B2] WHEN the question has 1 to 9 characters THEN the client allows the submit (it only checks non-empty) and the user sees "minimum 10 characters" only after a server round trip

1.4 [B3] WHEN the user opens /request-guidance?service=<id> for a service that exists in SERVICE_PRICING but not in the form's own list (baby-name, emergency, jaap, compatibility, quick-answer, deep-kundli, yantra-kavach, vastu, jyotish, prashna, muhurta and others) THEN the form falls back to the first entry and shows "Prashna ₹501" while the real service id is submitted

1.5 [B3] WHEN a request for such a service is submitted, or any request is submitted successfully THEN the success screen says "Complete Dakshina of ₹<fallback or base price>" (for example ₹501) while the payment page charges the server amount (for example ₹999, or ₹501.07 with the paise fingerprint)

1.6 [B4] WHEN the user follows a tool-page link with service=deep-kundli, yantra-kavach, vastu or jyotish THEN the form's ALIAS_MAP silently swaps it to kundli, remedy, remedy or kundli, so the charged price (₹1,101 for all four) disagrees with pricing.ts (1500, 1100, 1101, 501)

1.7 [B4] WHEN a CTA button or sticky bar shows a hard-coded price that differs from the price the payment page charges (for example Spouse Report ₹999, Full Dossier ₹1,500, Framed Certificate ₹3,500, 365-Day Book ₹3,100, all listed in design.md Appendix A) THEN the customer sees one price on the button and a different one at payment

1.8 [B4] WHEN a CTA links to a service id that is in neither the form list nor the server allow-list (service=karmic-debt from the Kundli X-Ray 8th house) THEN the submit fails with "Invalid service selected."

1.9 [B5] WHEN the user submits the ₹99 Quick Answer form THEN /api/quick-answer inserts the row but returns only `{success:true}` with no reference ID, and the success screen shows no payment link or button, so the customer cannot pay

1.10 [B5] WHEN the Quick Answer success screen is shown THEN it claims "Payment link sent to your WhatsApp", which is false because nothing is sent

1.11 [B5] WHEN the Quick Answer phone has spaces or +91 THEN the raw text goes into the synthetic email (`<raw>@quick.shubhmarg.com`), inconsistent with the main form and not validated as a real mobile number

1.12 [B6] WHEN a new order is created through the request form or Quick Answer THEN no Telegram alert is sent to the owner

1.13 [B6] WHEN a customer taps "I Have Completed the Payment" or submits a UTR THEN no Telegram alert is sent to the owner

1.14 [B7] WHEN the user taps "Pay Securely" on the payment page THEN `payment_status` is set to "payment_verification" in local state only, the database still says "unpaid", and the 5-second poll overwrites the local value so the screen flips back to the pay screen

### Expected Behavior (Correct)

2.1 [B1] WHEN a user types a phone number in any common format (spaces, dashes, brackets, "+91", "91", leading "0") THEN the system SHALL normalize it to 10 digits (strip non-digits, then strip a leading 91 from 12 digits or a leading 0 from 11 digits), build the identifier from those 10 digits, and never show an email error to a phone-only form

2.2 [B1] WHEN the normalized phone is not exactly 10 digits starting with 6, 7, 8 or 9 THEN the client SHALL show "Please enter a valid 10-digit Indian mobile number." before submit, and the server SHALL re-validate the same rule and return the same message, so no garbage identifier is saved

2.3 [B2] WHEN the question has fewer than 10 characters after trimming THEN the client SHALL block the submit, focus the question field and show the same "minimum 10 characters" message the server uses, and SHALL show a live character hint while typing

2.4 [B3] WHEN the user opens /request-guidance?service=<id> for any id in SERVICE_PRICING (or a known alias) THEN the form SHALL show that service's correct name and the price from pricing.ts, and the selected id SHALL be submitted unchanged unless it is an alias of the same price

2.5 [B3] WHEN a request is submitted successfully THEN the success screen SHALL show the exact amount returned by the server (the same figure the payment page shows), and SHALL NOT use any form-local price

2.6 [B4] WHEN the user follows a tool-page link with any service id THEN the system SHALL charge the pricing.ts price of that exact id (deep-kundli 1500, yantra-kavach 1100, vastu 1101, jyotish 501), and ALIAS_MAP SHALL NOT remap an id to a service with a different price

2.7 [B4] WHEN a CTA button or sticky bar shows a price THEN that price SHALL equal the pricing.ts price of the service id in its link, and SHALL come from pricing.ts rather than a hard-coded number. No new prices are invented. Where the label and the catalog disagree, the default is to change the label to the catalog price, and each case is listed as an owner decision in design.md

2.8 [B4] WHEN a CTA links to a legacy id with no price entry (karmic-debt) THEN the system SHALL resolve it to an existing catalog service (default: temple-puja) so the submit succeeds with a displayed price equal to the charged price

2.9 [B5] WHEN the ₹99 Quick Answer is saved THEN /api/quick-answer SHALL return `{success:true, referenceId, amount}`, and the success screen SHALL show a primary "Pay ₹<amount>" link to /payment/<referenceId> together with the reference ID

2.10 [B5] WHEN the Quick Answer success screen is shown THEN it SHALL NOT claim a payment link was sent to WhatsApp, and SHALL say the answer is delivered after payment is confirmed

2.11 [B5] WHEN the Quick Answer phone is submitted THEN the client and the API SHALL apply the same normalization and validation as 2.1 and 2.2, and /api/quick-answer SHALL remain in the rate-limited route list in src/proxy.ts

2.12 [B6] WHEN a new order is created through the request form or Quick Answer THEN the system SHALL send a best-effort, non-blocking Telegram alert with reference ID, service, amount and customer name

2.13 [B6] WHEN a payment is claimed ("Pay Securely" claim or "I Have Completed the Payment") or a UTR is submitted THEN the system SHALL send a best-effort, non-blocking Telegram alert with reference ID, service, amount and name (and the UTR for a UTR submission), and SHALL NOT break the user flow if Telegram is unconfigured, slow or failing, and SHALL NOT print token or chat id values

2.14 [B7] WHEN the user taps "Pay Securely" THEN the system SHALL persist the claim by calling submitPaymentConfirmation (without marking anything paid), and the "verification pending" state SHALL survive the 5-second poll and a page reload, with a way back to the payment options that does not change the database status

### Unchanged Behavior (Regression Prevention)

3.1 WHEN an order is created THEN the system SHALL CONTINUE TO allocate the unique-paise payment amount via src/lib/paise-allocation.ts, unchanged

3.2 WHEN a logged-in user has enough wallet balance and taps the wallet pay button THEN the system SHALL CONTINUE TO pay through walletSpend and set the request to paid

3.3 WHEN the payment page renders the Paytm secure checkout, the UPI QR, the copy-UPI-ID helper and the UPI app launchers THEN the system SHALL CONTINUE TO behave identically, and the link values in src/config/paytm-links.ts SHALL NOT change

3.4 WHEN requests hit rate-limited API routes THEN the system SHALL CONTINUE TO apply the existing limits in src/proxy.ts, including /api/quick-answer

3.5 WHEN a visitor uses /free-reading or the free reading API THEN the system SHALL CONTINUE TO work exactly as before

3.6 WHEN a payment status is read or written THEN the system SHALL CONTINUE TO use only the existing values unpaid, payment_verification, paid and payment_failed, and nothing SHALL be marked paid by the changes in this spec

3.7 WHEN a valid 10-digit phone, a valid question and a known service are submitted THEN the system SHALL CONTINUE TO save the same row shape as today, including `concern` as a string (never null or undefined) and the email format `<10 digits>@phone.shubhmarg.com` (`@quick.shubhmarg.com` for Quick Answer)

3.8 WHEN a service id already shown correctly (vedic-guidance, kundli, muhurat, career-business, marriage, remedy, temple-puja, tatkal-express, voice-dossier, annual-varshphal, energized-gemstone, business-retainer) is selected THEN the form SHALL CONTINUE TO show the same name, price, delivery time and description

3.9 WHEN the owner taps Approve or Reject on a wallet top-up alert in Telegram THEN the existing webhook flow, sendTopupAlert and sendQuickUnlockAlert SHALL CONTINUE TO work unchanged

3.10 WHEN a user views the request, Quick Answer and payment screens THEN the temple-aesthetic design system (palette, fonts, surfaces, mobile performance rules) SHALL CONTINUE TO apply, and no database schema change SHALL be required

3.11 WHEN the customer taps "I Have Completed the Payment" or submits a UTR THEN the system SHALL CONTINUE TO move the request to payment_verification with the same validation (UTR length 8 to 20, duplicate UTR rejected, already-paid rejected)
