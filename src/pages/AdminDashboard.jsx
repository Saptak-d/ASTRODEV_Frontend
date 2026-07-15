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
    totalReports: 0,
    totalUnpaid: 0,
  });
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'paid' | 'unpaid' | 'sent' | 'pending_delivery'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null); // reportId being marked as sent/unsent
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
      if (activeTab === 'paid') {
        queryParams = '?paymentStatus=PAID';
      } else if (activeTab === 'unpaid') {
        queryParams = '?paymentStatus=PENDING';
      } else if (activeTab === 'pending_delivery') {
        queryParams = '?deliveryStatus=NOT_SENT&paymentStatus=PAID';
      } else if (activeTab === 'sent') {
        queryParams = '?deliveryStatus=SENT';
      }

      const token = localStorage.getItem('admin_token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const [ordersRes, statsRes] = await Promise.all([
        fetch(`${apiBase}/api/admin/orders${queryParams}`, {
          headers,
          credentials: 'include'
        }),
        fetch(`${apiBase}/api/admin/orders/stats`, {
          headers,
          credentials: 'include'
        }),
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

  // ── Toggle Delivery Status (Sent/Not Sent) ───────────────────────────────
  const toggleDeliveryStatus = async (reportId, currentStatus) => {
    if (actionLoading) return;
    setActionLoading(reportId);
    try {
      const nextStatus = currentStatus === 'SENT' ? 'NOT_SENT' : 'SENT';
      const token = localStorage.getItem('admin_token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`${apiBase}/api/admin/orders/${reportId}/mark-sent`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ status: nextStatus }),
        credentials: 'include',
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to update delivery status');
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
      const token = localStorage.getItem('admin_token');
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`${apiBase}/api/admin/orders/${reportId}/pdf-url`, {
        headers,
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
      const token = localStorage.getItem('admin_token');
      const headers = {};
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      await fetch(`${apiBase}/api/admin/logout`, {
        method: 'POST',
        headers,
        credentials: 'include'
      });
    } catch (e) {}
    localStorage.removeItem('admin_token');
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
      <style>{`
        /* Hide scrollbars for cleaner horizontal tabs */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      {/* Navbar Header */}
      <header className="bg-[#1A1108] border-b border-[#D4AF37]/20 px-4 md:px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl md:text-3xl text-[#D4AF37]" style={{ fontFamily: 'serif' }}>ॐ</span>
          <div>
            <h1 className="text-xs md:text-sm font-extrabold tracking-widest uppercase text-[#F5F2E9]">
              AstroDev Dashboard
            </h1>
            <p className="text-[7px] md:text-[8px] text-[#9A8B7A] uppercase tracking-wider">
              Manual Fulfillment Panel
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="text-[10px] md:text-xs border border-red-500/30 hover:border-red-500 text-red-400 hover:text-red-300 py-1 md:py-1.5 px-3 md:px-4 rounded-lg transition-all whitespace-nowrap"
        >
          Logout
        </button>
      </header>

      {/* Stats Counter Section */}
      <section className="p-4 md:p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {[
          { label: 'All Registrations', count: stats.totalReports, color: 'border-amber-500/40 text-amber-400', desc: 'Total in DB' },
          { label: 'Paid Orders', count: stats.totalPaid, color: 'border-yellow-500/40 text-yellow-400', desc: 'Successful payments' },
          { label: 'Unpaid', count: stats.totalUnpaid, color: 'border-gray-500/40 text-gray-400', desc: 'Checkout pending' },
          { label: 'Pending Delivery', count: stats.readyNotSent, color: 'border-blue-500/40 text-blue-400', desc: 'Paid & NOT Sent' },
          { label: 'Delivered', count: stats.sent, color: 'border-green-500/40 text-green-400', desc: 'Sent to Customer' },
        ].map((s) => (
          <div key={s.label} className={`bg-[#1A1108] border ${s.color} rounded-xl p-3 md:p-4 flex flex-col justify-between shadow-md`}>
            <p className="text-[8px] md:text-[9px] text-[#9A8B7A] uppercase tracking-widest font-semibold">{s.label}</p>
            <div className="flex items-baseline justify-between mt-2">
              <span className="text-xl md:text-2xl font-black">{s.count}</span>
              <span className="text-[6px] md:text-[7px] text-[#9A8B7A]/70 uppercase tracking-widest">{s.desc}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Tabs Menu */}
      <section className="px-4 md:px-6 flex overflow-x-auto no-scrollbar border-b border-[#D4AF37]/10 whitespace-nowrap">
        {[
          { key: 'all', label: '📋 All', count: stats.totalReports },
          { key: 'paid', label: '💰 Paid', count: stats.totalPaid },
          { key: 'unpaid', label: '⏳ Unpaid', count: stats.totalUnpaid },
          { key: 'pending_delivery', label: '📥 Pending Delivery', count: stats.readyNotSent },
          { key: 'sent', label: '✅ Sent Archive', count: stats.sent },
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`py-3 px-4 text-[11px] md:text-xs font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-1.5 flex-shrink-0 ${
              activeTab === t.key
                ? 'border-[#D4AF37] text-[#D4AF37] bg-[#1A1108]/30'
                : 'border-transparent text-[#9A8B7A] hover:text-[#C9B99A]'
            }`}
          >
            <span>{t.label}</span>
            <span className="bg-[#0F0A06] text-[#D4AF37] text-[8px] md:text-[9px] font-mono px-1.5 py-0.5 rounded-full border border-[#D4AF37]/25">
              {t.count}
            </span>
          </button>
        ))}
      </section>

      {/* Main Content Table Area */}
      <main className="flex-grow p-4 md:p-6">
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
            <p className="text-[#C9B99A] text-sm font-semibold uppercase tracking-wider">No Registrations Found</p>
            <p className="text-[#9A8B7A] text-xs mt-1">There are no records matching the current filter.</p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block bg-[#1A1108] border border-[#D4AF37]/15 rounded-2xl overflow-x-auto shadow-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#0F0A06] border-b border-[#D4AF37]/10 text-[#9A8B7A] uppercase tracking-wider text-[9px]">
                    <th className="py-4 px-4 font-bold">Ref / Name</th>
                    <th className="py-4 px-4 font-bold">Contact Details</th>
                    <th className="py-4 px-4 font-bold">Birth Details</th>
                    <th className="py-4 px-4 font-bold">Paid or Not</th>
                    <th className="py-4 px-4 font-bold text-center">PDF Sent Status</th>
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
                          Ref: {o.id.split('-')[0].toUpperCase()}
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

                      {/* Paid or Not */}
                      <td className="py-4 px-4">
                        {o.paymentStatus === 'PAID' ? (
                          <span className="px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[9px] font-extrabold tracking-wider">
                            PAID
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-gray-500/10 border border-gray-500/20 text-gray-400 text-[9px] font-extrabold tracking-wider">
                            NOT PAID
                          </span>
                        )}
                      </td>

                      {/* PDF Sent Status Checkbox / Checkmark */}
                      <td className="py-4 px-4 text-center">
                        {o.deliveryStatus === 'SENT' ? (
                          <span 
                            className="text-lg text-green-400 font-bold select-none cursor-pointer hover:scale-110 active:scale-95 inline-block transition-transform" 
                            title="Sent (Click to uncheck)" 
                            onClick={() => toggleDeliveryStatus(o.id, o.deliveryStatus)}
                          >
                            ✅
                          </span>
                        ) : (
                          <input
                            type="checkbox"
                            checked={false}
                            onChange={() => toggleDeliveryStatus(o.id, o.deliveryStatus)}
                            className="w-4 h-4 rounded border-gray-600 bg-transparent text-yellow-600 focus:ring-yellow-500 cursor-pointer transition-all"
                            disabled={actionLoading === o.id}
                          />
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
                              👁 View
                            </button>
                          ) : (
                            <span className="text-[10px] text-[#9A8B7A] italic">PDF not available</span>
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
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card-Based View */}
            <div className="block md:hidden space-y-3">
              {orders.map((o) => (
                <div key={o.id} className="bg-[#1A1108] border border-[#D4AF37]/15 rounded-xl p-4 space-y-3 shadow-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-extrabold text-[#F5F2E9] text-sm">{o.name}</h3>
                      <p className="text-[9px] font-mono text-[#D4AF37] mt-0.5">
                        Ref: {o.id.split('-')[0].toUpperCase()}
                      </p>
                      <span className="text-[8px] px-1.5 py-0.5 mt-1 inline-block rounded bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37]">
                        {o.gender || 'Not specified'}
                      </span>
                    </div>
                    <div>
                      {o.paymentStatus === 'PAID' ? (
                        <span className="px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[8px] font-extrabold tracking-wider">
                          PAID
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-gray-500/10 border border-gray-500/20 text-gray-400 text-[8px] font-extrabold tracking-wider">
                          NOT PAID
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[10px] text-[#9A8B7A] border-t border-b border-[#D4AF37]/10 py-2">
                    <div>
                      <p className="text-[8px] uppercase font-bold text-[#D4AF37] tracking-wider mb-1">Contact</p>
                      <p className="font-semibold text-[#C9B99A] truncate">{o.phone || 'No phone'}</p>
                      <p className="text-[#9A8B7A] truncate">{o.email || 'No email'}</p>
                    </div>
                    <div>
                      <p className="text-[8px] uppercase font-bold text-[#D4AF37] tracking-wider mb-1">Birth Details</p>
                      <p className="font-semibold text-[#C9B99A] truncate">{o.birthPlace}</p>
                      <p className="text-[#9A8B7A]">
                        {o.birthDate ? o.birthDate.split('T')[0] : ''} &bull; {o.birthTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs pt-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] text-[#9A8B7A] uppercase font-bold tracking-wider">PDF Sent:</span>
                      {o.deliveryStatus === 'SENT' ? (
                        <span 
                          className="text-base text-green-400 font-bold select-none cursor-pointer hover:scale-110 active:scale-95 inline-block transition-transform" 
                          title="Sent (Click to uncheck)" 
                          onClick={() => toggleDeliveryStatus(o.id, o.deliveryStatus)}
                        >
                          ✅ Sent
                        </span>
                      ) : (
                        <label className="flex items-center gap-1.5 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={false}
                            onChange={() => toggleDeliveryStatus(o.id, o.deliveryStatus)}
                            className="w-3.5 h-3.5 rounded border-gray-600 bg-transparent text-yellow-600 focus:ring-yellow-500 cursor-pointer transition-all"
                            disabled={actionLoading === o.id}
                          />
                          <span className="text-[#9A8B7A] text-[10px]">Mark Sent</span>
                        </label>
                      )}
                    </div>

                    <div className="flex gap-1.5">
                      {o.hasPdf ? (
                        <>
                          <button
                            onClick={() => handlePdfAction(o.id, 'view')}
                            disabled={downloadingId === o.id}
                            className="bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/35 text-[#D4AF37] px-2 py-1 rounded text-[9px] uppercase font-bold transition-all disabled:opacity-50"
                          >
                            👁 View
                          </button>
                          <button
                            onClick={() => handlePdfAction(o.id, 'download')}
                            disabled={downloadingId === o.id}
                            className="bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/35 text-[#D4AF37] px-2 py-1 rounded text-[9px] uppercase font-bold transition-all disabled:opacity-50"
                          >
                            📥 Download
                          </button>
                        </>
                      ) : (
                        <span className="text-[9px] text-[#9A8B7A] italic">PDF N/A</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
