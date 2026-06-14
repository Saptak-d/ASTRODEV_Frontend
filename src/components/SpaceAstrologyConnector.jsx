import React, { useState, useEffect, useRef } from 'react';

const planetsData = [
  {
    symbol: '☉',
    id: 'sun',
    name: 'Surya / Sun',
    sanskrit: 'सूर्य',
    color: '#FF8C00',
    orbitRadius: 40,
    baseSpeed: 0.003, // baseline
    retroFreq: 0,
    astronomy: 'The central star of our solar system. Its massive nuclear fusion reactions generate light and solar winds that form the heliosphere, powering all life on Earth.',
    astrology: 'Represents the soul (Atman), vital life force, leadership, authority, the father archetype, and your core conscious identity.'
  },
  {
    symbol: '☽',
    id: 'moon',
    name: 'Chandra / Moon',
    sanskrit: 'चन्द्र',
    color: '#94A3B8',
    orbitRadius: 58,
    baseSpeed: 0.039, // ~13x speed of Sun
    retroFreq: 0,
    astronomy: "Earth's only natural satellite, orbiting at 384,400 km. Its gravitational pull creates ocean tides and stabilizes Earth's axial tilt, enabling a stable climate.",
    astrology: 'Governs the mind (Manas), emotional patterns, subconscious memory, maternal instincts, and how we experience inner comfort.'
  },
  {
    symbol: '☿',
    id: 'mercury',
    name: 'Budha / Mercury',
    sanskrit: 'बुध',
    color: '#10B981',
    orbitRadius: 76,
    baseSpeed: 0.0124, // ~4.1x speed of Sun
    retroFreq: 0.04,
    astronomy: 'The smallest and innermost planet, orbiting the Sun in just 88 days. It experiences extreme temperature fluctuations due to lack of a thick atmosphere.',
    astrology: 'Governs communication, analytical intellect, logic, business commerce, language acquisition, and cognitive speed.'
  },
  {
    symbol: '♀',
    id: 'venus',
    name: 'Shukra / Venus',
    sanskrit: 'शुक्र',
    color: '#EC4899',
    orbitRadius: 94,
    baseSpeed: 0.0048, // ~1.6x speed of Sun
    retroFreq: 0.02,
    astronomy: 'The hottest planet in our solar system due to a runaway greenhouse effect. Its dense CO2 clouds reflect 70% of sunlight, making it the brightest beacon in the night sky.',
    astrology: 'Governs romantic relationships, artistic expression, harmony, material luxury, beauty, and how we find value and aesthetic pleasure.'
  },
  {
    symbol: '♂',
    id: 'mars',
    name: 'Mangala / Mars',
    sanskrit: 'मंगल',
    color: '#EF4444',
    orbitRadius: 112,
    baseSpeed: 0.0016, // ~0.53x speed of Sun
    retroFreq: 0.01,
    astronomy: 'The red planet, covered in iron oxide (rust) dust. It features Olympus Mons (the largest volcano in the solar system) and displays ancient dried water channels.',
    astrology: 'Governs physical vitality, courage, ambition, competitive drive, technical skill (engineering), and assertion of willpower.'
  },
  {
    symbol: '♃',
    id: 'jupiter',
    name: 'Guru / Jupiter',
    sanskrit: 'गुरु',
    color: '#F59E0B',
    orbitRadius: 130,
    baseSpeed: 0.00025, // ~0.08x speed of Sun
    retroFreq: 0.005,
    astronomy: "A massive gas giant 11 times Earth's diameter. Its immense gravitational field acts as a cosmic vacuum cleaner, pulling in dangerous asteroids and protecting Earth.",
    astrology: 'Represents higher spiritual wisdom, philosophical growth, expansion of knowledge, wealth, teaching, and providential blessings.'
  },
  {
    symbol: '♄',
    id: 'saturn',
    name: 'Shani / Saturn',
    sanskrit: 'शनि',
    color: '#818CF8',
    orbitRadius: 148,
    baseSpeed: 0.0001, // ~0.03x speed of Sun
    retroFreq: 0.003,
    astronomy: 'Famed for its spectacular, complex ring system composed of trillions of water ice particles. It is the most distant planet visible to the naked human eye.',
    astrology: 'Represents time (Kala), discipline, structural boundaries, heavy responsibilities, patience, and essential lessons of cause and effect (Karma).'
  }
];

