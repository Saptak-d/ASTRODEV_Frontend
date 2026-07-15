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
    preferredLanguage: 'hindi',
  });
  const [hours, setHours] = useState('12');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [ampm, setAmpm] = useState('AM');

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const MONTHS = [
    { value: '01', label: 'जनवरी (January)' },
    { value: '02', label: 'फ़रवरी (February)' },
    { value: '03', label: 'मार्च (March)' },
    { value: '04', label: 'अप्रैल (April)' },
    { value: '05', label: 'मई (May)' },
    { value: '06', label: 'जून (June)' },
    { value: '07', label: 'जुलाई (July)' },
    { value: '08', label: 'अगस्त (August)' },
    { value: '09', label: 'सितंबर (September)' },
    { value: '10', label: 'अक्टूबर (October)' },
    { value: '11', label: 'नवंबर (November)' },
    { value: '12', label: 'दिसंबर (December)' },
  ];

  const YEARS = Array.from({ length: 117 }, (_, i) => (2026 - i).toString());

  const handleDateChange = (type, val) => {
    let newDay = day;
    let newMonth = month;
    let newYear = year;

    if (type === 'day') {
      newDay = val;
      setDay(val);
    } else if (type === 'month') {
      newMonth = val;
      setMonth(val);
    } else if (type === 'year') {
      newYear = val;
      setYear(val);
    }

    if (newDay && newMonth && newYear) {
      setFormData(prev => ({
        ...prev,
        birthDate: `${newYear}-${newMonth}-${newDay}`
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        birthDate: ''
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!day || !month || !year) {
      alert("कृपया जन्म तिथि का चयन करें।");
      return;
    }

    const yearNum = parseInt(year);
    const monthNum = parseInt(month);
    const dayNum = parseInt(day);

    const testDate = new Date(yearNum, monthNum - 1, dayNum);
    if (
      testDate.getFullYear() !== yearNum ||
      testDate.getMonth() !== monthNum - 1 ||
      testDate.getDate() !== dayNum
    ) {
      alert("कृपया एक वैध जन्म तिथि चुनें। (Selected date is invalid)");
      return;
    }

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

  const selectStyle = { color: '#111827', backgroundColor: '#ffffff' };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-md mx-auto bg-white p-5 border border-gray-100 shadow-xl rounded-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#1E1410] to-transparent"></div>

      <div className="text-center space-y-0.5 pb-1.5 border-b border-gray-100">
        <h2 className="text-xs font-extrabold text-gray-800 tracking-widest uppercase">
          {t('form.title')}
        </h2>
        <p className="text-[8px] text-gray-400 uppercase tracking-wider font-sans">
          {t('form.subtitle')}
        </p>
      </div>

      {/* Full Name */}
      <div className="space-y-1">
        <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest">
          {t('form.name.label')}
        </label>
        <input
          required
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 text-xs bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#1E1410] focus:border-[#1E1410] outline-none placeholder-gray-400 transition-all font-sans"
          placeholder={t('form.name.placeholder')}
        />
      </div>

      {/* Email + Phone */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        <div className="space-y-1">
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest">
            {t('form.email.label')}
          </label>
          <input
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 text-xs bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#1E1410] focus:border-[#1E1410] outline-none placeholder-gray-400 transition-all font-sans"
            placeholder={t('form.email.placeholder')}
          />
        </div>
        <div className="space-y-1">
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest">
            {t('form.phone.label')}
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 text-xs bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#1E1410] focus:border-[#1E1410] outline-none placeholder-gray-400 transition-all font-sans"
            placeholder={t('form.phone.placeholder')}
          />
        </div>
      </div>

      {/* Gender */}
      <div className="space-y-1">
        <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest">
          {t('form.gender.label')} <span className="text-[#1E1410]">*</span>
        </label>
        <div className="flex gap-2">
          {genderOptions.map(({ value, icon, labelKey }) => (
            <label
              key={value}
              className={`flex-1 flex items-center justify-center gap-1 sm:gap-1.5 py-2 border rounded-lg cursor-pointer text-[10px] sm:text-xs font-bold transition select-none font-sans whitespace-nowrap
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

      {/* Report Language */}
      <div className="space-y-1">
        <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest">
          Report Language · रिपोर्ट की भाषा <span className="text-[#1E1410]">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { value: 'hindi', label: 'हिन्दी (Hindi)' },
            { value: 'english', label: 'English' },
            { value: 'sanskrit', label: 'संस्कृत (Sanskrit)' },
            { value: 'bengali', label: 'বাংলা (Bengali)' }
          ].map((lang) => (
            <label
              key={lang.value}
              className={`flex items-center justify-center gap-1.5 py-2 border rounded-lg cursor-pointer text-xs font-bold transition select-none font-sans
                ${formData.preferredLanguage === lang.value
                  ? 'bg-[#1E1410] text-[#F5F2E9] border-[#1E1410] shadow-sm'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-[#1E1410]/50 hover:bg-gray-100'
                }`}
            >
              <input
                type="radio"
                name="preferredLanguage"
                value={lang.value}
                checked={formData.preferredLanguage === lang.value}
                onChange={handleChange}
                className="sr-only"
                required
              />
              {lang.label}
            </label>
          ))}
        </div>
      </div>

      {/* Date of Birth */}
      <div className="space-y-1">
        <div className="flex justify-between items-baseline">
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest">
            {t('form.dob.label')}
          </label>
          <span className="text-[7px] text-gray-400 font-sans">{t('form.dob.hint')}</span>
        </div>
        <div className="flex gap-2">
          {/* Day Dropdown */}
          <div className="flex-1">
            <select
              required
              value={day}
              onChange={(e) => handleDateChange('day', e.target.value)}
              style={selectStyle}
              className="w-full px-2 py-2 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#1E1410] focus:border-[#1E1410] outline-none cursor-pointer font-sans"
            >
              <option value="">दिन (Day)</option>
              {Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0')).map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Month Dropdown */}
          <div className="flex-[1.5]">
            <select
              required
              value={month}
              onChange={(e) => handleDateChange('month', e.target.value)}
              style={selectStyle}
              className="w-full px-2 py-2 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#1E1410] focus:border-[#1E1410] outline-none cursor-pointer font-sans"
            >
              <option value="">महीना (Month)</option>
              {MONTHS.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
          </div>

          {/* Year Dropdown */}
          <div className="flex-1">
            <select
              required
              value={year}
              onChange={(e) => handleDateChange('year', e.target.value)}
              style={selectStyle}
              className="w-full px-2 py-2 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#1E1410] focus:border-[#1E1410] outline-none cursor-pointer font-sans"
            >
              <option value="">वर्ष (Year)</option>
              {YEARS.map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Time of Birth */}
      <div className="space-y-1">
        <div className="flex justify-between items-baseline">
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest">
            {t('form.tob.label')}
          </label>
          <span className="text-[7px] text-gray-400 font-sans">{t('form.tob.hint')}</span>
        </div>

        <div className="flex gap-1 sm:gap-1.5 items-end">
          {/* Hours */}
          <div className="flex-1 flex flex-col items-center gap-0.5">
            <span className="text-[7px] font-bold text-gray-400 uppercase tracking-wider">HH</span>
            <select
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              style={selectStyle}
              className="w-full px-1 py-2 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#1E1410] focus:border-[#1E1410] outline-none cursor-pointer font-sans"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
                <option key={h} value={h.toString().padStart(2, '0')}>{h.toString().padStart(2, '0')}</option>
              ))}
            </select>
          </div>

          <span className="text-gray-400 font-bold pb-2">:</span>

          {/* Minutes */}
          <div className="flex-1 flex flex-col items-center gap-0.5">
            <span className="text-[7px] font-bold text-gray-400 uppercase tracking-wider">MM</span>
            <select
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              style={selectStyle}
              className="w-full px-1 py-2 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#1E1410] focus:border-[#1E1410] outline-none cursor-pointer font-sans"
            >
              {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')).map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <span className="text-gray-400 font-bold pb-2">:</span>

          {/* Seconds */}
          <div className="flex-1 flex flex-col items-center gap-0.5">
            <span className="text-[7px] font-bold text-gray-400 uppercase tracking-wider">SS</span>
            <select
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              style={selectStyle}
              className="w-full px-1 py-2 text-xs border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#1E1410] focus:border-[#1E1410] outline-none cursor-pointer font-sans"
            >
              {Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0')).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* AM / PM */}
          <div className="flex flex-col items-center gap-0.5 shrink-0">
            <span className="text-[7px] font-bold text-gray-400 uppercase tracking-wider invisible">·</span>
            <div className="flex rounded-lg border border-gray-200 overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => setAmpm('AM')}
                className={`py-2 px-2 sm:px-3 text-xs font-bold transition font-sans ${ampm === 'AM' ? 'bg-[#1E1410] text-[#F5F2E9]' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
              >
                AM
              </button>
              <div className="w-px bg-gray-200"></div>
              <button
                type="button"
                onClick={() => setAmpm('PM')}
                className={`py-2 px-2 sm:px-3 text-xs font-bold transition font-sans ${ampm === 'PM' ? 'bg-[#1E1410] text-[#F5F2E9]' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
              >
                PM
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Birth Place */}
      <div className="space-y-1">
        <div className="flex justify-between items-baseline">
          <label className="block text-[9px] font-bold text-gray-500 uppercase tracking-widest">
            {t('form.birthplace.label')}
          </label>
          <span className="text-[7px] text-gray-400 font-sans">{t('form.birthplace.hint')}</span>
        </div>
        <input
          required
          type="text"
          name="birthPlace"
          value={formData.birthPlace}
          onChange={handleChange}
          className="w-full px-3 py-2 text-xs bg-gray-50 text-gray-900 border border-gray-200 rounded-lg focus:ring-1 focus:ring-[#1E1410] focus:border-[#1E1410] outline-none placeholder-gray-400 transition-all font-sans"
          placeholder={t('form.birthplace.placeholder')}
        />
      </div>

      {/* Submit */}
      <div className="pt-1 text-center space-y-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#1E1410] text-[#F5F2E9] py-2.5 rounded-lg text-xs font-extrabold tracking-widest hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 shadow-md uppercase font-sans cursor-pointer"
        >
          {loading ? t('form.submit.loading') : t('form.submit.cta')}
        </button>

        <p className="text-[8px] text-gray-400 font-sans tracking-widest uppercase">
          {t('form.ssl')}
        </p>
      </div>
    </form>
  );
}
