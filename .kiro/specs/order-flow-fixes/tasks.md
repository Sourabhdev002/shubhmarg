# Implementation Plan

## Overview

Fix the seven order-flow defects (B1 to B7) with pure helpers, tests for pure logic only, and small edits to the form, Quick Answer, payment screen and CTA labels. Order: exploration test, preservation test, fix, checkpoint.

**Rules for every task below**
- Test only pure logic. Never insert into the real Supabase database and never send a real Telegram message. Tests must not import `supabaseServer`, the server actions, or the Telegram senders.
- Every implementation task ends with `npm run build` passing with zero errors.
- No database schema change. No commit and no push.
- Windows/PowerShell: use the `cwd` parameter, never `cd`. The terminal may lag by one command, so write command output to a log file and read the file to verify, then delete the log.
- Do not edit `src/lib/paise-allocation.ts`, `src/config/paytm-links.ts` or `src/proxy.ts`.
- Remember: write the exploration tests BEFORE the fix and run them on the UNFIXED code to see them fail. Write the preservation tests from observed unfixed behavior and see them pass BEFORE the fix.

## Tasks

- [x] 1. Write bug condition exploration test
  - **Property 1: Bug Condition** - Order flow shows true prices, accepts real phones, persists claims and alerts the owner
  - **CRITICAL**: These tests MUST FAIL on unfixed code. Failure confirms the bugs exist.
  - **DO NOT attempt to fix the tests or the code when they fail**
  - **NOTE**: These tests encode the expected behavior and will validate the fix when they pass after task 3
  - Install the test runner first: run `npm view vitest version` (write to a log, read the log), then `npm install -D -E vitest@<that exact version>`. Add `"test": "vitest run"` to package.json and create `vitest.config.ts` (`environment: "node"`, alias `@` to `./src`, include `src/**/*.test.ts`). No jsdom, no React rendering, no extra libraries. Record the exact version in the task notes.
  - Create `src/__tests__/bug-condition.test.ts` (pure logic only) covering the Bug Condition from design.md:
    - B1: for generated valid mobiles in many formats (`+91 98765 43210`, `91...`, `098765 43210`, dashes, brackets) `normalizePhone` returns the 10 digits; `12345678901234`, `abcdefghij` and `5123456789` are NOT valid by `isValidIndianMobile`
    - B2: `validateQuestion` rejects trimmed lengths 1 to 9 with the server message and accepts 10 or more
    - B3: for every key of `SERVICE_PRICING`, `getServiceView(key)` returns that key's price and name, not the `vedic-guidance` fallback
    - B4: `deep-kundli, yantra-kavach, vastu, jyotish` resolve to themselves; each of `puja, express, voice, varshphal, gemstone, business` has the same price as its target; `resolveServiceId("karmic-debt")` is `temple-puja`; an unknown id gives `null`
    - B4 scan: a `node:fs` scan of `src/**/*.tsx` finds every `request-guidance?service=<id>` and `serviceId="<id>"`, asserts each id resolves, asserts no numeric `price={...}` literal sits on a `serviceId=` component, and asserts no `(₹<digits>)` literal inside a request-guidance Link
    - B5: `buildQuickAnswerResponse("SHUBH-ABC123", 99.07)` equals `{success:true, referenceId:"SHUBH-ABC123", amount:99.07}`
    - B6: `buildOrderAlertText` and `buildClaimAlertText` contain reference, service, amount, name (and UTR when given), escape Markdown characters in a name like `A_B*C`, and never contain the words `TELEGRAM_BOT_TOKEN` or `TELEGRAM_CHAT_ID`; `shouldSendClaimAlert("unpaid", false)` is true, `("payment_verification", false)` is false, `("payment_verification", true)` is true, `("paid", true)` is false
  - B7 has no pure-logic test (it needs a database). It is covered by the manual checklist in task 4.
  - Run `npm test` on UNFIXED code, writing output to a log file and reading it
  - **EXPECTED OUTCOME**: Tests FAIL (missing modules and scan violations; this is correct and proves the bugs)
  - Document counterexamples found (for example the Appendix A mismatch list reported by the scan, `karmic-debt` unresolved, no `referenceId` in the Quick Answer response shape)
  - Mark task complete when the tests are written, run, and the failures are documented
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.11, 1.12, 1.13_

- [x] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Everything outside the bug condition behaves as before
  - **IMPORTANT**: Follow observation-first methodology
  - Observe on UNFIXED code, using only modules that already exist (`src/lib/pricing.ts`, file reads) and literal fixtures:
    - `getServicePrice` for every key of `SERVICE_PRICING`, for an unknown id (501) and for `free-reading` (501 because 0 is falsy)
    - the exact name, price, delivery and description of the 12 services in today's `GuidanceRequestForm.tsx` list, copied as a literal fixture
    - the old `ALIAS_MAP` entries for `puja, express, voice, varshphal, gemstone, business`
    - the old server allow-list ids (copied as a literal fixture)
    - marker strings still present in `src/lib/paise-allocation.ts` (`allocateUniquePaiseAmount`), `src/config/paytm-links.ts` (existing export names), `src/proxy.ts` (`"/api/quick-answer"`), and the exports `sendTopupAlert`, `sendQuickUnlockAlert`, `telegramConfigured` in `src/lib/telegram.ts`
    - the saved email formats as pure string expectations: `9876543210@phone.shubhmarg.com` and `9876543210@quick.shubhmarg.com`
  - Create `src/__tests__/preservation.test.ts` with property-style loops (seeded generators, no new dependency) over the observed values
  - Run `npm test -- preservation` on UNFIXED code, writing output to a log file and reading it
  - **EXPECTED OUTCOME**: Tests PASS (confirms the baseline to preserve)
  - Mark task complete when the tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.3, 3.4, 3.6, 3.7, 3.8, 3.9_

