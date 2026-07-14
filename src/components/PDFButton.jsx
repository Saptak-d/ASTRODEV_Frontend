import React, { useState } from 'react';

const LANGUAGES = [
  { key: 'hindi',    label: 'हिंदी',   flag: '🕉', sublabel: 'Hindi' },
  { key: 'english',  label: 'English', flag: '🇬🇧', sublabel: 'English' },
  { key: 'sanskrit', label: 'संस्कृत', flag: '📜', sublabel: 'Sanskrit' },
  { key: 'bengali',  label: 'বাংলা',   flag: '✦', sublabel: 'Bengali' },
];

export default function PDFButton({ reportId, userName }) {
  const [downloading, setDownloading] = useState(null); // null or lang key

  const handleDownload = async (lang) => {
    if (downloading) return;
    setDownloading(lang);

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || 'https://astrodev-backend.onrender.com';
      const res = await fetch(`${apiBase}/api/reports/${reportId}/pdf?lang=${lang}`);
      if (!res.ok) throw new Error('PDF generation failed');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const safeName = (userName || 'report')
        .trim()
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '_');
      const filename = `${safeName}_${lang}.pdf`;

      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
      alert('PDF download failed. Please try again.');
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="flex flex-col items-start gap-2">
      {/* Label */}
      <span className="text-[10px] text-[#D4AF37] font-sans tracking-[0.2em] font-bold uppercase">
        📥 Download PDF In
      </span>

      {/* Language buttons */}
      <div className="flex flex-wrap gap-2">
        {LANGUAGES.map(({ key, label, flag, sublabel }) => {
          const isActive = downloading === key;
          return (
            <button
              key={key}
              id={`pdf-btn-${key}`}
              onClick={() => handleDownload(key)}
              disabled={!!downloading}
              className={`
                inline-flex items-center gap-1.5
                border font-bold py-2 px-4 rounded-lg
                text-sm tracking-wide transition-all duration-200
                ${isActive
                  ? 'bg-[#D4AF37] text-[#2A1B18] border-[#D4AF37] cursor-wait scale-95'
                  : 'bg-transparent text-[#D4AF37] border-[#D4AF37]/60 hover:bg-[#D4AF37] hover:text-[#2A1B18] hover:border-[#D4AF37]'
                }
                disabled:opacity-60
              `}
            >
              {isActive ? (
                <>
                  <span className="animate-spin inline-block text-base">⏳</span>
                  <span className="text-xs">Generating…</span>
                </>
              ) : (
                <>
                  <span className="text-base">{flag}</span>
                  <div className="flex flex-col leading-none text-left">
                    <span className="text-sm font-bold">{label}</span>
                    {sublabel !== label && (
                      <span className="text-[9px] opacity-70 tracking-wider uppercase">{sublabel}</span>
                    )}
                  </div>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
