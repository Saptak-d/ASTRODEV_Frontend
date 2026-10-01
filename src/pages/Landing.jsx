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
  const [activeZodiac, setActiveZodiac] = useState(0);
  const [activePlanet, setActivePlanet] = useState(0);
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
    {
      sign: '♈', nameKey: 'zodiac.aries.name', subKey: 'zodiac.aries.sub', element: 'Fire', rulerKey: 'ruler.mars',
      tagline: 'The Trailblazer of the Cosmos',
      desc: 'Mesha (Aries) is the first sign of the zodiac — a blazing pioneer ruled by fiery Mars. Born leaders of unmatched courage, Aries souls charge into life with raw vitality, spiritual boldness, and an irresistible drive to conquer new frontiers. Their sacred mission is to ignite change.',
      governs: ['Courage & Initiative', 'Leadership', 'Raw Vitality', 'New Beginnings'],
    },
    {
      sign: '♉', nameKey: 'zodiac.taurus.name', subKey: 'zodiac.taurus.sub', element: 'Earth', rulerKey: 'ruler.venus',
      tagline: 'The Sacred Builder of Abundance',
      desc: 'Vrishabha (Taurus) is grounded in the eternal abundance of Earth, governed by the grace of Venus. Patient, devoted, and deeply sensual, Taurus souls build lasting foundations — in wealth, relationships, and art. Their inner stillness holds tremendous creative and material power.',
      governs: ['Patience & Stability', 'Wealth', 'Sensuality', 'Artistic Grace'],
    },
    {
      sign: '♊', nameKey: 'zodiac.gemini.name', subKey: 'zodiac.gemini.sub', element: 'Air', rulerKey: 'ruler.mercury',
      tagline: 'The Twin Flame of Intellect',
      desc: 'Mithuna (Gemini) pulses with Mercury\'s swift wind of intelligence and communication. The cosmic twins embody duality — bridging ideas, cultures, and minds with extraordinary eloquence. Versatile and perpetually curious, they are the messengers of divine thought and the weavers of connection.',
      governs: ['Intellect & Wit', 'Communication', 'Adaptability', 'Social Bonds'],
    },
    {
      sign: '♋', nameKey: 'zodiac.cancer.name', subKey: 'zodiac.cancer.sub', element: 'Water', rulerKey: 'ruler.moon',
      tagline: 'Guardian of the Lunar Heart',
      desc: 'Karka (Cancer) is the nurturing womb of the zodiac, cradled by the Moon\'s ever-changing tides. Gifted with profound intuition and emotional depth, Cancer souls are the sacred keepers of home, family, and ancestral memory — offering boundless compassion and an unbreakable protective love.',
      governs: ['Intuition', 'Emotional Depth', 'Nurturing', 'Home & Ancestry'],
    },
    {
      sign: '♌', nameKey: 'zodiac.leo.name', subKey: 'zodiac.leo.sub', element: 'Fire', rulerKey: 'ruler.sun',
      tagline: 'The Sovereign Soul of the Sun',
      desc: 'Simha (Leo) radiates with the boundless light of the Sun — the cosmic king who commands attention, inspires devotion, and illuminates every room. Born to lead with warmth, Leo souls carry an innate dignity and creative fire, transforming the world through their magnetic presence and noble heart.',
      governs: ['Royalty & Dignity', 'Creative Fire', 'Generosity', 'Leadership'],
    },
    {
      sign: '♍', nameKey: 'zodiac.virgo.name', subKey: 'zodiac.virgo.sub', element: 'Earth', rulerKey: 'ruler.mercury',
      tagline: 'The Divine Healer of Precision',
      desc: 'Kanya (Virgo) channels Mercury\'s analytical mastery through earthly service and sacred craftsmanship. The purest sign of discernment, Virgo souls refine the world through meticulous attention, selfless healing, and unwavering devotion to excellence — turning everyday work into an act of worship.',
      governs: ['Analytical Mind', 'Healing & Service', 'Perfection', 'Practical Wisdom'],
    },
    {
      sign: '♎', nameKey: 'zodiac.libra.name', subKey: 'zodiac.libra.sub', element: 'Air', rulerKey: 'ruler.venus',
      tagline: 'The Cosmic Architect of Harmony',
      desc: 'Tula (Libra) holds Venus\'s scales of cosmic justice and divine beauty. Born diplomats and artists, Libra souls are compelled by an eternal quest for fairness, aesthetic perfection, and meaningful partnership. Their greatest gift is the ability to create harmony where chaos once reigned.',
      governs: ['Balance & Justice', 'Partnership', 'Aesthetic Beauty', 'Diplomacy'],
    },
    {
      sign: '♏', nameKey: 'zodiac.scorpio.name', subKey: 'zodiac.scorpio.sub', element: 'Water', rulerKey: 'ruler.mars',
      tagline: 'The Transformer of Hidden Depths',
      desc: 'Vrishchika (Scorpio) descends into the deepest waters of the psyche, wielding Mars\'s raw power for alchemical transformation. Scorpio souls are fearless investigators of truth, masters of regeneration, and channels of profound mystical intensity — eternally reborn through the fire of their own will.',
      governs: ['Transformation', 'Mysticism', 'Willpower', 'Hidden Truths'],
    },
    {
      sign: '♐', nameKey: 'zodiac.sagittarius.name', subKey: 'zodiac.sagittarius.sub', element: 'Fire', rulerKey: 'ruler.jupiter',
      tagline: 'The Cosmic Seeker of Higher Truth',
      desc: 'Dhanu (Sagittarius) blazes with Jupiter\'s expansive fire — the eternal archer whose arrow points toward the heavens. Philosophers, adventurers, and truth-seekers, Sagittarius souls transcend boundaries, both physical and spiritual, driven by an insatiable hunger for wisdom, freedom, and higher purpose.',
      governs: ['Higher Wisdom', 'Freedom & Adventure', 'Philosophy', 'Spiritual Growth'],
    },
    {
      sign: '♑', nameKey: 'zodiac.capricorn.name', subKey: 'zodiac.capricorn.sub', element: 'Earth', rulerKey: 'ruler.saturn',
      tagline: 'The Mountain Climber of Destiny',
      desc: 'Makara (Capricorn) is sculpted by Saturn\'s patient hand — the relentless mountain climber who earns mastery through discipline, sacrifice, and time. Capricorn souls carry ancient wisdom and karmic authority, building empires of lasting achievement through sheer perseverance and unwavering ambition.',
      governs: ['Ambition & Mastery', 'Discipline', 'Karmic Duty', 'Long-term Vision'],
    },
    {
      sign: '♒', nameKey: 'zodiac.aquarius.name', subKey: 'zodiac.aquarius.sub', element: 'Air', rulerKey: 'ruler.saturn',
      tagline: 'The Visionary of the New Age',
      desc: 'Kumbha (Aquarius) pours Saturn\'s cosmic waters of knowledge upon all of humanity. The great humanitarian and revolutionary thinker, Aquarius souls are centuries ahead of their time — visionaries who shatter outdated systems to usher in a more just, enlightened, and unified world.',
      governs: ['Humanitarianism', 'Innovation', 'Collective Vision', 'Higher Ideals'],
    },
    {
      sign: '♓', nameKey: 'zodiac.pisces.name', subKey: 'zodiac.pisces.sub', element: 'Water', rulerKey: 'ruler.jupiter',
      tagline: 'The Mystic Ocean of the Soul',
      desc: 'Meena (Pisces) dissolves all boundaries in Jupiter\'s infinite oceanic consciousness. The most spiritually evolved sign, Pisces souls float between worlds — gifted with transcendent empathy, visionary dreams, and a divine connection to the unseen realms. They are the universe dreaming of itself.',
      governs: ['Spiritual Transcendence', 'Empathy & Compassion', 'Dreams & Visions', 'Unity'],
    },
  ];

  const planets = [
    {
      symbol: '☉', nameKey: 'planet.sun.name', subKey: 'planet.sun.sub', rulesKey: 'planet.sun.rules',
      color: '#E8730A', bg: 'from-orange-50 to-amber-50',
      tagline: 'The Eternal Soul & Core Will',
      desc: 'Surya is the soul of the cosmos and the sovereign source of all vitality. In your Kundli, the Sun governs self-realization, life purpose, natural leadership, and willpower — bestowing radiant confidence, nobility, and personal authority.',
      governs: ['Soul Purpose', 'Vitality', 'Willpower', 'Dignity'],
    },
    {
      symbol: '☽', nameKey: 'planet.moon.name', subKey: 'planet.moon.sub', rulesKey: 'planet.moon.rules',
      color: '#94A3B8', bg: 'from-slate-50 to-gray-50',
      tagline: 'Mirror of Consciousness & Mind',
      desc: 'Chandra governs the manas (mind), emotional equilibrium, and subconscious intuition. As the reflective cosmic feminine, the Moon shapes how you feel, nurture connections, receive intuition, and maintain inner tranquility.',
      governs: ['Emotional Peace', 'Intuition', 'Subconscious', 'Nurturing'],
    },
    {
      symbol: '♂', nameKey: 'planet.mars.name', subKey: 'planet.mars.sub', rulesKey: 'planet.mars.rules',
      color: '#B91C1C', bg: 'from-red-50 to-rose-50',
      tagline: 'Commander of Action & Sacred Fire',
      desc: 'Mangala represents primal energy, decisive courage, and righteous action. It is the cosmic warrior that fuels ambition, defends truth, and breaks through obstacles — granting the endurance, vitality, and bravery required to conquer goals.',
      governs: ['Courage', 'Physical Energy', 'Ambition', 'Action'],
    },
    {
      symbol: '☿', nameKey: 'planet.mercury.name', subKey: 'planet.mercury.sub', rulesKey: 'planet.mercury.rules',
      color: '#15803D', bg: 'from-green-50 to-emerald-50',
      tagline: 'Messenger of Intellect & Speech',
      desc: 'Budha rules discernment (buddhi), eloquence, and analytical wit. It governs your capacity to assimilate knowledge, negotiate commerce, communicate persuasively, and navigate daily life with swift logic and versatility.',
      governs: ['Intellect', 'Eloquence', 'Logic', 'Commerce'],
    },
    {
      symbol: '♃', nameKey: 'planet.jupiter.name', subKey: 'planet.jupiter.sub', rulesKey: 'planet.jupiter.rules',
      color: '#CA8A04', bg: 'from-yellow-50 to-amber-50',
      tagline: 'Supreme Guru of Dharma & Grace',
      desc: 'Brihaspati (Guru) is the supreme spiritual teacher and great benefic. Bestowing dharma, profound wisdom, optimism, and divine grace, Jupiter expands prosperity, ethical clarity, higher knowledge, and auspicious fortune.',
      governs: ['Higher Wisdom', 'Dharma', 'Fortune', 'Expansion'],
    },
    {
      symbol: '♀', nameKey: 'planet.venus.name', subKey: 'planet.venus.sub', rulesKey: 'planet.venus.rules',
      color: '#DB2777', bg: 'from-pink-50 to-rose-50',
      tagline: 'Goddess of Beauty, Love & Harmony',
      desc: 'Shukra is the celestial guide of beauty, devotion, and refined pleasures. Governing romance, artistic brilliance, wealth, and contentment, Venus illuminates the heart with empathy, marital harmony, and cultural appreciation.',
      governs: ['Love & Romance', 'Artistic Grace', 'Wealth', 'Harmony'],
    },
    {
      symbol: '♄', nameKey: 'planet.saturn.name', subKey: 'planet.saturn.sub', rulesKey: 'planet.saturn.rules',
      color: '#3730A3', bg: 'from-indigo-50 to-violet-50',
      tagline: 'Lord of Karma, Time & Mastery',
      desc: 'Shani is the austere master of time and dispenser of karmic fruits. Through solemn lessons, patience, and rigorous discipline, Saturn dissolves illusions — rewarding persevering souls with profound maturity, resilience, and mastery.',
      governs: ['Karmic Balance', 'Discipline', 'Patience', 'Endurance'],
    },
  ];

  const elementKeyMap = { Fire: 'zodiac.element.fire', Earth: 'zodiac.element.earth', Air: 'zodiac.element.air', Water: 'zodiac.element.water' };
  const elementColors = { Fire: '#E8730A', Earth: '#78716C', Air: '#0EA5E9', Water: '#6366F1' };

  const services = [
    {
      id: 'kundli',
      titleKey: 'services.kundli.title',
      subKey: 'services.kundli.sub',
      icon: '☸',
      descKey: 'services.kundli.desc',
      ctaKey: 'services.kundli.cta',
      link: '/generate',
      active: true
    },
    {
      id: 'milan',
      titleKey: 'services.milan.title',
      subKey: 'services.milan.sub',
      icon: '⚭',
      descKey: 'services.milan.desc',
      disabled: true
    },
    {
      id: 'varshphal',
      titleKey: 'services.varshaphal.title',
      subKey: 'services.varshaphal.sub',
      icon: '⏳',
      descKey: 'services.varshaphal.desc',
      disabled: true
    },
    {
      id: 'remedies',
      titleKey: 'services.remedies.title',
      subKey: 'services.remedies.sub',
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
    sub: t(z.subKey),
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
        @keyframes tooltipIn {
          from { opacity: 0; transform: translateY(8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes pulseRing {
          0%   { box-shadow: 0 0 0 0 var(--ring-color); }
          70%  { box-shadow: 0 0 0 8px transparent; }
          100% { box-shadow: 0 0 0 0 transparent; }
        }
        .cosmic-rotate {
          animation: rotateCosmic 150s linear infinite;
          transform-origin: center center;
        }
        .cosmic-rotate:hover { animation-play-state: paused; }
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
          transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-6px) scale(1.04);
          box-shadow: 0 16px 36px rgba(212,175,55,0.18);
        }
        .planet-tooltip {
          animation: tooltipIn 0.22s cubic-bezier(.34,1.56,.64,1) forwards;
          pointer-events: none;
        }
        .planet-pulse {
          animation: pulseRing 1.6s ease-out infinite;
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
                    <p className="text-[10px] text-[#D4AF37] font-sans tracking-widest uppercase mt-0.5">{t(service.subKey)}</p>
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
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[#D4AF37] text-xs font-sans font-bold uppercase tracking-[0.3em] block mb-3">{t('planets.badge')}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-widest text-[#2A1B18]">{t('planets.title')}</h2>
            <p className="text-sm md:text-base text-gray-500 italic mt-2 font-sans">{t('planets.subtitle')}</p>
          </div>

          {/* ── Planet Detail Box ON TOP of the cards ── */}
          {(() => {
            const p = planets[activePlanet] || planets[0];
            return (
              <div
                className="max-w-3xl mx-auto mb-6 rounded-2xl p-4 sm:p-5 md:p-6 border text-left shadow-xl transition-all duration-300 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #1C120F 0%, #261A16 50%, #1C120F 100%)',
                  borderColor: p.color + '55',
                  boxShadow: `0 12px 36px rgba(0,0,0,0.35), 0 0 24px ${p.color}20`,
                }}
              >
                {/* Glowing accent top line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${p.color}, transparent)`,
                  }}
                />

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                  {/* Planet Symbol */}
                  <div
                    className="shrink-0 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl select-none"
                    style={{
                      background: p.color + '15',
                      border: `1px solid ${p.color}40`,
                      color: p.color,
                      fontSize: '2.25rem',
                      lineHeight: 1,
                      filter: `drop-shadow(0 0 10px ${p.color}88)`,
                    }}
                  >
                    {p.symbol}
                  </div>

                  {/* Planet Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-2 mb-1.5">
                      <h3 className="text-base sm:text-lg font-bold text-[#F5F2E9] font-serif tracking-wider uppercase">
                        {t(p.nameKey)}
                      </h3>
                      <span className="text-xs font-sans italic" style={{ color: p.color }}>
                        — {p.tagline}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed mb-3">
                      {p.desc}
                    </p>

                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-[#D4AF37]/80 mr-1">
                        Governs:
                      </span>
                      {p.governs.map((gov, gi) => (
                        <span
                          key={gi}
                          className="text-[10px] font-sans font-medium px-2 py-0.5 rounded-full"
                          style={{
                            color: p.color,
                            background: p.color + '18',
                            border: `1px solid ${p.color}35`,
                          }}
                        >
                          {gov}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Planet Cards Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
            {planets.map((p, i) => (
              <div
                key={i}
                onMouseEnter={() => setActivePlanet(i)}
                onClick={() => setActivePlanet(i)}
                className={`bg-gradient-to-b ${p.bg} border rounded-xl p-3 sm:p-4 text-center cursor-pointer select-none`}
                style={{
                  borderColor: activePlanet === i ? p.color : '#E5E7EB',
                  boxShadow: activePlanet === i ? `0 12px 28px ${p.color}30, 0 0 0 2px ${p.color}55` : '0 1px 4px rgba(0,0,0,0.05)',
                  transform: activePlanet === i ? 'translateY(-6px) scale(1.05)' : 'translateY(0) scale(1)',
                  transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                }}
              >
                <div
                  className="mb-2 select-none"
                  style={{
                    color: p.color,
                    filter: activePlanet === i ? `drop-shadow(0 0 12px ${p.color}99)` : 'none',
                    transform: activePlanet === i ? 'scale(1.15)' : 'scale(1)',
                    transition: 'all 0.3s ease',
                    fontSize: '2.25rem',
                    lineHeight: 1,
                    display: 'block',
                  }}
                >
                  {p.symbol}
                </div>
                <div className="text-[10px] font-sans text-gray-400 tracking-wider mb-1 mt-1">{t(p.subKey)}</div>
                <h4 className="font-extrabold text-[11px] text-[#2A1B18] leading-tight">{t(p.nameKey)}</h4>
                <p
                  className="text-[9px] font-sans tracking-wider uppercase mt-1.5 font-bold"
                  style={{ color: activePlanet === i ? p.color : '#9CA3AF', transition: 'color 0.3s' }}
                >
                  {t(p.rulesKey)}
                </p>
                <div
                  className="mt-2 mx-auto rounded-full"
                  style={{
                    background: p.color,
                    width: '6px', height: '6px',
                    opacity: activePlanet === i ? 1 : 0,
                    transform: activePlanet === i ? 'scale(1)' : 'scale(0)',
                    transition: 'all 0.3s ease',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════ ZODIAC GRID ══════════════════════ */}
      <section className="bg-[#F0EDE4] py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-[#D4AF37] text-xs font-sans font-bold uppercase tracking-[0.3em] block mb-3">{t('zodiac.badge')}</span>
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-widest text-[#2A1B18]">{t('zodiac.title')}</h2>
            <p className="text-sm md:text-base text-gray-500 italic mt-2 font-sans">{t('zodiac.subtitle')}</p>
          </div>

          {/* ── Zodiac Detail Box ON TOP of the cards ── */}
          {(() => {
            const z = zodiacs[activeZodiac] || zodiacs[0];
            const elColor = elementColors[z.element] || '#D4AF37';
            return (
              <div
                className="max-w-3xl mx-auto mb-6 rounded-xl p-3.5 sm:p-4 border text-left shadow-lg transition-all duration-300 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #1C120F 0%, #261A16 50%, #1C120F 100%)',
                  borderColor: elColor + '55',
                  boxShadow: `0 8px 24px rgba(0,0,0,0.35), 0 0 16px ${elColor}18`,
                }}
              >
                {/* Glowing accent top line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${elColor}, transparent)` }}
                />

                <div className="flex items-start gap-3.5 relative">
                  {/* Zodiac Symbol */}
                  <div
                    className="shrink-0 flex items-center justify-center w-11 h-11 rounded-xl select-none"
                    style={{
                      background: elColor + '18',
                      border: `1px solid ${elColor}45`,
                      color: elColor,
                      fontSize: '1.6rem',
                      lineHeight: 1,
                      filter: `drop-shadow(0 0 8px ${elColor}88)`,
                    }}
                  >
                    {z.sign}
                  </div>

                  {/* Zodiac Details */}
                  <div className="flex-1 min-w-0">
                    {/* Name + tagline row */}
                    <div className="flex flex-wrap items-baseline gap-1.5 mb-0.5">
                      <h3 className="text-sm font-bold text-[#F5F2E9] font-serif tracking-wider uppercase">
                        {t(z.nameKey)}
                      </h3>
                      <span className="text-[11px] font-sans font-bold" style={{ color: elColor }}>
                        · {t(z.subKey)}
                      </span>
                    </div>
                    <p className="text-[10px] font-sans italic mb-2" style={{ color: elColor + 'BB' }}>
                      {z.tagline}
                    </p>

                    {/* Badges + desc in one compact row */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-2">
                      <span
                        className="text-[9px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                        style={{ color: elColor, borderColor: elColor + '50', backgroundColor: elColor + '15' }}
                      >
                        {t(elementKeyMap[z.element])}
                      </span>
                      <span className="text-[9px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#D4AF37]/30 text-[#D4AF37] bg-[#D4AF37]/10">
                        Ruler: {t(z.rulerKey)}
                      </span>
                    </div>

                    <p className="text-[10px] sm:text-xs text-gray-300 font-sans leading-relaxed mb-2">
                      {z.desc}
                    </p>

                    {/* Governs tags */}
                    <div className="flex flex-wrap items-center gap-1">
                      <span className="text-[8px] font-sans font-bold uppercase tracking-widest text-[#D4AF37]/70 mr-0.5">
                        Governs:
                      </span>
                      {z.governs.map((gov, gi) => (
                        <span
                          key={gi}
                          className="text-[9px] font-sans font-medium px-1.5 py-0.5 rounded-full"
                          style={{ color: elColor, background: elColor + '18', border: `1px solid ${elColor}30` }}
                        >
                          {gov}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Zodiac Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {zodiacs.map((z, idx) => {
              const elColor = elementColors[z.element] || '#D4AF37';
              const isActive = activeZodiac === idx;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveZodiac(idx)}
                  onClick={() => setActiveZodiac(idx)}
                  className="bg-white border rounded-2xl p-5 cursor-pointer select-none transition-all duration-300 relative overflow-hidden"
                  style={{
                    borderColor: isActive ? elColor : '#E5E7EB',
                    boxShadow: isActive
                      ? `0 12px 28px ${elColor}25, 0 0 0 2px ${elColor}55`
                      : '0 2px 8px rgba(0,0,0,0.06)',
                    transform: isActive ? 'translateY(-6px) scale(1.03)' : 'translateY(0) scale(1)',
                  }}
                >
                  {/* Element accent top line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1.5 transition-opacity duration-300"
                    style={{
                      backgroundColor: elColor,
                      opacity: isActive ? 1 : 0.35,
                    }}
                  />

                  <div className="flex items-center justify-between mb-3 mt-1">
                    <div className="text-left">
                      <h4 className="font-extrabold text-sm text-[#2A1B18] leading-tight">
                        {t(z.nameKey)}
                      </h4>
                      <p className="text-xs text-[#D4AF37] font-sans font-bold mt-0.5">
                        {t(z.subKey)}
                      </p>
                    </div>
                    <span
                      className="text-4xl transition-all duration-300 select-none"
                      style={{
                        color: isActive ? elColor : '#2A1B18',
                        filter: isActive ? `drop-shadow(0 0 10px ${elColor}90)` : 'none',
                        transform: isActive ? 'scale(1.2)' : 'scale(1)',
                      }}
                    >
                      {z.sign}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-3 pt-3 border-t border-gray-100">
                    <span
                      className="text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border truncate"
                      style={{
                        color: elColor,
                        borderColor: elColor + '40',
                        backgroundColor: elColor + '10',
                      }}
                    >
                      {t(elementKeyMap[z.element])}
                    </span>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-gray-200 text-gray-500 bg-gray-50 truncate">
                      {t(z.rulerKey)}
                    </span>
                  </div>

                  {/* Indicator Dot */}
                  <div
                    className="mt-2 mx-auto rounded-full"
                    style={{
                      background: elColor,
                      width: '6px',
                      height: '6px',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'scale(1)' : 'scale(0)',
                      transition: 'all 0.3s ease',
                    }}
                  />
                </div>
              );
            })}
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
