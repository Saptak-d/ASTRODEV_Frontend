import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BirthForm from '../components/BirthForm';
import LoadingScreen from '../components/LoadingScreen';
import { useLanguage } from '../context/LanguageContext';

export default function GenerateReport() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
      const response = await axios.post(`${apiBase}/api/reports/create`, formData);
      const { reportId } = response.data;

      // On successful database entry, redirect to report viewer
      navigate(`/report/${reportId}`);
    } catch (err) {
      console.error('Report compilation error:', err);
      setError(err.response?.data?.error?.message || 'Unable to align with your celestial path. Please check your birth details.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-widest text-[#2A1B18] uppercase">{t('generate.title')}</h1>
        <p className="text-sm text-gray-500 italic mt-1">{t('generate.subtitle')}</p>
      </div>

      {error && (
        <div className="max-w-xl mx-auto mb-6 bg-red-50 border border-red-200 text-red-800 p-4 rounded text-sm text-center">
          <strong>{t('generate.error')}</strong> {error}
        </div>
      )}

      <BirthForm onSubmit={handleFormSubmit} loading={loading} />
    </div>
  );
}
