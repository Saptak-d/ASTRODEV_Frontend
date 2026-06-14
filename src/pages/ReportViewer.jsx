import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import ReportSections99 from '../components/ReportSections99';
import PDFButton from '../components/PDFButton';

// Safely format a stored date string without timezone shifts
function formatBirthDate(dateValue) {
  if (!dateValue) return 'N/A';
  // dateValue may be "2025-01-15T00:00:00.000Z" or "2025-01-15"
  // We always want the date portion in the stored timezone (not UTC-shifted)
  const str = typeof dateValue === 'string' ? dateValue : dateValue.toString();
  const datePart = str.split('T')[0]; // "2025-01-15"
  if (!datePart) return 'N/A';
  const [year, month, day] = datePart.split('-');
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
}

// Convert 24h time string to readable 12h format
function formatTime(timeStr) {
  if (!timeStr) return 'N/A';
  const [h, m] = timeStr.split(':').map(Number);
  if (isNaN(h) || isNaN(m)) return timeStr;
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 || 12;
  return `${hour12}:${m.toString().padStart(2, '0')} ${ampm}`;
}

export default function ReportViewer() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
        const response = await axios.get(`${apiBase}/api/reports/${id}`);
        setReport(response.data.report);
      } catch (err) {
        console.error('Error fetching report:', err);
        setError('This report could not be found. It may have expired or the link may be incorrect.');
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
        <style>{`
          @keyframes omGlow {
            0%, 100% { text-shadow: 0 0 10px rgba(212,175,55,0.2); opacity: 0.5; }
            50% { text-shadow: 0 0 50px rgba(212,175,55,1), 0 0 20px rgba(212,175,55,0.5); opacity: 1; }
          }
          .om-loader { animation: omGlow 2.5s ease-in-out infinite; }
        `}</style>
        <div className="om-loader text-8xl text-[#D4AF37] select-none">ॐ</div>
        <p className="text-sm text-gray-500 font-sans tracking-widest uppercase">Loading Your Chart…</p>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="max-w-md mx-auto text-center py-24 px-6 space-y-4">
        <div className="text-5xl">🔭</div>
        <h2 className="text-2xl font-bold text-[#2A1B18] uppercase tracking-widest">Chart Not Found</h2>
        <p className="text-gray-500 text-sm leading-relaxed">{error || 'Unable to load this report.'}</p>
        <Link to="/generate" className="inline-block mt-4 bg-[#2A1B18] text-[#F5F2E9] border border-[#D4AF37] py-3 px-8 rounded-lg text-sm tracking-wider font-bold hover:bg-[#4A3E3D] transition">
          Create a New Chart
        </Link>
      </div>
    );
  }

  // Pull ascendant sign from factsJson for display
  const ascendantSign = report.factsJson?.ascendant?.sign || '';

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">

      {/* ── Report Header ── */}
      <div className="bg-[#1E1410] text-[#F5F2E9] rounded-2xl shadow-lg border border-[#D4AF37]/30 mb-8 overflow-hidden">
        {/* Gold top bar */}
        <div className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>

        <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <span className="text-[10px] text-[#D4AF37] font-sans tracking-[0.3em] font-bold uppercase block">
              ✦ Your Sacred Kundali Reading ✦
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-wide">
              {report.birthName}
            </h1>
            {ascendantSign && (
              <p className="text-[#D4AF37] text-sm font-sans font-semibold tracking-wider">
                {ascendantSign} Rising
              </p>
            )}
            <div className="flex flex-wrap gap-x-5 gap-y-1 pt-1">
              <span className="text-xs text-gray-300 font-sans flex items-center gap-1.5">
                <span className="text-[#D4AF37]">🗓</span>
                Born on {formatBirthDate(report.birthDate)}
              </span>
              <span className="text-xs text-gray-300 font-sans flex items-center gap-1.5">
                <span className="text-[#D4AF37]">🕐</span>
                At {formatTime(report.birthTime)}
              </span>
              <span className="text-xs text-gray-300 font-sans flex items-center gap-1.5">
                <span className="text-[#D4AF37]">📍</span>
                {report.birthPlace}
              </span>
            </div>
          </div>

          <div className="shrink-0">
            <PDFButton reportId={report.id} userName={report.birthName} />
          </div>
        </div>
      </div>

      {/* ── Report Sections ── */}
      <ReportSections99 report={report} />

      {/* ── Bottom CTA ── */}
      <div className="mt-12 bg-[#1E1410] text-[#F5F2E9] rounded-2xl p-8 text-center space-y-4 border border-[#D4AF37]/20">
        <p className="text-2xl">📥</p>
        <h3 className="text-xl font-extrabold tracking-widest uppercase">Download Your Full PDF Book</h3>
        <p className="text-sm text-gray-400 font-sans max-w-md mx-auto">
          Get a beautifully designed, printable PDF version of this reading — perfect for saving and sharing.
        </p>
        <PDFButton reportId={report.id} userName={report.birthName} />
      </div>
    </div>
  );
}