- [x] 3. Fix the seven order-flow defects (B1 to B7)

  - [x] 3.1 Add the pure helper modules
    - Create `src/lib/phone.ts`: `normalizePhone`, `isValidIndianMobile`, `PHONE_ERROR`, `buildPhoneEmail`, and `validateQuestion` with the server's exact message ("Please provide a question (minimum 10 characters).")
    - Create `src/lib/service-catalog.ts`: `LEGACY_SERVICE_IDS`, `SAME_PRICE_ALIASES`, `resolveServiceId`, `SERVICE_META` (the 12 existing entries copied verbatim; new entries per design D9), `getServiceView`, `formatInr`, `ctaPriceLabel`, `buildQuickAnswerResponse`. All prices come from `getServicePrice`. Do not change `src/lib/pricing.ts` values.
    - Create `src/lib/telegram-messages.ts`: `escapeMarkdown`, `buildOrderAlertText`, `buildClaimAlertText`, `shouldSendClaimAlert`. No phone number in alerts.
    - Run `npm test` for the new module tests, then `npm run build` with zero errors
    - _Bug_Condition: isBugCondition(X) for B1, B2, B3, B4, B5, B6 from design_
    - _Expected_Behavior: expectedBehavior(result) from design_
    - _Preservation: values in SERVICE_PRICING, the 12 existing services, email formats_
    - _Requirements: 2.1, 2.2, 2.3, 2.6, 2.8, 2.12, 2.13, 3.7, 3.8_

  - [x] 3.2 Fix the request form and the server action (B1, B2, B3, B4, B6)
    - `GuidanceRequestForm.tsx`: drop the local price list and `ALIAS_MAP`, build from `SERVICE_META`; initial service from `SAME_PRICE_ALIASES` / `resolveServiceId`; normalize and validate phone; block questions under 10 characters with focus and a live "n/10" hint; send `phone` instead of building the email; success screen shows `result.amount` from the server, formatted like the payment page. Keep `concern: ""`.
    - `src/types/guidance.ts`: add optional `phone`.
    - `request-guidance/actions.ts`: allow-list replaced by `resolveServiceId`; validate the phone, build the email server-side; keep question, DOB, place checks, paise allocation and the row shape; return `{ success: true, referenceId, amount }`; schedule the order alert with `after()` from `next/server` (documented in `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/after.md`).
    - `src/lib/telegram.ts`: add `sendOrderAlert` and `sendPaymentClaimAlert` (best effort, return false when unconfigured or on error, no secrets logged). Leave existing senders untouched.
    - Run `npm run build` with zero errors
    - _Bug_Condition: isBugCondition(X) for B1, B2, B3, B4 (alias remap), B6 from design_
    - _Expected_Behavior: expectedBehavior(result) from design_
    - _Preservation: unique-paise allocation, row shape, string concern, 12 existing services_
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.8, 2.12, 3.1, 3.7, 3.8_

  - [x] 3.3 Fix Quick Answer (B5, B1, B6)
    - `api/quick-answer/route.ts`: normalize and validate the phone (400 with `PHONE_ERROR`), email via `buildPhoneEmail(p, "quick")`, return `{ success: true, referenceId, amount }`, schedule the order alert with `after()`. Everything else unchanged. Do not edit `src/proxy.ts`.
    - `QuickAnswerForm.tsx`: same phone validation, success state holds reference and amount, primary "Pay ₹<amount>" link to `/payment/<referenceId>`, show the reference ID, new copy "answer delivered after payment is confirmed", remove the WhatsApp claim.
    - Run `npm run build` with zero errors
    - _Bug_Condition: isBugCondition(X) for B5 and B6 from design_
    - _Expected_Behavior: expectedBehavior(result) from design_
    - _Preservation: /api/quick-answer stays rate limited, 99 base amount with paise fingerprint, email domain @quick.shubhmarg.com_
    - _Requirements: 2.9, 2.10, 2.11, 2.12, 3.1, 3.4, 3.7_

  - [x] 3.4 Fix the payment screen and claim alerts (B7, B6)
    - `payment/[reference_id]/page.tsx`: `PayNowButton.onOpened` calls `submitPaymentConfirmation(reference_id)` and sets local `payment_verification` only on success (on failure keep the pay screen and show the error); keep the `fbq` tracking call; add the local `showOptions` state and a "Back to payment options" button on the pending screen that does not touch the database. Do not change the poll, the wallet pay, the QR or the UPI helpers.
    - `payment/[reference_id]/actions.ts`: extend the selects with `service, payment_amount, full_name`, use `shouldSendClaimAlert`, schedule `sendPaymentClaimAlert` with `after()` after a successful update, keep all validation and results as they are. Nothing is ever marked `paid`.
    - Run `npm run build` with zero errors
    - _Bug_Condition: isBugCondition(X) for B6 (claim) and B7 from design_
    - _Expected_Behavior: expectedBehavior(result) from design_
    - _Preservation: statuses unpaid, payment_verification, paid, payment_failed; UTR rules; wallet pay; Paytm links_
    - _Requirements: 2.13, 2.14, 3.2, 3.3, 3.6, 3.11_

  - [x] 3.5 Make CTA labels match the charged price (B4)
    - Replace hard-coded prices with `ctaPriceLabel(serviceId)` for every row in design.md Appendix A section A1, and remove the `price` prop from `SanctifiedVerdictStickyBar`, `SealedGotraDestinyEnvelope`, `TwoTimelinesVisualizer`, `AstrologicalGapDiagnosis`, `DestinyCrisisRadar` and their call sites. If the same value also feeds a `DirectWhatsAppButton`, keep a separate literal there (WhatsApp prices are outside this spec).
    - `KundliDiamondXRay.tsx`: use `ctaPriceLabel(selectedHouse.serviceId)` and drop per-house price; the `karmic-debt` house resolves to `temple-puja` through `resolveServiceId`.
    - `ServicesContent.tsx` and `PricingGrid.tsx`: card prices from `getServicePrice(serviceParam)`.
    - Default for every mismatch: change the label to the catalog price (owner decisions D1 to D6 in design.md). Do not invent prices and do not edit `pricing.ts` values.
    - Re-check the "verify" rows in Appendix A with the scan test and fix any extra mismatch it reports the same way
    - Run `npm run build` with zero errors
    - _Bug_Condition: isBugCondition(X) for B4 from design_
    - _Expected_Behavior: expectedBehavior(result) from design_
    - _Preservation: SERVICE_PRICING values, temple design system, mobile performance rules_
    - _Requirements: 2.6, 2.7, 2.8, 3.3, 3.10_

  - [x] 3.6 Verify bug condition exploration test now passes
    - **Property 1: Expected Behavior** - Order flow shows true prices, accepts real phones, persists claims and alerts the owner
    - **IMPORTANT**: Re-run the SAME test file from task 1 (`src/__tests__/bug-condition.test.ts`). Do NOT write a new test.
    - Run `npm test -- bug-condition`, writing output to a log file and reading it
    - **EXPECTED OUTCOME**: Tests PASS (confirms the bugs are fixed)
    - Run `npm run build` with zero errors
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10, 2.11, 2.12, 2.13_

  - [x] 3.7 Verify preservation tests still pass
    - **Property 2: Preservation** - Everything outside the bug condition behaves as before
    - **IMPORTANT**: Re-run the SAME tests from task 2. Do NOT write new tests for the baseline.
    - Then extend `src/__tests__/preservation.test.ts` with the helper-based cases that could not exist before the fix: valid 10-digit phones normalize to themselves, `getServiceView` for the 12 existing ids equals the fixture, `resolveServiceId` accepts a superset of the old allow-list, same-price aliases match the old `ALIAS_MAP`
    - Run `npm test`, writing output to a log file and reading it
    - **EXPECTED OUTCOME**: All tests PASS (no regressions)
    - Run `npm run build` with zero errors
    - _Requirements: 3.1, 3.3, 3.4, 3.6, 3.7, 3.8, 3.9, 3.11_

