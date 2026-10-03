import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function AboutTeam() {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      icon: '📍',
      titleKey: 'aboutTeam.step1.title',
      subKey: 'aboutTeam.step1.sub',
      descKey: 'aboutTeam.step1.desc',
      highlight: 'Lat / Long Coordinates & Timezone',
    },
    {
      num: '02',
      icon: '📜',
      titleKey: 'aboutTeam.step2.title',
      subKey: 'aboutTeam.step2.sub',
      descKey: 'aboutTeam.step2.desc',
      highlight: 'Certified Jyotish Acharyas',
    },
    {
      num: '03',
      icon: '🔭',
      titleKey: 'aboutTeam.step3.title',
      subKey: 'aboutTeam.step3.sub',
      descKey: 'aboutTeam.step3.desc',
      highlight: 'Brihat Parashara & Surya Siddhanta',
    },
    {
      num: '04',
      icon: '⏳',
      titleKey: 'aboutTeam.step4.title',
      subKey: 'aboutTeam.step4.sub',
      descKey: 'aboutTeam.step4.desc',
      highlight: '120-Yr Vimshottari & Raj Yogas',
    },
    {
      num: '05',
      icon: '💎',
      titleKey: 'aboutTeam.step5.title',
      subKey: 'aboutTeam.step5.sub',
      descKey: 'aboutTeam.step5.desc',
      highlight: 'Custom Mantras, Gemstones & Fasting',
    },
    {
      num: '06',
      icon: '📄',
      titleKey: 'aboutTeam.step6.title',
      subKey: 'aboutTeam.step6.sub',
      descKey: 'aboutTeam.step6.desc',
      highlight: '33-Page Sacred Consultation Book',
    },
  ];

  const pandits = [
    {
      nameKey: 'aboutTeam.pandit1.name',
      roleKey: 'aboutTeam.pandit1.role',
      expKey: 'aboutTeam.pandit1.exp',
      descKey: 'aboutTeam.pandit1.desc',
      avatar: '🕉️',
      specialty: 'Parashari & Shadbala',
    },
    {
      nameKey: 'aboutTeam.pandit2.name',
      roleKey: 'aboutTeam.pandit2.role',
      expKey: 'aboutTeam.pandit2.exp',
      descKey: 'aboutTeam.pandit2.desc',
      avatar: '🪷',
      specialty: 'Vimshottari & Transits',
    },
    {
      nameKey: 'aboutTeam.pandit3.name',
      roleKey: 'aboutTeam.pandit3.role',
      expKey: 'aboutTeam.pandit3.exp',
      descKey: 'aboutTeam.pandit3.desc',
      avatar: '🪔',
      specialty: 'Gemstones & Mantras',
    },
  ];

  const pillars = [
    {
      icon: '🏛️',
      titleKey: 'aboutTeam.value1.title',
      descKey: 'aboutTeam.value1.desc',
    },
    {
      icon: '✍️',
      titleKey: 'aboutTeam.value2.title',
      descKey: 'aboutTeam.value2.desc',
    },
    {
      icon: '🔐',
      titleKey: 'aboutTeam.value3.title',
      descKey: 'aboutTeam.value3.desc',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F2E9] text-[#2A1B18] overflow-hidden">
      {/* ══════════════════════ HERO SECTION ══════════════════════ */}
      <section className="relative bg-[#1E1410] text-[#F5F2E9] py-20 px-6 overflow-hidden border-b-2 border-[#D4AF37]">
        {/* Ambient watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[26rem] text-[#D4AF37]/5 font-serif select-none pointer-events-none">
          ☸
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1E1410]/50 to-[#1E1410]" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <span className="inline-block text-[#D4AF37] text-xs font-sans font-bold uppercase tracking-[0.3em] border border-[#D4AF37]/35 px-4 py-1.5 rounded-full bg-[#D4AF37]/10">
            {t('aboutTeam.badge')}
          </span>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-wider uppercase font-serif leading-tight">
            {t('aboutTeam.hero.title')}
          </h1>

          <p className="text-base md:text-lg text-[#E0D8CB] font-sans leading-relaxed max-w-3xl mx-auto font-light">
            {t('aboutTeam.hero.subtitle')}
          </p>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 max-w-4xl mx-auto">
            <div className="bg-white/5 border border-[#D4AF37]/25 rounded-xl p-4 backdrop-blur-sm">
              <span className="text-2xl md:text-3xl font-extrabold text-[#D4AF37] font-serif block">34+ Yrs</span>
              <span className="text-[10px] text-gray-300 font-sans tracking-widest uppercase">Shastric Heritage</span>
            </div>
            <div className="bg-white/5 border border-[#D4AF37]/25 rounded-xl p-4 backdrop-blur-sm">
              <span className="text-2xl md:text-3xl font-extrabold text-[#D4AF37] font-serif block">100%</span>
              <span className="text-[10px] text-gray-300 font-sans tracking-widest uppercase">Classical Gurukula</span>
            </div>
            <div className="bg-white/5 border border-[#D4AF37]/25 rounded-xl p-4 backdrop-blur-sm">
              <span className="text-2xl md:text-3xl font-extrabold text-[#D4AF37] font-serif block">33-Page</span>
              <span className="text-[10px] text-gray-300 font-sans tracking-widest uppercase">Deep Life Map</span>
            </div>
            <div className="bg-white/5 border border-[#D4AF37]/25 rounded-xl p-4 backdrop-blur-sm">
              <span className="text-2xl md:text-3xl font-extrabold text-[#D4AF37] font-serif block">40K+</span>
              <span className="text-[10px] text-gray-300 font-sans tracking-widest uppercase">Kundlis Vetted</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ FLOW DIAGRAM (THE SACRED PIPELINE) ══════════════════════ */}
      <section className="py-20 px-6 max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <span className="text-[#8C6239] text-xs font-sans font-bold uppercase tracking-[0.3em] block mb-2">
            {t('aboutTeam.flow.badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-widest text-[#2A1B18] font-serif">
            {t('aboutTeam.flow.title')}
          </h2>
          <p className="text-sm md:text-base text-gray-600 font-sans mt-2 max-w-2xl mx-auto">
            {t('aboutTeam.flow.subtitle')}
          </p>
        </div>

        {/* Visual Pipeline Step-by-Step Flow */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                className={`relative rounded-2xl p-6 transition-all duration-300 cursor-pointer border select-none ${
                  activeStep === idx
                    ? 'bg-[#1E1410] text-[#F5F2E9] border-[#D4AF37] shadow-[0_12px_32px_rgba(212,175,55,0.2)] -translate-y-1'
                    : 'bg-white text-[#2A1B18] border-gray-200 hover:border-[#D4AF37]/60 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Step Top Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs font-serif font-black px-2.5 py-1 rounded-lg border ${
                      activeStep === idx
                        ? 'bg-[#D4AF37] text-[#1E1410] border-[#D4AF37]'
                        : 'bg-gray-100 text-gray-600 border-gray-200'
                    }`}
                  >
                    STEP {step.num}
                  </span>
                  <span className="text-3xl">{step.icon}</span>
                </div>

                <h3
                  className={`text-base font-extrabold uppercase tracking-wider mb-1 font-serif ${
                    activeStep === idx ? 'text-[#D4AF37]' : 'text-[#2A1B18]'
                  }`}
                >
                  {t(step.titleKey)}
                </h3>

                <p
                  className={`text-xs font-sans font-semibold mb-3 ${
                    activeStep === idx ? 'text-amber-200/80' : 'text-[#8C6239]'
                  }`}
                >
                  {t(step.subKey)}
                </p>

                <p
                  className={`text-xs font-sans leading-relaxed ${
                    activeStep === idx ? 'text-[#EAE6DB]' : 'text-gray-600'
                  }`}
                >
                  {t(step.descKey)}
                </p>

                {/* Highlight Tag */}
                <div className="mt-4 pt-3 border-t border-current/10">
                  <span
                    className={`text-[9.5px] font-sans font-bold uppercase tracking-wider ${
                      activeStep === idx ? 'text-[#D4AF37]' : 'text-gray-400'
                    }`}
                  >
                    ✦ {step.highlight}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Flow Bar Summary */}
          <div className="bg-[#FAF8F3] border border-[#D4AF37]/30 rounded-2xl p-5 shadow-inner text-center">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-sans font-bold text-[#8C6239]">
              <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                <span>1. Data Intake</span>
              </span>
              <span>➔</span>
              <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                <span>2. Pandit Council Assignment</span>
              </span>
              <span>➔</span>
              <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                <span>3. Shastric Planetary Charting</span>
              </span>
              <span>➔</span>
              <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                <span>4. 120-Yr Dasha & Yogas</span>
              </span>
              <span>➔</span>
              <span className="flex items-center gap-1 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                <span>5. Remedies & Gemstones</span>
              </span>
              <span>➔</span>
              <span className="flex items-center gap-1 bg-[#1E1410] text-[#D4AF37] px-3 py-1.5 rounded-lg border border-[#D4AF37] shadow-sm">
                <span>6. 33-Page PDF Delivery</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ COUNCIL OF PANDITS & SCHOLARS ══════════════════════ */}
      <section className="bg-[#241714] text-[#F5F2E9] py-20 px-6 relative z-10 border-y border-[#D4AF37]/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#D4AF37] text-xs font-sans font-bold uppercase tracking-[0.3em] block mb-2">
              {t('aboutTeam.team.badge')}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-widest text-[#F5F2E9] font-serif">
              {t('aboutTeam.team.title')}
            </h2>
            <p className="text-sm md:text-base text-gray-300 font-sans mt-2 max-w-2xl mx-auto font-light">
              {t('aboutTeam.team.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {pandits.map((pandit, i) => (
              <div
                key={i}
                className="bg-[#1C120F] border border-[#D4AF37]/35 rounded-2xl p-6 flex flex-col justify-between hover:border-[#D4AF37] transition-all duration-300 group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl p-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-xl inline-block">
                      {pandit.avatar}
                    </span>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                      {pandit.specialty}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#F5F2E9] font-serif mb-1 group-hover:text-[#D4AF37] transition-colors">
                    {t(pandit.nameKey)}
                  </h3>

                  <p className="text-xs font-sans text-[#D4AF37] font-semibold mb-1">
                    {t(pandit.roleKey)}
                  </p>

                  <p className="text-[10px] font-sans text-gray-400 mb-4 pb-3 border-b border-[#D4AF37]/20">
                    {t(pandit.expKey)}
                  </p>

                  <p className="text-xs font-sans text-gray-300 leading-relaxed">
                    {t(pandit.descKey)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Editorial & Astro-Engineering Team Box */}
          <div className="bg-[#1C120F]/90 border border-[#D4AF37]/40 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-xl">
            <div className="text-5xl p-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-2xl text-[#D4AF37]">
              🏛️
            </div>
            <div className="text-left space-y-2 flex-1">
              <h3 className="text-lg sm:text-xl font-bold font-serif text-[#D4AF37] uppercase tracking-wider">
                {t('aboutTeam.editorial.title')}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                {t('aboutTeam.editorial.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════ PILLARS OF AUTHENTICITY ══════════════════════ */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-widest text-[#2A1B18] font-serif">
            {t('aboutTeam.values.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all text-left"
            >
              <div className="text-3xl mb-3">{pillar.icon}</div>
              <h3 className="text-base font-extrabold text-[#2A1B18] font-serif mb-2">
                {t(pillar.titleKey)}
              </h3>
              <p className="text-xs text-gray-600 font-sans leading-relaxed">
                {t(pillar.descKey)}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════ CALL TO ACTION ══════════════════════ */}
      <section className="bg-[#1E1410] text-[#F5F2E9] py-20 px-6 text-center border-t-2 border-[#D4AF37] relative overflow-hidden">
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <span className="text-4xl select-none inline-block text-[#D4AF37]">ॐ</span>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-widest font-serif leading-tight">
            {t('aboutTeam.cta.title')}
          </h2>
          <p className="text-sm md:text-base text-gray-300 font-sans max-w-xl mx-auto">
            {t('aboutTeam.cta.subtitle')}
          </p>
          <div className="pt-4">
            <Link
              to="/generate"
              className="inline-block bg-[#D4AF37] hover:bg-[#C69214] text-[#1E1410] font-extrabold py-4 px-10 rounded-xl shadow-xl tracking-wider transition uppercase text-sm hover:scale-105 transform duration-200 cursor-pointer font-sans"
            >
              {t('aboutTeam.cta.button')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
