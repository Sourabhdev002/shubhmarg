"use client";

import React, { useEffect, useState, use } from "react";
import { getPaymentRequestByReference, submitPaymentConfirmation } from "./actions";
import { Copy, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import QRCode from "react-qr-code";

interface PageProps {
  params: Promise<{ reference_id: string }>;
}

interface PaymentRequest {
  id: string;
  reference_id: string;
  service: string;
  payment_status: string;
  payment_amount: number;
  payment_currency: string;
  full_name: string;
}

export default function PaymentPage({ params }: PageProps) {
  const { reference_id } = use(params);
  const [request, setRequest] = useState<PaymentRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [submittingConfirmation, setSubmittingConfirmation] = useState(false);
  const [confirmError, setConfirmError] = useState("");
  const [copied, setCopied] = useState(false);
  const [deviceType, setDeviceType] = useState<"ios" | "android" | "desktop" | "unknown">("unknown");

  useEffect(() => {
    const win = window as unknown as { opera?: string; MSStream?: boolean };
    const ua = navigator.userAgent || navigator.vendor || win.opera || "";
    let type: "ios" | "android" | "desktop" = "desktop";
    if (/android/i.test(ua)) {
      type = "android";
    } else if (/iPad|iPhone|iPod/.test(ua) && !win.MSStream) {
      type = "ios";
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDeviceType(type);
  }, []);

  const PAYTM_UPI = "paytmqr2810050501011nkqq2oa80eh@paytm";

  useEffect(() => {
    async function loadRequest() {
      const res = await getPaymentRequestByReference(reference_id);
      if (res.success && res.request) {
        setRequest(res.request as PaymentRequest);
      } else {
        setError(res.error || "Failed to load request.");
      }
      setLoading(false);
    }
    loadRequest();
  }, [reference_id]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (request?.payment_status === "payment_verification") {
      intervalId = setInterval(async () => {
        try {
          const res = await getPaymentRequestByReference(reference_id);
          if (res.success && res.request) {
            setRequest(res.request as PaymentRequest);
          }
        } catch {
          // Gracefully ignore network errors during polling
        }
      }, 5000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [request?.payment_status, reference_id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(PAYTM_UPI);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPayment = async () => {
    setConfirmError("");
    setSubmittingConfirmation(true);

    const res = await submitPaymentConfirmation(reference_id);
    if (res.success) {
      if (request) {
        setRequest({ ...request, payment_status: "payment_verification" });
      }

      if (typeof window.fbq === "function") {
        window.fbq("trackCustom", "PaymentSubmitted");
      }
    } else {
      setConfirmError(res.error || "Failed to confirm payment.");
    }
    setSubmittingConfirmation(false);
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-brand-ivory">
        <Loader2 className="h-8 w-8 animate-spin text-brand-maroon" />
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-brand-ivory px-6 text-center">
        <AlertCircle className="h-12 w-12 text-brand-maroon mb-4" />
        <h1 className="text-2xl font-bold font-serif text-brand-maroon mb-2">Request Not Found</h1>
        <p className="text-charcoal/80 mb-8">We could not locate this guidance request.</p>
        <Link href="/" className="text-sm font-semibold tracking-widest text-brand-gold-dark hover:text-brand-maroon uppercase">
          &larr; Return Home
        </Link>
      </div>
    );
  }

  const upiParams = `pa=${PAYTM_UPI}&pn=ShubhMarg&tr=${reference_id}&am=${request.payment_amount}&cu=INR&tn=Payment_for_${reference_id}`;
  const upiDeepLinkAndroid = `upi://pay?${upiParams}`;
  const gpayLink = `gpay://upi/pay?${upiParams}`;

  return (
    <div className="min-h-screen bg-brand-ivory py-16 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-gold-dark mb-2">
            Complete Your Offering
          </p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-wide text-brand-maroon font-serif">
            Secure Payment
          </h1>
        </div>

        <div className="bg-brand-parchment border border-brand-gold/30 rounded-sm p-8 shadow-sm">

          <div className="flex justify-between items-end border-b border-brand-gold/20 pb-6 mb-6">
            <div>
              <p className="text-xs font-semibold text-brand-gold-dark uppercase tracking-widest mb-1">Service</p>
              <h2 className="text-xl font-bold text-brand-maroon font-serif capitalize">
                {request.service.replace("-", " ")}
              </h2>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-brand-gold-dark uppercase tracking-widest mb-1">Amount</p>
              <p className="text-2xl font-bold text-charcoal font-serif">
                ₹{request.payment_amount}
              </p>
            </div>
          </div>

          {request.payment_status === "paid" && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <CheckCircle2 className="h-16 w-16 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-brand-maroon font-serif mb-2">Payment Confirmed</h3>
              <p className="text-charcoal/80 italic font-serif">
                Your payment has been successfully verified and your guidance request is confirmed. We will reach out to you using the contact details provided once your traditional guidance is prepared.
              </p>
            </div>
          )}

          {request.payment_status === "refunded" && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="h-16 w-16 text-brand-maroon mb-4" />
              <h3 className="text-2xl font-bold text-brand-maroon font-serif mb-2">Payment Refunded</h3>
              <p className="text-charcoal/80 italic font-serif">
                Your payment has been refunded.
              </p>
            </div>
          )}

          {request.payment_status === "payment_verification" && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Loader2 className="h-16 w-16 text-brand-gold animate-spin mb-4" />
              <h3 className="text-2xl font-bold text-brand-maroon font-serif mb-2">Verification Pending</h3>
              <p className="text-charcoal/80 italic font-serif mb-4">
                Your payment confirmation has been received. Our team will verify the transaction and confirm your guidance request.
              </p>
              <div className="bg-white p-5 rounded-sm border border-brand-gold/30 shadow-sm text-sm mb-6 w-full max-w-md">
                <p className="font-bold text-brand-maroon mb-2">It is safe to close this page.</p>
                <p className="text-charcoal/80 leading-relaxed">
                  Verification is performed securely by our team. Because manual confirmation depends on bank networks, it may take some time. We have all your details and will process your request once verified.
                </p>
              </div>
              <p className="text-xs font-semibold tracking-widest uppercase text-brand-gold-dark animate-pulse">
                Automatically checking status...
              </p>
            </div>
          )}

          {(request.payment_status === "unpaid" || request.payment_status === "payment_failed") && (
            <div className="space-y-8">
              {request.payment_status === "payment_failed" && (
                <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-sm text-sm">
                  The previous payment verification failed. Please try again or contact support.
                </div>
              )}

              <div className="text-center">
                {deviceType === "ios" && (
                  <>
                    <p className="text-charcoal/80 font-medium mb-4">Choose your UPI app</p>
                    <div className="flex flex-col gap-3 mb-6">
                      <a
                        href={gpayLink}
                        className="block w-full rounded-sm bg-brand-ivory border border-brand-gold px-6 py-4 text-center font-bold text-brand-maroon uppercase tracking-widest hover:bg-brand-gold/10 transition-colors shadow-sm"
                      >
                        Google Pay
                      </a>
                    </div>
                    <p className="text-charcoal/80 font-medium mb-4 uppercase tracking-wider text-sm">OR Scan QR / Copy UPI ID</p>
                  </>
                )}

                {deviceType === "android" && (
                  <>
                    <p className="text-charcoal/80 font-medium mb-6">
                      Please make a payment of <strong className="text-charcoal">₹{request.payment_amount}</strong>
                    </p>
                    <a
                      href={upiDeepLinkAndroid}
                      className="block w-full rounded-sm bg-brand-ivory border border-brand-gold px-6 py-4 text-center font-bold text-brand-maroon uppercase tracking-widest hover:bg-brand-gold/10 transition-colors mb-8 shadow-sm"
                    >
                      Pay ₹{request.payment_amount} with UPI
                    </a>
                  </>
                )}

                {deviceType === "desktop" && (
                  <p className="text-charcoal/80 font-medium mb-6">
                    Scan QR with your UPI app
                  </p>
                )}

                {deviceType === "unknown" && (
                  <p className="text-charcoal/80 font-medium mb-6">
                    Please make a payment of <strong className="text-charcoal">₹{request.payment_amount}</strong> using any UPI app.
                  </p>
                )}

                <div className="flex flex-col items-center justify-center bg-brand-ivory border border-brand-gold/40 p-6 rounded-sm mb-6">
                  {(deviceType === "desktop" || deviceType === "ios") && (
                    <div className="mb-6 flex flex-col items-center">
                      <div className="p-4 bg-white rounded-sm shadow-sm border border-brand-gold/20">
                        <QRCode value={upiDeepLinkAndroid} size={180} level="M" />
                      </div>
                    </div>
                  )}
                  <p className="text-xs font-semibold uppercase text-brand-gold-dark tracking-widest mb-2">Copy UPI ID</p>
                  <div className="flex items-center gap-3 w-full justify-center">
                    <span className="text-lg md:text-xl font-bold text-brand-maroon tracking-wider font-mono break-all text-center">{PAYTM_UPI}</span>
                    <button
                      onClick={handleCopy}
                      className="p-2 text-brand-gold-dark hover:bg-brand-parchment rounded-sm transition-colors shrink-0"
                      title="Copy UPI ID"
                      aria-label="Copy UPI ID"
                    >
                      {copied ? <CheckCircle2 className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="border-t border-brand-gold/20 pt-8 mt-8">
                <h3 className="text-lg font-bold text-brand-maroon font-serif mb-2">Confirm Your Payment</h3>
                <p className="text-charcoal/80 text-sm mb-6 leading-relaxed">
                  After you have successfully completed the transfer on your UPI app, please click the button below. This notifies our team to match your payment and begin preparing your guidance.
                </p>

                <div className="space-y-4">
                  {confirmError && <p className="text-sm text-red-600">{confirmError}</p>}

                  <button
                    onClick={handleConfirmPayment}
                    disabled={submittingConfirmation}
                    className="w-full flex justify-center items-center rounded-sm bg-brand-maroon px-8 py-4 text-sm font-bold uppercase tracking-widest text-brand-ivory shadow-sm hover:bg-brand-maroon-dark disabled:opacity-50 transition-all border border-brand-maroon"
                  >
                    {submittingConfirmation ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "I Have Completed Payment"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
