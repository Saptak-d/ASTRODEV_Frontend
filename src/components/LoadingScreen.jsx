import React, { useState, useEffect } from 'react';

const MESSAGES = [
  'पंडितजी आपकी कुंडली बना रहे हैं…',
  'ग्रहों की गणना हो रही है…',
  'आपकी PDF तैयार की जा रही है…',
  'बस थोड़ी देर और…',
];

export default function LoadingScreen() {
  const [msgIdx, setMsgIdx] = useState(0);
  const [dots,   setDots]   = useState('');

  useEffect(() => {
    const id = setInterval(() => {
      setMsgIdx(i => (i + 1) % MESSAGES.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setDots(d => (d.length >= 3 ? '' : d + '.'));
    }, 500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F5F2E9]">

      <style>{`
        @keyframes omPulse {
          0%, 100% { opacity: 0.5; transform: scale(0.95); text-shadow: 0 0 10px rgba(212,175,55,0.2); }
          50%       { opacity: 1;   transform: scale(1.05); text-shadow: 0 0 40px rgba(212,175,55,0.9); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .om-pulse { animation: omPulse 2.5s ease-in-out infinite; }
        .ring     { animation: spin 1.4s linear infinite; }
      `}</style>

      {/* OM symbol */}
      <div className="om-pulse text-8xl text-[#D4AF37] mb-8 select-none" style={{ fontFamily: 'serif' }}>
        ॐ
      </div>

      {/* Spinner ring */}
      <div className="ring w-10 h-10 rounded-full border-4 border-[#E8DDD0] border-t-[#D4AF37] mb-8" />

      {/* Rotating message */}
      <p className="text-[#2A1B18] font-bold text-base tracking-wide text-center px-8 mb-2">
        {MESSAGES[msgIdx]}
      </p>

      {/* WhatsApp note */}
      <p className="text-[#9A8B7A] text-sm text-center px-10 leading-relaxed">
        आपकी PDF WhatsApp पर भेज दी जाएगी{dots}
      </p>
    </div>
  );
}
