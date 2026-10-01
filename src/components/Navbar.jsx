import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t, LANGUAGES } = useLanguage();
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setServicesOpen(false);
    }, 200);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <nav className="bg-[#2A1B18] text-[#F5F2E9] border-b-2 border-[#D4AF37] px-6 py-4 relative z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-widest flex items-center gap-2">
          <span>🕉</span> ASTRODEV
        </Link>

        {/* Mobile Menu Button (Hamburger Toggle) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center p-1.5 text-[#D4AF37] hover:text-[#F5F2E9] focus:outline-none transition-colors border border-[#D4AF37]/35 rounded-lg bg-[#1C120F]/50"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Desktop Navigation links */}
        <div className="hidden md:flex gap-4 items-center">
          {/* Services Dropdown */}
          <div
            ref={dropdownRef}
            className="relative py-1"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((prev) => !prev)}
              className="hover:text-[#D4AF37] transition font-sans text-sm tracking-wider flex items-center gap-1 py-1 focus:outline-none cursor-pointer text-[#F5F2E9]"
              aria-expanded={servicesOpen}
            >
              {t('nav.services')}{' '}
              <span
                className={`text-[8px] inline-block transition-transform duration-200 ${
                  servicesOpen ? 'rotate-180 text-[#D4AF37]' : ''
                }`}
              >
                ▼
              </span>
            </button>

            {/* Seamless dropdown wrapper with padding bridge preventing mouse gap loss */}
            {servicesOpen && (
              <div
                className="absolute right-0 top-full pt-2 w-64 z-50 animate-fade-in"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="border border-[#D4AF37]/50 rounded-xl shadow-[0_12px_36px_rgba(0,0,0,0.7)] py-2 text-left"
                  style={{ backgroundColor: '#1C120F' }}
                >
                  <Link
                    to="/generate"
                    onClick={() => setServicesOpen(false)}
                    className="block px-4 py-2.5 text-xs font-sans font-bold tracking-wider hover:bg-[#D4AF37] hover:text-[#1E1410] text-[#F5F2E9] transition uppercase flex items-center gap-2 group"
                  >
                    <span className="text-[#D4AF37] group-hover:text-[#1E1410] text-sm">☸</span>
                    <span>{t('nav.kundli')}</span>
                  </Link>
                  <div className="h-px bg-[#D4AF37]/20 my-1 mx-2"></div>
                  <div className="px-4 py-2 text-[10.5px] font-sans text-[#EAE6DB] uppercase tracking-wider cursor-not-allowed opacity-80 flex items-center justify-between">
                    <span className="flex items-center gap-2"><span>⚭</span> {t('nav.milan')}</span>
                    <span className="text-[9px] bg-[#D4AF37]/20 text-[#D4AF37] px-1.5 py-0.5 rounded border border-[#D4AF37]/40 font-bold">SOON</span>
                  </div>
                  <div className="px-4 py-2 text-[10.5px] font-sans text-[#EAE6DB] uppercase tracking-wider cursor-not-allowed opacity-80 flex items-center justify-between">
                    <span className="flex items-center gap-2"><span>⏳</span> {t('nav.varshaphal')}</span>
                    <span className="text-[9px] bg-[#D4AF37]/20 text-[#D4AF37] px-1.5 py-0.5 rounded border border-[#D4AF37]/40 font-bold">SOON</span>
                  </div>
                  <div className="px-4 py-2 text-[10.5px] font-sans text-[#EAE6DB] uppercase tracking-wider cursor-not-allowed opacity-80 flex items-center justify-between">
                    <span className="flex items-center gap-2"><span>💎</span> {t('nav.gemstone')}</span>
                    <span className="text-[9px] bg-[#D4AF37]/20 text-[#D4AF37] px-1.5 py-0.5 rounded border border-[#D4AF37]/40 font-bold">SOON</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── Language Switcher ── */}
          <div className="flex items-center gap-0.5 bg-[#1C120F] border border-[#D4AF37]/30 rounded-full px-1 py-1 ml-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                id={`lang-btn-${lang.code}`}
                title={lang.nativeLabel}
                onClick={() => setLanguage(lang.code)}
                className={`
                  relative px-3 py-1 rounded-full text-[11px] font-sans font-bold tracking-wider transition-all duration-300
                  ${language === lang.code
                    ? 'bg-[#D4AF37] text-[#1E1410] shadow-[0_0_8px_rgba(212,175,55,0.4)]'
                    : 'text-[#D4AF37]/60 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10'
                  }
                `}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-[#D4AF37]/20 flex flex-col gap-4 bg-[#2A1B18] animate-fade-in">
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest font-bold font-sans">{t('nav.services')}</span>
            <div className="pl-3 flex flex-col gap-3 border-l border-[#D4AF37]/20">
              <Link
                to="/generate"
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#D4AF37] transition font-sans text-xs tracking-wider flex items-center gap-2 uppercase font-bold text-[#D4AF37]"
              >
                <span>☸</span> {t('nav.kundli')}
              </Link>
              <span className="text-[#EAE6DB]/70 font-sans text-xs tracking-wider flex items-center justify-between opacity-80 cursor-not-allowed">
                <span className="flex items-center gap-2"><span>⚭</span> {t('nav.milan')}</span>
                <span className="text-[9px] bg-[#D4AF37]/20 text-[#D4AF37] px-1.5 py-0.5 rounded border border-[#D4AF37]/40 font-bold">SOON</span>
              </span>
              <span className="text-[#EAE6DB]/70 font-sans text-xs tracking-wider flex items-center justify-between opacity-80 cursor-not-allowed">
                <span className="flex items-center gap-2"><span>⏳</span> {t('nav.varshaphal')}</span>
                <span className="text-[9px] bg-[#D4AF37]/20 text-[#D4AF37] px-1.5 py-0.5 rounded border border-[#D4AF37]/40 font-bold">SOON</span>
              </span>
              <span className="text-[#EAE6DB]/70 font-sans text-xs tracking-wider flex items-center justify-between opacity-80 cursor-not-allowed">
                <span className="flex items-center gap-2"><span>💎</span> {t('nav.gemstone')}</span>
                <span className="text-[9px] bg-[#D4AF37]/20 text-[#D4AF37] px-1.5 py-0.5 rounded border border-[#D4AF37]/40 font-bold">SOON</span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#D4AF37]/10">
            <span className="text-xs text-gray-400 font-sans">{t('nav.languageLabel')}</span>
            <div className="flex items-center gap-0.5 bg-[#1C120F] border border-[#D4AF37]/30 rounded-full px-1 py-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  id={`mobile-lang-btn-${lang.code}`}
                  title={lang.nativeLabel}
                  onClick={() => {
                    setLanguage(lang.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`
                    relative px-3 py-1 rounded-full text-[11px] font-sans font-bold tracking-wider transition-all duration-300
                    ${language === lang.code
                      ? 'bg-[#D4AF37] text-[#1E1410] shadow-[0_0_8px_rgba(212,175,55,0.4)]'
                      : 'text-[#D4AF37]/60 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10'
                    }
                  `}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
