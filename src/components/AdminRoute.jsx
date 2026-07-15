/**
 * AdminRoute.jsx
 * --------------
 * Frontend route guard for admin pages.
 * Checks /api/admin/me on mount — if the backend says unauthenticated,
 * redirects to /admin/login.
 *
 * Checks both localStorage JWT and falls back to HttpOnly cookie.
 */

import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const [status, setStatus] = useState('checking'); // 'checking' | 'ok' | 'unauthorized'

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'https://astrodev-backend.onrender.com';
    const token = localStorage.getItem('admin_token');

    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    fetch(`${apiBase}/api/admin/me`, {
      headers,
      credentials: 'include'
    })
      .then((res) => {
        if (res.ok) setStatus('ok');
        else setStatus('unauthorized');
      })
      .catch(() => setStatus('unauthorized'));
  }, []);

  if (status === 'checking') {
    return (
      <div className="min-h-screen bg-[#0F0A06] flex items-center justify-center">
        <div className="text-[#D4AF37] text-sm tracking-widest animate-pulse">
          Verifying session…
        </div>
      </div>
    );
  }

  if (status === 'unauthorized') {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
