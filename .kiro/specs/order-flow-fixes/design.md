# Order Flow Fixes Bugfix Design

## Overview

Seven related defects in the ShubhMarg order flow ([B1] to [B7] in bugfix.md) make customers fail to order, see one price and pay another, hit a dead end after the ₹99 Quick Answer, or lose their "payment pending" state. The owner also gets no alert for new orders or "I've paid" claims.

The fix strategy is small and targeted:

- Pull the logic that is currently inline and untestable into pure helpers: `src/lib/phone.ts` (phone normalization and validation), `src/lib/service-catalog.ts` (id resolution, display metadata, price resolution and CTA price formatting, all built on `SERVICE_PRICING`), and `src/lib/telegram-messages.ts` (alert text builders and the "should we alert" decision).
- Make `src/lib/pricing.ts` the only source of prices. The form, the success screen and every CTA read from it. `pricing.ts` values do not change.
- Add best-effort owner alerts through two new senders in `src/lib/telegram.ts`, scheduled with `after()` from `next/server` so they never block the customer.
- Persist the payment claim in the database before showing "verification pending".
- Add Vitest for pure logic only. No test touches Supabase or Telegram.

No database schema change. No change to `src/lib/paise-allocation.ts` or `src/config/paytm-links.ts`.

Next.js note (AGENTS.md): `after` is documented in `node_modules/next/dist/docs/01-app/03-api-reference/04-functions/after.md`. It is imported from `next/server` and works in Server Functions and Route Handlers on this version (16.3.0). No other new Next.js API is used.

## Glossary

- **Bug_Condition (C)**: The input state that triggers any of B1 to B7 (see Bug Details).
- **Property (P)**: The correct behavior for inputs where C holds (see Correctness Properties).
- **Preservation**: Behavior for inputs where C does not hold, which must stay identical to the unfixed code.
- **F / F'**: The unfixed code / the fixed code.
- **SERVICE_PRICING**: The price map in `src/lib/pricing.ts`. Single source of truth.
- **Catalog id**: A key of `SERVICE_PRICING`.
- **Alias (same price)**: `puja, express, voice, varshphal, gemstone, business`. They map to a long id with the identical price, so remapping is safe.
- **Legacy id**: An id with no price entry. Only `karmic-debt` exists today.
- **Normalized phone**: Exactly 10 digits, first digit 6 to 9.
- **Paise fingerprint**: The unique decimal amount from `allocateUniquePaiseAmount`, used to auto-match payments.
- **Claim**: The customer saying "I've paid", by tapping Pay Securely, "I Have Completed the Payment", or submitting a UTR.
- **CTA**: A button, link or sticky bar that sends the user to `/request-guidance?service=<id>`.
- **Label price**: The price text shown to the user on a CTA.

## Bug Details

### Bug Condition

Each bug has its own condition. The overall condition is the union.

**Formal Specification:**
```
FUNCTION isBugCondition(X)
  INPUT: X of type OrderFlowInput
  OUTPUT: boolean

  // B1: phone typed in a common format, or garbage that passes the length-only check
  b1 ← X.kind = "form-submit"
        AND ( normalizePhone(X.phoneRaw) ≠ trim(X.phoneRaw)       // format needs cleaning
              OR NOT isValidIndianMobile(normalizePhone(X.phoneRaw)) )  // garbage, length ≥ 10

  // B2: question 1..9 chars after trim
  b2 ← X.kind = "form-submit" AND 1 ≤ length(trim(X.question)) ≤ 9

  // B3: service known to pricing but missing from the form list, or any success screen
  b3 ← (X.kind = "open-form" AND X.serviceParam ∈ keys(SERVICE_PRICING)
          AND X.serviceParam ∉ FORM_LOCAL_LIST)
       OR (X.kind = "submit-success" AND X.shownAmount ≠ X.serverAmount)

  // B4: CTA label vs charged price, alias remap, legacy id
  b4 ← (X.kind = "cta" AND X.serviceId ∈ keys(SERVICE_PRICING)
          AND X.labelPrice ≠ SERVICE_PRICING[X.serviceId])
       OR (X.kind = "open-form" AND ALIAS_MAP[X.serviceParam] exists
           AND SERVICE_PRICING[ALIAS_MAP[X.serviceParam]] ≠ SERVICE_PRICING[X.serviceParam])
       OR (X.kind = "cta" AND X.serviceId ∉ keys(SERVICE_PRICING) AND X.serviceId ∉ ALLOW_LIST)

  // B5: Quick Answer
  b5 ← X.kind = "quick-answer-submit"

  // B6: owner not told
  b6 ← X.kind ∈ {"order-created", "claim", "utr-submitted"}

  // B7: Pay Securely tapped while DB status is "unpaid"
  b7 ← X.kind = "pay-securely-opened" AND X.dbStatus = "unpaid"

  RETURN b1 OR b2 OR b3 OR b4 OR b5 OR b6 OR b7
END FUNCTION
```

