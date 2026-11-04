# Requirements Document

Feature: "How Was Your Day?" Emotional Funnel

## Introduction

A homepage entry point that meets the visitor emotionally instead of showing a menu of services. The visitor taps how they feel today, receives an instant FREE line of comfort plus a tiny free remedy (mantra/tip), and is then offered a deeper personal remedy + a daily chant-able mantra for Rs 99. This is an emotional micro-commitment ladder: feeling -> free taste -> Rs 99 -> (future) higher tiers. It reuses the existing UPI unlock + WhatsApp handoff; it adds no new payment plumbing.

Goal: lift conversion by leading with emotion and small "yeses" rather than a cold service list. Research basis: astrology/self-reflection usage spikes during emotional moments; micro-commitment ("commitment creep") quiz funnels convert far higher than a cold menu; soft-conversion-first + price laddering are proven patterns.

Brand + tech constraints: bright temple aesthetic (ivory/saffron/gold, dark ink on light), useT() translation system, mobile-first, light/smooth (no new WebGL), all currency in Rs. Reuses QuickUnlockModal + pixel events + WhatsApp handoff.

## Glossary

- **Emotional hook**: the "How was your day?" card that opens the funnel.
- **Micro-commitment ladder**: a chain of small yeses (feeling -> free answer -> Rs 99) that builds investment before the paid ask.
- **Free micro-answer**: the instant, no-payment comfort line + tiny remedy shown after a feeling is tapped.
- **Rs 99 upsell**: the paid remedy + daily chant-able mantra offer.
- **UPI unlock flow**: the existing QuickUnlockModal (QR / Copy UPI ID -> I have Paid -> delivery -> WhatsApp handoff).
- **useT()**: the site 8-language translation system all user-facing strings pass through.

## Requirements

### Requirement 1: Emotional hook on the homepage
**User Story:** As a visitor who just landed, I want to be asked how my day/feeling is, so that I feel seen instead of sold to.

#### Acceptance Criteria
1. WHEN the homepage loads THEN the system SHALL show a warm "How was your day today?" card placed high (near the top, after the hero/stats), styled in the temple aesthetic.
2. THE card SHALL present a small set of one-tap feeling options (e.g. Good, Tired, Sad, Anxious, Something on my mind) with gentle icons, no more than 5 options to avoid choice overload.
3. THE card SHALL be mobile-first, light to load (no WebGL), and respect prefers-reduced-motion.
4. ALL visitor-facing text SHALL go through the useT() translation system.

### Requirement 2: Free emotional micro-answer (the first yes)
**User Story:** As a visitor who tapped a feeling, I want an instant free line of comfort and a tiny free remedy, so that I get real value before being asked for anything.

#### Acceptance Criteria
1. WHEN the visitor taps a feeling THEN the system SHALL immediately show a short warm response matched to that feeling (comfort line) plus ONE tiny free remedy (a short mantra or a one-line calming tip).
2. THE free response SHALL require no payment, no login, and no form.
3. THE free response SHALL feel personal and calm (not templated-sounding), and SHALL be honest (no fake astrological claims).
4. IF a feeling maps to sadness/anxiety THEN the tone SHALL be supportive and gentle.

### Requirement 3: Rs 99 emotional upsell (the paid bridge)
**User Story:** As a visitor who felt the free comfort, I want a deeper personal remedy plus a daily mantra I can chant, so that I can carry the calm into my daily life.

#### Acceptance Criteria
1. AFTER the free response THEN the system SHALL present a Rs 99 offer: a personal remedy + a morning/night chant-able mantra for lasting smoothness.
2. WHEN the visitor accepts the Rs 99 offer THEN the system SHALL route into the existing UPI unlock flow (QuickUnlockModal pattern) - scan QR or copy UPI ID, then "I've Paid".
3. WHEN the visitor taps "I have Paid" THEN the system SHALL send a Telegram alert to the owner (reusing the existing Telegram bot) containing the feeling, amount, and any reference, AND SHALL show the visitor a "confirming your payment" waiting state.
4. THE visitor SHALL NOT see the paid remedy + mantra until the owner CONFIRMS the payment on Telegram; only after owner confirmation SHALL the system reveal the "proceed" result (personal remedy + daily mantra) and the WhatsApp handoff.
5. IF the owner has not yet confirmed THEN the visitor SHALL remain on a calm waiting screen with reassurance (e.g. "Pandit ji is preparing your remedy") and an option to continue on WhatsApp.
6. THE price SHALL be defined in ONE place so it can be raised gradually later without code hunting.
7. THE system SHALL fire pixel funnel events at each step (feeling tapped, free answer shown, Rs 99 initiated, paid-claimed, confirmed/lead) so conversion can be measured.

### Requirement 4: Honesty and trust
**User Story:** As the business owner, I want the funnel to stay authentic, so that trust (the brand's core) is never broken.

#### Acceptance Criteria
1. THE remedies/mantras SHALL be real, meaningful devotional content, not invented fake astrology.
2. THE funnel SHALL never present the AI response as a specific named human astrologer.
3. IF the visitor expresses serious distress THEN the tone SHALL remain supportive (no exploitation of emotional vulnerability).

### Requirement 5: Visibility - see what people ask and what the AI replied
**User Story:** As the business owner, I want to see which feelings people tap and what response was given, so that I can learn what visitors need and improve conversion.

#### Acceptance Criteria
1. WHEN a visitor taps a feeling THEN the system SHALL log the feeling, timestamp, language, and the free response text to the existing Supabase store (a lightweight table, best-effort, never blocking the visitor experience).
2. WHEN a Rs 99 flow is started or paid-claimed THEN the system SHALL log that event linked to the same session so the funnel can be traced (feeling -> free -> Rs 99 -> confirmed).
3. THE owner SHALL be able to view this data through: (a) the Supabase Table Editor for the log table, (b) the Telegram alerts which include the feeling + response summary at the moment of a Rs 99 claim, and (c) Microsoft Clarity session replays which visually show the taps and drop-off.
4. THE logging SHALL store NO sensitive personal data beyond the feeling and the generated text (DPDP-safe; no IP profiling).

## Out of scope (this iteration)
- Higher paid tiers beyond Rs 99 (structure allows it later; not built now).
- New payment gateway (reuses existing UPI manual-verify flow).
- Backend AI generation changes (may reuse existing quick-unlock / free-reading APIs; decided in Design).