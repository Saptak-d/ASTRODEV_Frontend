import React, { createContext, useContext, useState, useCallback } from 'react';
import translations from '../i18n/translations';
import { LANGUAGES, STORAGE_KEY } from '../i18n/languages';

// ── Context object (internal) ─────────────────────────────
const LanguageContext = createContext(null);

// ── Provider component ────────────────────────────────────
export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved && ['en', 'hi', 'sa', 'bn'].includes(saved) ? saved : 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang);
    try { localStorage.setItem(STORAGE_KEY, lang); } catch {}
  }, []);

  const t = useCallback(
    (key) => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[language] ?? entry['en'] ?? key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────
// NOTE: Vite Fast Refresh allows mixing one component export
// with one hook export in the same file. The "incompatible"
// warning was caused by also exporting LANGUAGES (a constant).
// With LANGUAGES moved to languages.js, this file is clean.
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
