import React, { useState, useEffect } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import BirthForm from '../components/BirthForm';

export default function PdfGenerator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // PDF Generation States
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState('');
  const [pdfBlobUrl, setPdfBlobUrl] = useState('');
  const [pdfFileName, setPdfFileName] = useState('');
  const [clientName, setClientName] = useState('');

  // Loading Steps State
  const [activeStep, setActiveStep] = useState(0);

  let pdfServiceUrl = import.meta.env.VITE_PDF_SERVICE_URL || 'https://astrodev-pdf.onrender.com';
  if (pdfServiceUrl.includes('astrodev-pdf-service.onrender.com')) {
    pdfServiceUrl = 'https://astrodev-pdf.onrender.com';
  }

  // Step names for simulated progress while waiting for actual response
  const LOADING_STEPS = [
    'Connecting to secure astrological PDF server...',
    'Geocoding birth coordinates and timezone offset...',
    'Running Keplerian planetary calculations...',
    'Invoking Gemini API for personalized interpretations...',
    'Compiling HTML layouts and running Chromium print-to-pdf...',
    'Packaging PDF buffer and verifying checksums...'
  ];

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('pdf_service_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle Login Submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    try {
      const { data } = await axios.post(`${pdfServiceUrl}/api/astro-gen/auth`, {
        email: loginEmail,
        password: loginPassword
      });

      if (data.success && data.token) {
        localStorage.setItem('pdf_service_token', data.token);
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error('Authentication failed:', err);
      setLoginError(err.response?.data?.error || 'Authentication failed. Please check your email and password.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('pdf_service_token');
    setIsAuthenticated(false);
    setPdfBlobUrl('');
    setPdfFileName('');
    setClientName('');
  };

  // Handle PDF Generation Submission
  const handleFormSubmit = async (formData) => {
    const token = localStorage.getItem('pdf_service_token');
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    setGenerating(true);
    setGenError('');
    setPdfBlobUrl('');
    setClientName(formData.name);
    setActiveStep(0);

    // Simulated progress tick while backend compiles PDF
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < LOADING_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2800);

    try {
      const response = await axios.post(
        `${pdfServiceUrl}/api/astro-gen/generate`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
          responseType: 'blob' // Essential to read PDF stream properly
        }
      );

      const contentType = response.headers['content-type'] || '';

      // Check if response is JSON containing HTML fallback payload
      if (contentType.includes('application/json') || response.data?.type === 'application/json') {
        const text = await response.data.text();
        const data = JSON.parse(text);

        if (data.fallbackHtml && data.html) {
          console.log('[PDF Gen] Server Puppeteer unavailable, rendering PDF on client via html2pdf.js...');
          const container = document.createElement('div');
          container.id = 'pdf-render-temp-container';
          container.style.position = 'absolute';
          container.style.top = '0';
          container.style.left = '0';
          container.style.width = '794px';
          container.style.zIndex = '-99999';
          container.style.opacity = '0.99';
          container.style.pointerEvents = 'none';
          container.style.backgroundColor = '#ffffff';
          container.innerHTML = data.html;
          document.body.appendChild(container);

          // Allow DOM & SVG charts 400ms to calculate layout dimensions
          await new Promise((resolve) => setTimeout(resolve, 400));

          const opt = {
            margin:       0,
            filename:     data.fileName || 'Kundli_Report.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2, useCORS: true, logging: false, windowWidth: 794, scrollX: 0, scrollY: 0 },
            jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
          };

          const pdfBlob = await html2pdf().set(opt).from(container).output('blob');
          document.body.removeChild(container);

          const blobUrl = URL.createObjectURL(pdfBlob);
          setPdfBlobUrl(blobUrl);
          setPdfFileName(data.fileName || 'Kundli_Report.pdf');
          return;
        }
      }

      // Standard Server PDF Response
      let fileName = 'kundli_report.pdf';
      const contentDisposition = response.headers['content-disposition'];
      if (contentDisposition) {
        const matches = /filename="([^"]+)"/.exec(contentDisposition);
        if (matches && matches[1]) {
          fileName = matches[1];
        }
      }

      // Create downloadable blob URL
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);

      setPdfBlobUrl(blobUrl);
      setPdfFileName(fileName);
    } catch (err) {
      console.error('PDF Generation failed:', err);
      
      // If unauthorized, return to login page
      if (err.response?.status === 401 || err.response?.status === 403) {
        handleLogout();
        setLoginError('Your session has expired. Please log in again.');
      } else {
        // Try reading error from blob if possible
        if (err.response?.data instanceof Blob) {
          const reader = new FileReader();
          reader.onload = () => {
            try {
              const parsed = JSON.parse(reader.result);
              setGenError((parsed.detail || parsed.error) || 'Error generating PDF.');
            } catch {
              setGenError('Error generating PDF. Please check server logs.');
            }
          };
          reader.readAsText(err.response.data);
        } else {
          setGenError(err.response?.data?.detail || err.response?.data?.error || 'PDF generation failed. Please verify the PDF backend service is running.');
        }
      }
    } finally {
      clearInterval(stepInterval);
      setGenerating(false);
    }
  };

  // 1. LOGIN SCREEN
  if (!isAuthenticated) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#0F0A06] flex flex-col items-center justify-center px-4 py-16">
        <style>{`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slideup { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both; }
        `}</style>

        <div className="text-center mb-8 animate-slideup">
          <div className="text-5xl text-[#D4AF37] mb-3 font-serif">ॐ</div>
          <h1 className="text-xl font-extrabold tracking-[0.2em] text-[#F5F2E9] uppercase mb-1">
            AstroDev PDF Engine
          </h1>
          <p className="text-[#9A8B7A] text-[10px] tracking-[0.25em] uppercase">
            Secure Report Generator · Direct PDF Generator Service
          </p>
        </div>

        <div className="w-full max-w-md bg-[#1A1108] border border-[#D4AF37]/20 rounded-3xl p-6 shadow-2xl animate-slideup" style={{ animationDelay: '0.1s' }}>
          <div className="text-center space-y-1 pb-4 border-b border-[#D4AF37]/10 mb-6">
            <h2 className="text-sm font-bold text-[#D4AF37] tracking-widest uppercase">
              Service Authentication
            </h2>
            <p className="text-[9px] text-[#9A8B7A] uppercase tracking-wider">
              Enter Admin Credentials to Access PDF Generator
            </p>
          </div>

          {loginError && (
            <div className="mb-4 bg-red-950/40 border border-red-500/20 rounded-xl px-4 py-3 text-red-300 text-xs flex gap-2 items-start">
              <span>⚠️</span>
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest">
                Admin Email / Username
              </label>
              <input
                required
                type="text"
                autoComplete="username"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-[#0F0A06] text-[#F5F2E9] border border-[#D4AF37]/10 rounded-xl focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none placeholder-[#9A8B7A]/40 transition-all font-sans"
                placeholder="admin@astrodev.in"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest">
                Password
              </label>
              <input
                required
                type="password"
                autoComplete="current-password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-[#0F0A06] text-[#F5F2E9] border border-[#D4AF37]/10 rounded-xl focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none placeholder-[#9A8B7A]/40 transition-all font-sans"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full mt-4 bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#0F0A06] py-3.5 rounded-xl text-xs font-bold tracking-widest hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg uppercase font-sans cursor-pointer"
            >
              {loginLoading ? 'Authenticating...' : 'Secure Access · Access Engine'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. LOADING STATE
  if (generating) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#F5F2E9] flex flex-col items-center justify-center px-4 py-16">
        <style>{`
          @keyframes pulseScale {
            0%, 100% { transform: scale(1); opacity: 0.95; }
            50% { transform: scale(1.05); opacity: 1; text-shadow: 0 0 20px rgba(212,175,55,0.4); }
          }
          @keyframes rotate {
            to { transform: rotate(360deg); }
          }
          .pulse-om { animation: pulseScale 2s ease-in-out infinite; }
          .spin-ring { animation: rotate 1.5s linear infinite; }
        `}</style>

        <div className="w-full max-w-md bg-white border border-gray-100 shadow-2xl rounded-3xl p-8 text-center flex flex-col items-center">
          <div className="pulse-om text-7xl text-[#D4AF37] mb-6 font-serif select-none">ॐ</div>
          
          <div className="spin-ring w-12 h-12 rounded-full border-4 border-gray-100 border-t-[#D4AF37] mb-8" />
          
          <h2 className="text-[#2A1B18] font-extrabold text-lg tracking-wider mb-2">
            Generating PDF...
          </h2>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-6 font-sans">
            PDF is Preparing
          </p>

          <div className="w-full space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-100 text-left">
            {LOADING_STEPS.map((step, idx) => {
              const isCompleted = idx < activeStep;
              const isActive = idx === activeStep;

              return (
                <div key={idx} className="flex items-center gap-3 text-xs">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[9px] ${
                    isCompleted ? 'bg-green-100 text-green-700' :
                    isActive ? 'bg-[#D4AF37]/20 text-[#D4AF37]' :
                    'bg-gray-100 text-gray-400'
                  }`}>
                    {isCompleted ? '✓' : idx + 1}
                  </div>
                  <span className={`font-sans tracking-wide ${
                    isCompleted ? 'text-gray-400 line-through' :
                    isActive ? 'text-gray-900 font-semibold' :
                    'text-gray-300'
                  }`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 3. SUCCESS / READY STATE
  if (pdfBlobUrl) {
    return (
      <div className="min-h-[calc(100vh-140px)] bg-[#F5F2E9] flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-md bg-white border border-gray-100 shadow-2xl rounded-3xl p-8 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner border border-green-100">
            ✓
          </div>

          <h2 className="text-xl font-extrabold text-[#2A1B18] tracking-wide mb-1">
            Kundli PDF is Ready!
          </h2>
          <p className="text-[#D4AF37] font-bold text-sm tracking-wider mb-2">
            PDF Generated for {clientName}
          </p>
          <p className="text-xs text-gray-400 tracking-wider mb-6 uppercase font-sans">
            Success Code: Direct Download Stream
          </p>

          <div className="w-full space-y-3">
            <a
              href={pdfBlobUrl}
              download={pdfFileName}
              className="w-full inline-flex items-center justify-center gap-2 bg-[#1E1410] hover:bg-[#3D2820] text-[#F5F2E9] py-4 rounded-xl text-xs font-bold tracking-widest shadow-lg transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>📥</span> Download PDF
            </a>

            <button
              onClick={() => {
                setPdfBlobUrl('');
                setPdfFileName('');
                setClientName('');
              }}
              className="w-full bg-gray-50 border border-gray-200 text-gray-700 py-3.5 rounded-xl text-xs font-bold tracking-widest hover:bg-gray-100 active:scale-[0.98] transition-all cursor-pointer"
            >
              Generate Another PDF
            </button>

            <button
              onClick={handleLogout}
              className="w-full text-red-500 text-[10px] uppercase font-bold tracking-widest pt-2 hover:underline cursor-pointer"
            >
              Logout / Exit Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. GENERATE FORM STATE (AUTHENTICATED)
  return (
    <div className="min-h-[calc(100vh-140px)] bg-[#F5F2E9] flex flex-col items-center py-12 px-4 relative">
      
      {/* Top Session Stats */}
      <div className="w-full max-w-md flex justify-between items-center mb-6 text-[10px] tracking-wider text-gray-500 uppercase font-sans">
        <div>🟢 Session: Authorized</div>
        <button
          onClick={handleLogout}
          className="text-red-700 hover:underline font-bold"
        >
          Logout Session
        </button>
      </div>

      {/* Main Header */}
      <div className="text-center mb-6">
        <div className="text-4xl text-[#D4AF37] mb-2 font-serif">ॐ</div>
        <h1 className="text-2xl font-extrabold tracking-widest text-[#2A1B18] uppercase mb-1">
          Birth Horoscope PDF Generator
        </h1>
        <p className="text-xs text-[#9A8B7A] tracking-wider uppercase">
          Direct PDF Generator Portal
        </p>
      </div>

      {/* Generation Error Banner */}
      {genError && (
        <div className="w-full max-w-md mb-4 flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-xs">
          <span>⚠️</span>
          <span>{genError}</span>
        </div>
      )}

      {/* Reuse standard BirthForm */}
      <div className="w-full max-w-md">
        <BirthForm onSubmit={handleFormSubmit} loading={generating} />
      </div>

      <p className="mt-5 text-[#B5A898] text-[9px] italic tracking-wider text-center">
        🔒 direct rendering bypasses database saving & payments
      </p>
    </div>
  );
}
