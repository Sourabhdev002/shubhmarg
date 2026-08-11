"use client";

import React, { useEffect, useState, use } from "react";
import { getPaymentRequestByReference, submitPaymentUtr } from "./actions";
import { Copy, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";

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
  
  const [utr, setUtr] = useState("");
  const [submittingUtr, setSubmittingUtr] = useState(false);
  const [utrError, setUtrError] = useState("");
  const [copied, setCopied] = useState(false);

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

  const handleSubmitUtr = async (e: React.FormEvent) => {
    e.preventDefault();
    setUtrError("");
    setSubmittingUtr(true);
    
    const res = await submitPaymentUtr(reference_id, utr);
    if (res.success) {
      if (request) {
        setRequest({ ...request, payment_status: "payment_verification" });
      }
    } else {
      setUtrError(res.error || "Failed to submit.");
    }
    setSubmittingUtr(false);
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

  // Define dynamic deep link for mobile users
  const upiDeepLink = `upi://pay?pa=${PAYTM_UPI}&pn=ShubhMarg&tr=${reference_id}&am=${request.payment_amount}&cu=INR&tn=Payment_for_${reference_id}`;

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
                Your payment has been successfully verified. Your guidance request is now confirmed.
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
              <p className="text-charcoal/80 italic font-serif mb-6">
                Your UTR has been submitted and is currently pending manual verification by our team. Your request will be confirmed after verification.
              </p>
              <p className="text-sm font-semibold tracking-widest uppercase text-brand-gold-dark animate-pulse">
                Checking payment status...
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
                <p className="text-charcoal/80 font-medium mb-6">
                  Please make a payment of <strong className="text-charcoal">₹{request.payment_amount}</strong> using any UPI app.
                </p>
                
                <div className="flex flex-col items-center justify-center bg-brand-ivory border border-brand-gold/40 p-6 rounded-sm mb-6">
                  <p className="text-xs font-semibold uppercase text-brand-gold-dark tracking-widest mb-2">Paytm UPI ID</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-brand-maroon tracking-wider font-mono">{PAYTM_UPI}</span>
                    <button 
                      onClick={handleCopy}
                      className="p-2 text-brand-gold-dark hover:bg-brand-parchment rounded-sm transition-colors"
                      title="Copy UPI ID"
                    >
                      {copied ? <CheckCircle2 className="h-5 w-5 text-green-600" /> : <Copy className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <a 
                  href={upiDeepLink}
                  className="md:hidden block w-full rounded-sm bg-brand-ivory border border-brand-gold px-6 py-4 text-center font-bold text-brand-maroon uppercase tracking-widest hover:bg-brand-gold/10 transition-colors mb-8 shadow-sm"
                >
                  Pay ₹{request.payment_amount} with UPI
                </a>
              </div>

              <div className="border-t border-brand-gold/20 pt-8">
                <h3 className="text-lg font-bold text-brand-maroon font-serif mb-4">Submit Payment Reference</h3>
                <p className="text-sm text-charcoal/70 mb-4">
                  After completing the payment, enter your 12-digit UTR / transaction reference below to verify your request.
                </p>

                <form onSubmit={handleSubmitUtr} className="space-y-4">
                  <div>
                    <label htmlFor="utr" className="block text-sm font-semibold text-charcoal uppercase tracking-wider mb-2">
                      UTR / Reference Number
                    </label>
                    <input
                      type="text"
                      id="utr"
                      value={utr}
                      onChange={(e) => setUtr(e.target.value)}
                      placeholder="e.g. 123456789012"
                      className="w-full rounded-sm border border-brand-gold/40 bg-brand-ivory px-4 py-3 text-charcoal focus:outline-none focus:ring-2 focus:ring-brand-maroon font-mono"
                      required
                      minLength={8}
                    />
                  </div>
                  {utrError && <p className="text-sm text-red-600">{utrError}</p>}
                  
                  <button
                    type="submit"
                    disabled={submittingUtr || !utr.trim()}
                    className="w-full flex justify-center items-center rounded-sm bg-brand-maroon px-8 py-4 text-sm font-bold uppercase tracking-widest text-brand-ivory shadow-sm hover:bg-brand-maroon-dark disabled:opacity-50 transition-all border border-brand-maroon"
                  >
                    {submittingUtr ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      "Submit Reference"
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
