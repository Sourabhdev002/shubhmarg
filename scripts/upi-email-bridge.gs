/**
 * ShubhMarg — UPI payment email -> webhook bridge (Google Apps Script)
 *
 * This runs on Google's cloud (Apps Script), reads your Paytm/bank payment-alert
 * emails from Gmail, and posts them to ShubhMarg so BOTH flows auto-verify:
 *   1. Service order payments  ->  /api/upi-webhook          (matches order amount)
 *   2. Wallet top-ups          ->  /api/wallet/topup-confirm (matches exact ₹ + paise)
 * Each incoming payment is sent to both endpoints; the one it belongs to credits it,
 * the other safely replies "no_match". Both are idempotent, so double-processing
 * cannot double-credit.
 *
 * SETUP:
 * 1. Create/choose a private Gmail that receives your Paytm/bank payment alerts.
 * 2. In Paytm Business / bank settings, route payment-received email alerts to it.
 * 3. Open script.google.com, create a new project, paste this file.
 * 4. Set Script Properties (Project Settings -> Script properties):
 *    - WEBHOOK_BASE   = https://shubhmarg.com   (or your .vercel.app URL, no trailing slash)
 *    - WEBHOOK_SECRET = same value as UPI_WEBHOOK_SECRET in Vercel
 *      (Back-compat: if you previously set WEBHOOK_URL to the order endpoint, that
 *       still works — WEBHOOK_BASE is derived from it automatically.)
 * 5. Add a time-driven trigger for pollPaymentEmails() every 1 minute.
 *
 * IMPORTANT: The exact Paytm alert email format is NOT YET CONFIRMED.
 * The extractAmount() and extractUtr() regexes below are PROVISIONAL placeholders.
 * Once you forward a real Paytm payment-alert email, update these two functions
 * to match the real wording, then test with the runOnce() helper.
 */

/** Resolve the two webhook URLs from script properties. */
function getEndpoints_() {
  var props = PropertiesService.getScriptProperties();
  var base = props.getProperty('WEBHOOK_BASE');

  // Back-compat: derive base from an older WEBHOOK_URL (…/api/upi-webhook).
  if (!base) {
    var legacy = props.getProperty('WEBHOOK_URL');
    if (legacy) base = legacy.replace(/\/api\/upi-webhook\/?$/, '');
  }
  if (base) base = base.replace(/\/+$/, ''); // strip trailing slash

  var secret = props.getProperty('WEBHOOK_SECRET');
  if (!base || !secret) return null;

  return {
    secret: secret,
    order: base + '/api/upi-webhook',
    wallet: base + '/api/wallet/topup-confirm',
  };
}

function pollPaymentEmails() {
  var ep = getEndpoints_();
  if (!ep) {
    Logger.log('Missing WEBHOOK_BASE (or WEBHOOK_URL) / WEBHOOK_SECRET script property.');
    return;
  }

  // Search unread payment-alert emails. Adjust the query to your real sender/subject.
  var query = 'is:unread (from:paytm OR from:noreply OR subject:"received") ';
  var threads = GmailApp.search(query, 0, 20);

  threads.forEach(function (thread) {
    var messages = thread.getMessages();
    var msg = messages[messages.length - 1];
    var body = msg.getPlainBody();

    var amount = extractAmount(body);
    var utr = extractUtr(body);

    if (amount) {
      var payload = {
        amount: amount,
        utr: utr || null,
        payerName: extractPayerName(body) || null,
        payerVpa: extractPayerVpa(body) || null,
        rawEmailId: msg.getId()
      };

      var okOrder = postWebhook_(ep.order, ep.secret, payload);
      var okWallet = postWebhook_(ep.wallet, ep.secret, payload);

      // If BOTH calls failed to even reach the server, leave the mail unread so
      // the next run retries. A reachable server (any HTTP response) counts as
      // handled — the endpoints themselves decide match/no_match/duplicate.
      if (!okOrder && !okWallet) {
        Logger.log('Both webhook calls failed — leaving email unread for retry.');
        return;
      }
    }

    // Mark processed so we don't reprocess.
    thread.markRead();
    thread.addLabel(getOrCreateLabel('ShubhMarg/Processed'));
  });
}

/** POST a payload to one webhook. Returns true if the server responded at all. */
function postWebhook_(url, secret, payload) {
  try {
    var res = UrlFetchApp.fetch(url, {
      method: 'post',
      contentType: 'application/json',
      headers: { 'X-Webhook-Secret': secret },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    });
    Logger.log(url + ' -> ' + res.getResponseCode() + ': ' + res.getContentText());
    return true;
  } catch (e) {
    Logger.log('Webhook call failed (' + url + '): ' + e);
    return false;
  }
}

/** PROVISIONAL — update from a real Paytm alert. Extracts a rupee amount incl. paise. */
function extractAmount(body) {
  // Matches "Rs 99.07", "Rs. 99.07", "INR 99.07", "₹99.07"
  var m = body.match(/(?:Rs\.?|INR|₹)\s*([0-9]+(?:\.[0-9]{1,2})?)/i);
  return m ? parseFloat(m[1]) : null;
}

/** PROVISIONAL — update from a real Paytm alert. Extracts a 12-digit UTR/UPI ref. */
function extractUtr(body) {
  var m = body.match(/(?:UTR|UPI Ref(?:erence)?(?:\s*No)?\.?|Txn(?:\s*Id)?)\s*[:#]?\s*([0-9]{10,14})/i);
  if (m) return m[1];
  var loose = body.match(/\b([0-9]{12})\b/);
  return loose ? loose[1] : null;
}

/** PROVISIONAL — best-effort payer name. */
function extractPayerName(body) {
  var m = body.match(/from\s+([A-Z][A-Za-z .]{2,40})/);
  return m ? m[1].trim() : null;
}

/** PROVISIONAL — best-effort payer VPA (e.g. name@bank). */
function extractPayerVpa(body) {
  var m = body.match(/\b([a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,})\b/);
  return m ? m[1] : null;
}

function getOrCreateLabel(name) {
  var label = GmailApp.getUserLabelByName(name);
  return label ? label : GmailApp.createLabel(name);
}

/**
 * Manual test helper. Set TEST_AMOUNT to a real pending amount (order total or
 * a wallet top-up exact amount like 500.43), then Run -> runOnce and check Logs.
 */
function runOnce() {
  var ep = getEndpoints_();
  if (!ep) { Logger.log('Set WEBHOOK_BASE and WEBHOOK_SECRET first.'); return; }
  var TEST_AMOUNT = 500.43; // <-- change to a real pending amount to test
  var payload = { amount: TEST_AMOUNT, utr: 'TEST' + Date.now(), payerName: 'Test Payer', payerVpa: 'test@upi' };
  postWebhook_(ep.order, ep.secret, payload);
  postWebhook_(ep.wallet, ep.secret, payload);
}
