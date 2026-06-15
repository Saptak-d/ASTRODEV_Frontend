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

        <div className="flex gap-4 items-center">
          {/* Nav links */}
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
    </nav>
  );
}
