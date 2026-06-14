import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import BirthForm from '../components/BirthForm';
import SpaceAstrologyConnector from '../components/SpaceAstrologyConnector';

export default function Landing() {
  const [hoveredSector, setHoveredSector] = useState(null);
  const [hoveredZodiac, setHoveredZodiac] = useState(null);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
      const response = await axios.post(`${apiBase}/api/reports/create`, formData);
      navigate(`/report/${response.data.reportId}`);
    } catch (err) {
      console.error('Report compilation error:', err);
      setError(err.response?.data?.error?.message || 'Unable to align with your celestial path.');
    } finally {
      setLoading(false);
    }
  };

  const zodiacs = [
    { sign: '♈', name: 'Aries / मेष', element: 'Fire', ruler: 'Mars', description: 'A soul of fire — bold, primal, and spiritually awakened through action.' },
    { sign: '♉', name: 'Taurus / वृषभ', element: 'Earth', ruler: 'Venus', description: 'Rooted in the material and the divine — patient, sensual, and enduring.' },
    { sign: '♊', name: 'Gemini / मिथुन', element: 'Air', ruler: 'Mercury', description: 'The twin flame of intellect — curious, communicative, eternally seeking.' },
    { sign: '♋', name: 'Cancer / कर्क', element: 'Water', ruler: 'Moon', description: 'Lunar wisdom keeper — nurturing, deeply intuitive, emotionally vast.' },
    { sign: '♌', name: 'Leo / सिंह', element: 'Fire', ruler: 'Sun', description: 'The sovereign soul — radiant, authoritative, born of solar divine light.' },
    { sign: '♍', name: 'Virgo / कन्या', element: 'Earth', ruler: 'Mercury', description: 'Sacred perfectionist — analytical, devotional, and spiritually discerning.' },
    { sign: '♎', name: 'Libra / तुला', element: 'Air', ruler: 'Venus', description: 'Cosmic scales of justice — harmonious, relational, and dharma-aligned.' },
    { sign: '♏', name: 'Scorpio / वृश्चिक', element: 'Water', ruler: 'Mars', description: 'The great transformer — mystical, intense, seeker of hidden truths.' },
    { sign: '♐', name: 'Sagittarius / धनु', element: 'Fire', ruler: 'Jupiter', description: 'The cosmic archer — philosophical, expansive, following the path of dharma.' },
    { sign: '♑', name: 'Capricorn / मकर', element: 'Earth', ruler: 'Saturn', description: 'The mountain climber of destiny — disciplined, structured, karmically resolved.' },
    { sign: '♒', name: 'Aquarius / कुम्भ', element: 'Air', ruler: 'Saturn', description: 'The divine visionary — humanitarian, innovative, futuristic and free.' },
    { sign: '♓', name: 'Pisces / मीन', element: 'Water', ruler: 'Jupiter', description: 'The ocean of moksha — spiritually dissolving, compassionate, transcendent.' }
  ];

  const planets = [
    { symbol: '☉', name: 'Surya / Sun', sanskrit: 'सूर्य', rules: 'Soul & Identity', color: '#E8730A', bg: 'from-orange-50 to-amber-50' },
    { symbol: '☽', name: 'Chandra / Moon', sanskrit: 'चन्द्र', rules: 'Mind & Emotion', color: '#94A3B8', bg: 'from-slate-50 to-gray-50' },
    { symbol: '♂', name: 'Mangala / Mars', sanskrit: 'मंगल', rules: 'Drive & Power', color: '#B91C1C', bg: 'from-red-50 to-rose-50' },
    { symbol: '☿', name: 'Budha / Mercury', sanskrit: 'बुध', rules: 'Intellect & Speech', color: '#15803D', bg: 'from-green-50 to-emerald-50' },
    { symbol: '♃', name: 'Guru / Jupiter', sanskrit: 'गुरु', rules: 'Wisdom & Dharma', color: '#CA8A04', bg: 'from-yellow-50 to-amber-50' },
    { symbol: '♀', name: 'Shukra / Venus', sanskrit: 'शुक्र', rules: 'Pleasure & Beauty', color: '#DB2777', bg: 'from-pink-50 to-rose-50' },
    { symbol: '♄', name: 'Shani / Saturn', sanskrit: 'शनि', rules: 'Karma & Discipline', color: '#3730A3', bg: 'from-indigo-50 to-violet-50' }
  ];

  const services = [
    {
      id: 'kundli',
      title: 'Sacred Kundali Reading',
      titleHi: 'कुंडली',
      icon: '☸',
      description: 'Unveil your D1, D9, and D10 divisional charts, celestial planetary alignments, Vimshottari Dasha life-cycles, and receive your personal 33-page sacred consultation book.',
      cta: 'Unveil Your Chart',
      link: '/generate',
      active: true
    },
    {
      id: 'milan',
      title: 'Kundli Milan & Compatibility',
      titleHi: 'कुंडली मिलान',
      icon: '⚭',
      description: 'Ancient Ashtakoota and Guna Milan compatibility wisdom to illuminate the divine harmony of two souls on a shared cosmic journey.',
      disabled: true
    },
    {
      id: 'varshphal',
      title: 'Varshaphal Solar Forecast',
      titleHi: 'वर्षफल',
      icon: '⏳',
      description: 'Your annual solar return chart — a sacred map of the year ahead, revealing planetary themes, transits, and transformational windows.',
      disabled: true
    },
    {
      id: 'remedies',
      title: 'Gemstone & Remedy Wisdom',
      titleHi: 'उपाय',
      icon: '💎',
      description: 'Receive tailored planetary remedies — sacred gemstones, Vedic mantras, fasting days, and ritual practices to balance your karmic path.',
      disabled: true
    }
  ];

  const wheelSectors = zodiacs.map((z, i) => ({
    name: z.name.split(' / ')[0].toUpperCase(),
    nameHi: z.name.split(' / ')[1],
    symbol: z.sign,
    angle: i * 30,
    element: z.element,
    ruler: z.ruler
  }));

  const elementColors = { Fire: '#E8730A', Earth: '#78716C', Air: '#0EA5E9', Water: '#6366F1' };

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
      <section className="max-w-[90rem] mx-auto px-6 lg:px-12 pt-6 pb-6 relative z-10" style={{ minHeight: 'calc(100vh - 57px)' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center h-full">

          {/* Left: Hero Copy */}
          <div className="space-y-6 text-center lg:text-left flex flex-col justify-center h-full py-4">
            <div>
              <span className="inline-block text-[#D4AF37] text-[10px] font-sans font-bold uppercase tracking-[0.25em] border border-[#D4AF37]/30 px-3.5 py-1 rounded-full bg-[#1E1410]/5 mb-3.5">
                ✦ Ancient Vedic Wisdom, Modern Insight ✦
              </span>

              <h1 className="text-5xl md:text-6xl font-black tracking-widest text-[#2A1B18] uppercase leading-none font-serif">
                ASTRO<span className="gold-shimmer">DEV</span>
              </h1>
            </div>

            <p className="text-lg text-[#4A3E3D] italic leading-relaxed max-w-lg font-serif">
              Unveil the celestial blueprint written at the moment of your birth — your path, your dharma, your destiny.
            </p>

            {/* Feature bullets as elegant pill/card modules */}
            <div className="grid grid-cols-2 gap-2.5 max-w-md">
              {[
                { name: '100% Genuine', desc: 'Authentic Vedic Methods' },
                { name: 'Expert Astrologers', desc: 'Verified & Experienced' },
                { name: 'Highly Trusted', desc: 'Accurate Predictions' },
                { name: 'Detailed Analysis', desc: '33-Page PDF Report' },
                { name: 'Total Privacy', desc: '100% Confidential' },
                { name: 'Instant Access', desc: 'Download Immediately' }
              ].map(item => (
                <div key={item.name} className="flex items-start gap-2.5 p-2 bg-white/60 border border-[#D4AF37]/15 rounded-lg text-left shadow-sm hover:border-[#D4AF37]/40 hover:bg-white transition-all group duration-300">
                  <span className="text-[#D4AF37] text-sm mt-0.5 group-hover:scale-110 transition-transform">✦</span>
                  <div>
                    <h4 className="text-xs font-bold text-[#2A1B18] font-sans leading-none mb-0.5">{item.name}</h4>
                    <p className="text-[9px] text-gray-500 font-sans tracking-wide leading-none">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Premium Price Tag Badge */}
            <div className="pt-2 max-w-xs">
              <div className="bg-[#1E1410] text-[#F5F2E9] border border-[#D4AF37]/35 rounded-xl p-3.5 flex items-center justify-between shadow-xl relative overflow-hidden group hover:border-[#D4AF37]/60 transition-colors">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-full blur-xl pointer-events-none"></div>
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-2xl font-extrabold text-[#D4AF37] font-sans tracking-tight">₹99</span>
                    <span className="text-xs text-gray-400 line-through font-sans">₹499</span>
                  </div>
                  <p className="text-[10px] text-amber-100/60 font-sans tracking-wide uppercase mt-0.5">Full Vedic PDF Analysis</p>
                </div>
                <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[9px] font-sans font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.05)]">
                  80% OFF
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
            <span className="text-[#D4AF37] text-xs font-sans font-bold uppercase tracking-[0.3em] block mb-3">✦ Sacred Vedic Offerings ✦</span>
            <h2 className="text-4xl font-extrabold uppercase tracking-widest text-[#F5F2E9]">Divine Guidance Suite</h2>
            <p className="text-sm text-gray-400 italic mt-3 max-w-lg mx-auto font-sans">
              A curated collection of Vedic readings mapping your life path, relationships, and planetary remedies.
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
                      {service.active ? 'Open Now' : 'Coming Soon'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-[#F5F2E9] leading-tight">{service.title}</h3>
                    <p className="text-[10px] text-[#D4AF37] font-sans tracking-widest uppercase mt-0.5">{service.titleHi}</p>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans">{service.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10">
                  {service.disabled ? (
                    <p className="text-[10px] text-gray-600 font-sans uppercase tracking-wider text-center">Awaiting celestial alignment</p>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-2xl font-extrabold text-[#D4AF37] font-sans">₹99</span>
                          <span className="text-xs text-gray-600 line-through font-sans">₹499</span>
                        </div>
                        <span className="text-[9px] font-sans font-bold uppercase tracking-wider bg-green-900/40 text-green-400 border border-green-700/40 px-2 py-0.5 rounded-full">80% Off</span>
                      </div>
                      <Link to={service.link}
                        className="w-full inline-block text-center text-xs font-extrabold py-3 px-4 bg-[#D4AF37] hover:bg-[#C69214] text-[#1E1410] rounded-lg uppercase tracking-wider font-sans transition hover:scale-105 transform duration-200"
                      >
                        {service.cta} ✦
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
            <span className="text-[#D4AF37] text-xs font-sans font-bold uppercase tracking-[0.3em] block mb-3">✦ The Celestial Governors ✦</span>
            <h2 className="text-4xl font-extrabold uppercase tracking-widest text-[#2A1B18]">Seven Sovereigns of Time</h2>
            <p className="text-base text-gray-500 italic mt-2 font-sans">ग्रह — The planetary forces shaping your every breath</p>
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
                <h4 className="font-extrabold text-xs text-[#2A1B18] leading-tight">{p.name}</h4>
                <p className="text-[9px] text-gray-500 font-sans tracking-wider uppercase mt-1">{p.rules}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ ZODIAC GRID ══════════════════════ */}
      <section className="bg-[#F0EDE4] py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#D4AF37] text-xs font-sans font-bold uppercase tracking-[0.3em] block mb-3">✦ The Twelve Gates ✦</span>
            <h2 className="text-4xl font-extrabold uppercase tracking-widest text-[#2A1B18]">Gates of Destiny</h2>
            <p className="text-base text-gray-500 italic mt-2 font-sans">राशि — The zodiac signs mapping your conscious and cosmic nature</p>
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
                    <h3 className="font-extrabold text-base text-[#2A1B18]">{z.name.split(' / ')[0]}</h3>
                    <p className="text-[12px] text-[#D4AF37] font-sans font-bold">{z.name.split(' / ')[1]}</p>
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
                    {z.element}
                  </span>
                  <span className="text-[9px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-gray-200 text-gray-500 bg-gray-50">
                    {z.ruler}
                  </span>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed font-sans">{z.description}</p>
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
              Your Destiny Awaits Revelation
            </h2>
            <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed font-sans">
              Enter the sacred coordinates of your birth to generate your comprehensive 33-page destiny analysis.
            </p>
          </div>

          {/* Interactive Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-[#130E0C]/85 border border-amber-900/20 rounded-xl p-6 hover:border-[#D4AF37]/50 transition-all duration-300 group text-left">
              <div className="text-[#D4AF37] text-lg font-bold mb-2 flex justify-between items-center">
                <span>01. Birth Coordinates</span>
                <span className="text-sm opacity-50 group-hover:translate-x-1 transition-transform">→</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                We map the precise geo-coordinates and time of birth to freeze the celestial skies as they were at the exact moment of your birth.
              </p>
            </div>
            <div className="bg-[#130E0C]/85 border border-amber-900/20 rounded-xl p-6 hover:border-[#D4AF37]/50 transition-all duration-300 group text-left">
              <div className="text-[#D4AF37] text-lg font-bold mb-2 flex justify-between items-center">
                <span>02. Planetary Dashas</span>
                <span className="text-sm opacity-50 group-hover:translate-x-1 transition-transform">→</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Compute the Vimshottari Dasha cycles to map out the cosmic timelines governing your past, present, and future lifecycle periods.
              </p>
            </div>
            <div className="bg-[#130E0C]/85 border border-amber-900/20 rounded-xl p-6 hover:border-[#D4AF37]/50 transition-all duration-300 group text-left">
              <div className="text-[#D4AF37] text-lg font-bold mb-2 flex justify-between items-center">
                <span>03. Sacred Remedies</span>
                <span className="text-sm opacity-50 group-hover:translate-x-1 transition-transform">→</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                Receive customized planetary remedies — sacred gemstones, Vedic mantras, and ritual practices to align your karmic flow.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-col items-center justify-center gap-4">
            <Link to="/generate"
              className="inline-block bg-[#D4AF37] hover:bg-[#C69214] text-[#1E1410] font-extrabold py-4 px-14 rounded-xl shadow-lg tracking-[0.15em] transition uppercase text-sm hover:scale-105 transform duration-300"
            >
              Reveal Your Destiny ✦
            </Link>
            <span className="text-[10px] text-gray-500 font-sans tracking-wider uppercase">No account required &bull; Free instant access</span>
          </div>
        </div>
      </section>
    </div>
  );
}
