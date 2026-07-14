/**
 * PaymentFailed.jsx
 * -----------------
 * Graceful payment failure page with retry option.
 */

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PaymentFailed() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state || {};
  const reason = state.reason || 'Payment was not completed.';
  const reportId = state.reportId;

  return (
    <div className="min-h-screen bg-[#0F0A06] flex flex-col items-center justify-center px-4 py-10">
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}
        .fu1{animation:fadeUp .5s ease both}
        .fu2{animation:fadeUp .5s .1s ease both}
        .fu3{animation:fadeUp .5s .2s ease both}
        .shake{animation:shake .5s ease .2s both}
      `}</style>

      <div className="w-full max-w-md text-center space-y-5">

        {/* Icon */}
        <div className="fu1 shake w-16 h-16 rounded-full bg-red-950/50 border-2 border-red-500/50 flex items-center justify-center mx-auto">
          <span className="text-3xl">❌</span>
        </div>

        <div className="fu2">
          <h1 className="text-xl font-extrabold text-[#F5F2E9] tracking-widest uppercase mb-1">
            Payment Failed
          </h1>
          <p className="text-[#9A8B7A] text-xs">Your payment could not be completed.</p>
        </div>

        {/* Reason */}
        <div className="fu3 bg-red-950/30 border border-red-500/20 rounded-2xl px-5 py-4">
          <p className="text-red-300 text-xs">{reason}</p>
        </div>

        {/* Actions */}
        <div className="fu3 space-y-3">
          {reportId ? (
            <button
              id="retry-payment-btn"
              onClick={() => navigate(`/checkout/${reportId}`, { state: location.state })}
              className="w-full py-3.5 bg-[#D4AF37] text-[#0F0A06] font-extrabold rounded-2xl text-sm uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all shadow-lg"
            >
              🔄 Try Again
            </button>
          ) : null}

          <button
            onClick={() => navigate('/generate')}
            className="w-full py-3 border border-[#D4AF37]/30 text-[#9A8B7A] font-bold rounded-2xl text-xs uppercase tracking-widest hover:border-[#D4AF37]/60 hover:text-[#C9B99A] transition-all"
          >
            Start Over
          </button>
        </div>

        <div className="fu3 space-y-2 pt-2">
          <p className="text-[#9A8B7A] text-[9px] uppercase tracking-wider">
            No money was charged. Your payment is safe.
          </p>
          <p className="text-[#9A8B7A] text-[9px]">
            If amount was deducted, it will be refunded automatically within 5–7 business days.
          </p>
        </div>
      </div>
    </div>
  );
}