const zodiacs = [
  { sign: '♈', name: 'Aries (मेष)', element: 'Fire', description: 'Cardinal fire — sparks direct, courageous action and pioneering drive.' },
  { sign: '♉', name: 'Taurus (वृषभ)', element: 'Earth', description: 'Fixed earth — grounds energy in stable comfort, beauty, and patient growth.' },
  { sign: '♊', name: 'Gemini (मिथुन)', element: 'Air', description: 'Mutable air — fuels intellectual curiosity, adaptability, and lively communication.' },
  { sign: '♋', name: 'Cancer (कर्क)', element: 'Water', description: 'Cardinal water — nurtures deep emotional security, intuition, and protective care.' },
  { sign: '♌', name: 'Leo (सिंह)', element: 'Fire', description: 'Fixed fire — radiates sovereign self-expression, creative pride, and warmth.' },
  { sign: '♍', name: 'Virgo (कन्या)', element: 'Earth', description: 'Mutable earth — seeks precision, practical healing, and selfless service.' },
  { sign: '♎', name: 'Libra (तुला)', element: 'Air', description: 'Cardinal air — seeks social harmony, balanced relationships, and justice.' },
  { sign: '♏', name: 'Scorpio (वृश्चिक)', element: 'Water', description: 'Fixed water — processes intense transformation, deep secrets, and raw power.' },
  { sign: '♐', name: 'Sagittarius (धनु)', element: 'Fire', description: 'Mutable fire — aims for higher learning, travel adventure, and dharmic wisdom.' },
  { sign: '♑', name: 'Capricorn (मकर)', element: 'Earth', description: 'Cardinal earth — builds structured mastery, career ambition, and long-term duty.' },
  { sign: '♒', name: 'Aquarius (कुम्भ)', element: 'Air', description: 'Fixed air — drives visionary social progress, unconventional innovation, and freedom.' },
  { sign: '♓', name: 'Pisces (मीन)', element: 'Water', description: 'Mutable water — dissolves boundaries in spiritual oneness, dream artistry, and empathy.' }
];

const constellationPaths = [
  "M 330 170 L 315 155 L 295 150",
  "M 285 105 L 295 95 L 310 90 L 305 75 M 295 95 L 280 90",
  "M 210 60 L 200 45 L 180 50 M 200 45 L 205 30",
  "M 115 90 L 100 100 L 90 120 M 100 100 L 110 115",
  "M 70 175 L 85 190 L 80 215 L 60 210 L 55 185 Z",
  "M 85 285 L 105 295 L 115 315 M 105 295 L 95 310",
  "M 160 340 L 175 350 L 195 345 M 175 350 L 170 365",
  "M 260 345 L 280 335 L 290 315 M 280 335 L 285 355"
];

