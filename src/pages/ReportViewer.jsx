import React, { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { getPdf, clearPdf } from '../utils/pdfCache';

export default function ReportViewer() {
  const { id }   = useParams();
  const location = useLocation();
  const state    = location.state || {};

  // Metadata from router state (always populated when coming from GenerateReport)
  const preUserName   = state.userName   || null;
  const preBirthDate  = state.birthDate  || null;
  const preBirthTime  = state.birthTime  || null;
  const preBirthPlace = state.birthPlace || null;

  // Check module-level cache for pre-generated PDF
  const cachedBlob = getPdf(id);
  const hasCached  = !!cachedBlob;

  // For path B (direct URL, no cache)
  const [report,     setReport]     = useState(null);
  const [fetching,   setFetching]   = useState(!preUserName && !hasCached);
  const [fetchError, setFetchError] = useState(null);

  // Download state
  const [downloading, setDownloading] = useState(false);
  const [downloaded,  setDownloaded]  = useState(false);
  const [dlError,     setDlError]     = useState(null);

  // Object URL created from blob (revoke on unmount)
  const objUrlRef = useRef(null);

  useEffect(() => {
    // Path B: fetch report metadata when we don't have state or cache
    if (!preUserName && !hasCached) {
      const apiBase = import.meta.env.VITE_API_BASE_URL || 'https://astrodev-backend.onrender.com';
      axios.get(`${apiBase}/api/reports/${id}`)
        .then(r => setReport(r.data.report))
        .catch(() => setFetchError('यह कुंडली नहीं मिली। कृपया नई कुंडली बनाएं।'))
        .finally(() => setFetching(false));
    }
    return () => {
      // Revoke any object URL we created
      if (objUrlRef.current) {
        URL.revokeObjectURL(objUrlRef.current);
        objUrlRef.current = null;
      }
      // Clean blob from cache to free memory
      clearPdf(id);
    };
  }, [id]);

  // Derived display values
  const displayName  = preUserName   || report?.birthName              || '—';
  const displayDate  = preBirthDate  || report?.birthDate?.split('T')[0] || '—';
  const displayTime  = preBirthTime  || report?.birthTime              || '—';
  const displayPlace = preBirthPlace || report?.birthPlace             || '—';

  // ── Download handler ────────────────────────────────────────────────────────
  const handleDownload = async () => {
    if (downloading) return;
    setDlError(null);
    setDownloading(true);

    try {
      let blob = getPdf(id); // try cache first

      if (!blob) {
        // Path B: generate on demand
        const apiBase = import.meta.env.VITE_API_BASE_URL || 'https://astrodev-backend.onrender.com';
        setDlError(null);
        const res = await fetch(`${apiBase}/api/reports/${id}/pdf?lang=hindi`);
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        blob = await res.blob();
      }

      // Revoke any previous object URL
      if (objUrlRef.current) URL.revokeObjectURL(objUrlRef.current);

      // Create a fresh object URL from the blob
      const url      = URL.createObjectURL(blob);
      objUrlRef.current = url;

      const safeName = displayName.trim().replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '_');
      const link     = document.createElement('a');
      link.href      = url;
      link.download  = `${safeName || 'Kundali'}_Hindi.pdf`;

      // Must be in DOM for Firefox
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloaded(true);
    } catch (err) {
      console.error('Download failed:', err);
      setDlError('PDF डाउनलोड नहीं हो सका। कृपया पुनः प्रयास करें।');
    } finally {
      setDownloading(false);
    }
  };

  // ── Loading (path B) ────────────────────────────────────────────────────────
  if (fetching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 bg-[#F5F2E9]">
        <style>{`@keyframes omPulse{0%,100%{opacity:.5;transform:scale(.9)}50%{opacity:1;transform:scale(1.08)}}.om-p{animation:omPulse 2.4s ease-in-out infinite}`}</style>
        <div className="om-p text-7xl text-[#D4AF37]" style={{ fontFamily: 'serif' }}>ॐ</div>
        <p className="text-[#9A8B7A] text-sm tracking-widest uppercase">लोड हो रहा है…</p>
      </div>
    );
  }

  // ── Error (path B) ──────────────────────────────────────────────────────────
  if (fetchError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-5 px-6 text-center bg-[#F5F2E9]">
        <div className="text-5xl">🔭</div>
        <h2 className="text-xl font-bold text-[#2A1B18] uppercase tracking-widest">कुंडली नहीं मिली</h2>
        <p className="text-[#9A8B7A] text-sm">{fetchError}</p>
        <Link to="/generate" className="bg-[#2A1B18] text-[#F5F2E9] border border-[#D4AF37] py-3 px-8 rounded-xl text-sm font-bold uppercase tracking-wider hover:bg-[#4A3E3D] transition-all">
          नई कुंडली बनाएं
        </Link>
      </div>
    );
  }

  // ── Success Page ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F5F2E9]">
      <style>{`
        @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes omGlow  { 0%,100%{text-shadow:0 0 15px rgba(212,175,55,.2)} 50%{text-shadow:0 0 50px rgba(212,175,55,.9),0 0 18px rgba(212,175,55,.5)} }
        @keyframes shimBtn { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes popIn   { 0%{transform:scale(0)} 70%{transform:scale(1.12)} 100%{transform:scale(1)} }
        @keyframes blink   { 0%,100%{opacity:.6} 50%{opacity:1} }
        .fu{animation:fadeUp .65s ease both}
        .fu2{animation:fadeUp .65s .12s ease both}
        .fu3{animation:fadeUp .65s .24s ease both}
        .fu4{animation:fadeUp .65s .36s ease both}
        .fu5{animation:fadeUp .65s .5s ease both}
        .om-glow{animation:omGlow 3s ease-in-out infinite}
        .pop-in{animation:popIn .5s cubic-bezier(.34,1.56,.64,1) .4s both}
        .shim-btn{
          background:linear-gradient(90deg,#8B6914 0%,#D4AF37 35%,#F7E98E 50%,#D4AF37 65%,#8B6914 100%);
          background-size:200% auto;
          animation:shimBtn 2.4s linear infinite;
        }
        .blink{animation:blink 1.8s ease-in-out infinite}
      `}</style>

      {/* ── Top dark banner ── */}
      <div className="bg-[#2A1B18] border-b-2 border-[#D4AF37] text-[#F5F2E9]">
        <div className="max-w-2xl mx-auto px-6 py-8 text-center">
          <p className="fu text-[9px] tracking-[0.35em] text-[#D4AF37]/70 uppercase font-bold mb-3">
            ✦ AstroDev · जन्म कुंडली ✦
          </p>
          <div className="fu om-glow text-5xl mb-3 leading-none text-[#D4AF37]" style={{ fontFamily: 'serif' }}>
            ॐ
          </div>
          <h1 className="fu2 text-2xl md:text-3xl font-extrabold tracking-widest uppercase">
            कुंडली तैयार है!
          </h1>
          <p className="fu2 text-[#D4AF37] text-xs tracking-widest uppercase mt-1 font-semibold">
            Your Kundali is Ready — पंडितजी का आशीर्वाद
          </p>
        </div>
      </div>

      {/* ── Page body ── */}
      <div className="max-w-xl mx-auto px-4 py-8 space-y-5">

        {/* Birth details card */}
        <div className="fu3 bg-white rounded-2xl border border-[#E8DDD0] shadow-md overflow-hidden">
          <div className="h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <div className="px-6 py-5">
            <p className="text-[9px] tracking-[0.3em] text-[#D4AF37] uppercase font-bold mb-3">
              📋 जन्म विवरण · Birth Details
            </p>

            {/* Name */}
            <div className="text-center bg-[#F5F2E9] rounded-xl py-3 px-4 mb-4">
              <p className="text-[8px] text-[#D4AF37] tracking-[0.25em] uppercase font-bold mb-0.5">नाम · Name</p>
              <p className="text-xl font-extrabold text-[#2A1B18] tracking-wide">{displayName}</p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { icon: '📅', hi: 'जन्म तिथि', en: 'Date',  val: displayDate  },
                { icon: '🕐', hi: 'जन्म समय',  en: 'Time',  val: displayTime  },
                { icon: '📍', hi: 'जन्म स्थान', en: 'Place', val: displayPlace },
              ].map(d => (
                <div key={d.en} className="bg-[#F5F2E9] rounded-xl p-3">
                  <span className="text-xl">{d.icon}</span>
                  <p className="text-[7px] text-[#D4AF37] uppercase tracking-wider font-bold mt-1">{d.hi}</p>
                  <p className="text-[10px] font-bold text-[#2A1B18] mt-0.5 leading-tight">{d.val}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panditji blessing card */}
        <div className="fu4 bg-[#2A1B18] rounded-2xl border border-[#D4AF37]/20 shadow-md px-6 py-6 text-center text-[#F5F2E9]">
          <div className="pop-in w-12 h-12 rounded-full border-2 border-[#D4AF37] bg-[#1C1209] flex items-center justify-center mx-auto mb-3"
            style={{ boxShadow: '0 0 20px rgba(212,175,55,0.25)' }}>
            <span className="text-xl">✨</span>
          </div>
          <p className="text-[9px] tracking-[0.3em] text-[#D4AF37]/70 uppercase font-bold mb-3">✦ पंडितजी का आशीर्वाद ✦</p>
          <p className="text-[#C9B99A] text-sm leading-relaxed italic" style={{ fontFamily: 'serif' }}>
            "आपकी जन्म कुंडली पूरी श्रद्धा से तैयार की गई है।
            इसमें आपके भूत, वर्तमान और भविष्य का ज्ञान निहित है।"
          </p>
        </div>

        {/* Download card */}
        <div className="fu5 bg-white rounded-2xl border border-[#E8DDD0] shadow-md overflow-hidden">
          <div className="h-[3px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          <div className="px-6 py-7 text-center">

            <p className="text-[9px] tracking-[0.3em] text-[#D4AF37] uppercase font-bold mb-1">
              📥 हिंदी PDF
            </p>
            <h3 className="text-lg font-extrabold text-[#2A1B18] uppercase tracking-widest mb-1">
              कुंडली डाउनलोड करें
            </h3>
            <p className="text-[#9A8B7A] text-xs mb-5">
              {hasCached ? '✅ PDF तैयार है — तुरंत डाउनलोड करें' : 'डाउनलोड पर क्लिक करें — PDF तैयार होगी'}
            </p>

            <button
              id="download-hindi-pdf-btn"
              onClick={handleDownload}
              disabled={downloading}
              className="relative w-full max-w-xs mx-auto flex items-center justify-center gap-2 rounded-xl py-4 font-extrabold text-[#1C1209] uppercase tracking-widest text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] disabled:opacity-70 disabled:cursor-wait overflow-hidden"
            >
              {downloading
                ? <span className="absolute inset-0 rounded-xl bg-[#D4AF37]" />
                : <span className="shim-btn absolute inset-0 rounded-xl" />
              }
              <span className="relative z-10 flex items-center gap-2">
                {downloading ? (
                  <><span className="animate-spin">⏳</span> PDF तैयार हो रही है…</>
                ) : downloaded ? (
                  <>✅ पुनः डाउनलोड करें</>
                ) : (
                  <><span className="text-base">📥</span> हिंदी PDF डाउनलोड करें</>
                )}
              </span>
            </button>

            {downloaded && !dlError && (
              <p className="blink mt-3 text-[#D4AF37] text-xs font-semibold">
                ✦ कुंडली सफलतापूर्वक डाउनलोड हो गई ✦
              </p>
            )}
            {dlError && (
              <p className="mt-3 text-red-500 text-xs">{dlError}</p>
            )}
          </div>
        </div>

        {/* Create another link */}
        <div className="fu5 text-center pb-2">
          <Link to="/generate" className="text-[#B5A898] hover:text-[#D4AF37] text-[10px] uppercase tracking-widest transition-colors">
            ✦ नई कुंडली बनाएं · Generate Another ✦
          </Link>
        </div>

      </div>
    </div>
  );
}
