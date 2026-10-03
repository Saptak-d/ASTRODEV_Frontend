import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function AboutTeam() {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [activeDomain, setActiveDomain] = useState(0);

  // 4 Simple Process Steps with interactive hover & click
  const steps = [
    {
      num: '01',
      icon: '📍',
      titleKey: 'aboutTeam.step1.title',
      subKey: 'aboutTeam.step1.sub',
      descKey: 'aboutTeam.step1.desc',
      insight: 'We calculate your exact Ascendant (Lagna) and local planetary coordinates at the precise moment of your birth.',
    },
    {
      num: '02',
      icon: '📜',
      titleKey: 'aboutTeam.step2.title',
      subKey: 'aboutTeam.step2.sub',
      descKey: 'aboutTeam.step2.desc',
      insight: 'Our senior astrologers evaluate divisional charts (D1, D9, D10), compatibility points, or yearly solar returns depending on the service you choose.',
    },
    {
      num: '03',
      icon: '🔍',
      titleKey: 'aboutTeam.step3.title',
      subKey: 'aboutTeam.step3.sub',
      descKey: 'aboutTeam.step3.desc',
      insight: 'We pinpoint exact planetary afflictions, Sade Sati, Manglik, or transit influences causing current life friction or relationship delays.',
    },
    {
      num: '04',
      icon: '🪷',
      titleKey: 'aboutTeam.step4.title',
      subKey: 'aboutTeam.step4.sub',
      descKey: 'aboutTeam.step4.desc',
      insight: 'You receive clear, customized daily mantras, energized gemstone recommendations, and auspicious timelines for your life goals.',
    },
  ];

  // Multi-Service Offerings Covered by our Astrologer Group
  const servicesList = [
    {
      icon: '☸',
      title: 'Sacred Kundli Reading',
      desc: 'In-depth birth chart analysis covering all 12 houses, yogas, dashas, career, and life blueprint.',
      link: '/generate',
      badge: 'Most Popular',
    },
    {
      icon: '⚭',
      title: 'Kundli Milan (Matchmaking)',
      desc: 'Ashtakoot Guna Milan, Manglik Dosha compatibility, and marital harmony assessment.',
      link: '/generate',
      badge: 'Compatibility',
    },
    {
      icon: '⏳',
      title: 'Varshaphal (Annual Return)',
      desc: 'Yearly solar return forecasting month-by-month trends, opportunities, and cautions.',
      link: '/generate',
      badge: 'Yearly Forecast',
    },
    {
      icon: '💎',
      title: 'Gemstone & Remedial Guidance',
      desc: 'Prescription of auspicious gemstones, sacred Beej Mantras, and planetary fasts.',
      link: '/generate',
      badge: 'Remedies',
    },
  ];

  // Interactive Life Domain Problem & Solution Explorer
  const lifeDomains = [
    {
      id: 'career',
      icon: '💼',
      label: 'Career & Business',
      sanskrit: 'कर्म एवं व्यवसाय',
      question: 'Facing career stagnancy, job change uncertainty, or business delays?',
      analysis: 'We study your 10th House (Karma Bhava), Sun (Authority), Saturn (Discipline), and Jupiter (Growth) alongside your D10 Dashamsha chart.',
      solution: 'Receive auspicious timelines for job switches, suitable professions, and remedies for professional growth.',
    },
    {
      id: 'marriage',
      icon: '💍',
      label: 'Marriage & Love',
      sanskrit: 'विवाह एवं संबंध',
      question: 'Experiencing delays in marriage, relationship discord, or compatibility doubts?',
      analysis: 'Our astrologers evaluate your 7th House (Partnership), Venus, Jupiter, Manglik Dosha, and D9 Navamsha chart.',
      solution: 'Guidance on ideal marriage timing, partner compatibility, and specific remedies to remove relationship obstacles.',
    },
    {
      id: 'finance',
      icon: '💰',
      label: 'Wealth & Finances',
      sanskrit: 'धन एवं समृद्धि',
      question: 'Struggling with financial instability, unexpected expenses, or debt?',
      analysis: 'We examine the 2nd House (Accumulated Wealth), 11th House (Gains), 5th/9th (Lakshmi Sthanas), and Dhana Yogas.',
      solution: 'Actionable advice on auspicious financial cycles, debt-relief remedies, and wealth-attracting practices.',
    },
    {
      id: 'health',
      icon: '🧘',
      label: 'Health & Mental Peace',
      sanskrit: 'स्वास्थ्य एवं शांति',
      question: 'Dealing with persistent anxiety, lack of vitality, or stress?',
      analysis: 'We review your 1st House (Lagna/Body), 6th House (Ailments), 8th House, Moon (Mind), and Sun (Vitality).',
      solution: 'Prescription of soothing Moon/Sun Beej Mantras, fasting disciplines, and daily spiritual habits for emotional balance.',
    },
    {
      id: 'dosha',
      icon: '💎',
      label: 'Doshas & Remedies',
      sanskrit: 'दोष निवारण एवं उपाय',
      question: 'Concerned about Sade Sati, Manglik Dosha, Kaal Sarp, or Pitra Dosha?',
      analysis: 'Our astrologers assess the exact degree, duration, and true impact of the planetary period on your unique chart.',
      solution: 'Genuine, fear-free shastric remedies — natural gemstones, metal rings, ritual daana, and protective stotras.',
    },
  ];

  // 3 Trust Pillars
  const pillars = [
    {
      icon: '🪷',
      titleKey: 'aboutTeam.value1.title',
      descKey: 'aboutTeam.value1.desc',
      highlight: 'Truthful Guidance',
    },
    {
      icon: '👁️',
      titleKey: 'aboutTeam.value2.title',
      descKey: 'aboutTeam.value2.desc',
      highlight: 'Thorough Review',
    },
    {
      icon: '🔒',
      titleKey: 'aboutTeam.value3.title',
      descKey: 'aboutTeam.value3.desc',
      highlight: 'Strictly Confidential',
    },
  ];

  return (
    <div className="min-h-screen bg-[#140D0A] text-[#F5F2E9] selection:bg-[#D4AF37] selection:text-[#140D0A] relative overflow-hidden">
      
      {/* Background Subtle Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-gradient-to-b from-[#D4AF37]/15 via-[#8C6239]/5 to-transparent rounded-full blur-3xl opacity-70" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#8C6239]/10 rounded-full blur-3xl" />
        
        {/* Sacred Watermarks */}
        <div className="absolute top-20 left-6 text-[14rem] text-[#D4AF37] opacity-[0.03] select-none font-serif leading-none">ॐ</div>
        <div className="absolute bottom-40 right-6 text-[12rem] text-[#D4AF37] opacity-[0.03] select-none font-serif leading-none">🔱</div>
      </div>

      {/* ══════════════════════ 1. HERO SECTION ══════════════════════ */}
      <section className="max-w-5xl mx-auto px-6 pt-28 pb-16 text-center relative z-10 space-y-6">
        
        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-serif tracking-tight leading-[1.15] text-[#F7F4EB]">
          <span className="bg-gradient-to-r from-[#FFF5DC] via-[#E8C868] to-[#FFF5DC] bg-clip-text text-transparent">
            {t('aboutTeam.hero.title')}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-[#D9D2C5] font-sans max-w-3xl mx-auto leading-relaxed font-light">
          {t('aboutTeam.hero.subtitle')}
        </p>

        {/* Integrated Dark Gold Stats Crest */}
        <div className="pt-4 max-w-4xl mx-auto">
          <div className="p-0.5 rounded-3xl bg-gradient-to-r from-[#D4AF37]/40 via-[#F3E5AB]/60 to-[#D4AF37]/40 shadow-2xl shadow-black/40">
            <div className="bg-[#1C120F]/95 backdrop-blur-xl rounded-[22px] px-6 py-6 md:py-7 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-[#D4AF37]/20 text-white">
              
              <div className="text-center py-2 px-3">
                <span className="text-2xl sm:text-3xl font-extrabold font-serif text-white tracking-tight block">30+ Yrs</span>
                <span className="text-[11px] font-sans font-semibold tracking-wider text-white uppercase mt-1 block">Astrological Heritage</span>
              </div>

              <div className="text-center py-2 px-3">
                <span className="text-2xl sm:text-3xl font-extrabold font-serif text-white tracking-tight block">100%</span>
                <span className="text-[11px] font-sans font-semibold tracking-wider text-white uppercase mt-1 block">Personal Chart Review</span>
              </div>

              <div className="text-center py-2 px-3 pt-3 md:pt-2">
                <span className="text-2xl sm:text-3xl font-extrabold font-serif text-white tracking-tight block">All Services</span>
                <span className="text-[11px] font-sans font-semibold tracking-wider text-white uppercase mt-1 block">Kundli, Milan & More</span>
              </div>

              <div className="text-center py-2 px-3 pt-3 md:pt-2">
                <span className="text-2xl sm:text-3xl font-extrabold font-serif text-white tracking-tight block">40,000+</span>
                <span className="text-[11px] font-sans font-semibold tracking-wider text-white uppercase mt-1 block">Consultations Guided</span>
              </div>

            </div>
          </div>
        </div>

      </section>

      {/* ══════════════════════ 2. INTERACTIVE PROCESS TIMELINE LINE (Hover & Click Responsive) ══════════════════════ */}
      <section className="py-20 px-6 relative z-10 border-t border-[#D4AF37]/30 bg-[#1A110D]">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-14 space-y-2">
            <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#D4AF37] block">
              {t('aboutTeam.flow.badge')}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-[#F7F4EB] tracking-tight">
              {t('aboutTeam.flow.title')}
            </h2>
            <p className="text-sm sm:text-base text-[#C2B7A3] max-w-xl mx-auto font-light">
              {t('aboutTeam.flow.subtitle')}
            </p>
          </div>

          {/* Connected Process Line */}
          <div className="relative">
            
            {/* Luminous Gold Vertical Timeline Line */}
            <div className="absolute left-6 sm:left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.4)]" />

            <div className="space-y-6 sm:space-y-8 relative">
              {steps.map((step, idx) => {
                const isSelected = activeStep === idx;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setActiveStep(idx)}
                    onClick={() => setActiveStep(idx)}
                    className="flex items-start gap-4 sm:gap-6 cursor-pointer group transition-all duration-300"
                  >
                    
                    {/* Node Marker */}
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-lg transition-all duration-300 z-10 ${
                        isSelected
                          ? 'bg-[#D4AF37] text-[#140D0A] ring-4 ring-[#D4AF37]/30 scale-110 font-extrabold shadow-[#D4AF37]/30'
                          : 'bg-[#241713] text-[#D4AF37] border border-[#D4AF37]/40 group-hover:border-[#D4AF37] group-hover:bg-[#2F1F1A] group-hover:scale-105'
                      }`}
                    >
                      <span className="text-base sm:text-xl leading-none">{step.icon}</span>
                      <span className={`text-[10px] sm:text-[11px] font-serif font-bold mt-0.5 ${isSelected ? 'text-[#140D0A]' : 'text-[#E8C868]'}`}>
                        {step.num}
                      </span>
                    </div>

                    {/* Step Card */}
                    <div
                      className={`flex-1 rounded-2xl p-5 sm:p-6 transition-all duration-300 border ${
                        isSelected
                          ? 'bg-gradient-to-br from-[#291A15] to-[#1F1410] border-[#D4AF37] shadow-xl shadow-[#D4AF37]/10 scale-[1.01]'
                          : 'bg-[#1F1410]/90 hover:bg-[#241713] border-[#D4AF37]/25 hover:border-[#D4AF37]/60'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <h3 className={`text-base sm:text-lg font-bold font-serif ${isSelected ? 'text-[#FFF5DC]' : 'text-[#F5F2E9]'}`}>
                          {t(step.titleKey)}
                        </h3>
                        <span className={`text-[10px] sm:text-[11px] font-sans font-semibold px-3 py-0.5 rounded-full border transition-colors ${
                          isSelected
                            ? 'text-[#140D0A] bg-[#D4AF37] border-[#FFF0A0]'
                            : 'text-[#D4AF37] bg-[#D4AF37]/15 border-[#D4AF37]/30'
                        }`}>
                          {t(step.subKey)}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-[#D2C8B8] font-sans leading-relaxed mb-3">
                        {t(step.descKey)}
                      </p>

                      {/* Interactive Insight Pill */}
                      <div className="pt-2 border-t border-[#D4AF37]/15 flex items-center justify-between text-xs">
                        <span className="text-[11px] font-sans text-[#A89F91] italic">
                          ✦ {step.insight}
                        </span>
                        <span className={`text-[10px] font-serif font-semibold transition-colors ${
                          isSelected ? 'text-[#D4AF37]' : 'text-gray-500 group-hover:text-[#D4AF37]'
                        }`}>
                          {isSelected ? 'Active Step ●' : 'Hover to View ➔'}
                        </span>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* ══════════════════════ 3. ALL ASTROLOGICAL SERVICES WE PROVIDE ══════════════════════ */}
      <section className="py-20 px-6 relative z-10 border-t border-[#D4AF37]/20 bg-gradient-to-b from-[#140D0A] via-[#1C120F] to-[#140D0A]">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#D4AF37] inline-block px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
              ✦ Multi-Service Guidance ✦
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-[#F7F4EB] tracking-tight">
              Astrological Services Handled by Our Council
            </h2>
            <p className="text-sm sm:text-base text-[#C2B7A3] max-w-xl mx-auto font-light">
              From birth chart readings to marriage compatibility and yearly solar returns, our astrologers examine every detail.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesList.map((srv, idx) => (
              <div
                key={idx}
                className="bg-[#211511] border border-[#D4AF37]/30 hover:border-[#D4AF37] rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] shadow-lg group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl p-2 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30">
                      {srv.icon}
                    </span>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#D4AF37] bg-[#D4AF37]/15 px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold font-serif text-[#F7F4EB] mb-2 group-hover:text-[#F3E5AB] transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-xs text-[#C2B7A3] font-sans leading-relaxed">
                    {srv.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#D4AF37]/20">
                  <Link
                    to={srv.link}
                    className="text-xs font-serif text-[#D4AF37] font-semibold hover:text-[#FFF5DC] flex items-center gap-1"
                  >
                    <span>Consult Astrologers</span>
                    <span>➔</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════ 4. INTERACTIVE LIFE PROBLEM & SOLUTION EXPLORER ══════════════════════ */}
      <section className="py-20 px-6 relative z-10 border-t border-[#D4AF37]/20 bg-[#1A110D]">
        <div className="max-w-5xl mx-auto space-y-10">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#D4AF37] inline-block px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30">
              ✦ How We Resolve Your Problems ✦
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-[#F7F4EB] tracking-tight">
              Every Area of Your Life Carefully Examined
            </h2>
            <p className="text-sm sm:text-base text-[#C2B7A3] max-w-xl mx-auto font-light">
              Click on any life area to see how our astrologers analyze the root causes and provide practical remedies.
            </p>
          </div>

          {/* Domain Tab Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {lifeDomains.map((domain, idx) => {
              const isDomainActive = activeDomain === idx;
              return (
                <button
                  key={domain.id}
                  onClick={() => setActiveDomain(idx)}
                  onMouseEnter={() => setActiveDomain(idx)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-sans text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    isDomainActive
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#F3E5AB] text-[#140D0A] shadow-lg shadow-[#D4AF37]/20 scale-105 font-bold'
                      : 'bg-[#241713] text-[#D2C8B8] hover:text-[#FFF5DC] border border-[#D4AF37]/30 hover:border-[#D4AF37]/60'
                  }`}
                >
                  <span className="text-base">{domain.icon}</span>
                  <span>{domain.label}</span>
                </button>
              );
            })}
          </div>

          {/* Active Domain Detail Card */}
          <div className="relative p-1 rounded-3xl bg-gradient-to-br from-[#D4AF37]/40 via-[#8C6239]/30 to-[#D4AF37]/40 shadow-2xl">
            <div className="bg-[#1C120F] rounded-[22px] p-6 sm:p-8 space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#D4AF37]/20">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30">
                    {lifeDomains[activeDomain].icon}
                  </span>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#F3E5AB]">
                      {lifeDomains[activeDomain].label}
                    </h3>
                    <span className="text-xs text-[#D4AF37] font-serif">
                      {lifeDomains[activeDomain].sanskrit}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-sans text-[#A89F91] bg-[#241713] px-3 py-1 rounded-full border border-[#D4AF37]/30">
                  ✦ Astrological Focus Area
                </span>
              </div>

              {/* The Question */}
              <div className="bg-[#241713] p-4 rounded-xl border border-[#D4AF37]/20">
                <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#D4AF37] block mb-1">
                  Common Challenge:
                </span>
                <p className="text-sm sm:text-base text-[#F7F4EB] font-sans font-medium">
                  "{lifeDomains[activeDomain].question}"
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* How We Analyze */}
                <div className="bg-[#160D0A] p-5 rounded-2xl border border-[#D4AF37]/20 space-y-2">
                  <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#E8C868] flex items-center gap-1.5">
                    <span>🔍</span>
                    <span>What Our Astrologers Study:</span>
                  </span>
                  <p className="text-xs sm:text-sm text-[#D2C8B8] font-sans leading-relaxed">
                    {lifeDomains[activeDomain].analysis}
                  </p>
                </div>

                {/* The Remedy & Outcome */}
                <div className="bg-[#160D0A] p-5 rounded-2xl border border-[#D4AF37]/20 space-y-2">
                  <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#E8C868] flex items-center gap-1.5">
                    <span>🪷</span>
                    <span>Remedies & Guidance Provided:</span>
                  </span>
                  <p className="text-xs sm:text-sm text-[#D2C8B8] font-sans leading-relaxed">
                    {lifeDomains[activeDomain].solution}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════ 5. WHY PEOPLE TRUST US (Pillars) ══════════════════════ */}
      <section className="py-20 px-6 relative z-10 border-t border-[#D4AF37]/20 bg-[#1A110D]">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center mb-14 space-y-2">
            <span className="text-xs font-serif font-bold uppercase tracking-widest text-[#D4AF37] block">
              ✦ Honest & Transparent ✦
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-[#F7F4EB]">
              {t('aboutTeam.values.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-[#241713] border border-[#D4AF37]/30 hover:border-[#D4AF37] rounded-3xl p-7 shadow-lg transition-all duration-300 text-left group"
              >
                <div className="w-13 h-13 rounded-2xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform p-2">
                  {pillar.icon}
                </div>
                
                <span className="text-[10px] font-serif font-bold uppercase tracking-wider text-[#D4AF37] block mb-1">
                  {pillar.highlight}
                </span>

                <h3 className="text-lg font-bold font-serif text-[#F7F4EB] mb-2">
                  {t(pillar.titleKey)}
                </h3>
                
                <p className="text-xs sm:text-sm text-[#D2C8B8] font-sans leading-relaxed">
                  {t(pillar.descKey)}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════ 7. WARM CALL TO ACTION ══════════════════════ */}
      <section className="bg-[#120B08] text-[#F5F2E9] py-20 px-6 text-center border-t-2 border-[#D4AF37] relative z-10">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="text-3xl font-serif text-[#D4AF37] select-none">
            ॐ
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif tracking-tight leading-snug text-[#F7F4EB]">
            <span className="bg-gradient-to-r from-[#FFF5DC] via-[#E8C868] to-[#FFF5DC] bg-clip-text text-transparent">
              {t('aboutTeam.cta.title')}
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#D2C8B8] font-sans leading-relaxed max-w-xl mx-auto">
            {t('aboutTeam.cta.subtitle')}
          </p>

          <div className="pt-2">
            <Link
              to="/generate"
              className="inline-block bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] hover:from-[#C5A059] hover:to-[#E5B84B] text-[#140D0A] font-extrabold py-4 px-10 rounded-2xl shadow-2xl shadow-[#D4AF37]/30 tracking-wider transition uppercase text-sm hover:scale-105 transform duration-200 cursor-pointer font-sans"
            >
              {t('aboutTeam.cta.button')}
            </Link>
          </div>

          <p className="text-[11px] text-[#A89F91] font-sans">
            ✦ Genuine Astrologer Review · Delivered Directly to WhatsApp & Email ✦
          </p>
        </div>
      </section>

    </div>
  );
}