export default function SpaceAstrologyConnector() {
  const [selectedPlanet, setSelectedPlanet] = useState(planetsData[0]);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isRetrogradeSim, setIsRetrogradeSim] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(0.3);
  const [planetAngles, setPlanetAngles] = useState({
    sun: 0,
    moon: 1.2,
    mercury: 2.5,
    venus: 3.8,
    mars: 4.5,
    jupiter: 5.1,
    saturn: 0.8
  });

  const requestRef = useRef();
  const canvasRef = useRef(null);
  const svgRef = useRef();
  const timeRef = useRef(0);
  const isDragging = useRef(false);
  const activeDragPlanet = useRef(null);

  // Normalize angle to [0, 2 * Math.PI)
  const normalizeAngle = (angle) => {
    let norm = angle % (2 * Math.PI);
    if (norm < 0) norm += 2 * Math.PI;
    return norm;
  };

  // Twinkling Stars Canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let frameId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#FFF', '#FFF', '#93C5FD', '#FDE047', '#FDA4AF'];
    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: 0.2 + Math.random() * 1.3,
      twinkleSpeed: 0.008 + Math.random() * 0.022,
      phase: Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0F0A08';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars loop
      stars.forEach(s => {
        s.phase += s.twinkleSpeed;
        const alpha = Math.max(0.1, Math.min(1, 0.4 + 0.6 * Math.sin(s.phase)));
        ctx.fillStyle = s.color;
        ctx.globalAlpha = alpha;
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;
      frameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Compute speed with retrograde oscillation
  const getPlanetSpeedAndRetro = (p, time, speedMult) => {
    if (p.id === 'sun' || p.id === 'moon' || !isRetrogradeSim) {
      return { delta: p.baseSpeed * speedMult, isRetro: false };
    }
    const cosTerm = Math.cos(time * p.retroFreq);
    const multiplier = 1 + 1.8 * cosTerm;
    return {
      delta: p.baseSpeed * speedMult * multiplier,
      isRetro: multiplier < 0
    };
  };

  const checkIsPlanetRetrograde = (pId) => {
    if (pId === 'sun' || pId === 'moon' || !isRetrogradeSim) return false;
    const p = planetsData.find(pl => pl.id === pId);
    const cosTerm = Math.cos(timeRef.current * p.retroFreq);
    return (1 + 1.8 * cosTerm) < 0;
  };

  // Animation Loop for orbits
  useEffect(() => {
    const animate = () => {
      if (isAnimating && !isDragging.current) {
        timeRef.current += speedMultiplier; // time advances with speedMultiplier
        setPlanetAngles(prev => {
          const next = { ...prev };
          planetsData.forEach(p => {
            const { delta } = getPlanetSpeedAndRetro(p, timeRef.current, speedMultiplier); // rotation step scales with speedMultiplier
            next[p.id] = normalizeAngle(prev[p.id] + delta);
          });
          return next;
        });
      }
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isAnimating, speedMultiplier, isRetrogradeSim]);

  // Drag Mathematics
  const getMouseAngle = (clientX, clientY) => {
    if (!svgRef.current) return 0;
    const rect = svgRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    let angle = Math.atan2(dy, dx);
    if (angle < 0) angle += 2 * Math.PI;
    return angle;
  };

  const handleMouseDown = (e, planet) => {
    e.preventDefault();
    isDragging.current = true;
    activeDragPlanet.current = planet.id;
    setSelectedPlanet(planet);

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const angle = normalizeAngle(getMouseAngle(clientX, clientY));

    setPlanetAngles(prev => ({
      ...prev,
      [planet.id]: angle
    }));
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !activeDragPlanet.current) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const angle = normalizeAngle(getMouseAngle(clientX, clientY));

    setPlanetAngles(prev => ({
      ...prev,
      [activeDragPlanet.current]: angle
    }));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    activeDragPlanet.current = null;
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      handleMouseUp();
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    window.addEventListener('touchend', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
      window.removeEventListener('touchend', handleGlobalMouseUp);
    };
  }, []);

  // Compute Active Positions
  const getPlanetCoords = (id, radius) => {
    const angle = planetAngles[id];
    return {
      x: 200 + radius * Math.cos(angle),
      y: 200 + radius * Math.sin(angle)
    };
  };

  const getSectorPath = (index, rInner, rOuter) => {
    const startAngle = (index * 30 - 15) * Math.PI / 180;
    const endAngle = ((index + 1) * 30 - 15) * Math.PI / 180;
    const x1 = 200 + rOuter * Math.cos(startAngle);
    const y1 = 200 + rOuter * Math.sin(startAngle);
    const x2 = 200 + rOuter * Math.cos(endAngle);
    const y2 = 200 + rOuter * Math.sin(endAngle);
    const x3 = 200 + rInner * Math.cos(endAngle);
    const y3 = 200 + rInner * Math.sin(endAngle);
    const x4 = 200 + rInner * Math.cos(startAngle);
    const y4 = 200 + rInner * Math.sin(startAngle);
    return `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 0 0 ${x4} ${y4} Z`;
  };

  const getActiveZodiacIndex = (id) => {
    const angle = normalizeAngle(planetAngles[id]);
    let degree = (angle * 180) / Math.PI;
    degree = (degree + 15) % 360;
    return Math.floor(degree / 30);
  };

  const activeZodiacIndex = getActiveZodiacIndex(selectedPlanet.id);
  const activeZodiac = zodiacs[activeZodiacIndex];
  const activePlanetIsRetro = checkIsPlanetRetrograde(selectedPlanet.id);

  const elementColors = { Fire: '#F59E0B', Earth: '#10B981', Air: '#38BDF8', Water: '#6366F1' };

  return (
    <div className="relative py-24 px-6 overflow-hidden border-y border-amber-955/20 min-h-[720px]">
      {/* Tweaking Starfield Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Background Nebulae glowing colors */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-indigo-500/10 blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-3">
          <span className="text-[#D4AF37] text-xs font-sans font-bold uppercase tracking-[0.4em] block drop-shadow-md">
            ✦ Dynamic Geocentric Solar System ✦
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-widest text-amber-50">
            Celestial Orbits & Destiny
          </h2>
          <p className="text-gray-400 font-sans max-w-xl mx-auto text-sm leading-relaxed">
            Vedic astrology charts the skies from a geocentric coordinate frame. Click, drag, or play to watch planets orbit against background constellations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive SVG Celestial Wheel */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start select-none">
            <div className="relative w-full max-w-[380px] aspect-square bg-black/45 p-5 border border-amber-900/15 rounded-full shadow-2xl backdrop-blur-sm">
              <svg
                ref={svgRef}
                viewBox="0 0 400 400"
                className="w-full h-full cursor-pointer"
                style={{ overflow: 'visible' }}
                onMouseMove={handleMouseMove}
                onTouchMove={handleMouseMove}
              >
                <defs>
                  {/* 3D sphere volumetric shading */}
                  <radialGradient id="sphereShading" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
                    <stop offset="40%" stopColor="#ffffff" stopOpacity="0" />
                    <stop offset="75%" stopColor="#000000" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.85" />
                  </radialGradient>

                  {/* Saturn 3D Ring clip paths */}
                  <clipPath id="clipSaturnBack">
                    <rect x="-30" y="-30" width="60" height="30.2" />
                  </clipPath>
                  <clipPath id="clipSaturnFront">
                    <rect x="-30" y="0.2" width="60" height="30" />
                  </clipPath>

                  {/* Planet textures definitions */}
                  <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FFFFFF" />
                    <stop offset="30%" stopColor="#FFEA78" />
                    <stop offset="75%" stopColor="#EA580C" />
                    <stop offset="100%" stopColor="#991B1B" />
                  </radialGradient>
                  <radialGradient id="moonGrad" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#F8FAFC" />
                    <stop offset="65%" stopColor="#94A3B8" />
                    <stop offset="100%" stopColor="#1E293B" />
                  </radialGradient>
                  <radialGradient id="mercuryGrad" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#94A3B8" />
                    <stop offset="75%" stopColor="#475569" />
                    <stop offset="100%" stopColor="#0F172A" />
                  </radialGradient>
                  <radialGradient id="venusGrad" cx="40%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#FFF2D4" />
                    <stop offset="50%" stopColor="#F59E0B" />
                    <stop offset="100%" stopColor="#78350F" />
                  </radialGradient>
                  <radialGradient id="earthGrad" cx="35%" cy="35%" r="65%">
                    <stop offset="0%" stopColor="#93C5FD" />
                    <stop offset="35%" stopColor="#2563EB" />
                    <stop offset="75%" stopColor="#1E3A8A" />
                    <stop offset="100%" stopColor="#0F172A" />
                  </radialGradient>
                  <radialGradient id="marsGrad" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#FCA5A5" />
                    <stop offset="60%" stopColor="#EF4444" />
                    <stop offset="100%" stopColor="#7F1D1D" />
                  </radialGradient>
                  <radialGradient id="jupiterGrad" cx="40%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#FEF3C7" />
                    <stop offset="45%" stopColor="#D97706" />
                    <stop offset="100%" stopColor="#451A03" />
                  </radialGradient>
                  <radialGradient id="saturnGrad" cx="40%" cy="40%" r="60%">
                    <stop offset="0%" stopColor="#FEF08A" />
                    <stop offset="60%" stopColor="#CA8A04" />
                    <stop offset="100%" stopColor="#291501" />
                  </radialGradient>
                  <linearGradient id="saturnRingsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#B45309" stopOpacity="0.8" />
                    <stop offset="35%" stopColor="#EAB308" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#FEF08A" stopOpacity="0.4" />
                    <stop offset="65%" stopColor="#EAB308" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#78350F" stopOpacity="0.7" />
                  </linearGradient>

                  {/* Laser alignment line glow filter */}
                  <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  <linearGradient id="goldLaser" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                    <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#B45309" stopOpacity="0.3" />
                  </linearGradient>
                </defs>

                {/* Constellation maps in background */}
                {constellationPaths.map((path, idx) => (
                  <path
                    key={idx}
                    d={path}
                    fill="none"
                    stroke="rgba(212,175,55,0.12)"
                    strokeWidth="0.75"
                    strokeDasharray="2 3"
                  />
                ))}

                {/* Concentric planetary orbits */}
                {planetsData.map(p => (
                  <circle
                    key={p.id}
                    cx="200"
                    cy="200"
                    r={p.orbitRadius}
                    fill="none"
                    stroke={selectedPlanet.id === p.id ? 'rgba(212,175,55,0.22)' : 'rgba(212,175,55,0.06)'}
                    strokeWidth={selectedPlanet.id === p.id ? '2' : '1.2'}
                    strokeDasharray={p.id === 'moon' ? '2 2' : '4 4'}
                    className="transition-all duration-300"
                  />
                ))}

                {/* Center Node (Earth 🌍) - Astrological geocentric reference */}
                <circle cx="200" cy="200" r="13" fill="none" stroke="#60A5FA" strokeWidth="1.5" opacity="0.35" filter="url(#glow)" pointerEvents="none" />
                <circle cx="200" cy="200" r="6" fill="url(#earthGrad)" />
                {/* Micro continents on Earth */}
                <path d="M 197 199 Q 199 196 202 198 Q 204 200 200 203 Z" fill="#10B981" opacity="0.75" pointerEvents="none" />
                <path d="M 201 197 Q 203 194 204 198 Z" fill="#10B981" opacity="0.75" pointerEvents="none" />
                {/* White cloud overlays */}
                <path d="M 196 198 Q 198 195 201 199" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity="0.5" pointerEvents="none" />
                <path d="M 201 202 Q 203 203 204 201" fill="none" stroke="#FFFFFF" strokeWidth="1.0" opacity="0.4" pointerEvents="none" />
                {/* 3D Sphere Shading Overlay for Earth */}
                <circle cx="200" cy="200" r="6" fill="url(#sphereShading)" opacity="0.9" pointerEvents="none" />

                {/* Outer Ring Zodiac Constellations Segment Highlight */}
                <path
                  d={getSectorPath(activeZodiacIndex, 168, 183)}
                  fill={`${elementColors[activeZodiac.element]}35`}
                  stroke={elementColors[activeZodiac.element]}
                  strokeWidth="2"
                  filter="url(#glow)"
                  className="transition-all duration-300"
                />

                {/* Active Laser Cosmic Alignment Line */}
                {(() => {
                  const angle = planetAngles[selectedPlanet.id];
                  const xOuter = 200 + 183 * Math.cos(angle);
                  const yOuter = 200 + 183 * Math.sin(angle);
                  return (
                    <g>
                      <line
                        x1="200"
                        y1="200"
                        x2={xOuter}
                        y2={yOuter}
                        stroke="url(#goldLaser)"
                        strokeWidth="2"
                        strokeDasharray="4 2"
                        filter="url(#laserGlow)"
                      />
                      <circle cx={xOuter} cy={yOuter} r="4.5" fill="#FBBF24" filter="url(#glow)" />
                    </g>
                  );
                })()}

                {/* Render Planet Spheres (mini 3D-feeling graphics) */}
                {planetsData.map(p => {
                  const coords = getPlanetCoords(p.id, p.orbitRadius);
                  const isSelected = selectedPlanet.id === p.id;
                  const isRetro = checkIsPlanetRetrograde(p.id);
                  const r = isSelected ? 12 : 9.5;

                  // Rings parameters for Saturn
                  const rRingsOuter = r * 1.7;
                  const rRingsInnerY = r * 0.55;
                  const rRingsFaint = r * 2.05;
                  const rRingsFaintY = r * 0.65;

                  return (
                    <g
                      key={p.id}
                      transform={`translate(${coords.x}, ${coords.y})`}
                    >
                      {/* Pulsing Sun Corona Glow behind Sun */}
                      {p.id === 'sun' && (
                        <g opacity="0.3" filter="url(#glow)" pointerEvents="none">
                          <circle cx="0" cy="0" r={r * 1.7} fill="#EA580C" opacity="0.5" className="animate-pulse" />
                          <circle cx="0" cy="0" r={r * 2.4} fill="#F59E0B" opacity="0.25" style={{ animationDuration: '4s' }} className="animate-pulse" />
                        </g>
                      )}

                      {/* Saturn Back Ring (behind planet) */}
                      {p.id === 'saturn' && (
                        <g transform="rotate(-15)" clipPath="url(#clipSaturnBack)" pointerEvents="none">
                          {/* Faint outer ring */}
                          <ellipse cx="0" cy="0" rx={rRingsFaint} ry={rRingsFaintY} fill="none" stroke="url(#saturnRingsGrad)" strokeWidth="1" opacity="0.4" />
                          {/* Main ring */}
                          <ellipse cx="0" cy="0" rx={rRingsOuter} ry={rRingsInnerY} fill="none" stroke="url(#saturnRingsGrad)" strokeWidth="4.5" opacity="0.9" />
                        </g>
                      )}

                      {/* Base Planet Sphere */}
                      <circle
                        cx="0"
                        cy="0"
                        r={r}
                        fill={`url(#${p.id}Grad)`}
                        stroke={isSelected ? '#FBBF24' : 'rgba(255,255,255,0.1)'}
                        strokeWidth={isSelected ? '1.8' : '0.5'}
                        filter={isSelected ? 'url(#glow)' : ''}
                        className="cursor-grab active:cursor-grabbing"
                        onMouseDown={(e) => handleMouseDown(e, p)}
                        onTouchStart={(e) => handleMouseDown(e, p)}
                      />

                      {/* Planet details (layered under 3D shadow) */}
                      <g pointerEvents="none">
                        {p.id === 'moon' && (
                          <g opacity="0.25">
                            {/* Moon craters / maria */}
                            <circle cx="-3" cy="-2" r="2.2" fill="#334155" />
                            <circle cx="2" cy="3" r="1.8" fill="#334155" />
                            <circle cx="-2" cy="4" r="1.5" fill="#334155" />
                            <circle cx="4" cy="-3" r="1.2" fill="#334155" />
                          </g>
                        )}

                        {p.id === 'mercury' && (
                          <g opacity="0.28">
                            <circle cx="-2" cy="-3" r="1.5" fill="#1E293B" />
                            <circle cx="3" cy="2" r="1.2" fill="#1E293B" />
                            <circle cx="-4" cy="2" r="1.0" fill="#1E293B" />
                            <circle cx="1" cy="-4" r="1.0" fill="#F8FAFC" />
                            <circle cx="4" cy="-2" r="0.8" fill="#F8FAFC" />
                          </g>
                        )}

                        {p.id === 'venus' && (
                          <g opacity="0.25">
                            {/* Soft swirling acid cloud bands */}
                            <path d={`M ${-r + 1.5} ${-r / 3} Q 0 ${-r / 2} ${r - 1.5} ${-r / 3}`} fill="none" stroke="#78350F" strokeWidth="1.5" />
                            <path d={`M ${-r + 1} ${r / 4} Q 0 ${r / 3} ${r - 1} ${r / 4}`} fill="none" stroke="#78350F" strokeWidth="2" />
                            <path d={`M ${-r + 3} ${-r / 1.5} Q 0 ${-r / 1.3} ${r - 3} ${-r / 1.5}`} fill="none" stroke="#78350F" strokeWidth="1" />
                          </g>
                        )}

                        {p.id === 'mars' && (
                          <g opacity="0.35">
                            {/* Syrtis Major / Dark markings */}
                            <path d="M -5 2 Q -2 -1 3 1 Q 1 4 -3 5 Z" fill="#450A0A" />
                            <path d="M 2 -4 Q 5 -2 4 1 Z" fill="#450A0A" />
                            {/* White polar cap */}
                            <circle cx="0" cy={-r + 1.2} r="2" fill="#FFFFFF" opacity="0.9" />
                          </g>
                        )}

                        {p.id === 'jupiter' && (
                          <g opacity="0.45">
                            {/* Jupiter detailed gas bands */}
                            <rect x={-r + 1} y={-r / 2.5} width={(r - 1) * 2} height="1.8" fill="#451A03" />
                            <rect x={-r + 0.5} y={-r / 9} width={(r - 0.5) * 2} height="1.2" fill="#F59E0B" />
                            <rect x={-r + 0.5} y={r / 4} width={(r - 0.5) * 2} height="2.2" fill="#451A03" />
                            <rect x={-r + 1.5} y={r / 1.8} width={(r - 1.5) * 2} height="1" fill="#78350F" />
                            {/* Great Red Spot */}
                            <ellipse cx={r * 0.35} cy={r * 0.32} rx="2.5" ry="1.6" fill="#C2410C" stroke="#7C2D12" strokeWidth="0.5" />
                          </g>
                        )}

                        {p.id === 'saturn' && (
                          <g opacity="0.4">
                            {/* Saturn bands */}
                            <rect x={-r + 1} y={-r / 3.5} width={(r - 1) * 2} height="1.2" fill="#78350F" />
                            <rect x={-r + 0.5} y={r / 6} width={(r - 0.5) * 2} height="1.6" fill="#78350F" />
                          </g>
                        )}
                      </g>

                      {/* 3D Sphere Shading Overlay (Applied on top of all planetary textures) */}
                      {p.id !== 'sun' && (
                        <circle cx="0" cy="0" r={r} fill="url(#sphereShading)" opacity="0.95" pointerEvents="none" />
                      )}

                      {/* Saturn Front Ring (in front of planet) */}
                      {p.id === 'saturn' && (
                        <g transform="rotate(-15)" clipPath="url(#clipSaturnFront)" pointerEvents="none">
                          {/* Faint outer ring */}
                          <ellipse cx="0" cy="0" rx={rRingsFaint} ry={rRingsFaintY} fill="none" stroke="url(#saturnRingsGrad)" strokeWidth="1" opacity="0.4" />
                          {/* Main ring */}
                          <ellipse cx="0" cy="0" rx={rRingsOuter} ry={rRingsInnerY} fill="none" stroke="url(#saturnRingsGrad)" strokeWidth="4.5" opacity="0.9" />
                        </g>
                      )}

                      {/* Retrograde Symbol Indicator (℞) */}
                      {isRetro && (
                        <g transform={`translate(${r + 3}, -${r + 3})`}>
                          <circle cx="0" cy="0" r="6.5" fill="#7F1D1D" stroke="#EF4444" strokeWidth="1" />
                          <text x="0" y="3" fontSize="8" fill="#FCA5A5" fontWeight="bold" textAnchor="middle" className="font-sans">℞</text>
                        </g>
                      )}

                      {/* Planet Name Label underneath */}
                      <text
                        x="0"
                        y={r + 9.5}
                        fontSize="6.8"
                        fill={isSelected ? '#FBBF24' : 'rgba(245,242,233,0.5)'}
                        fontWeight="bold"
                        textAnchor="middle"
                        className="select-none font-sans pointer-events-none tracking-wider uppercase drop-shadow"
                      >
                        {p.id === 'sun' ? 'Sun' : p.id === 'moon' ? 'Moon' : p.name.split(' / ')[1]}
                      </text>
                    </g>
                  );
                })}

                {/* Outer Ring Zodiac Glyphs (Rendered inside the sector ring 168-183) */}
                {zodiacs.map((z, i) => {
                  const midAngle = (i * 30) * Math.PI / 180;
                  const xText = 200 + 175.5 * Math.cos(midAngle);
                  const yText = 200 + 175.5 * Math.sin(midAngle);
                  const isActive = activeZodiacIndex === i;
                  return (
                    <g key={z.sign}>
                      <text
                        x={xText}
                        y={midAngle > Math.PI ? yText + 4 : yText + 3}
                        fontSize="9.5"
                        fill={isActive ? '#FBBF24' : 'rgba(245,242,233,0.38)'}
                        fontWeight={isActive ? 'bold' : 'normal'}
                        textAnchor="middle"
                        className="select-none font-sans transition-all duration-300"
                        style={{ textShadow: isActive ? '0 0 10px rgba(251,191,36,0.9)' : '' }}
                      >
                        {z.sign}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

          </div>

          {/* Right Column: Two boxes side-by-side */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6 items-start">
            
            {/* Box 1: Simulation Controls Panel */}
            <div className="bg-[#1C120F]/65 border border-amber-955/20 rounded-2xl p-6 backdrop-blur-md space-y-4 text-left">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-sans font-bold tracking-widest text-[#D4AF37]">Simulation Live Stream</span>
                <span className="text-[10px] font-sans text-gray-500 uppercase tracking-wider flex items-center gap-1.5 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping"></span> Live 1x
                </span>
              </div>

              {/* Retrograde toggler */}
              <div className="flex items-center justify-between border-t border-amber-955/15 pt-3">
                <div className="space-y-0.5 text-left">
                  <span className="text-xs font-sans font-bold text-gray-300 block">Apparent Retrograde</span>
                  <span className="text-[10px] font-sans text-gray-500 block">Simulate geo-reversal loops (℞)</span>
                </div>
                <button
                  onClick={() => setIsRetrogradeSim(!isRetrogradeSim)}
                  className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-300 outline-none shrink-0 ${
                    isRetrogradeSim ? 'bg-amber-500' : 'bg-gray-800'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full bg-[#1C120F] shadow-md transform transition-transform duration-300 ${
                    isRetrogradeSim ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              {/* Simulation Speed Slider Control */}
              <div className="space-y-2 border-t border-amber-955/15 pt-3">
                <div className="flex items-center justify-between">
                  <div className="text-left">
                    <span className="text-xs font-sans font-bold text-gray-300 block">Simulation Speed</span>
                    <span className="text-[10px] font-sans text-gray-500 block">Adjust orbital speeds in real-time</span>
                  </div>
                  <span className="text-[10.5px] font-sans text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    {speedMultiplier.toFixed(2)}x
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsAnimating(!isAnimating)}
                    className="px-3 py-1.5 rounded-lg bg-[#130E0C] border border-amber-900/35 text-[10px] font-sans font-bold uppercase tracking-wider text-gray-300 hover:border-[#D4AF37]/50 hover:text-white transition-all shadow-md shrink-0 flex items-center gap-1"
                  >
                    <span>{isAnimating ? '⏸' : '▶'}</span>
                    <span>{isAnimating ? 'Pause' : 'Play'}</span>
                  </button>
                  <input
                    type="range"
                    min="0.05"
                    max="2.0"
                    step="0.05"
                    value={speedMultiplier}
                    onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))}
                    className="flex-grow h-1.5 bg-black/45 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>
              </div>

              {/* Planetary Buttons */}
              <div className="space-y-2 border-t border-amber-955/15 pt-3">
                <span className="text-[10px] text-gray-500 font-sans uppercase tracking-wider block text-left">Focal Planetary Focus:</span>
                <div className="flex gap-1.5 justify-between mt-1">
                  {planetsData.map(p => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setSelectedPlanet(p);
                      }}
                      className={`w-7 h-7 rounded-full border flex items-center justify-center text-xs font-sans font-bold transition-all ${
                        selectedPlanet.id === p.id
                          ? 'bg-[#D4AF37] border-[#D4AF37] text-[#1E1410] scale-110 shadow-lg shadow-amber-500/20'
                          : 'bg-[#130E0C] border-amber-900/25 text-gray-400 hover:border-amber-900/50 hover:text-gray-200'
                      }`}
                      title={p.name.split(' / ')[1]}
                    >
                      {p.symbol}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Box 2: Planet Details Panel */}
            <div className="bg-[#19100D]/80 border border-amber-900/20 rounded-2xl p-6 shadow-2xl relative backdrop-blur-md text-left">
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#D4AF37]/30 rounded-tr-2xl pointer-events-none"></div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-amber-955/20 pb-3">
                  <div>
                    <h3 className="text-xl font-bold uppercase tracking-wider text-amber-50">
                      {selectedPlanet.name}
                    </h3>
                    <p className="text-[10px] font-sans text-[#D4AF37] tracking-wider uppercase italic">
                      Sanskrit: {selectedPlanet.sanskrit}
                    </p>
                  </div>
                  <span className="text-3xl font-sans" style={{ color: selectedPlanet.color }}>
                    {selectedPlanet.symbol}
                  </span>
                </div>

                {/* Structured Cosmic Metadata Grid */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-[#0A0706]/90 border border-amber-955/15 rounded-xl p-2.5">
                    <span className="text-[8px] font-sans text-gray-500 uppercase tracking-widest block font-bold">Vedic Rulership</span>
                    <span className="text-[10.5px] font-bold text-amber-300 mt-0.5 block truncate">
                      {selectedPlanet.id === 'sun' && 'Leo (सिंह)'}
                      {selectedPlanet.id === 'moon' && 'Cancer (कर्क)'}
                      {selectedPlanet.id === 'mercury' && 'Gemini & Virgo'}
                      {selectedPlanet.id === 'venus' && 'Taurus & Libra'}
                      {selectedPlanet.id === 'mars' && 'Aries & Scorpio'}
                      {selectedPlanet.id === 'jupiter' && 'Sagittarius & Pisces'}
                      {selectedPlanet.id === 'saturn' && 'Capricorn & Aquarius'}
                    </span>
                  </div>
                  <div className="bg-[#0A0706]/90 border border-amber-955/15 rounded-xl p-2.5">
                    <span className="text-[8px] font-sans text-gray-500 uppercase tracking-widest block font-bold">Chart Radius</span>
                    <span className="text-[10.5px] font-bold text-amber-300 mt-0.5 block">
                      {selectedPlanet.orbitRadius}px Orbit
                    </span>
                  </div>
                </div>

                {/* Current alignment banner */}
                <div className="bg-[#0A0706]/90 rounded-xl p-3 border border-amber-955/15 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{activeZodiac.sign}</span>
                    <div>
                      <p className="text-[8px] font-sans text-gray-500 uppercase tracking-widest leading-none">Active Transit Alignment</p>
                      <p className="text-xs font-bold text-amber-100 uppercase tracking-wide mt-1">
                        Transiting {activeZodiac.name}
                      </p>
                    </div>
                  </div>
                  {activePlanetIsRetro && (
                    <span className="bg-red-950 border border-red-500/40 text-red-400 font-sans font-bold text-[8px] px-1.5 py-0.5 rounded-full uppercase tracking-wider animate-pulse flex items-center gap-0.5">
                      <span>℞</span> Retro
                    </span>
                  )}
                </div>

                {/* Physics description */}
                <div className="bg-[#0A0706]/75 border border-amber-955/10 rounded-xl p-3.5 space-y-1">
                  <h4 className="text-[9px] uppercase font-sans font-bold tracking-widest text-[#D4AF37] flex items-center gap-1.5">
                    <span>🔭</span> Astronomical Physics
                  </h4>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-sans">
                    {selectedPlanet.astronomy}
                  </p>
                </div>

                {/* Astrological connection */}
                <div className="bg-[#0A0706]/75 border border-amber-955/10 rounded-xl p-3.5 space-y-1">
                  <h4 className="text-[9px] uppercase font-sans font-bold tracking-widest text-sky-400 flex items-center gap-1.5">
                    <span>☸</span> Astrological Correspondence
                  </h4>
                  <p className="text-[11px] text-gray-300 leading-relaxed font-sans">
                    {selectedPlanet.astrology}
                  </p>
                </div>

                {/* Transiting description */}
                <div className="border-t border-amber-955/15 pt-2 text-[10.5px] font-sans text-gray-500 italic leading-relaxed">
                  {activeZodiac.description}
                </div>
              </div>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}