### Examples

- B1: "+91 98765 43210" becomes email `+91 98765 43210@phone.shubhmarg.com`, the server says "A valid email address is required." Expected: saved as `9876543210@phone.shubhmarg.com`.
- B1: "12345678901234" passes the client check. Expected: "Please enter a valid 10-digit Indian mobile number."
- B2: question "help me" (7 chars) goes to the server, which replies "minimum 10 characters". Expected: blocked on the client, focus on the question field, live counter.
- B3: `/request-guidance?service=baby-name` shows "Prashna ₹501" but submits `baby-name`; payment page charges ₹999. Expected: name "Baby Name" and ₹999 on the form.
- B3: success screen for `kundli` shows ₹1101 while the payment page shows ₹1101.07 (paise fingerprint). Expected: success screen shows the server amount.
- B4: `deep-kundli` is swapped to `kundli`, charged ₹1101; pricing.ts says ₹1500. Expected: ₹1500 for `deep-kundli`.
- B4: Spouse Report button says ₹999, payment page charges ₹1500 (deep-kundli). Expected: label reads ₹1,500 (default).
- B4: Kundli X-Ray 8th house links `karmic-debt`, submit fails with "Invalid service selected." Expected: resolves to `temple-puja` and succeeds.
- B5: Quick Answer success screen has no pay button and says "Payment link sent to your WhatsApp". Expected: "Pay ₹99.xx" button to `/payment/<ref>`.
- B6: new order created, owner's Telegram stays silent. Expected: one alert.
- B7: Pay Securely tapped, the screen flips to pending, 5 seconds later flips back to pay. Expected: stays pending, also after reload.
- Edge (not a bug): phone "9876543210" with a valid question and known service behaves exactly as before.

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- Unique-paise allocation in `src/lib/paise-allocation.ts` is untouched, and still called with the catalog price.
- Wallet pay (`walletSpend`) still marks the request paid.
- Paytm secure checkout, QR, copy-UPI-ID, UPI app launchers and every value in `src/config/paytm-links.ts` are untouched.
- `src/proxy.ts` rate limits are untouched, including `/api/quick-answer`.
- `/free-reading` and its API are untouched.
- Payment statuses stay `unpaid | payment_verification | paid | payment_failed`. Nothing in this spec marks anything paid.
- Saved row shape is unchanged: `concern` is always a string (form sends `""`), email is `<10 digits>@phone.shubhmarg.com` (`@quick.shubhmarg.com` for Quick Answer), no schema change.
- The 12 services already correct in the form keep the same name, price, delivery and description.
- `sendTopupAlert`, `sendQuickUnlockAlert` and the Approve/Reject webhook are untouched.
- `submitPaymentUtr` and `submitPaymentConfirmation` keep their validation (UTR length 8 to 20, duplicate UTR rejected, already-paid rejected).
- Temple design system and mobile performance rules still apply (no new blur, no new infinite animation).

**Scope:**
All inputs where `isBugCondition` is false are unaffected: valid 10-digit phone plus valid question plus catalog service, wallet pay, Paytm link behavior, top-up alerts, free reading.

## Hypothesized Root Cause

1. **Raw string used as identifier [B1, B2, B5]**: `handleSubmit` concatenates `form.phone.trim()` straight into an email. Client checks are `length < 10` and non-empty only. The server validates an email regex, not a phone.
2. **Two price sources [B3, B4]**: The form keeps its own 12-item `SERVICES` list and `ALIAS_MAP`, the server allow-list is a third list, and CTAs hard-code numbers. `selectedService` falls back to `SERVICES[0]`, and the success screen uses `selectedService.price` instead of the server's amount.
3. **Alias map confuses id and price [B4]**: `deep-kundli, yantra-kavach, vastu, jyotish` were added to `pricing.ts` with their own prices, but `ALIAS_MAP` still remaps them to other ids.
4. **Legacy id [B4]**: `KundliDiamondXRay` uses `karmic-debt`, which was never added to pricing or to the allow-list.
5. **API response too thin [B5]**: `/api/quick-answer` has `referenceId` and `paymentAmount` in scope but returns `{success:true}`; the form has no state to hold them. The WhatsApp sentence is stale copy.
6. **No alert code [B6]**: `telegram.ts` has only top-up and quick-unlock senders; nothing is called on order creation or claims.
7. **Optimistic local state [B7]**: `PayNowButton.onOpened` calls `setRequest({... payment_status: "payment_verification"})` without a database write. The poll, which runs while status is `unpaid` or `payment_verification`, reads the DB (`unpaid`) and overwrites it.

