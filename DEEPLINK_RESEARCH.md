# UPI Deep Link — Full Build Log, Failures & Next Ideas (ShubhMarg)

**Goal:** A one-tap "Pay" button on the payment page that opens the customer''s UPI
app (GPay / PhonePe / Paytm) with the amount pre-filled, so payment completes in one
tap. No third-party payment gateway. Money must land in the merchant''s own account.

**Status so far:** Deep-link one-tap NOT working yet. Scan QR + Copy UPI ID both work
100%. This doc records exactly what we built, every failure with its error, WHY it
failed, and every remaining idea to try — so no work is lost.

---

## What we have (the payment identities)

| Item | Value |
|---|---|
| Personal UPI (works for scan + paste) | `shubhmarg@ptyes` |
| Paytm merchant VPA (money -> Paytm Business) | `paytmqr2810050501011nkqq2oa80eh@paytm` |
| Payee display name (personal) | SOURABH JAGDHARI YADAV |
| Payee name inside Paytm QR | `Paytm Merchant` |
| Merchant category code (from QR) | `mc=5499` |
| Paytm MID (Production) | `olsVrh41288433671038` |
| Paytm Merchant KEY | LOCKED — needs "enable payment gateway" |

### The decoded Paytm merchant QR (raw string that DOES pay when scanned)
```
upi://pay?pa=paytmqr2810050501011nkqq2oa80eh@paytm&pn=Paytm%20Merchant&mc=5499&mode=02&orgid=000000&paytmqr=2810050501011NKQQ2OA80EH&sign=MEYCIQCJAwfHAYxX4NZ5Z8IV9+rpXmYs5gWICYBU+0jTq8iihQIhAK4IqSCUjAl+tNRYDrVOPBHq9LDOZgo63CwsZdkTiyxk
```
Key fields: `mode=02` (merchant), `orgid`, `paytmqr` (QR id), and `sign` (Paytm''s
cryptographic signature over the static fields).

---

## Attempts & Results (chronological)

### Attempt 1 — Personal VPA, amount as integer, with note
- Link: `upi://pay?pa=shubhmarg@kotak&pn=...&am=1&cu=INR&tn=Dakshina`
- iOS scheme buttons: `gpay://`, `phonepe://`, `paytmmp://`
- **Result:** App opened, showed correct payee + amount, then on Pay:
  **"You''ve exceeded the bank limit for this payment."**
- **Why:** Two problems — (a) amount `1` not `1.00`; (b) personal VPA + pre-filled
  intent is treated as merchant/collect and blocked by NPCI for personal VPAs.

### Attempt 2 — iOS universal `upi://pay?` scheme for all buttons
- **Result:** Opened WhatsApp instead of the chosen app.
- **Why:** On iOS the generic `upi://` scheme is claimed by WhatsApp Pay. Must use
  app-specific schemes (`tez://`, `phonepe://`, `paytmmp://`).

### Attempt 3 — Removed `pn` (payee name) from deep link
- **Result:** Still "limit exceeded" on personal VPA.
- **Why:** `pn` was not the cause; personal-VPA P2M block is.

### Attempt 4 — Removed `tn` (note) too; amount formatted `1.00`
- **Result:** Still "limit exceeded" on personal VPA.
- **Why:** Confirmed personal VPA cannot accept pre-filled intents regardless of params.

### Attempt 5 — Switched to Paytm merchant VPA `paytmqr...@paytm` + `mc=5411` + custom `tr` + `am`
- Link: `upi://pay?pa=paytmqr...@paytm&pn=SOURABH...&mc=5411&am=1.00&cu=INR&tr=...`
- **Result:** **"Receiver''s UPI ID or VPA is not available. Try paying to a
  different UPI ID."**
- **Why:** The `paytmqr...` VPA is a signed static-QR VPA. Sending it WITHOUT the
  original `mode/orgid/paytmqr/sign` (and with a guessed `mc`) makes it an invalid
  merchant request -> rejected.

