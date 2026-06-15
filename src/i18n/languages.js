// ── Language constants ─────────────────────────────────────
// Kept separate so Vite Fast Refresh is happy (no mixing of
// constants, hooks, and components in the same file).

export const LANGUAGES = [
  { code: 'en', label: 'EN', nativeLabel: 'English' },
  { code: 'hi', label: 'हि', nativeLabel: 'हिन्दी' },
  { code: 'sa', label: 'सं', nativeLabel: 'संस्कृत' },
];

export const STORAGE_KEY = 'astrodev_language';