## Correctness Properties

Property 1: Bug Condition - Order flow shows true prices, accepts real phones, persists claims and alerts the owner

_For any_ input where the bug condition holds (isBugCondition returns true), the fixed code SHALL: normalize every common phone format to 10 digits and reject non-mobile values with the single message "Please enter a valid 10-digit Indian mobile number." on both client and server (B1); block a question shorter than 10 trimmed characters on the client with the server's message (B2); show the pricing.ts name and price for every catalog id and the server's amount on the success screen (B3); charge the pricing.ts price of the exact id, never remap an id to a different price, show CTA label prices equal to `SERVICE_PRICING[serviceId]`, and resolve `karmic-debt` to `temple-puja` (B4); return `{success:true, referenceId, amount}` from Quick Answer and show a Pay button with no WhatsApp claim (B5); build a best-effort owner alert for new orders and claims that never throws, blocks, or prints secrets (B6); and write `payment_verification` to the database before showing "verification pending" (B7).

**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10, 2.11, 2.12, 2.13, 2.14**

Property 2: Preservation - Everything outside the bug condition behaves as before

_For any_ input where the bug condition does NOT hold (isBugCondition returns false), the fixed code SHALL produce the same result as the original code, preserving the unique-paise amount, the saved row shape (string `concern`, `<10 digits>@phone.shubhmarg.com` email), name/price/delivery/description of the 12 existing form services, the values in `SERVICE_PRICING`, wallet pay, Paytm links, rate limits, free reading, top-up and quick-unlock alerts, payment statuses, and the UTR/confirmation validation rules.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 3.11**

## Fix Implementation

### Changes Required

Assuming the root cause analysis is correct:

**New file `src/lib/phone.ts`** (pure, no `server-only`, safe on client and server)
- `normalizePhone(raw: string): string` strips all non-digits; if 12 digits starting `91` drops `91`; if 11 digits starting `0` drops `0`; returns the digits (may still be invalid).
- `isValidIndianMobile(p: string): boolean` is `/^[6-9]\d{9}$/`.
- `PHONE_ERROR = "Please enter a valid 10-digit Indian mobile number."`
- `buildPhoneEmail(phone10, domain: "phone" | "quick")` returns `<phone10>@phone.shubhmarg.com` or `@quick.shubhmarg.com`.

**New file `src/lib/service-catalog.ts`** (pure)
- `LEGACY_SERVICE_IDS = { "karmic-debt": "temple-puja" }` and `resolveServiceId(raw)` returning the id itself if in `SERVICE_PRICING`, the legacy target if legacy, otherwise `null`. Falls back to `vedic-guidance` only for a missing or unknown param, never silently for a known id.
- `SAME_PRICE_ALIASES = { puja: "temple-puja", express: "tatkal-express", voice: "voice-dossier", varshphal: "annual-varshphal", gemstone: "energized-gemstone", business: "business-retainer" }`. These are the only remaps allowed. A unit test asserts each alias has the same price as its target.
- `SERVICE_META: Record<string, {name, delivery, category, desc}>` for every orderable id. The 12 existing entries are copied verbatim from the form (preservation). New entries for `baby-name, emergency, jaap, compatibility, quick-answer, deep-kundli, yantra-kavach, vastu, jyotish, prashna, muhurta`. Their names are derived from tool-page wording, delivery and description are short neutral text. Listed as owner decision D9 for review. `free-reading` is not shown in the form list.
- `getServiceView(id)` returns `{id, name, price: getServicePrice(id), delivery, desc, category}` and always uses `getServicePrice`, so the form and server share one function.
- `formatInr(n)` returns `₹1,500` and `ctaPriceLabel(serviceId)` returns `formatInr(getServicePrice(resolveServiceId(serviceId) ?? serviceId))`. `ctaPriceLabel` is the only way CTAs print a price.

**File `src/lib/pricing.ts`**: values unchanged. `getServicePrice` keeps its current behavior, including the 501 fallback (and 0 falling to 501 for `free-reading`).

