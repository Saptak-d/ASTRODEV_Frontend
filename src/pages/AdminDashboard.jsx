/**
 * AdminDashboard.jsx
 * ------------------
 * Secure admin dashboard. Allows admins to inspect orders, view and download PDFs
 * using short-lived pre-signed cloud storage URLs, and mark orders as SENT.
 *
 * Filter tabs:
 *   - FULFILLMENT QUEUE (READY + NOT_SENT) — default
 *   - GENERATING
 *   - GENERATION_FAILED
 *   - SENT
 */

import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalPaid: 0,
    readyNotSent: 0,
    sent: 0,
    generating: 0,
    failed: 0,
    overdue: 0,
  });
  const [activeTab, setActiveTab] = useState('queue'); // 'queue' | 'generating' | 'failed' | 'sent'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null); // reportId being marked as sent
  const [downloadingId, setDownloadingId] = useState(null); // reportId being downloaded
  const [timeNow, setTimeNow] = useState(Date.now());
  const navigate = useNavigate();

  const apiBase = import.meta.env.VITE_API_BASE_URL || 'https://astrodev-backend.onrender.com';

  // ── Auto-refresh countdown timers every second ──────────────────────────────
  useEffect(() => {
    const id = setInterval(() => setTimeNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // ── Fetch orders list & statistics ─────────────────────────────────────────
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Map tab keys to API query parameters
      let queryParams = '';
      if (activeTab === 'queue') {
        queryParams = '?reportStatus=READY&deliveryStatus=NOT_SENT';
      } else if (activeTab === 'generating') {
        queryParams = '?reportStatus=GENERATING';
      } else if (activeTab === 'failed') {
        queryParams = '?reportStatus=GENERATION_FAILED';
      } else if (activeTab === 'sent') {
        queryParams = '?deliveryStatus=SENT';
      }

      const [ordersRes, statsRes] = await Promise.all([
        fetch(`${apiBase}/api/admin/orders${queryParams}`, { credentials: 'include' }),
        fetch(`${apiBase}/api/admin/orders/stats`, { credentials: 'include' }),
      ]);

      if (!ordersRes.ok || !statsRes.ok) {
        if (ordersRes.status === 401 || statsRes.status === 401) {
          navigate('/admin/login');
          return;
        }
        throw new Error('Failed to retrieve dashboard data');
      }

      const ordersData = await ordersRes.json();
      const statsData = await statsRes.json();

      setOrders(ordersData.orders || []);
      setStats(statsData);
    } catch (err) {
      setError(err.message || 'Error occurred while loading data.');
    } finally {
      setLoading(false);
    }
  }, [activeTab, apiBase, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ── Mark as Sent ────────────────────────────────────────────────────────────
  const handleMarkSent = async (reportId) => {
    if (actionLoading) return;
    setActionLoading(reportId);
    try {
      const res = await fetch(`${apiBase}/api/admin/orders/${reportId}/mark-sent`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to update order status');
      }

      // Re-fetch list
      await fetchData();
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setActionLoading(null);
    }
  };

  // ── View or Download PDF (via pre-signed URL) ──────────────────────────────
  const handlePdfAction = async (reportId, actionType = 'view') => {
    if (downloadingId) return;
    setDownloadingId(reportId);

    try {
      const res = await fetch(`${apiBase}/api/admin/orders/${reportId}/pdf-url`, {
        credentials: 'include',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate access URL');
      }

      const signedUrl = data.url;

      if (actionType === 'view') {
        window.open(signedUrl, '_blank');
      } else {
        // Download
        const link = document.createElement('a');
        link.href = signedUrl;
        link.download = `report_${reportId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      alert(`PDF Access Error: ${err.message}`);
    } finally {
      setDownloadingId(null);
    }
  };

  // ── Logout ──────────────────────────────────────────────────────────────────
  const handleLogout = async () => {
    try {
      await fetch(`${apiBase}/api/admin/logout`, { method: 'POST', credentials: 'include' });
    } catch (e) {}
    navigate('/admin/login');
  };

  // ── Timer rendering helper ──────────────────────────────────────────────────
  const renderDeadline = (order) => {
    if (!order.deliveryDueAt || order.deliveryStatus === 'SENT') {
      return <span className="text-[#9A8B7A]">—</span>;
    }

    const dueTime = new Date(order.deliveryDueAt).getTime();
    const diff = dueTime - timeNow;

    if (diff <= 0) {
      return (
        <span className="text-red-500 font-bold animate-pulse uppercase text-[10px]">
          ⚠️ OVERDUE
        </span>
      );
    }

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    return (
      <span className="text-[#D4AF37] font-semibold font-mono text-[11px]">
        {hours.toString().padStart(2, '0')}:{mins.toString().padStart(2, '0')}:{secs.toString().padStart(2, '0')}
      </span>
    );
  };

  // ── Format amount helper ──────────────────────────────────────────────────
  const formatAmount = (paise) => {
    if (!paise) return '₹0';
    return `₹${(paise / 100).toFixed(2)}`;
  };

  // ── Format date helper ────────────────────────────────────────────────────
  const formatDate = (isoString) => {
    if (!isoString) return '—';
    return new Date(isoString).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'short',
      timeStyle: 'short',
    });
  };

  return (
    <div className="min-h-screen bg-[#0F0A06] text-[#F5F2E9] flex flex-col">
      
      {/* Navbar Header */}
      <header className="bg-[#1A1108] border-b border-[#D4AF37]/20 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl text-[#D4AF37]" style={{ fontFamily: 'serif' }}>ॐ</span>
          <div>
            <h1 className="text-sm font-extrabold tracking-widest uppercase text-[#F5F2E9]">
              AstroDev Dashboard
            </h1>
            <p className="text-[8px] text-[#9A8B7A] uppercase tracking-wider">
              Manual Fulfillment Panel
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="text-xs border border-red-500/30 hover:border-red-500 text-red-400 hover:text-red-300 py-1.5 px-4 rounded-lg transition-all"
        >
          Logout
        </button>
      </header>

      {/* Stats Counter Section */}
      <section className="p-6 grid grid-cols-2 md:grid-cols-5 gap-3">
        {[
          { label: 'Fulfillment Queue', count: stats.readyNotSent, color: 'border-yellow-500/40 text-yellow-400', desc: 'Paid & Ready' },
          { label: 'Delivered', count: stats.sent, color: 'border-green-500/40 text-green-400', desc: 'Sent to Customer' },
          { label: 'Generating', count: stats.generating, color: 'border-blue-500/40 text-blue-400', desc: 'Puppeteer Run' },
          { label: 'Failed', count: stats.failed, color: 'border-red-500/40 text-red-400', desc: 'Regen Required' },
          { label: 'Total Overdue', count: stats.overdue, color: 'border-red-700/60 text-red-500 bg-red-950/10', desc: 'Past 6hr Deadline' },
        ].map((s) => (
          <div key={s.label} className={`bg-[#1A1108] border ${s.color} rounded-xl p-4 flex flex-col justify-between shadow-md`}>
            <p className="text-[9px] text-[#9A8B7A] uppercase tracking-widest font-semibold">{s.label}</p>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-2xl font-black">{s.count}</span>
              <span className="text-[7px] text-[#9A8B7A]/70 uppercase tracking-widest">{s.desc}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Tabs Menu */}
      <section className="px-6 flex border-b border-[#D4AF37]/10">
        {[
          { key: 'queue', label: '📥 Fulfillment Queue', count: stats.readyNotSent },
          { key: 'generating', label: '⏳ Generating', count: stats.generating },
          { key: 'failed', label: '⚠️ Failed', count: stats.failed },
          { key: 'sent', label: '✅ Sent Archive', count: stats.sent },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`py-3 px-5 text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
              activeTab === t.key
                ? 'border-[#D4AF37] text-[#D4AF37] bg-[#1A1108]/30'
                : 'border-transparent text-[#9A8B7A] hover:text-[#C9B99A]'
            }`}
          >
            <span>{t.label}</span>
            <span className="bg-[#0F0A06] text-[#D4AF37] text-[9px] font-mono px-1.5 py-0.5 rounded-full border border-[#D4AF37]/25">
              {t.count}
            </span>
          </button>
        ))}
      </section>

      {/* Main Content Table Area */}
      <main className="flex-grow p-6">
        {loading ? (
          <div className="h-64 flex flex-col items-center justify-center gap-3">
            <span className="animate-spin text-2xl">⏳</span>
            <p className="text-[#9A8B7A] text-xs uppercase tracking-widest">Loading order queue…</p>
          </div>
        ) : error ? (
          <div className="bg-red-950/30 border border-red-500/20 p-5 rounded-xl text-center max-w-md mx-auto my-12">
            <p className="text-red-300 text-sm mb-3">⚠️ Error: {error}</p>
            <button onClick={fetchData} className="text-xs bg-[#D4AF37] text-[#0F0A06] py-1.5 px-4 rounded font-bold uppercase">
              Retry
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-[#1A1108] border border-[#D4AF37]/10 p-12 rounded-2xl text-center max-w-lg mx-auto my-12">
            <p className="text-3xl mb-3">🔭</p>
            <p className="text-[#C9B99A] text-sm font-semibold uppercase tracking-wider">No Orders Found</p>
            <p className="text-[#9A8B7A] text-xs mt-1">There are no paid orders matching the current filter.</p>
          </div>
        ) : (
          <div className="bg-[#1A1108] border border-[#D4AF37]/15 rounded-2xl overflow-x-auto shadow-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#0F0A06] border-b border-[#D4AF37]/10 text-[#9A8B7A] uppercase tracking-wider text-[9px]">
                  <th className="py-4 px-4 font-bold">Ref / Name</th>
                  <th className="py-4 px-4 font-bold">Contact Details</th>
                  <th className="py-4 px-4 font-bold">Birth Details</th>
                  <th className="py-4 px-4 font-bold">Payment Info</th>
                  <th className="py-4 px-4 font-bold">Time Left / Due</th>
                  <th className="py-4 px-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D4AF37]/10">
                {orders.map((o) => (
                  <tr key={o.id} className="hover:bg-[#0F0A06]/40 transition-colors">
                    
                    {/* ID / Name */}
                    <td className="py-4 px-4">
                      <p className="font-extrabold text-[#F5F2E9] text-sm">{o.name}</p>
                      <p className="text-[9px] font-mono text-[#D4AF37] mt-0.5">
                        ID: {o.id.split('-')[0].toUpperCase()}
                      </p>
                      <span className="text-[8px] px-1.5 py-0.5 mt-1 inline-block rounded bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37]">
                        {o.gender || 'Not specified'}
                      </span>
                    </td>

                    {/* Contacts */}
                    <td className="py-4 px-4">
                      <p className="font-semibold text-[#C9B99A]">{o.phone || 'No phone'}</p>
                      <p className="text-[#9A8B7A] text-[11px] mt-0.5">{o.email || 'No email'}</p>
                    </td>

                    {/* Birth info */}
                    <td className="py-4 px-4">
                      <p className="text-[#C9B99A] font-semibold">{o.birthPlace}</p>
                      <p className="text-[#9A8B7A] text-[10px] mt-0.5">
                        {o.birthDate ? o.birthDate.split('T')[0] : ''} &bull; {o.birthTime}
                      </p>
                    </td>

                    {/* Payment info */}
                    <td className="py-4 px-4">
                      <p className="font-bold text-[#F5F2E9]">{formatAmount(o.paymentAmount)}</p>
                      <p className="text-[#9A8B7A] text-[10px] mt-0.5 font-mono">ID: {o.razorpayPaymentId || '—'}</p>
                      <p className="text-[9px] text-[#9A8B7A] mt-0.5">{formatDate(o.paidAt)}</p>
                    </td>

                    {/* Deadline */}
                    <td className="py-4 px-4">
                      {renderDeadline(o)}
                      {o.deliveryStatus === 'SENT' ? (
                        <p className="text-green-400 text-[10px] mt-0.5">
                          Sent: {formatDate(o.deliveredAt)}
                        </p>
                      ) : (
                        <p className="text-[#9A8B7A] text-[10px] mt-0.5">
                          Due: {formatDate(o.deliveryDueAt)}
                        </p>
                      )}
                    </td>

                    {/* Action buttons */}
                    <td className="py-4 px-4 text-right space-y-1.5">
                      <div className="flex justify-end gap-1.5">
                        
                        {/* View PDF */}
                        {o.hasPdf ? (
                          <button
                            onClick={() => handlePdfAction(o.id, 'view')}
                            disabled={downloadingId === o.id}
                            className="bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/35 text-[#D4AF37] px-3 py-1.5 rounded text-[10px] uppercase font-bold transition-all disabled:opacity-50"
                          >
                            👁 View PDF
                          </button>
                        ) : (
                          <span className="text-[10px] text-[#9A8B7A] italic">PDF Generating...</span>
                        )}

                        {/* Download PDF */}
                        {o.hasPdf && (
                          <button
                            onClick={() => handlePdfAction(o.id, 'download')}
                            disabled={downloadingId === o.id}
                            className="bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/35 text-[#D4AF37] px-3 py-1.5 rounded text-[10px] uppercase font-bold transition-all disabled:opacity-50"
                          >
                            📥 Download
                          </button>
                        )}
                      </div>

                      {/* Mark as Sent (Fulfillment Queue ONLY) */}
                      {o.deliveryStatus === 'NOT_SENT' && o.reportStatus === 'READY' && (
                        <button
                          onClick={() => handleMarkSent(o.id)}
                          disabled={actionLoading === o.id}
                          className="bg-[#D4AF37] hover:brightness-110 text-[#0F0A06] w-full px-3 py-1.5 rounded text-[10px] uppercase font-black tracking-wider transition-all disabled:opacity-50"
                        >
                          {actionLoading === o.id ? 'Marking...' : 'Mark as Sent ✅'}
                        </button>
                      )}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