- [x] 4. Checkpoint - Ensure all tests pass
  - Run `npm test` and `npm run build`, both with zero errors (check via log files)
  - Delete any temporary log files created during verification
  - Manual checklist for the owner (no automated test touches Supabase or Telegram; the 3 junk rows from the earlier diagnosis run are deleted by the owner manually):
    - Order with "+91 98765 43210": saved with a 10-digit identifier, success screen amount equals the payment page amount
    - Question of 5 characters is blocked on the phone with a counter
    - Quick Answer shows a Pay button and opens the payment page
    - Pay Securely: reload and wait more than 5 seconds, the screen stays on "verification pending", and "Back to payment options" works
    - Telegram alert arrives for a new order and for a claim, and the flow still works when the bot variables are unset
  - Do not commit and do not push
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Vitest is added with an exact pinned version (`npm install -D -E`). No other test library is added.
- The 3 junk rows left by the earlier diagnosis run are deleted by the owner manually. No task touches the real database or Telegram.
- Owner decisions D1 to D12 (CTA label vs charged price, with defaults) are in design.md Appendix B.

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1"] },
    { "id": 1, "tasks": ["2"] },
    { "id": 2, "tasks": ["3.1"] },
    { "id": 3, "tasks": ["3.2"] },
    { "id": 4, "tasks": ["3.3", "3.4"] },
    { "id": 5, "tasks": ["3.5"] },
    { "id": 6, "tasks": ["3.6", "3.7"] },
    { "id": 7, "tasks": ["4"] }
  ]
}
```