**File `src/components/guidance/GuidanceRequestForm.tsx`**
- Delete the local `SERVICES` price list and `ALIAS_MAP`. Build the list from `SERVICE_META` plus `getServicePrice`. Initial service is `SAME_PRICE_ALIASES[raw] ?? resolveServiceId(raw) ?? "vedic-guidance"`.
- `selectedService` looks up the real id. No fallback to the first entry for a known id.
- Phone: `normalizePhone` then `isValidIndianMobile`, else `PHONE_ERROR` and focus `#phone`. Send `phone` (10 digits) to the server instead of building the email on the client.
- Question: block if `question.trim().length < 10` with the server's message, focus `#question`, show a live "n/10" hint. `concern: ""` stays.
- Success screen: `setSuccess({ referenceId, amount: result.amount })` where `amount` is returned by the server, and render it with the same decimal formatting the payment page uses (`formatAmount`).

**File `src/app/request-guidance/actions.ts`**
- Replace the `SERVICES` allow-list with `resolveServiceId(formData.service)` (the set equals `keys(SERVICE_PRICING)` today, so no accepted id is lost, and `karmic-debt` is added via the legacy map). Store the resolved id.
- Add `phone?: string` to `GuidanceFormData`. Server computes `normalizePhone(phone)`, rejects with `PHONE_ERROR` if invalid, and builds the email itself with `buildPhoneEmail`. The old email regex branch is removed for this form.
- Keep question min 10, max 2000, DOB, time and place validation, paise allocation and the row shape.
- Return `{ success: true, referenceId, amount: paymentAmount }`.
- After insert: `after(() => sendOrderAlert({...}).catch(() => {}))`.

**File `src/lib/telegram-messages.ts`** (new, pure)
- `escapeMarkdown(s)`, `buildOrderAlertText({referenceId, service, amount, name})`, `buildClaimAlertText({referenceId, service, amount, name, utr?})`, and `shouldSendClaimAlert(prevStatus, hasUtr)` (alert on first move to `payment_verification`, and always when a UTR is supplied). Phone numbers are not included (D8).

**File `src/lib/telegram.ts`**: add `sendOrderAlert` and `sendPaymentClaimAlert`. Both return early when `telegramConfigured()` is false, wrap `fetch` in try/catch, and never log token or chat id. Existing functions unchanged.

**File `src/app/api/quick-answer/route.ts`**
- Normalize and validate the phone with `phone.ts` (400 with `PHONE_ERROR`), email `buildPhoneEmail(p, "quick")`. Return `{ success: true, referenceId, amount: paymentAmount }`. Alert through `after()`. Everything else (service `quick-answer`, 99 base, row fields) is unchanged. `src/proxy.ts` is not edited.

**File `src/components/guidance/QuickAnswerForm.tsx`**
- Client validation with the same helpers, success state holds `{referenceId, amount}`, shows the reference ID and a primary "Pay ₹<amount>" link to `/payment/<referenceId>`. New copy: "Your answer is delivered after payment is confirmed." The WhatsApp claim is removed.

**File `src/app/payment/[reference_id]/actions.ts`**
- Extend the existing selects with `service, payment_amount, full_name`, compute `shouldSendClaimAlert`, and schedule `sendPaymentClaimAlert` via `after()` after a successful update. Validation order and results are unchanged.

**File `src/app/payment/[reference_id]/page.tsx`**
- `PayNowButton.onOpened` calls `submitPaymentConfirmation(reference_id)` and only on success sets local status to `payment_verification`. On failure it keeps the pay screen and shows `confirmError`. The tracking `fbq` call stays.
- Add local `showOptions` state. The verification screen gets a "Back to payment options" button that sets it to true; the unpaid/failed block renders when status is unpaid/failed or (verification and `showOptions`). The database status is not changed by this button. The poll logic is unchanged.

**CTA price fixes (list in Appendix A)**
- `SanctifiedVerdictStickyBar`, `SealedGotraDestinyEnvelope`, `TwoTimelinesVisualizer`, `AstrologicalGapDiagnosis`, `DestinyCrisisRadar`: print `ctaPriceLabel(serviceId)`, and the `price` prop is removed from these components and their call sites (if the prop also feeds a `DirectWhatsAppButton`, see D7).
- Inline Link labels with a hard-coded price are replaced by `ctaPriceLabel(...)`. `KundliDiamondXRay` uses `ctaPriceLabel(selectedHouse.serviceId)` and drops per-house `price`.
- `ServicesContent` and `PricingGrid` card prices come from `getServicePrice(serviceParam)`.
- No new prices are invented. Labels move to catalog prices by default (D1 to D6).

**Test tooling**
- Add `vitest` as a devDependency with an exact pin (`npm install -D -E vitest@<exact>`; `npm view vitest version` returned 5.0.5 while researching; the task records the installed exact version). Add `"test": "vitest run"` and a `vitest.config.ts` with the `@` alias and `environment: "node"`. No jsdom, no React rendering.

## Testing Strategy

### Validation Approach

