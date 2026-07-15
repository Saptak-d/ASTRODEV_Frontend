/**
 * Checkout.jsx
 * ------------
 * Premium checkout page — shown after form submission.
 * Loads the Razorpay Checkout SDK, creates a Razorpay order via the backend,
 * and opens the payment modal. After payment, verifies signature server-side.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const AMOUNT_DISPLAY = '₹99';
const AMOUNT_PAISE = 9900;

// Load Razorpay checkout script dynamically
function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function Checkout() {
  const { reportId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};

  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  const apiBase = import.meta.env.VITE_API_BASE_URL || 'https://astrodev-backend.onrender.com';

  // ── Load Razorpay script + create order ──────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const [scriptOk, orderRes] = await Promise.all([
          loadRazorpayScript(),
          fetch(`${apiBase}/api/payment/create-order`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reportId }),
          }),
        ]);

        if (cancelled) return;

        if (!scriptOk) {
          setError('Razorpay payment script could not be loaded. Please check your internet connection.');
          setLoading(false);
          return;
        }

        const data = await orderRes.json();

        if (!orderRes.ok) {
          if (data.configError) {
            setError('Payment gateway is not yet configured. Please contact support.');
          } else if (data.alreadyPaid) {
            navigate(`/payment/success?reportId=${reportId}`, { replace: true });
            return;
          } else {
            const errStr = (typeof data.error === 'object' && data.error !== null)
              ? (data.error.message || JSON.stringify(data.error))
              : (data.error || 'Failed to create payment order. Please try again.');
            setError(errStr);
          }
          setLoading(false);
          return;
        }

        if (!cancelled) {
          setOrderData(data);
          setScriptLoaded(true);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Network error. Please check your connection and try again.');
          setLoading(false);
        }
      }
    }

    init();
    return () => { cancelled = true; };
  }, [reportId]);

  // ── Open Razorpay modal ───────────────────────────────────────────────────
  const handlePay = useCallback(async () => {
    if (!orderData || !scriptLoaded || paying) return;
    setPaying(true);
    setError(null);

    try {
      const options = {
        key: orderData.keyId,
        amount: AMOUNT_PAISE,
        currency: 'INR',
        name: 'AstroDev Kundli',
        description: 'जन्म कुंडली रिपोर्ट · Personalized Kundli Report',
        image: '/logo.png',
        order_id: orderData.orderId,
        prefill: {
          name: orderData.customerName || state.name || '',
          email: orderData.customerEmail || state.email || '',
          contact: orderData.customerPhone || state.phone || '',
        },
        theme: { color: '#D4AF37' },
        modal: {
          ondismiss: () => {
            setPaying(false);
          },
        },
        handler: async (response) => {
          // ── Server-side signature verification ───────────────────────────
          try {
            const verifyRes = await fetch(`${apiBase}/api/payment/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                reportId,
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok || !verifyData.success) {
              navigate('/payment/failed', {
                state: { reportId, reason: verifyData.error || 'Payment verification failed' },
              });
              return;
            }

            navigate('/payment/success', {
              state: {
                reportId,
                name: orderData.customerName || state.name,
                email: orderData.customerEmail || state.email,
                phone: orderData.customerPhone || state.phone,
                birthDate: state.birthDate,
                birthTime: state.birthTime,
                birthPlace: state.birthPlace,
                preferredLanguage: state.preferredLanguage,
              },
            });
          } catch {
            navigate('/payment/failed', {
              state: { reportId, reason: 'Verification network error' },
            });
          }
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on('payment.failed', (resp) => {
        setPaying(false);
        navigate('/payment/failed', {
          state: { reportId, reason: resp?.error?.description || 'Payment failed' },
        });
      });

      rzp.open();
    } catch (err) {
      setPaying(false);
      setError('Could not open payment window. Please try again.');
    }
  }, [orderData, scriptLoaded, paying, reportId, state, navigate, apiBase]);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const displayDate = state.birthDate || '—';
  const displayTime = state.birthTime || '—';
  const displayPlace = state.birthPlace || '—';
  const displayName = state.name || orderData?.customerName || '—';

  // ── Loading ───────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F2E9] flex flex-col items-center justify-center gap-4">
        <style>{`
          @keyframes omPulse{0%,100%{opacity:.4;transform:scale(.9)}50%{opacity:1;transform:scale(1.1)}}
          .om-p{animation:omPulse 2.4s ease-in-out infinite}
        `}</style>
        <div className="om-p text-6xl text-[#D4AF37]" style={{ fontFamily: 'serif' }}>ॐ</div>
        <p className="text-[#2A1B18] text-xs tracking-[0.3em] uppercase">Preparing Checkout…</p>
      </div>
    );
  }

  // ── Error state ───────────────────────────────────────────────────────────
  if (error && !orderData) {
    return (
      <div className="min-h-screen bg-[#F5F2E9] flex flex-col items-center justify-center gap-5 px-6 text-center">
        <div className="text-5xl">⚠️</div>
        <h2 className="text-xl font-bold text-[#2A1B18] tracking-widest uppercase">Checkout Error</h2>
        <p className="text-[#6F5D5B] text-sm max-w-sm">{error}</p>
        <button
          onClick={() => navigate('/generate')}
          className="mt-2 px-8 py-3 bg-[#D4AF37] text-[#1E1410] font-bold rounded-xl text-sm uppercase tracking-wider hover:brightness-110 transition-all shadow-md cursor-pointer"
        >
          Go Back
        </button>
      </div>
    );
  }

  // ── Main Checkout Page ────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F5F2E9] flex flex-col items-center justify-center px-4 py-10">
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes borderGlow{0%,100%{box-shadow:0 0 12px rgba(212,175,55,.15)}50%{box-shadow:0 0 30px rgba(212,175,55,.3)}}
        .fu1{animation:fadeUp .5s ease both}
        .fu2{animation:fadeUp .5s .1s ease both}
        .fu3{animation:fadeUp .5s .2s ease both}
        .fu4{animation:fadeUp .5s .32s ease both}
        .shim{background:linear-gradient(90deg,#8B6914 0%,#D4AF37 35%,#F7E98E 50%,#D4AF37 65%,#8B6914 100%);background-size:200% auto;animation:shimmer 2.4s linear infinite;}
        .card-glow{animation:borderGlow 3s ease-in-out infinite}
      `}</style>

      {/* Header */}
      <div className="fu1 text-center mb-8">
        <div className="text-4xl text-[#D4AF37] mb-2" style={{ fontFamily: 'serif' }}>ॐ</div>
        <h1 className="text-lg font-extrabold tracking-[0.25em] text-[#2A1B18] uppercase mb-1">
          Complete Your Order
        </h1>
        <p className="text-[#6F5D5B] text-[10px] tracking-[0.3em] uppercase font-sans">
          AstroDev · जन्म कुंडली
        </p>
      </div>

      <div className="w-full max-w-md space-y-4">

        {/* Order Summary Card */}
        <div className="fu2 card-glow bg-white border border-[#E4E0D5] rounded-2xl overflow-hidden shadow-sm">
          <div className="h-[3px] bg-[#D4AF37]" />
          <div className="px-6 py-5">
            <p className="text-[9px] tracking-[0.35em] text-[#A68015] uppercase font-bold mb-4 font-sans">
              📋 Order Summary
            </p>

            {/* Name */}
            <div className="text-center bg-[#FAF9F5] rounded-xl py-3 px-4 mb-4 border border-[#EAE6DB]">
              <p className="text-[8px] text-[#A68015] tracking-[0.2em] uppercase font-bold mb-0.5 font-sans">Name · नाम</p>
              <p className="text-lg font-extrabold text-[#2A1B18] tracking-wide">{displayName}</p>
            </div>

            {/* Birth Details Grid */}
            <div className="grid grid-cols-3 gap-2 text-center mb-4">
              {[
                { icon: '📅', en: 'Date', val: displayDate },
                { icon: '🕐', en: 'Time', val: displayTime },
                { icon: '📍', en: 'Place', val: displayPlace },
              ].map((d) => (
                <div key={d.en} className="bg-[#FAF9F5] rounded-xl p-2.5 border border-[#EAE6DB]">
                  <span className="text-lg">{d.icon}</span>
                  <p className="text-[7px] text-[#A68015] uppercase tracking-wider font-bold mt-1 font-sans">{d.en}</p>
                  <p className="text-[9px] font-bold text-[#4E3F3E] mt-0.5 leading-tight font-sans">{d.val}</p>
                </div>
              ))}
            </div>

            {/* Price row */}
            <div className="flex items-center justify-between border-t border-[#EAE6DB] pt-4">
              <div>
                <p className="text-[#2A1B18] text-[10px] uppercase tracking-widest font-extrabold font-sans">Personalized Kundli Report</p>
                <p className="text-[#6F5D5B] text-[9px] mt-0.5 font-sans">
                  {state.preferredLanguage === 'english' ? 'English' : state.preferredLanguage === 'sanskrit' ? 'Sanskrit' : state.preferredLanguage === 'bengali' ? 'Bengali' : 'Hindi'} PDF · WhatsApp + Email delivery
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-[#A68015] font-sans">{AMOUNT_DISPLAY}</p>
                <p className="text-[#6F5D5B] text-[9px] font-sans">incl. taxes</p>
              </div>
            </div>
          </div>
        </div>

        {/* What You Get */}
        <div className="fu3 bg-white border border-[#E4E0D5] rounded-2xl px-6 py-4 shadow-sm">
          <p className="text-[9px] tracking-[0.3em] text-[#A68015] uppercase font-bold mb-3 font-sans">✦ What You Get</p>
          <ul className="space-y-2">
            {[
              `🔮 Complete Vedic Kundli in ${state.preferredLanguage === 'english' ? 'English' : state.preferredLanguage === 'sanskrit' ? 'Sanskrit' : state.preferredLanguage === 'bengali' ? 'Bengali' : 'Hindi'}`,
              '🪐 Planet positions, houses & Nakshatras',
              '📊 Dasha timeline & current period',
              '🧘 Life guidance from Pandit Ji',
              '📱 Delivered via WhatsApp & Email within 2 to 3 days',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-[#4E3F3E] text-[10px] font-sans">
                <span className="shrink-0 mt-0.5">{item.split(' ')[0]}</span>
                <span>{item.slice(item.indexOf(' ') + 1)}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Error display */}
        {error && (
          <div className="fu3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-xs flex gap-2 items-start font-sans">
            <span>⚠️</span><span>{error}</span>
          </div>
        )}

        {/* Pay Button */}
        <div className="fu4">
          <button
            id="pay-now-btn"
            onClick={handlePay}
            disabled={!scriptLoaded || paying}
            className="relative w-full flex items-center justify-center gap-2 rounded-2xl py-4 font-extrabold text-[#1E1410] uppercase tracking-widest text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed overflow-hidden shadow-lg cursor-pointer"
          >
            {paying ? (
              <span className="absolute inset-0 rounded-2xl bg-[#D4AF37]" />
            ) : (
              <span className="shim absolute inset-0 rounded-2xl" />
            )}
            <span className="relative z-10 flex items-center gap-2 font-sans text-xs sm:text-sm">
              {paying ? (
                <><span className="animate-spin text-base">⏳</span> Opening Payment…</>
              ) : (
                <><span className="text-base">🔐</span> Pay {AMOUNT_DISPLAY} Securely</>
              )}
            </span>
          </button>

          <div className="flex items-center justify-center gap-3 mt-3">
            <img src="https://razorpay.com/favicon.ico" className="w-3 h-3 opacity-60" alt="" />
            <p className="text-[#6F5D5B] text-[9px] tracking-wider uppercase font-sans">
              Secured by Razorpay · UPI, Card, Net Banking
            </p>
          </div>
        </div>

        {/* Trust */}
        <p className="fu4 text-center text-[#6F5D5B] text-[8px] tracking-wider uppercase pb-2 font-sans">
          🔒 256-bit SSL Encrypted · Your data is safe
        </p>
      </div>
    </div>
  );
}
