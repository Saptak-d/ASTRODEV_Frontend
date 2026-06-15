import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function BirthForm({ onSubmit, loading }) {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    birthPlace: '',
    gender: '',
  });
  const [hours, setHours] = useState('12');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [ampm, setAmpm] = useState('AM');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let h = parseInt(hours);
    if (ampm === 'PM' && h < 12) h += 12;
    if (ampm === 'AM' && h === 12) h = 0;
    const timeString = `${h.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    onSubmit({
      ...formData,
      birthTime: timeString
    });
  };

  const genderOptions = [
    { value: 'Male',   icon: '♂', labelKey: 'form.gender.male' },
    { value: 'Female', icon: '♀', labelKey: 'form.gender.female' },
    { value: 'Other',  icon: '⚬', labelKey: 'form.gender.other' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto bg-white p-6 border border-gray-100 shadow-xl rounded-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#1E1410] to-transparent"></div>
      
      <div className="text-center space-y-1 pb-2 border-b border-gray-100">
        <h2 className="text-sm font-extrabold text-gray-800 tracking-widest uppercase">
          {t('form.title')}
        </h2>
        <p className="text-[9px] text-gray-400 uppercase tracking-wider font-sans">
          {t('form.subtitle')}
        </p>
      </div>

      {/* Full Name */}
      <div className="space-y-1.5">
        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          {t('form.name.label')}
        </label>
        <input
          required
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3.5 py-2.5 text-xs bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#1E1410] focus:border-[#1E1410] outline-none placeholder-gray-400 transition-all font-sans"
          placeholder={t('form.name.placeholder')}
        />
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            {t('form.email.label')}
          </label>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-xs bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#1E1410] focus:border-[#1E1410] outline-none placeholder-gray-400 transition-all font-sans"
            placeholder={t('form.email.placeholder')}
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            {t('form.phone.label')}
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-xs bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#1E1410] focus:border-[#1E1410] outline-none placeholder-gray-400 transition-all font-sans"
            placeholder={t('form.phone.placeholder')}
          />
        </div>
      </div>

      {/* Gender */}
      <div className="space-y-1.5">
        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          {t('form.gender.label')} <span className="text-[#1E1410]">*</span>
        </label>
        <div className="flex gap-2">
          {genderOptions.map(({ value, icon, labelKey }) => (
            <label
              key={value}
              className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-2.5 border rounded-lg cursor-pointer text-[11px] sm:text-xs font-bold transition select-none font-sans whitespace-nowrap
                ${formData.gender === value
                  ? 'bg-[#1E1410] text-[#F5F2E9] border-[#1E1410] shadow-sm'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-[#1E1410]/50 hover:bg-gray-100'
                }`}
            >
              <input
                type="radio"
                name="gender"
                value={value}
                checked={formData.gender === value}
                onChange={handleChange}
                className="sr-only"
                required
              />
              {icon} {t(labelKey)}
            </label>
          ))}
        </div>
      </div>

      {/* Date of Birth */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-baseline">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            {t('form.dob.label')}
          </label>
          <span className="text-[8px] text-gray-400 font-sans">{t('form.dob.hint')}</span>
        </div>
        <input
          required
          type="date"
          name="birthDate"
          value={formData.birthDate}
          onChange={handleChange}
          min="1900-01-01"
          max="2099-12-31"
          className="w-full px-3.5 py-2.5 text-xs bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#1E1410] focus:border-[#1E1410] outline-none transition-all font-sans"
        />
      </div>

      {/* Time of Birth */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-baseline">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            {t('form.tob.label')}
          </label>
          <span className="text-[8px] text-gray-400 font-sans">{t('form.tob.hint')}</span>
        </div>
        <div className="flex gap-1.5 sm:gap-2 items-center">
          <select
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-full px-1.5 sm:px-2.5 py-2.5 text-xs bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#1E1410] focus:border-[#1E1410] outline-none text-center appearance-none cursor-pointer font-sans"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
              <option key={h} className="bg-white text-gray-900" value={h.toString().padStart(2, '0')}>{h.toString().padStart(2, '0')}</option>
            ))}
          </select>
          <span className="text-gray-400 font-bold">:</span>
          <select
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
            className="w-full px-1.5 sm:px-2.5 py-2.5 text-xs bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#1E1410] focus:border-[#1E1410] outline-none text-center appearance-none cursor-pointer font-sans"
          >
            {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')).map(m => (
              <option key={m} className="bg-white text-gray-900" value={m}>{m}</option>
            ))}
          </select>
          <span className="text-gray-400 font-bold">:</span>
          <select
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
            className="w-full px-1.5 sm:px-2.5 py-2.5 text-xs bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#1E1410] focus:border-[#1E1410] outline-none text-center appearance-none cursor-pointer font-sans"
          >
            {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')).map(s => (
              <option key={s} className="bg-white text-gray-900" value={s}>{s}</option>
            ))}
          </select>
          <div className="flex w-full ml-0.5 sm:ml-1 rounded-lg border border-gray-200 overflow-hidden shadow-sm bg-gray-50 shrink-0">
            <button
              type="button"
              onClick={() => setAmpm('AM')}
              className={`flex-1 py-2.5 px-1 sm:px-2 text-xs font-bold transition font-sans ${ampm === 'AM' ? 'bg-[#1E1410] text-[#F5F2E9]' : 'bg-transparent text-gray-500 hover:bg-gray-100'}`}
            >
              AM
            </button>
            <div className="w-px bg-gray-200"></div>
            <button
              type="button"
              onClick={() => setAmpm('PM')}
              className={`flex-1 py-2.5 px-1 sm:px-2 text-xs font-bold transition font-sans ${ampm === 'PM' ? 'bg-[#1E1410] text-[#F5F2E9]' : 'bg-transparent text-gray-500 hover:bg-gray-100'}`}
            >
              PM
            </button>
          </div>
        </div>
      </div>

      {/* Birth Place */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-baseline">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            {t('form.birthplace.label')}
          </label>
          <span className="text-[8px] text-gray-400 font-sans">{t('form.birthplace.hint')}</span>
        </div>
        <input
          required
          type="text"
          name="birthPlace"
          value={formData.birthPlace}
          onChange={handleChange}
          className="w-full px-3.5 py-2.5 text-xs bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#1E1410] focus:border-[#1E1410] outline-none placeholder-gray-400 transition-all font-sans"
          placeholder={t('form.birthplace.placeholder')}
        />
      </div>

      {/* Submit */}
      <div className="pt-1 text-center space-y-3">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1E1410] text-[#F5F2E9] py-3.5 rounded-lg text-xs font-extrabold tracking-widest hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 shadow-md uppercase font-sans cursor-pointer"
        >
          {loading ? t('form.submit.loading') : t('form.submit.cta')}
        </button>

        <p className="text-[8.5px] text-gray-400 font-sans tracking-widest uppercase">
          {t('form.ssl')}
        </p>
      </div>
    </form>
  );
}
