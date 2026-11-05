# Implementation Plan

Feature: "How Was Your Day?" Emotional Funnel

Build order is safe and incremental: data + config first, then backend (free -> claim -> status -> confirm), then the UI card, then wiring + verification. Every step reuses existing infrastructure (Gemini, Telegram Approve/Reject, UPI modal, Supabase) confirmed by the code sweep.

## Overview

An emotional homepage funnel: feeling -> free comfort (Gemini) -> Rs 99 remedy+mantra, gated by owner Telegram confirmation, with every feeling+response logged for visibility. Reuses existing Gemini, Telegram Approve/Reject, UPI modal, and Supabase.

## Task Dependency Graph

```
1 (config + table)
2 (content map)  depends on 1
3 (free API)     depends on 1,2
4 (claim + TG)   depends on 1,3
5 (confirm + status) depends on 1,4
6 (UI card)      depends on 3
7 (UPI modal)    depends on 4,6
8 (homepage wire) depends on 6,7
9 (translations) depends on 6
10 (verify)      depends on all
```

## Tasks

- [ ] 1. Foundations: price constant + Supabase table
  - [ ] 1.1 Create `src/config/pricing.ts` exporting `DAY_MOOD_PRICE = 99` (single source of price, Req 3.6)
  - [ ] 1.2 Write SQL migration `database/migrations/day_moods.sql` for the `day_moods` table (reference_id, feeling, lang, free_text, paid_text, amount, status default 'free', created_at, confirmed_at) and note it must be run in Supabase
  - _Requirements: 3.6, 5.1, 5.4_

- [ ] 2. Feeling -> response content map (honest, real)
  - [ ] 2.1 Create `src/lib/day-mood.ts` with the 5 feelings (good, tired, sad, anxious, mind), each mapped to a Gemini prompt for a warm comfort line + one tiny real remedy/mantra; include an honest non-blank fallback per feeling (pattern from generateBlessing)
  - _Requirements: 2.1, 2.3, 2.4, 4.1_

- [ ] 3. Backend: free micro-answer API
  - [ ] 3.1 Create `POST /api/day-mood/route.ts`: accept { feeling, lang }, generate free comfort+remedy via Gemini, insert `day_moods` row (status 'free'), return { reference, freeText, freeRemedy }; best-effort logging (never blocks)
  - _Requirements: 2.1, 2.2, 5.1_

- [ ] 4. Backend: claim + Telegram confirm alert
  - [ ] 4.1 Add `sendMoodConfirmAlert()` to `src/lib/telegram.ts` (mirror sendTopupAlert; inline Approve/Reject buttons with callback_data `moodapprove:<ref>` / `moodreject:<ref>`)
  - [ ] 4.2 Create `POST /api/day-mood/claim/route.ts`: set row status 'claimed', call sendMoodConfirmAlert with feeling+amount+ref, return { pending: true }
  - _Requirements: 3.2, 3.3, 5.2_

- [ ] 5. Backend: confirm handler (the gate) + status poll
  - [ ] 5.1 Extend `src/app/api/telegram-webhook/route.ts` to handle `moodapprove:<ref>` (generate paid remedy+mantra via Gemini, set status 'confirmed', store paid_text, confirmed_at) and `moodreject:<ref>` (status 'rejected'); idempotent (ignore if not 'claimed')
  - [ ] 5.2 Create `GET /api/day-mood/status/route.ts?ref=`: return { status, paidText? } (paidText only when confirmed)
  - _Requirements: 3.4, 4.1 (Property 1 & 2)_

- [ ] 6. Frontend: DayFeelingCard component
  - [ ] 6.1 Create `src/components/home/DayFeelingCard.tsx` ("use client"): temple-styled card, <=5 feeling buttons, useT() strings, useReducedMotion, mobile-first, no WebGL
  - [ ] 6.2 Implement state machine: idle -> loadingFree -> freeShown(+Rs99 upsell) -> paying(QuickUnlockModal) -> waiting(poll status) -> confirmed(reveal remedy+mantra + WhatsApp handoff) | rejected/timeout(WhatsApp handoff)
  - [ ] 6.3 Fire pixel events: feeling tapped, free shown, Rs99 initiate, confirmed/lead
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 2.1, 3.1, 3.5, 3.7_

- [ ] 7. Reuse UPI modal for the Rs 99 step
  - [ ] 7.1 Extend `QuickUnlockModal` (or add a thin generic variant) to accept a product label + amount (DAY_MOOD_PRICE) + an onPaid callback that calls /api/day-mood/claim; keep QR + Copy UPI ID + "I have Paid"
  - _Requirements: 3.1, 3.2_

- [ ] 8. Wire into homepage
  - [ ] 8.1 Add `<DayFeelingCard />` to `src/app/page.tsx` high on the page (near AashirwadStrip / after SocialProof), with a section-seam
  - _Requirements: 1.1_

- [ ] 9. Translations
  - [ ] 9.1 Add the funnel strings (title, 5 feelings, upsell copy, waiting copy) to the useT() translation system (at least en + hi; others can follow)
  - _Requirements: 1.4_

- [ ] 10. Verify
  - [ ] 10.1 Run `next build` and confirm zero errors; fix any type issues
  - [ ] 10.2 Manual flow check on mobile viewport: tap feeling -> free -> Rs99 -> pay -> waiting -> (approve on Telegram) -> reveal; confirm status poll reveals only after approve
  - [ ] 10.3 Confirm `day_moods` rows appear in Supabase (visibility) and Telegram alert has working Approve/Reject
  - _Requirements: all; Correctness Properties 1-6_

## Notes

- Manual step for Dhruv: run `database/migrations/day_moods.sql` in Supabase (task 1.2) before the flow works end-to-end.
- The paid remedy is generated at APPROVE time so it can never leak before confirmation (Correctness Property 1).
- Price lives only in `src/config/pricing.ts` (raise Rs 99 later in one place).
- Verification (task 10) must pass `next build` clean before shipping.
- Terminal on this machine lags ~1 command; verify via files/build log, not live stdout.