First surface counterexamples on the unfixed code, then verify the fix and preservation. Everything tests pure logic. **No test inserts into Supabase or sends a Telegram message.** Tests never import `supabaseServer`, `telegram.ts` senders or server actions. Network is not mocked in; the senders are simply not imported. A repo-scan test reads source files with `node:fs` only.

Because helpers do not exist on unfixed code, exploration tests are written against the helper interfaces plus a small `legacy` snapshot that copies today's inline logic (client `length < 10` check, ALIAS_MAP, form SERVICES prices, `getServicePrice`). Exploration tests assert the expected behavior of the new interfaces and the repo-scan; on unfixed code they fail because the modules or conditions do not exist or the scan finds violations.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples before the fix and confirm the root causes.

**Test Plan**: Property-based tests (fast-check is not added; Vitest tests loop over generated inputs with a small seeded generator to avoid a second dependency) and example tests.

**Test Cases**:
1. **Phone formats**: for generated valid mobiles `d` rendered as `"+91 d"`, `"91d"`, `"0d"`, `"98765 43210"`, dashes and brackets, `normalizePhone` must return `d` (fails on unfixed: the raw string is used).
2. **Garbage phones**: `"12345678901234"`, `"abcdefghij"`, `"5123456789"` must be invalid (fails on unfixed: `length ≥ 10` accepts them).
3. **Short question**: lengths 1 to 9 after trim must be rejected by the shared validator; 10 or more accepted.
4. **Price resolution**: for every key `k` in `SERVICE_PRICING`, `getServiceView(k).price === SERVICE_PRICING[k]` and the name is not the `vedic-guidance` name unless `k` is `vedic-guidance` (fails on unfixed: fallback to the first entry).
5. **Alias safety**: for every alias mapping, price(source) equals price(target); `deep-kundli, yantra-kavach, vastu, jyotish` resolve to themselves.
6. **Legacy id**: `resolveServiceId("karmic-debt") === "temple-puja"`; unknown id returns `null`.
7. **CTA consistency scan**: scan `src/**/*.tsx` for `request-guidance?service=<id>` and `serviceId="<id>"` and assert every id resolves; assert no `price={<number>}` literal in the same JSX element as a `serviceId=` prop; assert no `(₹<digits>)` literal inside a Link to `request-guidance` (fails on unfixed with the Appendix A list as the counterexamples).
8. **Alert payload**: `buildOrderAlertText` and `buildClaimAlertText` contain reference, service, amount, name (and UTR when given), escape Markdown characters in names like `A_B*C`, and never contain the strings `TELEGRAM_BOT_TOKEN` or a chat id. `shouldSendClaimAlert("unpaid", false) === true`, `("payment_verification", false) === false`, `("payment_verification", true) === true`, `("paid", *) === false`.
9. **Quick Answer response shape**: a pure `buildQuickAnswerResponse(referenceId, amount)` (in `service-catalog.ts` or a tiny `quick-answer.ts`) returns `{success:true, referenceId, amount}`.

**Expected Counterexamples**:
- `"+91 98765 43210"` is not reduced to 10 digits; 14-digit garbage accepted.
- `baby-name` renders as the first form entry; `deep-kundli` remapped to a ₹1101 service.
- Appendix A rows with MISMATCH are reported by the scan.
- Possible causes match the Hypothesized Root Cause section.

### Fix Checking

**Goal**: For all inputs where the bug condition holds, the fixed code gives the expected behavior.

**Pseudocode:**
```
FOR ALL X WHERE isBugCondition(X) DO
  result := fixedFlow(X)
  ASSERT expectedBehavior(result)
END FOR
```

`expectedBehavior` for each bug:
```
FUNCTION expectedBehavior(result)
  // B1/B2: valid → phone10 and email phone10@phone.shubhmarg.com; invalid → PHONE_ERROR / min-10 message
  // B3: shownPrice = getServicePrice(id) and shownAmount = serverAmount
  // B4: labelPrice(serviceId) = SERVICE_PRICING[resolveServiceId(serviceId)] and resolve(serviceId) ≠ null
  // B5: response has referenceId and amount
  // B6: alert text built and sender returns false, not throws, when unconfigured
  // B7: DB status persisted before local status changes (verified manually, see Integration Tests)
END FUNCTION
```

### Preservation Checking

**Goal**: For all inputs where the bug condition does NOT hold, the fixed code matches the original.

**Pseudocode:**
```
FOR ALL X WHERE NOT isBugCondition(X) DO
  ASSERT original(X) = fixed(X)
END FOR
```

**Testing Approach**: Property-style tests are recommended because they sweep many inputs. Observe the unfixed behavior first, record it as literal expected values, then assert the new helpers produce the same.

