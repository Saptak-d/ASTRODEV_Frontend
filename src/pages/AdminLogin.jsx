/**
 * AdminLogin.jsx
 * --------------
 * Secure admin login page. Authenticates using email and password.
 * Backend sets an HttpOnly JWT cookie "admin_token".
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const apiBase = import.meta.env.VITE_API_BASE_URL || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('कृपया ईमेल और पासवर्ड भरें।');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${apiBase}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        // credentials: 'include' is critical to accept HttpOnly cookie from server
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'लॉगिन विफल रहा। विवरण जांचें।');
      }

      // Redirect to protected admin dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'लॉगिन करने में त्रुटि। कृपया पुनः प्रयास करें।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0A06] flex flex-col items-center justify-center px-4 py-10">
      <style>{`
        @keyframes fadeUp{from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:translateY(0)}}
        .fu1{animation:fadeUp .5s ease both}
        .fu2{animation:fadeUp .5s .12s ease both}
      `}</style>

      {/* Header */}
      <div className="fu1 text-center mb-8">
        <div className="text-4xl text-[#D4AF37] mb-2" style={{ fontFamily: 'serif' }}>ॐ</div>
        <h1 className="text-lg font-extrabold tracking-[0.25em] text-[#F5F2E9] uppercase mb-1">
          AstroDev Admin Portal
        </h1>
        <p className="text-[#9A8B7A] text-[9px] tracking-[0.3em] uppercase">
          सुरक्षित लॉगिन · Secure Admin Login
        </p>
      </div>

      <div className="fu2 w-full max-w-md bg-[#1A1108] border border-[#D4AF37]/25 rounded-2xl overflow-hidden p-6 shadow-xl">
        <div className="text-center space-y-1 pb-4 border-b border-[#D4AF37]/10 mb-5">
          <h2 className="text-xs font-bold text-[#D4AF37] tracking-widest uppercase">
            प्रवेश द्वार
          </h2>
          <p className="text-[8px] text-[#9A8B7A] uppercase tracking-wider">
            Enter credentials to access the fulfillment queue
          </p>
        </div>

        {error && (
          <div className="mb-4 bg-red-950/40 border border-red-500/30 rounded-xl px-4 py-3 text-red-300 text-xs flex gap-2 items-start">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest">
              Email Address
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#0F0A06] text-[#F5F2E9] border border-[#D4AF37]/20 rounded-lg focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none placeholder-[#9A8B7A]/50 transition-all font-sans"
              placeholder="admin@example.com"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[9px] font-bold text-[#D4AF37] uppercase tracking-widest">
              Password
            </label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#0F0A06] text-[#F5F2E9] border border-[#D4AF37]/20 rounded-lg focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] outline-none placeholder-[#9A8B7A]/50 transition-all font-sans"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-[#D4AF37] text-[#0F0A06] py-3 rounded-lg text-xs font-extrabold tracking-widest hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 shadow-md uppercase font-sans cursor-pointer"
          >
            {loading ? 'लॉगिन किया जा रहा है...' : 'सुरक्षित प्रवेश · Secure Login'}
          </button>
        </form>
      </div>

      <p className="mt-8 text-[#9A8B7A]/50 text-[8px] tracking-widest uppercase">
        Protected by session token cookies.
      </p>
    </div>
  );
}
