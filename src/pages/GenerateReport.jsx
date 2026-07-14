import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BirthForm from '../components/BirthForm';
import LoadingScreen from '../components/LoadingScreen';

export default function GenerateReport() {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  const navigate = useNavigate();

  const apiBase = import.meta.env.VITE_API_BASE_URL || 'https://astrodev-backend.onrender.com';

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      // Step 1: Create pending report in DB (paymentStatus = PENDING, reportStatus = WAITING_PAYMENT)
      const { data } = await axios.post(`${apiBase}/api/reports/create`, formData);
      const { reportId } = data;

      // Navigate directly to the secure checkout flow
      navigate(`/checkout/${reportId}`, {
        state: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          birthDate: formData.birthDate,
          birthTime: formData.birthTime,
          birthPlace: formData.birthPlace,
        },
      });

    } catch (err) {
      console.error('Report creation error:', err);
      setLoading(false);
      setError(
        err.response?.data?.error?.message ||
        err.message ||
        'कुंडली विवरण दर्ज करने में समस्या आई। कृपया पुनः प्रयास करें।'
      );
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-[calc(100vh-120px)] bg-[#F5F2E9] flex flex-col items-center justify-center px-4 py-10">

      {/* Compact header */}
      <div className="text-center mb-6">
        <div className="text-3xl text-[#D4AF37] mb-2" style={{ fontFamily: 'serif' }}>ॐ</div>
        <h1 className="text-2xl font-extrabold tracking-widest text-[#2A1B18] uppercase mb-1">
          जन्म कुंडली
        </h1>
        <p className="text-xs text-[#9A8B7A] tracking-wider">
          अपना विवरण भरें · पंडितजी द्वारा हस्तलिखित जन्म कुंडली प्राप्त करें
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="w-full max-w-md mb-4 flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <BirthForm onSubmit={handleFormSubmit} loading={loading} />

      <p className="mt-5 text-[#B5A898] text-[10px] italic tracking-wider">
        🕉 भुगतान के बाद आपकी जन्म कुंडली सुरक्षित रूप से तैयार की जाएगी
      </p>
    </div>
  );
}
