import React, { useState } from 'react';

export default function PDFButton({ reportId, userName, endpoint = 'pdf' }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
      const res = await fetch(`${apiBase}/api/reports/${reportId}/${endpoint}`);
      if (!res.ok) throw new Error('PDF generation failed');

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      // Build a filename that includes the user's name
      const safeName = (userName || 'report')
        .trim()
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '_');
      const filename = `${safeName}.pdf`;

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
      setDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#C69214] disabled:opacity-60 disabled:cursor-wait text-[#2A1B18] font-bold py-3 px-6 rounded shadow-sm tracking-wider transition uppercase text-sm"
    >
      {downloading ? (
        <>
          <span className="animate-spin inline-block">⏳</span> Generating PDF…
        </>
      ) : (
        <>
          <span>📥</span> Download Printable PDF Book
        </>
      )}
    </button>
  );
}