### Attempt 6 — Decoded the REAL QR; sent EXACT signed params + added `am` + `tr`
- Link: real `pa,pn=Paytm Merchant,mc=5499,mode=02,orgid=000000,paytmqr,sign` PLUS
  `am=1.00&cu=INR&tr=<ref>-<time>`
- **Result:** **"Receiver''s UPI ID or VPA is not available."**
- **Why:** Paytm''s `sign` is computed over the QR''s EXACT static fields. Appending
  `am`/`tr`/`cu` changes the payload, so the signature no longer validates ->
  rejected.

### Attempt 7 — Sent EXACT signed params with NO amount, NO tr (byte-for-byte QR)
- Link: exactly the decoded QR string, delivered as a deep-link intent.
- **Result:** **"Receiver''s UPI ID or VPA is not available."**
- **Why (the key proof):** Even the perfectly valid signature was rejected when
  delivered as a deep link. Paytm/NPCI binds the signed merchant QR to the
  QR-SCAN channel; it is intentionally NOT replayable as an app intent.

---

## Root Cause (confirmed)

A pre-filled one-tap UPI payment to a **merchant** is only accepted when the intent
carries a **valid merchant signature** that the receiving PSP can verify. That
signature can only be produced by the party holding the Paytm/PSP **merchant secret
key**. We do not have that key (it is locked behind "enable payment gateway").

- Personal VPA + pre-filled intent => blocked ("limit exceeded") by NPCI P2M rules.
- Merchant VPA + our own params => "receiver not available" (invalid/again unsigned).
- Merchant VPA + Paytm''s real signature => works ONLY when scanned, not as a deep link.

**Conclusion:** One-tap deep link cannot be forged from the client. It requires either
the merchant signing key (Paytm PG API) OR an aggregator that signs on our behalf.

---

## What currently works (shipped, live)

- **Scan QR** — uses the exact signed Paytm static QR string. Pays successfully.
- **Copy UPI ID** — customer pastes `paytmqr...@paytm` (or personal) in any app. Works.
- **Open App buttons** — copy the UPI ID and open GPay/PhonePe/Paytm home (no
  pre-filled intent => no error). Customer pastes + pays.
- **Pay via WhatsApp** — customer pays and sends screenshot for instant confirm.
- **Auto-verification webhook** (`/api/upi-webhook`) + unique-paise matching +
  admin one-tap Confirm. (Full auto needs a payment-alert feed — email/webhook.)

---

## NEXT IDEAS TO TRY for a working one-tap deep link (no gateway framing)

Ordered by likelihood of success without a full PG. Each is a concrete experiment.

### Idea A — Dynamic signed QR via Paytm "Create Dynamic QR" API (needs merchant key)
Paytm''s DQR API returns a fresh signed `upi://` string that INCLUDES the amount and a
valid signature (because Paytm signs it server-side). That string works as both QR and
intent. **Blocker:** needs the merchant KEY (enable payment gateway). If that ever
activates, this is the clean win.

### Idea B — Ask Paytm support to enable "UPI Intent" / DQR without full PG
Paytm has a "UPI Solutions / UPI Intent" product separate from card PG. Some merchant
accounts can get UPI-only intent enabled with lighter onboarding. Action: contact Paytm
Business support, ask specifically for "UPI Intent" or "Dynamic QR API" access on the
existing MID `olsVrh41288433671038`. If granted -> merchant key -> Idea A.

### Idea C — Second bank''s merchant/business UPI that allows unsigned intents
Some bank business VPAs (e.g. certain PhonePe Business / BharatPe / bank "merchant UPI")
accept a plain `pa&pn&am&cu&mc&tr` intent WITHOUT a per-transaction sign, because the
VPA itself is registered P2M. Action: open a free PhonePe for Business or BharatPe
merchant VPA, then test a plain signed-less intent to THAT vpa. If it accepts pre-filled
amount without "limit exceeded", buttons work. (This is the most promising no-key path.)

