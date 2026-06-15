import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { language, setLanguage, t, LANGUAGES } = useLanguage();

  return (
    <nav className="bg-[#2A1B18] text-[#F5F2E9] border-b-2 border-[#D4AF37] px-6 py-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-widest flex items-center gap-2">
          <span>🕉</span> ASTRODEV
        </Link>

        {/* Mobile Menu Button (Hamburger Toggle) */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="md:hidden flex items-center justify-center p-1.5 text-[#D4AF37] hover:text-[#F5F2E9] focus:outline-none transition-colors border border-[#D4AF37]/35 rounded-lg bg-[#1C120F]/50"
          aria-label="Toggle navigation menu"
        >
          {dropdownOpen ? (
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
          <Link to="/" className="hover:text-[#D4AF37] transition font-sans text-sm tracking-wider">
            {t('nav.home')}
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <Link
              to="/#services"
              className="hover:text-[#D4AF37] transition font-sans text-sm tracking-wider flex items-center gap-1 py-1"
              onClick={() => setDropdownOpen(false)}
            >
              {t('nav.services')} <span className="text-[8px]">▼</span>
            </Link>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-[#1C120F]/95 border border-[#D4AF37]/35 rounded-xl shadow-2xl py-2 z-50 backdrop-blur-md text-left">
                <Link
                  to="/generate"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2.5 text-[11px] font-sans font-bold tracking-wider hover:bg-[#D4AF37] hover:text-[#1E1410] text-[#F5F2E9] transition uppercase flex items-center gap-2"
                >
                  <span>☸</span> {t('nav.kundli')}
                </Link>
                <div className="h-px bg-[#D4AF37]/15 my-1"></div>
                <span className="block px-4 py-2.5 text-[10px] font-sans text-gray-500 uppercase tracking-wider cursor-not-allowed opacity-60 flex items-center gap-2">
                  <span>⚭</span> {t('nav.milan')}
                </span>
                <span className="block px-4 py-2.5 text-[10px] font-sans text-gray-500 uppercase tracking-wider cursor-not-allowed opacity-60 flex items-center gap-2">
                  <span>⏳</span> {t('nav.varshaphal')}
                </span>
                <span className="block px-4 py-2.5 text-[10px] font-sans text-gray-500 uppercase tracking-wider cursor-not-allowed opacity-60 flex items-center gap-2">
                  <span>💎</span> {t('nav.gemstone')}
                </span>
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
      {dropdownOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-[#D4AF37]/20 flex flex-col gap-4 bg-[#2A1B18] animate-fade-in">
          <Link
            to="/"
            onClick={() => setDropdownOpen(false)}
            className="hover:text-[#D4AF37] transition font-sans text-sm tracking-wider py-1 border-b border-[#D4AF37]/10"
          >
            {t('nav.home')}
          </Link>

          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold font-sans">{t('nav.services')}</span>
            <div className="pl-3 flex flex-col gap-3 border-l border-[#D4AF37]/20">
              <Link
                to="/generate"
                onClick={() => setDropdownOpen(false)}
                className="hover:text-[#D4AF37] transition font-sans text-xs tracking-wider flex items-center gap-2 uppercase font-bold"
              >
                <span>☸</span> {t('nav.kundli')}
              </Link>
              <span className="text-gray-500 font-sans text-xs tracking-wider flex items-center gap-2 opacity-50 cursor-not-allowed">
                <span>⚭</span> {t('nav.milan')} ({t('services.soon') || 'soon'})
              </span>
              <span className="text-gray-500 font-sans text-xs tracking-wider flex items-center gap-2 opacity-50 cursor-not-allowed">
                <span>⏳</span> {t('nav.varshaphal')} ({t('services.soon') || 'soon'})
              </span>
              <span className="text-gray-500 font-sans text-xs tracking-wider flex items-center gap-2 opacity-50 cursor-not-allowed">
                <span>💎</span> {t('nav.gemstone')} ({t('services.soon') || 'soon'})
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-[#D4AF37]/10">
            <span className="text-xs text-gray-400 font-sans">Language / भाषा</span>
            <div className="flex items-center gap-0.5 bg-[#1C120F] border border-[#D4AF37]/30 rounded-full px-1 py-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  id={`mobile-lang-btn-${lang.code}`}
                  title={lang.nativeLabel}
                  onClick={() => {
                    setLanguage(lang.code);
                    setDropdownOpen(false);
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
