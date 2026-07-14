/**
 * pdfCache.js
 * -----------
 * A module-level in-memory store for pre-generated PDF blobs.
 * Because this is a SPA (React Router), route changes don't reload the JS
 * module, so blobs survive navigation — unlike router state or sessionStorage.
 *
 * Usage:
 *   import { storePdf, getPdf, clearPdf } from '../utils/pdfCache';
 */

const _cache = new Map(); // reportId → Blob

export function storePdf(reportId, blob) {
  _cache.set(reportId, blob);
}

export function getPdf(reportId) {
  return _cache.get(reportId) || null;
}

export function clearPdf(reportId) {
  _cache.delete(reportId);
}