**Test Cases**:
1. **Valid phones unchanged**: any plain 10-digit starting 6 to 9 normalizes to itself; email equals `<digits>@phone.shubhmarg.com` and `@quick.shubhmarg.com`.
2. **Price table frozen**: a snapshot test of `SERVICE_PRICING` (every key and value) and of `getServicePrice` for known ids, unknown id (501) and `free-reading` (501).
3. **12 existing services**: `getServiceView(id)` for the 12 ids returns the same name, price, delivery, desc as the current form list (literal expectations copied from the unfixed file).
4. **Same-price aliases**: `puja, express, voice, varshphal, gemstone, business` resolve to the same ids as the old `ALIAS_MAP` for those keys.
5. **Allow-list parity**: the set of ids accepted by `resolveServiceId` is a superset of the old server `SERVICES` array (plus `karmic-debt`).
6. **Untouched files**: a scan test asserts `src/lib/paise-allocation.ts`, `src/config/paytm-links.ts` and `src/proxy.ts` still contain their key markers (`allocateUniquePaiseAmount`, the existing link keys, `"/api/quick-answer"`). Tight hash checks are avoided because the owner may legitimately edit these files later.
7. **Existing alert builders**: `sendTopupAlert` and `sendQuickUnlockAlert` are not imported by tests; a scan asserts their `export` lines are still present.

### Unit Tests

- `phone.test.ts`: normalization table, validity table, email builder.
- `service-catalog.test.ts`: resolve, aliases, legacy, view, `formatInr`, `ctaPriceLabel`.
- `telegram-messages.test.ts`: payload content, Markdown escaping, secrets absent, `shouldSendClaimAlert`.
- `question-validation` cases inside `phone.test.ts` or a small `form-validation.ts` helper (`validateQuestion`, same message as server).

### Property-Based Tests

- Seeded generators (no new dependency) produce 200 random valid mobiles in 12 formats each and assert 10-digit output equals the source digits.
- Random strings of digits and letters: output of `normalizePhone` contains only digits, and `isValidIndianMobile` agrees with the regex.
- For every catalog id, `ctaPriceLabel(id)` equals `formatInr(SERVICE_PRICING[id])` (or 501 fallback rule) and parses back to the same number.

### Integration Tests

Integration against Supabase or Telegram is out of scope and forbidden for automated tests. Instead, a manual checklist is recorded for the owner after `npm run build` passes (the owner or a human tester runs it with their own test order; the previous diagnosis run left 3 junk rows that the owner deletes manually):
- Order with "+91 98765 43210": row saved with 10-digit identifier; success amount equals the payment page amount.
- Quick Answer shows the Pay button and opens `/payment/<ref>`.
- Pay Securely persists the claim: reload keeps "verification pending"; the 5-second poll does not flip it back.
- Telegram alert arrives for a new order and for a claim, and the flow still works with the bot variables unset.

## Appendix A: CTA Price Audit

Catalog prices (`SERVICE_PRICING`): vedic-guidance 501, career-business 501, marriage 1501, kundli 1101, muhurat 251, remedy 1101, jaap 2101, quick-answer 99, emergency 499, baby-name 999, compatibility 1501, temple-puja 2100, tatkal-express 2499, voice-dossier 1999, annual-varshphal 2999, energized-gemstone 5500, business-retainer 11000, deep-kundli 1500, yantra-kavach 1100, vastu 1101, jyotish 501, prashna 501, muhurta 251.

The audit was built from a source search of `request-guidance?service=`, `serviceId=`, `recommendedServiceId=` and nearby `price` values. Status OK means label equals charged price. Rows marked "verify" had a price that is passed in as a variable or text I could not fully read; the CTA scan test (Testing Strategy, case 7) re-checks them mechanically.

### A1. Mismatches (label differs from charged price)

