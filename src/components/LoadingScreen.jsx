import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-[#F5F2E9]">
      <style>{`
        @keyframes omPulseGlow {
          0%, 100% {
            text-shadow: 0 0 10px rgba(212, 175, 55, 0.2);
            opacity: 0.6;
          }
          50% {
            text-shadow: 0 0 40px rgba(212, 175, 55, 0.95), 0 0 15px rgba(212, 175, 55, 0.6);
            opacity: 1;
          }
        }
        .om-glow-loader {
          animation: omPulseGlow 3s ease-in-out infinite;
          display: inline-block;
          font-family: inherit;
        }
      `}</style>
      <div className="om-glow-loader text-9xl mb-8 text-[#D4AF37] select-none">ॐ</div>
      <h3 className="text-xl font-bold tracking-widest text-[#2A1B18] uppercase">Aligning with the Heavens</h3>
      <p className="text-sm text-[#4A3E3D] italic mt-2">Chanting planetary mantras and preparing your sacred chart...</p>
      <div className="w-48 h-1 bg-gray-200 mt-6 rounded overflow-hidden relative">
        <div className="h-full bg-[#D4AF37] animate-pulse rounded w-2/3"></div>
      </div>
    </div>
  );
}

