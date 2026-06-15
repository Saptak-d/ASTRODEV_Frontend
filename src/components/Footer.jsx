import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#2A1B18] text-[#F5F2E9] border-t border-[#D4AF37] py-6 px-6 text-center text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <span className="font-bold tracking-wider">ASTRODEV</span> — {t('footer.tagline')}
        </div>
        <div className="text-gray-400 font-sans text-xs">
          &copy; {new Date().getFullYear()} AstroDev. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}
