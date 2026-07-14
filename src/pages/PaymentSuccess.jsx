/**
 * PaymentSuccess.jsx
 * ------------------
 * Premium success page shown after payment is verified.
 * Reassures the customer that Pandit Ji is preparing their Kundli.
 * Does NOT expose the PDF URL. Does NOT show a download button.
 */

import React, { useEffect, useState } from 'react';
import { useLocation, useSearchParams, Link } from 'react-router-dom';

// Mask email: soumya@gmail.com → s*****@gmail.com
function maskEmail(email) {
  if (!email) return '—';
  const [local, domain] = email.split('@');
  if (!domain) return email;
  const masked = local[0] + '*'.repeat(Math.max(2, local.length - 1));
  return `${masked}@${domain}`;
}

// Mask phone: 9876543210 → ******3210
function maskPhone(phone) {
  if (!phone) return '—';
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 4) return '••••';
  return '•'.repeat(digits.length - 4) + digits.slice(-4);
}

export default function PaymentSuccess() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const state = location.state || {};
  const reportId = state.reportId || searchParams.get('reportId') || '';

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(!state.name && !!reportId);

  // Animated countdown for 6-hour delivery promise
  const [step, setStep] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s < 3 ? s + 1 : s)), 900);
    return () => clearInterval(id);
  }, []);

  // Fetch report details if location state was cleared on page refresh
  useEffect(() => {
    if (!state.name && reportId) {
      const apiBase = import.meta.env.VITE_API_BASE_URL || 'https://astrodev-backend.onrender.com';
      fetch(`${apiBase}/api/reports/${reportId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.report) {
            setReport(data.report);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error fetching report on success page:', err);
          setLoading(false);
        });
    }
  }, [reportId, state.name]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0A06] flex flex-col items-center justify-center gap-4">
        <style>{`
          @keyframes omPulse{0%,100%{opacity:.4;transform:scale(.9)}50%{opacity:1;transform:scale(1.1)}}
          .om-p{animation:omPulse 2.4s ease-in-out infinite}
        `}</style>
        <div className="om-p text-6xl text-[#D4AF37]" style={{ fontFamily: 'serif' }}>ॐ</div>
        <p className="text-[#9A8B7A] text-xs tracking-[0.3em] uppercase">Loading Success Details…</p>
      </div>
    );
  }

  const name = state.name || report?.birthName || '—';
  const email = state.email || report?.user?.email || '—';
  const phone = state.phone || report?.user?.phone || '—';
  const birthDate = state.birthDate || (report?.birthDate ? new Date(report.birthDate).toISOString().split('T')[0] : '—');
  const birthTime = state.birthTime || report?.birthTime || '—';
  const birthPlace = state.birthPlace || report?.birthPlace || '—';

  const steps = [
    { icon: '✅', text: 'Payment Received Securely' },
    { icon: '🔮', text: 'Pandit Ji is reading your birth chart' },
    { icon: '📜', text: 'Your Kundli report is being prepared' },
    { icon: '📱', text: 'Delivery to your WhatsApp & Email within 6 hours' },
  ];

  return (
    <div className="min-h-screen bg-[#0F0A06] flex flex-col items-center justify-center px-4 py-10">
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes omGlow{0%,100%{text-shadow:0 0 20px rgba(212,175,55,.3)}50%{text-shadow:0 0 60px rgba(212,175,55,1),0 0 20px rgba(212,175,55,.6)}}
        @keyframes popIn{0%{transform:scale(0)}70%{transform:scale(1.15)}100%{transform:scale(1)}}
        @keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}
        @keyframes pulse6{0%,100%{opacity:.6}50%{opacity:1}}
        .fu1{animation:fadeUp .6s ease both}
        .fu2{animation:fadeUp .6s .12s ease both}
        .fu3{animation:fadeUp .6s .24s ease both}
        .fu4{animation:fadeUp .6s .36s ease both}
        .fu5{animation:fadeUp .6s .48s ease both}
        .fu6{animation:fadeUp .6s .62s ease both}
        .om-glow{animation:omGlow 3s ease-in-out infinite}
        .pop{animation:popIn .5s cubic-bezier(.34,1.56,.64,1) .3s both}
        .pulse{animation:pulse6 2s ease-in-out infinite}
      `}</style>

      {/* Success badge */}
      <div className="fu1 flex flex-col items-center mb-6">
        <div
          className="pop w-16 h-16 rounded-full bg-[#1A1108] border-2 border-[#D4AF37] flex items-center justify-center mb-4"
          style={{ boxShadow: '0 0 40px rgba(212,175,55,0.35)' }}
        >
          <span className="text-3xl">✅</span>
        </div>
        <p className="text-[9px] tracking-[0.4em] text-[#D4AF37]/60 uppercase font-bold mb-1">
          ✦ Payment Successful ✦
        </p>
        <div className="om-glow text-4xl text-[#D4AF37] mb-2" style={{ fontFamily: 'serif' }}>ॐ</div>
        <h1 className="fu2 text-2xl font-extrabold text-[#F5F2E9] tracking-widest uppercase text-center">
          Pandit Ji is Preparing<br />Your Kundli
        </h1>
        <p className="fu2 text-[#D4AF37] text-[10px] tracking-widest uppercase mt-1 font-semibold">
          पंडितजी आपकी कुंडली तैयार कर रहे हैं
        </p>
      </div>

      <div className="w-full max-w-md space-y-4">

        {/* Delivery Promise */}
        <div className="fu3 bg-[#1A1108] border border-[#D4AF37]/25 rounded-2xl overflow-hidden">
          <div className="h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <div className="px-6 py-5 text-center">
            <p className="text-[9px] tracking-[0.3em] text-[#D4AF37]/70 uppercase font-bold mb-4">
              📱 Delivery Timeline
            </p>
            <div className="space-y-3">
              {steps.map((s, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 text-left transition-all duration-700 ${
                    i <= step ? 'opacity-100' : 'opacity-25'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full border flex-shrink-0 flex items-center justify-center text-sm transition-all duration-500 ${
                      i <= step
                        ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                        : 'border-[#D4AF37]/20 bg-transparent'
                    }`}
                  >
                    {i <= step ? s.icon : <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/30 inline-block" />}
                  </div>
                  <p className="text-[#C9B99A] text-xs">{s.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 py-3 px-4 bg-[#D4AF37]/10 rounded-xl border border-[#D4AF37]/20">
              <p className="pulse text-[#D4AF37] text-xs font-bold">
                ⏱ Your report will be delivered within <span className="text-base">6 hours</span>
              </p>
            </div>
          </div>
        </div>

        {/* Contact details (masked) */}
        <div className="fu4 bg-[#1A1108] border border-[#D4AF37]/15 rounded-2xl px-6 py-5">
          <p className="text-[9px] tracking-[0.3em] text-[#D4AF37]/70 uppercase font-bold mb-3">
            📬 Delivery Destination
          </p>
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[#9A8B7A] text-[10px] uppercase tracking-widest">Name</span>
              <span className="text-[#F5F2E9] text-xs font-bold">{name}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#9A8B7A] text-[10px] uppercase tracking-widest">WhatsApp</span>
              <span className="text-[#F5F2E9] text-xs font-bold font-mono">{maskPhone(phone)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#9A8B7A] text-[10px] uppercase tracking-widest">Email</span>
              <span className="text-[#F5F2E9] text-xs font-bold font-mono">{maskEmail(email)}</span>
            </div>
          </div>
          <p className="mt-3 text-[#9A8B7A] text-[9px] italic text-center">
            Your Kundli report will be sent to the above contacts
          </p>
        </div>

        {/* Birth summary */}
        <div className="fu5 bg-[#1A1108] border border-[#D4AF37]/15 rounded-2xl px-6 py-4">
          <p className="text-[9px] tracking-[0.3em] text-[#D4AF37]/70 uppercase font-bold mb-3">
            🪐 Birth Details Received
          </p>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { icon: '📅', label: 'Date', val: birthDate },
              { icon: '🕐', label: 'Time', val: birthTime },
              { icon: '📍', label: 'Place', val: birthPlace },
            ].map((d) => (
              <div key={d.label} className="bg-[#0F0A06] rounded-xl p-2.5 border border-[#D4AF37]/10">
                <span className="text-base">{d.icon}</span>
                <p className="text-[7px] text-[#D4AF37]/60 uppercase tracking-wider font-bold mt-1">{d.label}</p>
                <p className="text-[9px] font-bold text-[#C9B99A] mt-0.5 leading-tight">{d.val}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pandit ji blessing */}
        <div className="fu5 bg-gradient-to-br from-[#1A1108] to-[#0F0A06] border border-[#D4AF37]/20 rounded-2xl px-6 py-5 text-center">
          <p className="text-[9px] tracking-[0.3em] text-[#D4AF37]/60 uppercase font-bold mb-3">✦ पंडितजी का आशीर्वाद ✦</p>
          <p className="text-[#C9B99A] text-sm leading-relaxed italic" style={{ fontFamily: 'serif' }}>
            "आपकी जन्म कुंडली पूरी श्रद्धा से तैयार की जाएगी।<br />
            इसमें आपके भूत, वर्तमान और भविष्य का ज्ञान निहित है।"
          </p>
          <p className="mt-2 text-[#D4AF37]/60 text-[9px] italic">— Pandit Ji</p>
        </div>

        {/* Footer links */}
        <div className="fu6 text-center pb-4 space-y-2">
          {reportId && (
            <p className="text-[#9A8B7A] text-[9px] font-mono">
              Order Ref: {reportId.split('-')[0].toUpperCase()}
            </p>
          )}
          <Link
            to="/generate"
            className="block text-[#9A8B7A] hover:text-[#D4AF37] text-[10px] uppercase tracking-widest transition-colors"
          >
            ✦ Generate Another Kundli ✦
          </Link>
        </div>
      </div>
    </div>
  );
}