| ID | File | Label price | Service id | Charged price | Proposed default |
|----|------|-------------|------------|---------------|------------------|
| D1a | components/astrology/SpousePredictor.tsx (link and sticky bar) | ₹999 | deep-kundli | ₹1,500 | Label to ₹1,500 |
| D1b | components/astrology/NewbornCosmicBlueprint.tsx (link and sticky bar) | ₹3,500 | deep-kundli | ₹1,500 | Label to ₹1,500 |
| D1c | components/shared/UniversalMuhurtaFinder.tsx (sticky bar) | ₹999 | deep-kundli | ₹1,500 | Label to ₹1,500 (see D10 for muhurat alternative) |
| D1d | components/shared/VedicWealthCalendar.tsx (sticky bar) | ₹1,999 | deep-kundli | ₹1,500 | Label to ₹1,500 |
| D1e | components/astrology/RajaYogaMahapurushaScanner.tsx (sticky bar) | ₹1,501 | deep-kundli | ₹1,500 | Label to ₹1,500 |
| D2a | components/astrology/KaalSarpDoshaScanner.tsx (link and sticky bar) | ₹5,100 | temple-puja | ₹2,100 | Label to ₹2,100 |
| D2b | components/shared/KarmicRinResolver.tsx (link and sticky bar, 4 variants 1501 / 2100 / 1101 / 1100) | variable | temple-puja | ₹2,100 | Label to ₹2,100 for all four |
| D3a | components/astrology/NakshatraYoniTotemWheel.tsx (link ₹1,101 and sticky bar) | ₹1,101 | marriage | ₹1,501 | Label to ₹1,501 |
| D3b | components/shared/EmergencyGrahaShantiSOS.tsx (sticky bar) | ₹2,100 | emergency | ₹499 | Label to ₹499 |
| D3c | components/shared/GarbhSanskarSanctum.tsx (sticky bar) | ₹2,999 | voice-dossier | ₹1,999 | Label to ₹1,999 |
| D4a | components/astrology/ShaniSadeSatiDiagnostic.tsx (sticky bar) | ₹3,500 | energized-gemstone | ₹5,500 | Label to ₹5,500 |
| D4b | components/sanctum/InteractiveYantraAltar.tsx (sticky bar) | ₹1,100 | energized-gemstone | ₹5,500 | Label to ₹5,500 |
| D4c | components/sanctum/Interactive16ZoneVastuRadar.tsx (sticky bar) | ₹3,100 | vastu | ₹1,101 | Label to ₹1,101 |
| D5 | components/astrology/KundliDiamondXRay.tsx, house with `annual-varshphal` | ₹3,100 | annual-varshphal | ₹2,999 | Label to ₹2,999 |
| D6a | components/home/PricingGrid.tsx (Muhurta card) | ₹701 | muhurat | ₹251 | Label to ₹251 |
| D6b | components/services/ServicesContent.tsx (Kundli card) | ₹1,100 | kundli | ₹1,101 | Label to ₹1,101 |
| D6c | components/services/ServicesContent.tsx (Muhurta card) | ₹701 | muhurat | ₹251 | Label to ₹251 |
| D6d | components/services/ServicesContent.tsx (Business card) | ₹2,100 | business (= business-retainer) | ₹11,000 | Label to ₹11,000 |

### A2. Invalid id

| File | Service id | Problem | Proposed default |
|------|-----------|---------|------------------|
| components/astrology/KundliDiamondXRay.tsx (8th house) | karmic-debt (label ₹2,100) | Not in pricing.ts nor in the server allow-list, submit fails | Map to temple-puja (₹2,100, label already equal) |

### A3. Already consistent (no change except moving the price to `ctaPriceLabel`)

| File | Service id | Price |
|------|-----------|-------|
| app/baby-name/page.tsx | baby-name | ₹999 (PricingGrid card also ₹999) |
| app/chakra-scanner/page.tsx (link, envelope, sticky bar) | temple-puja, voice-dossier | ₹2,100 / ₹1,999 |
| app/decision-clock/page.tsx | tatkal-express | ₹2,499 |
| app/disha-shoola/page.tsx | muhurat | ₹251 (verify label) |
| app/emergency/page.tsx | vedic-guidance | ₹501 (verify label) |
| app/kuldevta-resolver/page.tsx | temple-puja | ₹2,100 |
| app/karmic-debt/page.tsx | temple-puja | ₹2,100 |
| app/dream-decoder/page.tsx | vedic-guidance | ₹501 |
| app/palm-scanner/page.tsx | kundli | ₹1,101 |
| app/prashna-kundli/page.tsx | tatkal-express | ₹2,499 |
| app/compatibility/page.tsx | marriage | ₹1,501 |
| app/transit-wheel/page.tsx | jyotish, muhurta, prashna | ₹501 / ₹251 / ₹501 (verify labels) |
| app/vastu-scanner/page.tsx | vastu | ₹1,101 (verify label) |
| app/gemstone-calculator/page.tsx and GemstonePranaPratishthaRitual.tsx | energized-gemstone | "₹5,500+" (the plus is intentional) |
| app/sacred-offerings/page.tsx | puja, express, voice, varshphal, gemstone, business | ₹2,499, ₹1,999, ₹2,999, ₹5,500+, ₹11,000 (puja label verify) |
| components/astrology/ManglikRescueScanner.tsx | deep-kundli | ₹1,500 |
| components/astrology/PastLifeReader.tsx | deep-kundli | ₹1,500 |
| components/astrology/NavamshaD9SoulmateBlueprint.tsx | marriage | ₹1,501 |
| components/astrology/NineDashaTimeline.tsx | annual-varshphal | verify label |
| components/shared/PersonalRakshaKavach.tsx | yantra-kavach | ₹1,100 |
| components/shared/PitruTarpanVault.tsx | temple-puja | ₹2,100 |
| components/shared/FamilyMarriageMilanCard.tsx | marriage | verify label |
| components/audio/VedicSoundSanctuary.tsx | voice-dossier | verify label |
| components/home/PricingGrid.tsx | vedic-guidance, kundli, baby-name, compatibility, quick-answer | ₹501 / ₹1,101 / ₹999 / ₹1,501 / ₹99 |
| components/home/ChooseByConcern.tsx, MobileMenu.tsx, RashiCalculator.tsx, FreeReadingForm.tsx | vedic-guidance, muhurat, kundli | no price shown |
| data/services.ts | temple-puja, tatkal-express, voice-dossier, annual-varshphal, energized-gemstone | verify labels against catalog |
| KundliDiamondXRay.tsx (other 10 houses) | kundli, vedic-guidance (x2), temple-puja, tatkal-express (x2), marriage, energized-gemstone, business-retainer, voice-dossier | ₹1,101 / ₹501 / ₹2,100 / ₹2,499 / ₹1,501 / ₹5,500 / ₹11,000 / ₹1,999 (all equal catalog) |
| components/shared/JapaMalaDedicationModal.tsx, components/sanctum/VirtualDeepdaanSanctum.tsx, components/shared/GarbhSanskarSanctum.tsx link, EmergencyGrahaShantiSOS.tsx links, AstrologicalGapDiagnosis callers | temple-puja, voice-dossier, emergency | verify labels |