### Idea D — UPI intent with `mode=04` / correct MCC and unique tr on a P2M VPA
On a genuine P2M VPA (from Idea C), NPCI spec says `tr` (txn ref) is mandatory and the
intent is accepted. Retest matrix on that VPA:
- `pa,pn,mc,am(2dp),cu,tr` (no sign)
- with and without `mode`
- Android `intent://` vs iOS app schemes
Record which combo the P2M VPA accepts.

### Idea E — Aggregator that provides signing (no GST, no PG) — LAST RESORT per user
BharatUPI / UPIGateway / Decentro give a signed dynamic link. User dislikes this
framing, keep as fallback only.

### Idea F — Host the QR as a "scan from another device" + on-device fallback
Not one-tap, but: show QR big; on mobile, offer "Save QR" so user opens their UPI app
and uploads it from gallery (scan-from-image). Works because it stays on the QR channel.
Already partially available.

---

## Test protocol for any new VPA/param combo
1. Create a Rs 1 order, open `/payment/<ref>` on a real phone.
2. Tap the app button; note EXACT error text (screenshot).
3. If "limit exceeded" => personal-VPA P2M block (need merchant VPA).
4. If "receiver not available" => signature/merchant validation fail (need signed/P2M).
5. If it opens with amount + pays => SUCCESS, lock that combo in.

## Files involved
- `src/app/payment/[reference_id]/page.tsx` — buttons, QR, PAYTM_QR params, handlers.
- `src/lib/upi.ts` — `buildUpiUri` (2-decimal amount).
- `src/app/api/upi-webhook/route.ts` — auto-verify endpoint (ready for any alert feed).

_Last updated: build after Attempt 7. QR + copy + open-app + WhatsApp are live and
working; one-tap pre-filled deep link remains blocked pending Idea B/C._

---

## Attempt 8 — Paytm server-side signed UPI-Collect link (Merchant Care recommended)

Paytm Merchant Care confirmed the correct method: generate the checksum SERVER-SIDE
with the Merchant Key/Secret, then build a Paytm-hosted one-click link.

- Checksum URL: `https://securegw.paytm.in/merchantpg/v1/paytmChecksum`
- UPI collect endpoint: `https://securegw.paytm.in/theia/api/v1/upi/collect`
- One-click link: `https://paytm.com/upi/pay?mid=...&orderId=...&upiId=...&amount=...&checksum=...`

**What we built (ready, dormant until keys exist):**
- `src/lib/paytm-checksum.ts` — native Paytm checksum (AES-128-CBC + salt + sha256).
- `src/app/payment/[reference_id]/paytm-actions.ts` — `createPaytmPayLink(orderId, amount)`
  generates the signed link. Returns `configured:false` if keys missing (button hides gracefully).
- Payment page: "Pay ₹X in One Tap" primary button -> calls the action -> opens the signed link.

**Why this can work where client-side failed:** Paytm signs the payload with the
Merchant Key on OUR server, producing a valid signature that includes the amount.
This is the missing piece from Attempts 6-7.

**BLOCKER — the one action needed:**
Generate the API Key in Paytm: **Settings -> API & Integration -> Generate New API Key**.
Note the **Key ID** and **Secret** (shown once). Ensure the key has **"UPI Collect"** permission.
Then set in Vercel env:
- `PAYTM_MID` = olsVrh41288433671038
- `PAYTM_MERCHANT_KEY` = <the Secret from Generate New API Key>

Once set, the One-Tap button goes live automatically. Callback must be a public HTTPS
URL (our `/api/upi-webhook` or a dedicated `/api/paytm-callback`).

**Paytm Care''s quick-fix notes to remember:**
- Invalid checksum -> use latest Key ID/Secret; checksum must be over the EXACT body.
- Missing permission -> API key must have "UPI Collect" enabled.
- Callback not reachable -> use a public HTTPS URL or status won''t return.

_Status: integration code shipped and dormant. Waiting on PAYTM_MERCHANT_KEY from
Settings -> API & Integration -> Generate New API Key._
