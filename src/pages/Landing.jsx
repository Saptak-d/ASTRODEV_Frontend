import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import BirthForm from '../components/BirthForm';
import SpaceAstrologyConnector from '../components/SpaceAstrologyConnector';
import LoadingScreen from '../components/LoadingScreen';
import { storePdf } from '../utils/pdfCache';
import { useLanguage } from '../context/LanguageContext';

export default function Landing() {
  const [hoveredSector, setHoveredSector] = useState(null);
  const [hoveredZodiac, setHoveredZodiac] = useState(null);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const { t } = useLanguage();
  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash === '#services') {
      const element = document.getElementById('services');
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState(null);
  const [loadStep, setLoadStep] = useState(0);
  const [loadName, setLoadName] = useState('');

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    setLoadName(formData.name || '');
    setLoadStep(0);

    const apiBase = import.meta.env.VITE_API_BASE_URL || 'https://astrodev-backend.onrender.com';
    try {
      setLoadStep(1);
      const response = await axios.post(`${apiBase}/api/reports/create`, formData);
      const { reportId } = response.data;

      setLoadStep(2);
      await new Promise(r => setTimeout(r, 300));

      // ── Redirect to secure payment checkout ───────────────────────────────
      // Do NOT generate PDF here — generation only happens AFTER payment is verified.
      navigate(`/checkout/${reportId}`, {
        state: {
          name:       formData.name,
          email:      formData.email,
          phone:      formData.phone,
          birthDate:  formData.birthDate,
          birthTime:  formData.birthTime,
          birthPlace: formData.birthPlace,
          preferredLanguage: formData.preferredLanguage,
        },
      });
    } catch (err) {
      console.error('Report compilation error:', err);
      setLoading(false);
      setError(err.response?.data?.error?.message || 'Unable to align with your celestial path.');
    }
  };


  const zodiacs = [
    { sign: '♈', nameKey: 'zodiac.aries.name',       nameHi: 'मेष',      element: 'Fire',  rulerKey: 'ruler.mars',    descKey: 'zodiac.aries.desc' },
    { sign: '♉', nameKey: 'zodiac.taurus.name',      nameHi: 'वृषभ',     element: 'Earth', rulerKey: 'ruler.venus',   descKey: 'zodiac.taurus.desc' },
    { sign: '♊', nameKey: 'zodiac.gemini.name',      nameHi: 'मिथुन',    element: 'Air',   rulerKey: 'ruler.mercury', descKey: 'zodiac.gemini.desc' },
    { sign: '♋', nameKey: 'zodiac.cancer.name',      nameHi: 'कर्क',     element: 'Water', rulerKey: 'ruler.moon',    descKey: 'zodiac.cancer.desc' },
    { sign: '♌', nameKey: 'zodiac.leo.name',         nameHi: 'सिंह',     element: 'Fire',  rulerKey: 'ruler.sun',     descKey: 'zodiac.leo.desc' },
    { sign: '♍', nameKey: 'zodiac.virgo.name',       nameHi: 'कन्या',    element: 'Earth', rulerKey: 'ruler.mercury', descKey: 'zodiac.virgo.desc' },
    { sign: '♎', nameKey: 'zodiac.libra.name',       nameHi: 'तुला',     element: 'Air',   rulerKey: 'ruler.venus',   descKey: 'zodiac.libra.desc' },
    { sign: '♏', nameKey: 'zodiac.scorpio.name',     nameHi: 'वृश्चिक',  element: 'Water', rulerKey: 'ruler.mars',    descKey: 'zodiac.scorpio.desc' },
    { sign: '♐', nameKey: 'zodiac.sagittarius.name', nameHi: 'धनु',      element: 'Fire',  rulerKey: 'ruler.jupiter', descKey: 'zodiac.sagittarius.desc' },
    { sign: '♑', nameKey: 'zodiac.capricorn.name',   nameHi: 'मकर',      element: 'Earth', rulerKey: 'ruler.saturn',  descKey: 'zodiac.capricorn.desc' },
    { sign: '♒', nameKey: 'zodiac.aquarius.name',    nameHi: 'कुम्भ',    element: 'Air',   rulerKey: 'ruler.saturn',  descKey: 'zodiac.aquarius.desc' },
    { sign: '♓', nameKey: 'zodiac.pisces.name',      nameHi: 'मीन',      element: 'Water', rulerKey: 'ruler.jupiter', descKey: 'zodiac.pisces.desc' },
  ];

  const planets = [
    { symbol: '☉', nameKey: 'planet.sun.name',     sanskrit: 'सूर्य',  rulesKey: 'planet.sun.rules',     color: '#E8730A', bg: 'from-orange-50 to-amber-50' },
    { symbol: '☽', nameKey: 'planet.moon.name',    sanskrit: 'चन्द्र', rulesKey: 'planet.moon.rules',    color: '#94A3B8', bg: 'from-slate-50 to-gray-50'  },
    { symbol: '♂', nameKey: 'planet.mars.name',    sanskrit: 'मंगल',   rulesKey: 'planet.mars.rules',    color: '#B91C1C', bg: 'from-red-50 to-rose-50'    },
    { symbol: '☿', nameKey: 'planet.mercury.name', sanskrit: 'बुध',    rulesKey: 'planet.mercury.rules', color: '#15803D', bg: 'from-green-50 to-emerald-50'},
    { symbol: '♃', nameKey: 'planet.jupiter.name', sanskrit: 'गुरु',   rulesKey: 'planet.jupiter.rules', color: '#CA8A04', bg: 'from-yellow-50 to-amber-50' },
    { symbol: '♀', nameKey: 'planet.venus.name',   sanskrit: 'शुक्र',  rulesKey: 'planet.venus.rules',   color: '#DB2777', bg: 'from-pink-50 to-rose-50'   },
    { symbol: '♄', nameKey: 'planet.saturn.name',  sanskrit: 'शनि',    rulesKey: 'planet.saturn.rules',  color: '#3730A3', bg: 'from-indigo-50 to-violet-50'},
  ];

  const elementKeyMap = { Fire: 'zodiac.element.fire', Earth: 'zodiac.element.earth', Air: 'zodiac.element.air', Water: 'zodiac.element.water' };
  const elementColors = { Fire: '#E8730A', Earth: '#78716C', Air: '#0EA5E9', Water: '#6366F1' };

  const services = [
    {
      id: 'kundli',
      titleKey: 'services.kundli.title',
      titleHi: 'कुंडली',
      icon: '☸',
      descKey: 'services.kundli.desc',
      ctaKey: 'services.kundli.cta',
      link: '/generate',
      active: true
    },
    {
      id: 'milan',
      titleKey: 'services.milan.title',
      titleHi: 'कुंडली मिलान',
      icon: '⚭',
      descKey: 'services.milan.desc',
      disabled: true
    },
    {
      id: 'varshphal',
      titleKey: 'services.varshaphal.title',
      titleHi: 'वर्षफल',
      icon: '⏳',
      descKey: 'services.varshaphal.desc',
      disabled: true
    },
    {
      id: 'remedies',
      titleKey: 'services.remedies.title',
      titleHi: 'उपाय',
      icon: '💎',
      descKey: 'services.remedies.desc',
      disabled: true
    }
  ];

  const heroFeatures = [
    { nameKey: 'hero.feature.genuine', descKey: 'hero.feature.genuine.desc' },
    { nameKey: 'hero.feature.experts', descKey: 'hero.feature.experts.desc' },
    { nameKey: 'hero.feature.trusted', descKey: 'hero.feature.trusted.desc' },
    { nameKey: 'hero.feature.detailed', descKey: 'hero.feature.detailed.desc' },
    { nameKey: 'hero.feature.privacy', descKey: 'hero.feature.privacy.desc' },
    { nameKey: 'hero.feature.instant', descKey: 'hero.feature.instant.desc' },
  ];

  const wheelSectors = zodiacs.map((z, i) => ({
    name: t(z.nameKey).toUpperCase(),
    nameHi: z.nameHi,
    symbol: z.sign,
    angle: i * 30,
    element: z.element,
    ruler: t(z.rulerKey)
  }));


  return (
    <div className="bg-[#F5F2E9] text-[#2A1B18] min-h-screen relative overflow-hidden font-serif">
      <style>{`
        @keyframes rotateCosmic {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes starGlow {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 1; }
        }
        @keyframes omGlow {
          0%, 100% { text-shadow: 0 0 10px rgba(212,175,55,0.2); opacity: 0.6; }
          50% { text-shadow: 0 0 40px rgba(212,175,55,0.9), 0 0 15px rgba(212,175,55,0.5); opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .cosmic-rotate {
          animation: rotateCosmic 150s linear infinite;
          transform-origin: center center;
        }
        .cosmic-rotate:hover {
          animation-play-state: paused;
        }
        .float-slow { animation: floatSlow 7s ease-in-out infinite; }
        .star-pulse { animation: starGlow 2.5s ease-in-out infinite; }
        .om-glow { animation: omGlow 3s ease-in-out infinite; }
        .gold-shimmer {
          background: linear-gradient(90deg, #D4AF37, #F5E193, #D4AF37, #B8960F);
          background-size: 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
        .fade-up { animation: fadeUp 0.6s ease both; }
        .sector-label { transition: all 0.2s ease; }
        .sector-group:hover .sector-label { fill: #D4AF37 !important; }
        .card-hover {
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(212,175,55,0.12);
        }
      `}</style>

      {/* SUBTLE BG WATERMARKS */}
      <div className="absolute top-20 left-6 text-[12rem] text-gray-300 opacity-10 pointer-events-none select-none leading-none">ॐ</div>
      <div className="absolute bottom-40 right-6 text-[10rem] text-gray-300 opacity-10 pointer-events-none select-none leading-none">🔱</div>

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section className="max-w-[90rem] mx-auto px-6 lg:px-12 py-12 lg:py-6 relative z-10" style={{ minHeight: 'calc(100vh - 57px)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center h-full">

          {/* Left: Hero Copy */}
          <div className="space-y-6 text-center lg:text-left flex flex-col justify-center h-full py-4">
            <div>
              <span className="inline-block text-[#D4AF37] text-[10px] font-sans font-bold uppercase tracking-[0.25em] border border-[#D4AF37]/30 px-3.5 py-1 rounded-full bg-[#1E1410]/5 mb-3.5">
                {t('hero.badge')}
              </span>

              <h1 className="text-5xl md:text-6xl font-black tracking-widest text-[#2A1B18] uppercase leading-none font-serif">
                ASTRO<span className="gold-shimmer">DEV</span>
              </h1>
            </div>

            <p className="text-lg text-[#4A3E3D] italic leading-relaxed max-w-lg mx-auto lg:mx-0 font-serif">
              {t('hero.tagline')}
            </p>

            {/* Feature bullets */}
            <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto lg:mx-0">
              {heroFeatures.map(item => (
                <div key={item.nameKey} className="flex items-start gap-2.5 p-2 bg-white/60 border border-[#D4AF37]/15 rounded-lg text-left shadow-sm hover:border-[#D4AF37]/40 hover:bg-white transition-all group duration-300">
                  <span className="text-[#D4AF37] text-sm mt-0.5 group-hover:scale-110 transition-transform">✦</span>
                  <div>
                    <h4 className="text-xs font-bold text-[#2A1B18] font-sans leading-none mb-0.5">{t(item.nameKey)}</h4>
                    <p className="text-[9px] text-gray-500 font-sans tracking-wide leading-none">{t(item.descKey)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Premium Price Tag Badge */}
            <div className="pt-2 max-w-xs mx-auto lg:mx-0 w-full">
              <div className="bg-[#1E1410] text-[#F5F2E9] border border-[#D4AF37]/35 rounded-xl p-3.5 flex items-center justify-between shadow-xl relative overflow-hidden group hover:border-[#D4AF37]/60 transition-colors">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-full blur-xl pointer-events-none"></div>
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-2xl font-extrabold text-[#D4AF37] font-sans tracking-tight">₹99</span>
                    <span className="text-xs text-gray-400 line-through font-sans">₹499</span>
                  </div>
                  <p className="text-[10px] text-amber-100/60 font-sans tracking-wide uppercase mt-0.5">{t('hero.price.label')}</p>
                </div>
                <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[9px] font-sans font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.05)]">
                  {t('hero.price.off')}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Direct Kundli Form */}
          <div className="flex justify-center lg:justify-end items-center relative w-full">
            <div className="absolute inset-0 bg-[#D4AF37] opacity-10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="relative z-20 w-full max-w-xl">
              {error && (
                <div className="absolute -top-12 left-0 right-0 bg-red-50 border border-red-200 text-red-800 p-2 rounded text-xs text-center shadow">
                  <strong>Error:</strong> {error}
                </div>
              )}
              <BirthForm onSubmit={handleFormSubmit} loading={loading} />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ SERVICES ══════════════════════ */}
      <section id="services" className="bg-[#1E1410] text-[#F5F2E9] py-24 px-6 relative z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-center text-[20rem] leading-none">☸</div>

        <div className="max-w-6xl mx-auto relative">
          <div className="text-center mb-16">
            <span className="text-[#D4AF37] text-xs font-sans font-bold uppercase tracking-[0.3em] block mb-3">{t('services.badge')}</span>
            <h2 className="text-4xl font-extrabold uppercase tracking-widest text-[#F5F2E9]">{t('services.title')}</h2>
            <p className="text-sm text-gray-400 italic mt-3 max-w-lg mx-auto font-sans">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className={`relative border rounded-xl p-6 flex flex-col justify-between card-hover ${
                  service.active
                    ? 'border-[#D4AF37] bg-[#D4AF37]/8 shadow-[0_0_20px_rgba(212,175,55,0.1)]'
                    : 'border-white/10 bg-white/5 opacity-70'
                }`}
              >
                {service.active && (
                  <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
                )}
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <span className="text-4xl">{service.icon}</span>
                    <span className={`text-[9px] font-sans font-extrabold uppercase tracking-widest px-2 py-1 rounded-full ${
                      service.active
                        ? 'bg-green-900/40 text-green-400 border border-green-700/40'
                        : 'bg-white/5 text-gray-500 border border-white/10'
                    }`}>
                      {service.active ? t('services.open') : t('services.soon')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-[#F5F2E9] leading-tight">{t(service.titleKey)}</h3>
                    <p className="text-[10px] text-[#D4AF37] font-sans tracking-widest uppercase mt-0.5">{service.titleHi}</p>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">{t(service.descKey)}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  {service.disabled ? (
                    <p className="text-[10px] text-gray-600 font-sans uppercase tracking-wider text-center">{t('services.awaiting')}</p>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-extrabold text-[#D4AF37] font-sans">₹99</span>
                          <span className="text-xs text-gray-600 line-through font-sans">₹499</span>
                        </div>
                        <span className="text-[9px] font-sans font-bold uppercase tracking-wider bg-green-900/40 text-green-400 border border-green-700/40 px-2 py-0.5 rounded-full">{t('services.off')}</span>
                      </div>
                      <Link to={service.link}
                        className="w-full inline-block text-center text-xs font-extrabold py-3 px-4 bg-[#D4AF37] hover:bg-[#C69214] text-[#1E1410] rounded-lg uppercase tracking-wider font-sans transition hover:scale-105 transform duration-200"
                      >
                        {t(service.ctaKey)} ✦
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ PLANETS ══════════════════════ */}
      <section className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#D4AF37] text-xs font-sans font-bold uppercase tracking-[0.3em] block mb-3">{t('planets.badge')}</span>
            <h2 className="text-4xl font-extrabold uppercase tracking-widest text-[#2A1B18]">{t('planets.title')}</h2>
            <p className="text-base text-gray-500 italic mt-2 font-sans">{t('planets.subtitle')}</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
            {planets.map((p, i) => (
              <div
                key={i}
                onMouseEnter={() => setHoveredPlanet(i)}
                onMouseLeave={() => setHoveredPlanet(null)}
                className={`bg-gradient-to-b ${p.bg} border rounded-xl p-4 text-center card-hover cursor-default ${
                  hoveredPlanet === i ? 'border-[#D4AF37] shadow-lg' : 'border-gray-200'
                }`}
              >
                <div className="text-4xl mb-2" style={{ color: p.color }}>{p.symbol}</div>
                <div className="text-[11px] font-sans text-gray-400 tracking-wider mb-1">{p.sanskrit}</div>
                <h4 className="font-extrabold text-xs text-[#2A1B18] leading-tight">{t(p.nameKey)}</h4>
                <p className="text-[9px] text-gray-500 font-sans tracking-wider uppercase mt-1">{t(p.rulesKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ ZODIAC GRID ══════════════════════ */}
      <section className="bg-[#F0EDE4] py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#D4AF37] text-xs font-sans font-bold uppercase tracking-[0.3em] block mb-3">{t('zodiac.badge')}</span>
            <h2 className="text-4xl font-extrabold uppercase tracking-widest text-[#2A1B18]">{t('zodiac.title')}</h2>
            <p className="text-base text-gray-500 italic mt-2 font-sans">{t('zodiac.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {zodiacs.map((z, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredZodiac(idx)}
                onMouseLeave={() => setHoveredZodiac(null)}
                className={`bg-white border rounded-xl p-6 relative overflow-hidden card-hover cursor-default transition-all duration-300 ${
                  hoveredZodiac === idx ? 'border-[#D4AF37] shadow-xl' : 'border-gray-200 shadow-sm'
                }`}
              >
                {/* Element color accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 rounded-t-xl transition-opacity duration-300"
                  style={{ backgroundColor: elementColors[z.element], opacity: hoveredZodiac === idx ? 1 : 0.3 }}
                ></div>

                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-extrabold text-base text-[#2A1B18]">{t(z.nameKey)}</h3>
                    <p className="text-[12px] text-[#D4AF37] font-sans font-bold">{z.nameHi}</p>
                  </div>
                  <span className={`text-4xl transition-all duration-300 ${hoveredZodiac === idx ? 'scale-125' : 'opacity-40'}`}
                    style={{ color: hoveredZodiac === idx ? elementColors[z.element] : '#2A1B18' }}
                  >
                    {z.sign}
                  </span>
                </div>

                <div className="flex gap-2 mb-3">
                  <span className="text-[9px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                    style={{ color: elementColors[z.element], borderColor: elementColors[z.element] + '40', backgroundColor: elementColors[z.element] + '10' }}
                  >
                    {t(elementKeyMap[z.element])}
                  </span>
                  <span className="text-[9px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-gray-200 text-gray-500 bg-gray-50">
                    {t(z.rulerKey)}
                  </span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed font-sans">{t(z.descKey)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ DYNAMIC SPACE ALIGNMENT SIMULATOR ══════════════════════ */}
      <SpaceAstrologyConnector />

      {/* ══════════════════════ FINAL CTA ══════════════════════ */}
      <section className="bg-[#1E1410] text-[#F5F2E9] py-24 px-6 text-center relative z-10 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center text-[18rem] leading-none select-none">ॐ</div>
        
        <div className="max-w-5xl mx-auto relative space-y-12">
          <div className="text-center space-y-4">
            <span className="om-glow text-5xl text-[#D4AF37] select-none inline-block">ॐ</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-widest uppercase leading-tight">
              {t('cta.title')}
            </h2>
            <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed font-sans">
              {t('cta.subtitle')}
            </p>
          </div>

          {/* Interactive Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-[#130E0C]/85 border border-amber-900/20 rounded-xl p-6 hover:border-[#D4AF37]/50 transition-all duration-300 group text-left">
              <div className="text-[#D4AF37] text-lg font-bold mb-2 flex justify-between items-center">
                <span>{t('cta.step1.title')}</span>
                <span className="text-sm opacity-50 group-hover:translate-x-1 transition-transform">→</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">{t('cta.step1.desc')}</p>
            </div>
            <div className="bg-[#130E0C]/85 border border-amber-900/20 rounded-xl p-6 hover:border-[#D4AF37]/50 transition-all duration-300 group text-left">
              <div className="text-[#D4AF37] text-lg font-bold mb-2 flex justify-between items-center">
                <span>{t('cta.step2.title')}</span>
                <span className="text-sm opacity-50 group-hover:translate-x-1 transition-transform">→</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">{t('cta.step2.desc')}</p>
            </div>
            <div className="bg-[#130E0C]/85 border border-amber-900/20 rounded-xl p-6 hover:border-[#D4AF37]/50 transition-all duration-300 group text-left">
              <div className="text-[#D4AF37] text-lg font-bold mb-2 flex justify-between items-center">
                <span>{t('cta.step3.title')}</span>
                <span className="text-sm opacity-50 group-hover:translate-x-1 transition-transform">→</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">{t('cta.step3.desc')}</p>
            </div>
          </div>

          <div className="pt-4 flex flex-col items-center justify-center gap-4">
            <Link to="/generate"
              className="inline-block bg-[#D4AF37] hover:bg-[#C69214] text-[#1E1410] font-extrabold py-4 px-14 rounded-xl shadow-lg tracking-[0.15em] transition uppercase text-sm hover:scale-105 transform duration-300"
            >
              {t('cta.button')}
            </Link>
            <span className="text-[10px] text-gray-500 font-sans tracking-wider uppercase">{t('cta.note')}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
