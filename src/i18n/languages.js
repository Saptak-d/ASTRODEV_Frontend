// ── Language constants ─────────────────────────────────────
// Kept separate so Vite Fast Refresh is happy (no mixing of
// constants, hooks, and components in the same file).

export const LANGUAGES = [
  { code: 'en', label: 'EN', nativeLabel: 'English' },
  { code: 'hi', label: 'हि', nativeLabel: 'हिन्दी' },
  { code: 'sa', label: 'सं', nativeLabel: 'संस्कृत' },
  { code: 'bn', label: 'বাং', nativeLabel: 'বাংলা' },
  { code: 'ta', label: 'தமி', nativeLabel: 'தமிழ்' },
  { code: 'mr', label: 'म', nativeLabel: 'मराठी' },
];

export const STORAGE_KEY = 'astrodev_language';
