# Design Document

Feature: "How Was Your Day?" Emotional Funnel

## Overview

An emotional entry point on the homepage. The visitor taps how they feel, gets an instant FREE comfort line + tiny remedy (Gemini-generated, honest), then is offered a Rs 99 personal remedy + daily mantra. On "I have Paid", the owner gets a Telegram alert with Approve/Reject buttons; the visitor sees a calm waiting screen and the paid result is revealed ONLY after the owner taps Approve (confirm-gated). Every feeling + response is logged so the owner can see what people ask.

Design reuses existing, proven infrastructure (verified by code sweep):
- Gemini guidance generation (pattern from `api/quick-unlock/route.ts` `generateBlessing()`).
- Telegram Approve/Reject inline buttons (`sendTopupAlert` + `telegram-webhook` `approve:<id>` / `reject:<id>`).
- Status-poll reveal (same idea as wallet topup-status).
- Supabase logging table for visibility.
- QuickUnlockModal UPI UI (QR + Copy UPI ID + "I have Paid").
- pixelEvents for funnel tracking.

## Architecture

Flow:
1. `DayFeelingCard` (homepage) -> visitor taps a feeling.
2. POST `/api/day-mood` { feeling, lang } -> Gemini free comfort + tiny remedy -> logs row (status "free") -> returns { sessionRef, freeText, freeRemedy }. Fires pixel "feeling".
3. Visitor sees free response inline + a Rs 99 upsell button.
4. Tap Rs 99 -> QuickUnlockModal (reused UI): QR + Copy UPI ID + "I have Paid".
5. On "I have Paid" -> POST `/api/day-mood/claim` { sessionRef } -> sets row status "claimed", sends Telegram alert WITH Approve/Reject buttons (callback_data `moodapprove:<ref>` / `moodreject:<ref>`). Returns { pending: true }. Fires pixel "initiate".
6. Visitor sees a calm WAITING screen ("Pandit ji is preparing your remedy...") that POLLS `/api/day-mood/status?ref=` every ~4s.
7. Owner taps Approve on Telegram -> `telegram-webhook` sees `moodapprove:<ref>` -> generates/reveals the paid remedy + mantra (Gemini), sets row status "confirmed", stores paid_text. (Reject -> status "rejected".)
8. Visitor's next poll sees status "confirmed" -> reveals "proceed" result (personal remedy + daily mantra) + WhatsApp handoff. Fires pixel "confirmed/lead".

Why generate the paid remedy at APPROVE time (not at claim): keeps the paid content truly gated behind owner confirmation, and avoids showing it early via devtools.

## Components and Interfaces

### Frontend
- `src/components/home/DayFeelingCard.tsx` (new, "use client")
  - Renders the "How was your day today?" card, <=5 feeling buttons (Good, Tired, Sad, Anxious, Something on my mind), temple-styled, mobile-first, useReducedMotion, all strings via useT().
  - State machine: idle -> loadingFree -> freeShown -> upsell -> paying(modal) -> waiting(poll) -> confirmed(reveal) | rejected.
  - Reuses `QuickUnlockModal` for the UPI step (extend it minimally to accept a generic product + onPaid callback, OR add a thin variant).
  - Fires pixelContact/pixelInitiateCheckout/pixelLead at each step.
- Placed in `src/app/page.tsx` high on the homepage (after SocialProof / near AashirwadStrip). One inline section, no WebGL.

### Backend (API routes)
- `POST /api/day-mood` -> free comfort + remedy (Gemini), insert log row (status "free"), return sessionRef + text.
- `POST /api/day-mood/claim` -> mark "claimed", send Telegram Approve/Reject alert.
- `GET /api/day-mood/status?ref=` -> return { status, paidText? } for polling.
- Reuse `src/app/api/telegram-webhook/route.ts` -> add handling for `moodapprove:` / `moodreject:` callback_data (generate paid remedy on approve, set "confirmed").

### Lib
- `src/lib/gemini.ts` (existing) -> reuse getGeminiClient + GEMINI_FLASH_MODEL.
- `src/lib/telegram.ts` (existing) -> add `sendMoodConfirmAlert()` (same shape as sendTopupAlert but callback_data moodapprove/moodreject) OR generalize.
- `src/config/pricing.ts` (new, single source) -> `DAY_MOOD_PRICE = 99` so price can be raised in ONE place (Req 3.6).

## Data Models

New Supabase table `day_moods` (lightweight, DPDP-safe - no IP, no PII beyond feeling+text):
```
reference_id   text primary key   -- e.g. DM-XXXX
feeling        text               -- good | tired | sad | anxious | mind
lang           text               -- en/hi/etc
free_text      text               -- the free comfort shown
paid_text      text null          -- the paid remedy+mantra (filled at approve)
amount         int  default 99
status         text default 'free'-- free | claimed | confirmed | rejected
created_at     timestamptz default now()
confirmed_at   timestamptz null
```

## Error Handling
- Gemini failure -> honest warm fallback text (same pattern as generateBlessing fallback). Never blank.
- Supabase log failure -> best-effort try/catch, never blocks the visitor (matches quick-unlock pattern).
- Telegram not configured -> claim still succeeds but owner must verify manually; visitor still shown waiting screen (design note: if TG down, owner can confirm via Supabase table edit which the status poll will also read).
- Polling timeout -> after ~3 min still pending, show "Taking longer than usual - continue on WhatsApp" with waLink handoff (never leave visitor stuck).

## Correctness Properties

### Property 1: Paid content is confirm-gated

**Validates: Requirements 3.4, 4.1**
`paid_text` is revealed to the visitor only when `status == "confirmed"`, set solely by an authenticated Telegram approve callback. No path reveals paid content while status is free, claimed, or rejected.

### Property 2: Confirmation is idempotent

**Validates: Requirements 3.4**
Tapping Approve twice never double-generates or double-delivers; a row already confirmed or rejected ignores further callbacks (matches wallet-webhook idempotency).

### Property 3: Free step is non-blocking

**Validates: Requirements 2.2, 5.1**
A Supabase or Telegram failure never prevents the visitor from seeing the free comfort response.

### Property 4: Single source of price

**Validates: Requirements 3.6**
The Rs 99 value is read from one constant everywhere; changing it in one place changes all displays and logs.

### Property 5: No stuck visitor

**Validates: Requirements 3.5**
If confirmation never arrives, the waiting screen times out gracefully to a WhatsApp handoff.

### Property 6: Privacy-safe logging

**Validates: Requirements 5.4**
Stored data is limited to feeling + generated text + status; no IP, no profiling (DPDP-safe).

## Testing Strategy
- Unit: feeling->prompt mapping returns non-empty text; price constant used everywhere.
- Integration: claim sets status "claimed" + fires TG; approve callback sets "confirmed" + fills paid_text; status endpoint reflects transitions.
- Manual: full flow on mobile (tap feeling -> free -> Rs 99 -> pay -> wait -> approve on TG -> reveal). Build must pass `next build` clean before ship.

## Visibility (how the owner sees what people ask - Req 5)
Three ways, all reusing existing tools:
1. Supabase Table Editor -> `day_moods` table: every feeling, free_text, paid_text, status, time.
2. Telegram alert at claim: includes feeling + amount + ref (owner sees demand live).
3. Microsoft Clarity: session replays visually show which feelings are tapped and where drop-off happens.