### A4. Separate channel: WhatsApp buttons (not changed)

`DirectWhatsAppButton` shows its own price for a WhatsApp booking, not the payment page charge: Kaal Sarp ₹5,100, Newborn ₹2,100, Spouse ₹2,100, Past-Life ₹1,500, Silver Kavach ₹2,500, Manglik ₹1,500, Wealth Calendar ₹5,100, Shani ₹1,501, Raja Yoga ₹1,501, Garbh Sanskar ₹1,500, plus the sacred-offerings cards. These are outside this spec (see D7).

## Appendix B: Owner Decisions

| ID | Decision | Proposed default |
|----|----------|------------------|
| D1 | `deep-kundli` buttons show ₹999, ₹3,500, ₹999, ₹1,999 and ₹1,501 but charge ₹1,500 (Spouse, Newborn, Muhurta Finder, Wealth Calendar, Raja Yoga) | Change every label to ₹1,500 |
| D2 | Kaal Sarp ₹5,100 and Karmic Rin ₹1,501 / 1,101 / 1,100 link to `temple-puja`, which charges ₹2,100 | Change labels to ₹2,100 |
| D3 | Nakshatra Yoni ₹1,101 vs marriage ₹1,501; Emergency SOS ₹2,100 vs ₹499; Garbh Sanskar ₹2,999 vs ₹1,999 | Change labels to catalog prices |
| D4 | Shani ₹3,500 and Yantra Altar ₹1,100 vs gemstone ₹5,500; Vastu Radar ₹3,100 vs ₹1,101 | Change labels to catalog prices |
| D5 | Kundli X-Ray varshphal house ₹3,100 vs ₹2,999 | Change label to ₹2,999 |
| D6 | PricingGrid and Services page cards: muhurat ₹701 vs ₹251, kundli ₹1,100 vs ₹1,101, business ₹2,100 vs ₹11,000 | Change labels to catalog prices |
| D7 | WhatsApp booking prices differ from catalog prices (A4) | Leave unchanged (not a payment-page price) |
| D8 | Telegram alerts contain reference, service, amount, name (and UTR), no phone number | Keep phone out of alerts. Owner can see it in Supabase |
| D9 | Names, delivery and short descriptions for new form entries (baby-name, emergency, jaap, compatibility, quick-answer, deep-kundli, yantra-kavach, vastu, jyotish, prashna, muhurta) | Use tool-page wording, owner can edit `SERVICE_META` |
| D10 | Muhurta Finder CTA currently links to `deep-kundli`; a `muhurat` (₹251) link might be the intended product | Keep `deep-kundli` (no link change), only the label changes |
| D11 | `karmic-debt` resolves to `temple-puja` | Yes, ₹2,100 equals the displayed label |
| D12 | If the owner would rather keep a higher label (for example ₹5,100 for Kaal Sarp), the catalog price must be raised instead | Not done, no new prices are invented |
