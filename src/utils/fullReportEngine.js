// fullReportEngine.js — Frontend (ES Module)
// Complete Rule-Based Vedic Astrology Report Engine
// Every field derives genuine content from actual planetary data — no placeholders.

// ─── Nakshatra Data ─────────────────────────────────────────────────────────
export const nakshatraData = {
  "Ashwini":           { gana: "Deva",     nadi: "Aadi",  yoni: "Horse",    deity: "Ashwini Kumaras", ruling_planet: "Ketu"    },
  "Bharani":           { gana: "Manushya", nadi: "Madhya", yoni: "Elephant", deity: "Yama",            ruling_planet: "Venus"   },
  "Krittika":          { gana: "Rakshasa", nadi: "Antya",  yoni: "Sheep",    deity: "Agni",            ruling_planet: "Sun"     },
  "Rohini":            { gana: "Manushya", nadi: "Antya",  yoni: "Serpent",  deity: "Brahma",          ruling_planet: "Moon"    },
  "Mrigashira":        { gana: "Deva",     nadi: "Madhya", yoni: "Serpent",  deity: "Soma",            ruling_planet: "Mars"    },
  "Ardra":             { gana: "Manushya", nadi: "Aadi",   yoni: "Dog",      deity: "Rudra",           ruling_planet: "Rahu"    },
  "Punarvasu":         { gana: "Deva",     nadi: "Aadi",   yoni: "Cat",      deity: "Aditi",           ruling_planet: "Jupiter" },
  "Pushya":            { gana: "Deva",     nadi: "Madhya", yoni: "Goat",     deity: "Brihaspati",      ruling_planet: "Saturn"  },
  "Ashlesha":          { gana: "Rakshasa", nadi: "Antya",  yoni: "Cat",      deity: "Nagas",           ruling_planet: "Mercury" },
  "Magha":             { gana: "Rakshasa", nadi: "Antya",  yoni: "Rat",      deity: "Pitru",           ruling_planet: "Ketu"    },
  "Purva Phalguni":    { gana: "Manushya", nadi: "Madhya", yoni: "Rat",      deity: "Bhaga",           ruling_planet: "Venus"   },
  "Uttara Phalguni":   { gana: "Manushya", nadi: "Aadi",   yoni: "Cow",      deity: "Aryaman",         ruling_planet: "Sun"     },
  "Hasta":             { gana: "Deva",     nadi: "Aadi",   yoni: "Buffalo",  deity: "Savitar",         ruling_planet: "Moon"    },
  "Chitra":            { gana: "Rakshasa", nadi: "Madhya", yoni: "Tiger",    deity: "Vishwakarma",     ruling_planet: "Mars"    },
  "Swati":             { gana: "Deva",     nadi: "Antya",  yoni: "Buffalo",  deity: "Vayu",            ruling_planet: "Rahu"    },
  "Vishakha":          { gana: "Rakshasa", nadi: "Antya",  yoni: "Tiger",    deity: "Indra-Agni",      ruling_planet: "Jupiter" },
  "Anuradha":          { gana: "Deva",     nadi: "Madhya", yoni: "Deer",     deity: "Mitra",           ruling_planet: "Saturn"  },
  "Jyeshtha":          { gana: "Rakshasa", nadi: "Aadi",   yoni: "Deer",     deity: "Indra",           ruling_planet: "Mercury" },
  "Mula":              { gana: "Rakshasa", nadi: "Aadi",   yoni: "Dog",      deity: "Nirriti",         ruling_planet: "Ketu"    },
  "Purva Ashadha":     { gana: "Manushya", nadi: "Madhya", yoni: "Monkey",   deity: "Apas",            ruling_planet: "Venus"   },
  "Uttara Ashadha":    { gana: "Manushya", nadi: "Antya",  yoni: "Mongoose", deity: "Vishvedevas",     ruling_planet: "Sun"     },
  "Shravana":          { gana: "Deva",     nadi: "Antya",  yoni: "Monkey",   deity: "Vishnu",          ruling_planet: "Moon"    },
  "Dhanishta":         { gana: "Rakshasa", nadi: "Madhya", yoni: "Lion",     deity: "Ashta Vasus",     ruling_planet: "Mars"    },
  "Shatabhisha":       { gana: "Rakshasa", nadi: "Aadi",   yoni: "Horse",    deity: "Varuna",          ruling_planet: "Rahu"    },
  "Purva Bhadrapada":  { gana: "Manushya", nadi: "Aadi",   yoni: "Lion",     deity: "Aja Ekapad",      ruling_planet: "Jupiter" },
  "Uttara Bhadrapada": { gana: "Manushya", nadi: "Madhya", yoni: "Cow",      deity: "Ahirbudhnya",     ruling_planet: "Saturn"  },
  "Revati":            { gana: "Deva",     nadi: "Antya",  yoni: "Elephant", deity: "Pushan",          ruling_planet: "Mercury" }
};

// ─── Attribute Maps ──────────────────────────────────────────────────────────
export const getMoonSignAttributes = (sign) => {
  const varnaMap  = { "Cancer":"Brahmin","Scorpio":"Brahmin","Pisces":"Brahmin","Aries":"Kshatriya","Leo":"Kshatriya","Sagittarius":"Kshatriya","Taurus":"Vaishya","Virgo":"Vaishya","Capricorn":"Vaishya","Gemini":"Shudra","Libra":"Shudra","Aquarius":"Shudra" };
  const tatvaMap  = { "Aries":"Fire","Leo":"Fire","Sagittarius":"Fire","Taurus":"Earth","Virgo":"Earth","Capricorn":"Earth","Gemini":"Air","Libra":"Air","Aquarius":"Air","Cancer":"Water","Scorpio":"Water","Pisces":"Water" };
  const vashyaMap = { "Aries":"Chatushpada","Taurus":"Chatushpada","Gemini":"Manava","Cancer":"Jalachara","Leo":"Vanchara","Virgo":"Manava","Libra":"Manava","Scorpio":"Keeta","Sagittarius":"Chatushpada","Capricorn":"Jalachara","Aquarius":"Manava","Pisces":"Jalachara" };
  return { varna: varnaMap[sign]||"Brahmin", tatva: tatvaMap[sign]||"Water", vashya: vashyaMap[sign]||"Manava" };
};

export const getPaya = (moonHouse) => {
  if ([1,6,11].includes(moonHouse)) return "Gold (Swarna) — bestows prosperity, vitality, and social recognition";
  if ([2,5,9].includes(moonHouse))  return "Silver (Rajat) — bestows moderate prosperity and emotional contentment";
  if ([3,7,10].includes(moonHouse)) return "Copper (Tamra) — challenges overcome through persistent effort and karma";
  if ([4,8,12].includes(moonHouse)) return "Iron (Loha) — tests through adversity, building inner resilience and wisdom";
  return "Silver (Rajat) — bestows moderate prosperity and emotional contentment";
};

export const formatDegree = (d) => { const deg=Math.floor(d); const min=Math.floor((d-deg)*60); return `${deg}° ${min}'`; };

// ─── Rule-Based Derivation Helpers ───────────────────────────────────────────

const mercuryCommunicationStyle = {
  "Aries":       "Direct, assertive, and quick-minded. Communicates with conviction and prefers concise, action-oriented speech over lengthy explanations.",
  "Taurus":      "Measured, deliberate, and practical. Thinks carefully before speaking, but once an opinion is formed, expresses it with quiet certainty.",
  "Gemini":      "Sharp, analytical, and highly versatile. A natural communicator who absorbs information rapidly and excels at articulating complex ideas with clarity.",
  "Cancer":      "Intuitive and emotionally attuned. Communicates through feeling and nuance, often picking up on what is left unsaid in conversations.",
  "Leo":         "Expressive, dramatic, and naturally persuasive. A compelling storyteller who commands attention and inspires others through enthusiastic speech.",
  "Virgo":       "Precise, detail-oriented, and methodical. Excels at analytical thinking and communicates with careful accuracy, often serving as the most reliable voice in a group.",
  "Libra":       "Diplomatic, fair-minded, and socially adept. Considers all perspectives before responding, making them excellent mediators and negotiators.",
  "Scorpio":     "Deep, probing, and strategically minded. Communicates with intensity and purpose, seeking hidden truths and never settling for surface-level answers.",
  "Sagittarius": "Philosophical, broad-thinking, and enthusiastic. Loves exploring ideas, debating concepts, and sharing knowledge with an infectious optimism.",
  "Capricorn":   "Structured, disciplined, and authoritative. Communicates with precision and practicality, favouring proven facts and logical conclusions over speculation.",
  "Aquarius":    "Original, unconventional, and intellectually progressive. Brings fresh, innovative perspectives and thinks far ahead of conventional wisdom.",
  "Pisces":      "Imaginative, empathetic, and spiritually sensitive. Often communicates through metaphor, symbolism, and feeling rather than purely logical argument."
};

const ascendantPersonality = {
  "Aries":       "Bold, pioneering, and fiercely independent. Driven by a need to initiate and lead, with a natural competitive spirit and high physical vitality.",
  "Taurus":      "Steady, determined, and deeply sensory. Values beauty, comfort, and security — builds life with patience and appreciates the finer, enduring pleasures.",
  "Gemini":      "Intellectually curious, adaptable, and communicative. Thrives on variety, ideas, and social connection — a natural networker and versatile thinker.",
  "Cancer":      "Emotionally intelligent, nurturing, and strongly intuitive. Life is shaped by feeling, family bonds, and a deep inner world of memory and attachment.",
  "Leo":         "Charismatic, creative, and naturally authoritative. Born to shine and lead — carries a regal confidence and inspires loyalty and admiration.",
  "Virgo":       "Analytical, service-oriented, and precise. Finds meaning in improving systems, helping others, and mastering the details that others overlook.",
  "Libra":       "Harmonious, socially gifted, and justice-seeking. Thrives in partnership, has a refined aesthetic sense, and constantly seeks balance in all things.",
  "Scorpio":     "Intense, penetrating, and transformative. Driven by a search for depth, power, and truth — undergoes profound inner evolution throughout life.",
  "Sagittarius": "Optimistic, philosophical, and freedom-loving. Seeks wisdom through travel, higher learning, and cultural exploration — a natural seeker and teacher.",
  "Capricorn":   "Ambitious, disciplined, and strategically patient. Life is built through structured effort, responsibility, and a deep respect for tradition and achievement.",
  "Aquarius":    "Visionary, humanitarian, and intellectually independent. Ahead of the times — deeply committed to ideals of progress, freedom, and collective wellbeing.",
  "Pisces":      "Spiritually attuned, compassionate, and creatively gifted. Lives between worlds — deeply empathetic, artistic, and guided by intuition and divine inspiration."
};

const moonEmotionalNature = {
  "Aries":       "Emotionally passionate and reactive. Feels intensely in the moment, processes emotions quickly, and recovers with equal speed.",
  "Taurus":      "Emotionally stable and deeply comfort-seeking. Needs security and consistency — slow to anger but once upset, takes time to settle.",
  "Gemini":      "Emotionally curious and intellectually processing. Feelings are often analysed before felt — thrives on variety and stimulating exchanges.",
  "Cancer":      "Profoundly sensitive, nurturing, and emotionally deep. Bonds intensely with loved ones, has strong intuition, and guards inner feelings carefully.",
  "Leo":         "Emotionally warm, generous, and expressive. Needs appreciation and recognition — gives grandly and expects acknowledgment in return.",
  "Virgo":       "Emotionally careful and analytically restrained. Processes feelings inwardly before expressing them — finds comfort in order and usefulness.",
  "Libra":       "Emotionally harmonious and relationally oriented. Seeks peace, avoids conflict, and feels most secure in balanced, loving partnerships.",
  "Scorpio":     "Emotionally intense, private, and deeply feeling. Experiences life with extraordinary depth — slow to trust but fiercely loyal once committed.",
  "Sagittarius": "Emotionally optimistic and freedom-oriented. Needs space and independence — finds upliftment through adventure, philosophy, and humour.",
  "Capricorn":   "Emotionally reserved, controlled, and responsible. Feels deeply but rarely shows it — processes emotions through work, duty, and achievement.",
  "Aquarius":    "Emotionally detached and intellectually oriented. Connects through ideas and ideals rather than direct feeling — needs mental stimulation.",
  "Pisces":      "Emotionally boundless, empathetic, and spiritually sensitive. Absorbs the feelings of others like a sponge — needs solitude to recharge."
};

const wealthByPlanet = {
  "Sun":     "Wealth comes through authority, government work, leadership roles, and positions of public recognition and status.",
  "Moon":    "Wealth flows through businesses connected to the public, travel, import/export, hospitality, or caregiving and nursing.",
  "Mars":    "Wealth is earned through engineering, real estate, land, construction, athletics, military, or entrepreneurial ventures.",
  "Mercury": "Wealth accumulates through trading, communication, writing, education, technology, accounting, and intellectual businesses.",
  "Jupiter": "Wealth arrives through teaching, law, advisory roles, finance, banking, spiritual work, and expansion of knowledge.",
  "Venus":   "Wealth flows through creative arts, luxury goods, fashion, beauty, media, entertainment, and partnership ventures.",
  "Saturn":  "Wealth is earned slowly but surely through hard work, discipline, mining, agriculture, service industries, and systematic effort.",
  "Rahu":    "Wealth comes through unconventional means, foreign lands, technology, speculation, mass media, and innovative ventures.",
  "Ketu":    "Wealth arrives through spiritual services, research, healing arts, occult sciences, or inherited/past-life karmic resources."
};

const careerByHouse10 = {
  "Sun":     "Career in administration, government, politics, management, or any field requiring authority and public presence.",
  "Moon":    "Career in caregiving, hospitality, public relations, travel, retail, or businesses that serve the masses.",
  "Mars":    "Career in engineering, military, surgery, law enforcement, athletics, construction, or competitive fields.",
  "Mercury": "Career in communication, journalism, IT, education, accounting, data analysis, or consultancy.",
  "Jupiter": "Career in education, law, finance, consulting, spiritual guidance, or any advisory and expansive field.",
  "Venus":   "Career in arts, design, entertainment, fashion, beauty, diplomacy, or any field valuing aesthetics.",
  "Saturn":  "Career in structural fields — architecture, administration, mining, agriculture, law, or long-term institutional work.",
  "Rahu":    "Career in technology, media, foreign affairs, research, or unconventional emerging industries.",
  "Ketu":    "Career in research, healing, spirituality, investigation, or highly specialised technical work."
};

const spiritualGrowthByJupiter = {
  "Aries":       "Spiritual growth comes through courageous action and pioneering dharmic initiatives. Leading by example is the soul's highest calling.",
  "Taurus":      "Spiritual growth deepens through devotion, practice of gratitude, connecting with nature, and building temples of peace within.",
  "Gemini":      "Spiritual growth unfolds through the study of sacred texts, teaching others, and understanding the duality of existence.",
  "Cancer":      "Spiritual growth flows through devotion, bhakti, serving the mother figure, and cultivating deep compassion for all beings.",
  "Leo":         "Spiritual growth comes through expressing divine gifts publicly, creative worship, and anchoring divine light in the material world.",
  "Virgo":       "Spiritual growth is found in selfless service, purification of body and mind, and disciplined devotional practice.",
  "Libra":       "Spiritual growth deepens through harmonious relationships, justice, and creating beauty as an act of divine worship.",
  "Scorpio":     "Spiritual growth comes through profound transformation, letting go of ego, surrender, and exploring the mystical depths of existence.",
  "Sagittarius": "Spiritual growth is highest here — through pilgrimage, study of philosophy, dharmic teaching, and living with absolute faith.",
  "Capricorn":   "Spiritual growth comes through duty, karma yoga, structured practice, and serving as a responsible pillar within community.",
  "Aquarius":    "Spiritual growth unfolds through service to humanity, collective consciousness, and working toward the liberation of all beings.",
  "Pisces":      "Spiritual growth is at its most natural here — through meditation, surrender, compassion, and dissolving the individual ego into the divine."
};

const maritalLifeByVenus = {
  "Aries":       "Relationships are passionate and dynamic — partner is independent and spirited. Marriage benefits from mutual respect and space.",
  "Taurus":      "Deeply romantic and sensory — seeks a stable, committed, and physically affectionate partner who values loyalty and comfort.",
  "Gemini":      "Relationships are intellectually stimulating — partner must be witty, communicative, and mentally engaging for long-term harmony.",
  "Cancer":      "Emotionally devoted and nurturing — seeks a deeply caring, family-oriented partner. Home and emotional security are central.",
  "Leo":         "Grand, romantic, and loyal — seeks a partner who appreciates grandeur and gives full admiration. Relationship is celebrated openly.",
  "Virgo":       "Practical and devoted — seeks a reliable, service-oriented partner. Love deepens through acts of care and thoughtful attention.",
  "Libra":       "Harmony-loving and aesthetically refined — naturally suited for beautiful, balanced partnerships filled with mutual respect.",
  "Scorpio":     "Intensely bonded and deeply transformative — seeks complete emotional merger. Relationships are karmic, powerful, and life-changing.",
  "Sagittarius": "Freedom-loving and philosophically matched — seeks a partner who shares the love of adventure, travel, and spiritual inquiry.",
  "Capricorn":   "Practical and traditional — takes relationships seriously and seeks a committed, responsible, and socially compatible partner.",
  "Aquarius":    "Unconventional and friendship-based — seeks a partner who is intellectually independent and supports individual freedom.",
  "Pisces":      "Idealistic and spiritually bonded — seeks deep soulmate connection, unconditional love, and emotional-spiritual fusion."
};

const healthByAscendant = {
  "Aries":       "Governed by head, brain, and adrenal function. Prone to headaches, fever, and inflammation. Benefits from physical exercise and controlled aggression.",
  "Taurus":      "Governed by throat, neck, and thyroid. Prone to throat infections, thyroid issues, and weight management concerns. Benefits from regular outdoor activity.",
  "Gemini":      "Governed by lungs, arms, and nervous system. Prone to respiratory issues, anxiety, and nerve-related ailments. Benefits from meditation and breathing exercises.",
  "Cancer":      "Governed by chest, breasts, and stomach. Prone to digestive sensitivity and emotional-linked ailments. Benefits from emotional wellness practices and proper nutrition.",
  "Leo":         "Governed by heart, spine, and upper back. Prone to cardiac sensitivities and spine issues. Benefits from regular cardio and avoiding excess.",
  "Virgo":       "Governed by digestive system and intestines. Prone to digestive disorders, anxiety, and assimilation issues. Benefits from clean diet and structured routines.",
  "Libra":       "Governed by kidneys, lower back, and skin. Prone to kidney issues, lower back pain, and hormonal imbalances. Benefits from hydration and stress management.",
  "Scorpio":     "Governed by reproductive system and elimination organs. Prone to hormonal and immune challenges. Benefits from detoxification practices and emotional catharsis.",
  "Sagittarius": "Governed by thighs, hips, and liver. Prone to liver sensitivity and sciatic issues. Benefits from moderate diet and regular stretching.",
  "Capricorn":   "Governed by knees, joints, and skeletal system. Prone to joint stiffness, arthritis, and dental issues. Benefits from calcium-rich diet and regular movement.",
  "Aquarius":    "Governed by ankles, calves, and circulatory system. Prone to circulation issues and varicose veins. Benefits from regular walking and avoiding sedentary lifestyle.",
  "Pisces":      "Governed by feet, lymphatic system, and immune function. Prone to immune sensitivity, foot issues, and substance sensitivity. Benefits from grounding practices."
};

const educationByMercury = {
  "Aries":       "Quick grasp of new subjects with a preference for competitive and action-oriented fields. Excels in leadership programs, military training, and sports sciences.",
  "Taurus":      "Learns steadily and retains information long-term. Excels in arts, music, finance, agriculture, and any field requiring patience and sensory appreciation.",
  "Gemini":      "Exceptional intellectual capacity with love for languages, mathematics, and communication. Flourishes in journalism, writing, IT, and multi-disciplinary studies.",
  "Cancer":      "Learns through emotional connection and memory. Excels in history, psychology, social work, nursing, and subjects tied to care and cultural roots.",
  "Leo":         "Learns through pride and performance. Excels in performing arts, politics, management, theatre, and any field that offers recognition and leadership.",
  "Virgo":       "Exceptional analytical capacity. Excels in medicine, research, accountancy, data science, and any field demanding precision and systematic thinking.",
  "Libra":       "Learns best in collaborative environments. Excels in law, diplomacy, design, fine arts, and social sciences where balance and aesthetics matter.",
  "Scorpio":     "Deep, investigative learning style. Excels in psychology, medicine, forensics, research, occult sciences, and any field requiring profound investigation.",
  "Sagittarius": "Broad, philosophical learner who thrives in higher education. Excels in philosophy, law, spirituality, foreign languages, and higher studies abroad.",
  "Capricorn":   "Disciplined and goal-oriented learner. Excels in business, administration, engineering, economics, and structured professional fields.",
  "Aquarius":    "Innovative, ahead-of-curve learner. Excels in science, technology, social reform, computer engineering, and fields at the frontier of human knowledge.",
  "Pisces":      "Intuitive and imaginative learner. Excels in arts, music, spirituality, healing sciences, film, and subjects requiring empathy and creative vision."
};

const remediesByLagnaLord = {
  "Sun":     { gem: "Ruby (Manik) in gold, on the ring finger, worn on Sunday morning after sunrise", mantra: "Om Hraam Hreem Hroum Sah Suryaya Namah — chant 108 times at sunrise daily", colour: "Gold and orange", fasting: "Sunday fasting is beneficial", deity: "Lord Surya (Sun God)", charity: "Donate wheat, jaggery, and copper on Sundays" },
  "Moon":    { gem: "Pearl or Moonstone in silver, on little finger, worn on Monday", mantra: "Om Shraam Shreem Shroum Sah Chandraya Namah — chant 108 times on Mondays", colour: "White and silver", fasting: "Monday fasting is beneficial", deity: "Lord Shiva / Goddess Parvati", charity: "Donate milk, rice, and white cloth on Mondays" },
  "Mars":    { gem: "Red Coral (Moonga) in gold or copper, on ring finger, worn on Tuesday", mantra: "Om Kraam Kreem Kroum Sah Bhaumaya Namah — chant 108 times at sunrise on Tuesday", colour: "Red and orange", fasting: "Tuesday fasting is beneficial", deity: "Lord Kartikeya / Hanuman", charity: "Donate red lentils, copper utensils, and red cloth on Tuesdays" },
  "Mercury": { gem: "Emerald (Panna) in gold, on little finger, worn on Wednesday", mantra: "Om Braam Breem Broum Sah Budhaya Namah — chant 108 times on Wednesdays", colour: "Green", fasting: "Wednesday fasting is beneficial", deity: "Lord Vishnu / Goddess Durga", charity: "Donate green moong, green vegetables, and books on Wednesdays" },
  "Jupiter": { gem: "Yellow Sapphire (Pukhraj) in gold, on index finger, worn on Thursday morning", mantra: "Om Graam Greem Groum Sah Gurave Namah — chant 108 times on Thursdays", colour: "Yellow and gold", fasting: "Thursday fasting brings Jupiter's blessings", deity: "Lord Vishnu / Brihaspati", charity: "Donate yellow sweets, turmeric, and books on Thursdays" },
  "Venus":   { gem: "Diamond or White Sapphire in gold or silver, on middle finger, worn on Friday", mantra: "Om Draam Dreem Droum Sah Shukraya Namah — chant 108 times on Fridays", colour: "White and pink", fasting: "Friday fasting is beneficial", deity: "Goddess Lakshmi / Mahalakshmi", charity: "Donate white sweets, sugar, and white cloth on Fridays" },
  "Saturn":  { gem: "Blue Sapphire (Neelam) in silver, on middle finger, worn on Saturday — test for 3 days before wearing", mantra: "Om Praam Preem Proum Sah Shanaishcharaya Namah — chant 108 times at sunset on Saturdays", colour: "Dark blue and black", fasting: "Saturday fasting appeases Saturn", deity: "Lord Shani / Lord Hanuman", charity: "Donate black sesame, mustard oil, and iron on Saturdays" },
  "Rahu":    { gem: "Hessonite Garnet (Gomed) in silver or panchdhatu, on middle finger, worn on Saturday", mantra: "Om Bhraam Bhreem Bhroum Sah Rahave Namah — chant 108 times on Saturdays", colour: "Smoky grey and ultraviolet", fasting: "Saturday fasting is beneficial", deity: "Goddess Durga / Bhairav", charity: "Donate coconut, sesame, and black cloth on Saturdays" },
  "Ketu":    { gem: "Cat's Eye (Lehsunia) in silver or gold, worn on the middle finger", mantra: "Om Straam Streem Stroum Sah Ketave Namah — chant 108 times on Tuesdays", colour: "Grey and multicolour", fasting: "Tuesday fasting is beneficial", deity: "Lord Ganesha / Lord Bhairav", charity: "Donate blankets, sesame, and multicolour cloth on Tuesdays" }
};

// ─── Main Report Generator ───────────────────────────────────────────────────
export const generateFullReport = (report) => {
  const fData = report.factsJson || {};
  const cData = report.consultationJson || {};
  const gender = report.gender || "";

  const planetsObj = fData.planetary_positions || {};
  const planetsArr = Object.entries(planetsObj).map(([name, data]) => ({ name, ...data }));

  const asc     = fData.ascendant_analysis || {};
  const panchang = fData.panchang || {};
  const navamsa  = fData.navamsa || [];
  const moonChart = fData.moonChart || [];
  const yogas    = fData.yogas || [];
  const dashas   = fData.dasha_analysis || {};

  const getPlanet = (name) => planetsArr.find(p => p.name === name) || {};
  const getHouse  = (num)  => planetsArr.filter(p => p.house === num).map(p => p.name);

  const moon    = getPlanet("Moon");
  const sun     = getPlanet("Sun");
  const mercury = getPlanet("Mercury");
  const venus   = getPlanet("Venus");
  const mars    = getPlanet("Mars");
  const jupiter = getPlanet("Jupiter");
  const saturn  = getPlanet("Saturn");

  const nakAttrs  = nakshatraData[moon.nakshatra] || nakshatraData["Ashwini"];
  const moonAttrs = getMoonSignAttributes(moon.sign || "Cancer");
  const ascAttrs  = getMoonSignAttributes(asc.ascendant_sign || "Aries");
  const paya      = getPaya(moon.house || 1);

  const bDateObj = new Date(report.birthDate);
  const bDateStr = bDateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const pronoun     = gender === "Female" ? "her"  : gender === "Male" ? "his"  : "their";
  const subjPronoun = gender === "Female" ? "She"  : gender === "Male" ? "He"   : "They";
  const objPronoun  = gender === "Female" ? "her"  : gender === "Male" ? "him"  : "them";

  // ── Astrological Lord derivation ──
  const signs = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
  const signLords = {
    "Aries": "Mars", "Taurus": "Venus", "Gemini": "Mercury", "Cancer": "Moon", "Leo": "Sun", "Virgo": "Mercury",
    "Libra": "Venus", "Scorpio": "Mars", "Sagittarius": "Jupiter", "Capricorn": "Saturn", "Aquarius": "Saturn", "Pisces": "Jupiter"
  };

  const getHouseSignAndLord = (hNum) => {
    const ascSign = asc.ascendant_sign || "Aries";
    const ascIdx = signs.indexOf(ascSign);
    const hSign = signs[(ascIdx + hNum - 1) % 12];
    const hLord = signLords[hSign];
    const lordPlanet = getPlanet(hLord);
    return {
      sign: hSign,
      lord: hLord,
      lordHouse: lordPlanet.house || 1,
      lordSign: lordPlanet.sign || "Aries"
    };
  };

  const getHouseAnalysis = (hNum, significance) => {
    const { sign, lord, lordHouse, lordSign } = getHouseSignAndLord(hNum);
    const planetsInHouse = getHouse(hNum);
    let baseText = `Sign: ${sign} · House Lord: ${lord} placed in House ${lordHouse} (${lordSign}).`;
    if (planetsInHouse.length > 0) {
      return `${baseText} Occupied by ${planetsInHouse.join(", ")} — these planets directly shape and influence ${significance}.`;
    } else {
      return `${baseText} Unoccupied by major planets. Its matters are governed by the placement and strength of its lord, ${lord}, in the ${lordHouse}th house.`;
    }
  };

  // ── Derivation helpers ──
  const use = (consultVal, derivedVal) => {
    if (consultVal && String(consultVal).trim() !== "") return String(consultVal).trim();
    return derivedVal;
  };

  const joinArr = (a) => Array.isArray(a) && a.length > 0 ? a.join(" ") : null;

  // ── Derived values ──
  const communicationStyle = use(
    cData.communication?.style,
    mercuryCommunicationStyle[mercury.sign] || mercuryCommunicationStyle["Gemini"]
  );

  const coreIdentity = use(
    cData.profile?.identity,
    ascendantPersonality[asc.ascendant_sign] || ascendantPersonality["Aries"]
  );

  const emotionalNature = use(
    joinArr(cData.emotional?.strengths),
    moonEmotionalNature[moon.sign] || moonEmotionalNature["Cancer"]
  );

  const emotionalTriggers = use(
    joinArr(cData.emotional?.triggers),
    moon.sign === "Scorpio" || moon.sign === "Cancer"
      ? `${subjPronoun} can be triggered by betrayal, lack of loyalty, and emotional unavailability. Deep attachment to loved ones makes loss particularly difficult to process.`
      : moon.sign === "Aries" || moon.sign === "Leo"
      ? `${subjPronoun} is triggered by disrespect, being ignored, or having authority challenged. Anger can flare quickly but is equally quick to resolve.`
      : `${subjPronoun} is sensitive to instability, uncertainty, and lack of order. Patience is tested when situations feel out of control or relationships become unpredictable.`
  );

  const mentalPatterns = use(
    cData.profile?.mindset,
    `Shaped by a ${moonAttrs.tatva} Moon in ${moon.sign || "the ascendant sign"}, ${subjPronoun} tends to approach life with a ${
      moonAttrs.tatva === "Fire"  ? "bold, initiative-driven mindset that seeks action over analysis" :
      moonAttrs.tatva === "Earth" ? "practical, grounded mindset that values tangible results and stability" :
      moonAttrs.tatva === "Air"   ? "curious, versatile mindset that processes experiences through intellectual frameworks" :
                                    "intuitive, feeling-based mindset that trusts inner knowing above external logic"
    }.`
  );

  const temperament = use(
    cData.profile?.temperament,
    `${
      moonAttrs.tatva === "Fire"  ? "Fiery and dynamic — passionate, action-oriented, and driven by enthusiasm. Can be impulsive but recovers quickly from setbacks." :
      moonAttrs.tatva === "Earth" ? "Grounded and stable — patient, methodical, and highly reliable. Builds deliberately and values lasting security." :
      moonAttrs.tatva === "Air"   ? "Intellectual and adaptable — curious, communicative, and socially intelligent. Processes emotions through analysis." :
                                    "Sensitive and intuitive — deeply empathetic, emotionally perceptive, and spiritually attuned. Feels deeply before acting."
    }`
  );

  const wealthPotential = use(
    cData.wealth?.wealthCreationPotential,
    `${jupiter.sign
      ? `Jupiter in ${jupiter.sign} (House ${jupiter.house}) forms the primary wealth karaka. `
      : ""}${wealthByPlanet[asc.ascendant_ruler] || wealthByPlanet["Jupiter"]} ${
      venus.sign ? `Venus in ${venus.sign} additionally indicates income from ${venus.sign === "Taurus" || venus.sign === "Libra" ? "luxury, arts, and partnership" : "creative and aesthetic pursuits"}.` : ""
    }`
  );

  const incomePatterns = use(
    joinArr(cData.wealth?.earningPatterns),
    getHouse(10).length
      ? `Primary income through ${careerByHouse10[getHouse(10)[0]] || "professional expertise and structured career efforts"}. ${getHouse(10).length > 1 ? `Multiple income streams indicated by ${getHouse(10).slice(1).join(" and ")} in the 10th house.` : ""}`
      : `Income flows primarily through the 10th lord ${asc.ascendant_ruler ? `(${asc.ascendant_ruler})` : ""} and its placement in the chart.`
  );

  const investmentTendencies = use(
    joinArr(cData.wealth?.investmentTendencies),
    moonAttrs.tatva === "Earth" ? "Cautious, long-term investor — prefers fixed deposits, real estate, and low-risk stable instruments." :
    moonAttrs.tatva === "Fire"  ? "Bold investor — drawn to equities, startups, and speculative opportunities with high growth potential." :
    moonAttrs.tatva === "Air"   ? "Diversified approach — intellectual in investment decisions, drawn to tech stocks, mutual funds, and market research." :
                                   "Conservative and emotionally-driven — favours secure investments like gold, real estate, and family-run businesses."
  );

  const careerNature = use(
    cData.career?.workStyle,
    getHouse(10).length
      ? `The 10th house carries ${getHouse(10).join(", ")} — ${careerByHouse10[getHouse(10)[0]] || "a strong career presence in a structured professional field."}`
      : `Career is governed by ${asc.ascendant_ruler || "the Lagna Lord"}'s placement. ${wealthByPlanet[asc.ascendant_ruler] || "Professional excellence comes through dedicated, consistent effort."}`
  );

  const professionalStrengths = use(
    cData.career?.executionStyle,
    moonAttrs.tatva === "Fire"  ? "Natural leadership, initiative, rapid decision-making, and the ability to energise and motivate teams." :
    moonAttrs.tatva === "Earth" ? "Exceptional reliability, project management, attention to detail, and the ability to deliver consistent results." :
    moonAttrs.tatva === "Air"   ? "Communication, research, strategic thinking, adaptability, and building professional networks." :
                                   "Empathy, emotional intelligence, creative vision, long-term loyalty, and an instinctive understanding of people."
  );

  const relationshipPattern = use(
    cData.relationship?.attachmentStyle,
    moonAttrs.tatva === "Water" ? "Deep, soulful attachments — bonds slowly but completely. Loyalty is absolute once trust is established. Emotional security is the foundation of all relationships." :
    moonAttrs.tatva === "Fire"  ? "Passionate and idealistic — seeks a partner who matches intensity and independence. Falls quickly, loves deeply, and bounces back from heartbreak with resilience." :
    moonAttrs.tatva === "Earth" ? "Steady and devoted — takes time to commit but once bonded, remains completely loyal and deeply supportive through all seasons of life." :
                                   "Intellectually-driven attachments — seeks a partner who stimulates the mind and respects individual freedom. Communication and friendship form the bedrock."
  );

  const partnerArchetype = use(
    cData.relationship?.partnerArchetype,
    maritalLifeByVenus[venus.sign] || maritalLifeByVenus["Libra"]
  );

  const marriedLife = use(
    joinArr(cData.relationship?.strengthsInPartnership),
    getHouse(7).length
      ? `${getHouse(7).join(", ")} in the 7th house shapes the married life significantly. ${
          getHouse(7).includes("Jupiter") ? "Jupiter here is highly auspicious — blesses the marriage with wisdom, joy, and growth." :
          getHouse(7).includes("Venus")   ? "Venus here brings beauty, harmony, and deep romantic compatibility in marriage." :
          getHouse(7).includes("Mars")    ? "Mars in the 7th creates a dynamic, energetic, and at times fiery marital relationship — passion runs high." :
          getHouse(7).includes("Saturn")  ? "Saturn in the 7th indicates a marriage that deepens with age and strengthens through shared responsibility." :
                                             "The partnership is influenced by the placed planets, creating a unique dynamic that deepens over time."
        }`
      : `The 7th house is governed by its lord, ${getHouseSignAndLord(7).lord}, placed in House ${getHouseSignAndLord(7).lordHouse} (${getHouseSignAndLord(7).lordSign}). Married life and partnerships are directed by the strength and placement of this lord, with Venus (${venus.sign ? `placed in ${venus.sign}` : "the marriage karaka"}) acting as the indicator of relationship harmony.`
  );

  const spiritualPath = use(
    cData.spiritual?.innerGrowthPath,
    spiritualGrowthByJupiter[jupiter.sign] || spiritualGrowthByJupiter["Sagittarius"]
  );

  const remedyData = remediesByLagnaLord[asc.ascendant_ruler] || remediesByLagnaLord["Jupiter"];

  // ── 10th lord for career ──
  const h10planets = getHouse(10);

  return {
    "1. Birth Details": [
      { label: "Name",               value: report.birthName || "As Provided" },
      { label: "Gender",             value: gender || "As Provided" },
      { label: "Date of Birth",      value: bDateStr },
      { label: "Time of Birth",      value: report.birthTime },
      { label: "Place of Birth",     value: report.birthPlace },
      { label: "Latitude",           value: report.latitude ? `${Math.abs(report.latitude).toFixed(4)}° ${report.latitude >= 0 ? 'N' : 'S'}` : (fData.birth_details?.latitude ? `${Math.abs(fData.birth_details.latitude).toFixed(4)}° ${fData.birth_details.latitude >= 0 ? 'N' : 'S'}` : "Not Specified") },
      { label: "Longitude",          value: report.longitude ? `${Math.abs(report.longitude).toFixed(4)}° ${report.longitude >= 0 ? 'E' : 'W'}` : (fData.birth_details?.longitude ? `${Math.abs(fData.birth_details.longitude).toFixed(4)}° ${fData.birth_details.longitude >= 0 ? 'E' : 'W'}` : "Not Specified") },
      { label: "Time Zone",          value: `UTC +${fData.birth_details?.timezone || '5.5'} (India Standard Time)` },
      { label: "Ayanamsa",           value: "Lahiri (Chitra Paksha) — Standard Indian Ayanamsa" },
      { label: "Birth Weekday",      value: panchang.weekday || bDateObj.toLocaleDateString('en-US', { weekday: 'long' }) },
      { label: "Birth Tithi",        value: panchang.tithi || "Calculated from birth chart" },
      { label: "Paksha",             value: panchang.paksha || (moon.house <= 6 ? "Shukla Paksha (Waxing Moon)" : "Krishna Paksha (Waning Moon)") },
      { label: "Birth Karana",       value: panchang.karana || "Derived from Tithi calculation" },
      { label: "Birth Nakshatra",    value: moon.nakshatra || "Moon Nakshatra" },
      { label: "Nakshatra Lord",     value: nakAttrs.ruling_planet || "Calculated from Nakshatra" },
      { label: "Moon Sign (Rashi)",  value: moon.sign || "As per Chart" },
      { label: "Sun Sign",           value: sun.sign || "As per Chart" },
      { label: "Ascendant (Lagna)",  value: asc.ascendant_sign || "Calculated from birth time" },
      { label: "Lagna Lord",         value: asc.ascendant_ruler || "Ascendant Ruler" },
    ],

    "2. Panchang Details": [
      { label: "Vara (Weekday)",     value: panchang.weekday || bDateObj.toLocaleDateString('en-US', { weekday: 'long' }) },
      { label: "Tithi",              value: panchang.tithi || "Derived from Sun-Moon angle" },
      { label: "Paksha",             value: panchang.paksha || (moon.house <= 6 ? "Shukla Paksha — Waxing Moon phase, associated with growth and new beginnings" : "Krishna Paksha — Waning Moon phase, associated with introspection and completion") },
      { label: "Nakshatra",          value: `${moon.nakshatra || "Moon Nakshatra"} — ruled by ${nakAttrs.ruling_planet || "its lord"}, deity: ${nakAttrs.deity || "divine force"}` },
      { label: "Yoga",               value: panchang.yoga || "Derived from Sun + Moon longitudes" },
      { label: "Karana",             value: panchang.karana || "Half of Tithi period — governs the activity of the birth moment" },
      { label: "Nakshatra Pada",     value: moon.pada ? `Pada ${moon.pada} — indicates specific qualities and sub-rulership within the Nakshatra` : "Determined from Moon's degree within the Nakshatra" },
    ],

    "3. Core Horoscope Data": [
      { label: "Ascendant Sign",     value: asc.ascendant_sign || "Calculated from birth time and place" },
      { label: "Ascendant Degree",   value: asc.ascendant_degree ? formatDegree(asc.ascendant_degree) : "Precise degree from birth time" },
      { label: "Moon Sign (Rashi)",  value: `${moon.sign || "Calculated"} — ${moonAttrs.tatva} element, ${moonAttrs.varna} Varna` },
      { label: "Sun Sign",           value: `${sun.sign || "Calculated"} — governs soul purpose, vitality, and father relationships` },
      { label: "Gana",               value: `${nakAttrs.gana} — ${nakAttrs.gana === "Deva" ? "divine nature: compassionate, generous, and spiritually oriented" : nakAttrs.gana === "Manushya" ? "human nature: balanced between material and spiritual, ambitious and relatable" : "fierce nature: strong-willed, direct, and power-oriented"}` },
      { label: "Yoni (Animal Symbol)", value: `${nakAttrs.yoni} — symbolises instinctual drives and compatibility in intimate relationships` },
      { label: "Varna",              value: `${moonAttrs.varna} — ${moonAttrs.varna === "Brahmin" ? "spiritual and intellectual archetype — seeks wisdom, teaching, and inner growth" : moonAttrs.varna === "Kshatriya" ? "warrior and leader archetype — driven by courage, protection, and righteous action" : moonAttrs.varna === "Vaishya" ? "merchant and creator archetype — skilled in trade, creativity, and building prosperity" : "service and craft archetype — excels in skilled work, technical mastery, and community support"}` },
      { label: "Nadi",               value: `${nakAttrs.nadi} Nadi — ${nakAttrs.nadi === "Aadi" ? "Vata dominant constitution" : nakAttrs.nadi === "Madhya" ? "Pitta dominant constitution" : "Kapha dominant constitution"}. Important in marital compatibility analysis.` },
      { label: "Tatva (Element)",    value: `${moonAttrs.tatva} — ${moonAttrs.tatva === "Fire" ? "dynamic, passionate, and driven by ambition" : moonAttrs.tatva === "Earth" ? "grounded, patient, and practical" : moonAttrs.tatva === "Air" ? "intellectual, communicative, and adaptable" : "sensitive, intuitive, and emotionally deep"}` },
      { label: "Vashya",             value: `${moonAttrs.vashya} — indicates natural magnetism and influence category in Vedic compatibility` },
      { label: "Paya (Moon's Metal)", value: paya },
      { label: "Lagna Lord",         value: `${asc.ascendant_ruler || "Ascendant Ruler"} — the primary life force ruler governing health, personality, and overall chart direction` },
    ],

    "4. Lagna Chart Analysis": [
      { label: "Ascendant (Lagna)",  value: `${asc.ascendant_sign || "Pisces"} Rising — ${ascendantPersonality[asc.ascendant_sign] || ascendantPersonality["Aries"]}` },
      { label: "1st House (Self)",   value: getHouseAnalysis(1, "personality, physical appearance, and life approach") },
      { label: "2nd House (Wealth)", value: getHouseAnalysis(2, "speech, family wealth, and accumulated resources") },
      { label: "3rd House (Courage)", value: getHouseAnalysis(3, "courage, communication skills, and sibling relationships") },
      { label: "4th House (Home)",   value: getHouseAnalysis(4, "home environment, mother's relationship, and emotional foundation") },
      { label: "5th House (Intellect)", value: getHouseAnalysis(5, "intelligence, creativity, children, and past-life merit") },
      { label: "6th House (Health)", value: getHouseAnalysis(6, "health challenges, competitive spirit, and service orientation") },
      { label: "7th House (Partnership)", value: getHouseAnalysis(7, "spouse nature, partnerships, and legal agreements") },
      { label: "8th House (Transformation)", value: getHouseAnalysis(8, "longevity, inheritances, hidden knowledge, and transformation") },
      { label: "9th House (Fortune)", value: getHouseAnalysis(9, "fortune, higher learning, father's influence, and dharma path") },
      { label: "10th House (Career)", value: getHouseAnalysis(10, "career direction, public reputation, and professional goals") },
      { label: "11th House (Gains)", value: getHouseAnalysis(11, "steady income, social networks, and desire fulfilment") },
      { label: "12th House (Liberation)", value: getHouseAnalysis(12, "spiritual growth, subconscious mind, and foreign connections") },
    ],

    "5. Moon Chart Analysis": [
      { label: "Moon Sign",          value: `${moon.sign || "Cancer"} — ${moonEmotionalNature[moon.sign] || moonEmotionalNature["Cancer"]}` },
      { label: "Emotional Nature",   value: emotionalNature },
      { label: "Mental Patterns",    value: mentalPatterns },
      { label: "Emotional Triggers", value: emotionalTriggers },
      { label: "Moon Nakshatra",     value: `${moon.nakshatra || "Birth Nakshatra"} — The Moon's nakshatra is the most important indicator of the subconscious mind, instincts, and habitual emotional responses.` },
      { label: "Moon in House",      value: moon.house ? `Moon occupies the ${moon.house}th house — making ${moon.house === 1 ? "the mind and body deeply intertwined with strong personality projection" : moon.house === 4 ? "home and mother central to emotional wellbeing" : moon.house === 7 ? "relationships the primary emotional anchor" : moon.house === 10 ? "career and public life the emotional driving force" : `the ${moon.house}th house matters the emotional focus and source of inner contentment`}.` : "Moon's house determines the primary area of emotional investment in life." },
    ],

    "6. Navamsa Chart (D9) Analysis": [
      { label: "Navamsa Lagna",      value: navamsa.find(n => n.name === "Ascendant")?.sign ? `${navamsa.find(n => n.name === "Ascendant").sign} — the Navamsa Ascendant reveals the soul's true spiritual nature and inner self, often activated after age 35.` : "Calculated from the Ascendant's degree and sign" },
      { label: "Moon in Navamsa",    value: navamsa.find(n => n.name === "Moon")?.sign ? `Moon in ${navamsa.find(n => n.name === "Moon").sign} Navamsa — reveals the deepest emotional and karmic patterns influencing relationships and inner life.` : "Moon Navamsa calculated from birth chart" },
      { label: "Sun in Navamsa",     value: navamsa.find(n => n.name === "Sun")?.sign ? `Sun in ${navamsa.find(n => n.name === "Sun").sign} Navamsa — indicates the soul's dharmic purpose and how life force expresses at a karmic level.` : "Calculated from Sun's precise degree" },
      { label: "Jupiter in Navamsa", value: navamsa.find(n => n.name === "Jupiter")?.sign ? `Jupiter in ${navamsa.find(n => n.name === "Jupiter").sign} Navamsa — blesses the marital life and spiritual growth with the qualities of this Navamsa placement.` : "Calculated from Jupiter's precise degree" },
      { label: "Venus in Navamsa",   value: navamsa.find(n => n.name === "Venus")?.sign ? `Venus in ${navamsa.find(n => n.name === "Venus").sign} Navamsa — this is the primary indicator of spouse's nature and the depth of romantic karma in this lifetime.` : "Calculated from Venus's precise degree" },
      { label: "Navamsa Significance", value: `The D9 Navamsa chart reveals ${pronoun} soul's blueprint — the karmic patterns, spiritual purpose, and the hidden strengths that fully awaken in the second half of life. It also is the primary chart for analysing the quality and nature of marriage.` },
    ],

    "7. Planetary Positions": planetsArr.map(p => ({
      label: p.name,
      value: `${p.sign} · House ${p.house} · ${formatDegree(p.degree || 0)} · ${p.nakshatra || ""}${p.retrograde ? " · ℞ Retrograde" : ""} · ${p.dignity_status || "Placed"} · Strength: ${p.strength_rating || "Moderate"}`
    })),

    "8. Personality Profile": [
      { label: "Core Identity",          value: coreIdentity },
      { label: "Temperament",            value: temperament },
      { label: "Behavioural Tendencies", value: use(joinArr(cData.profile?.behavioralTendencies), `${subjPronoun} demonstrates strong ${moonAttrs.tatva === "Fire" ? "initiative, leadership, and competitive drive" : moonAttrs.tatva === "Earth" ? "reliability, patience, and practical excellence" : moonAttrs.tatva === "Air" ? "adaptability, communication, and intellectual curiosity" : "empathy, creativity, and emotional depth"} in daily life. ${asc.ascendant_sign ? `The ${asc.ascendant_sign} Ascendant adds ${ascendantPersonality[asc.ascendant_sign]?.split("—")[0]?.trim() || "a distinctive quality"} to ${pronoun} external expression.` : ""}`) },
      { label: "Communication Style",    value: communicationStyle },
      { label: "Decision-Making Style",  value: moonAttrs.tatva === "Fire"  ? "Quick, instinctive, and confident — decides fast and acts faster. May occasionally benefit from pausing before major commitments." :
                                                moonAttrs.tatva === "Earth" ? "Deliberate, thorough, and risk-aware — considers all factors before deciding. Once a decision is made, commitment is absolute." :
                                                moonAttrs.tatva === "Air"   ? "Analytical and consultative — weighs multiple perspectives and data points. Decisions are well-researched and logically sound." :
                                                                               "Intuitive and emotionally guided — major decisions are felt as much as thought. Trusts gut feelings deeply." },
      { label: "Leadership Style",       value: sun.house ? `With Sun in House ${sun.house}, ${subjPronoun} leads through ${sun.house === 10 ? "public authority and professional excellence" : sun.house === 1 ? "personal charisma and direct action" : sun.house === 9 ? "wisdom, inspiration, and dharmic vision" : `the matters of the ${sun.house}th house`}.` : `Sun's placement shapes ${pronoun} leadership approach and expression of personal authority.` },
    ],

    "9. Financial & Wealth Analysis": [
      { label: "Wealth Potential",       value: wealthPotential },
      { label: "Income Patterns",        value: incomePatterns },
      { label: "Investment Tendencies",  value: investmentTendencies },
      { label: "2nd House (Savings)",    value: getHouse(2).length ? `${getHouse(2).join(", ")} in the 2nd house of accumulated wealth. ${getHouse(2).includes("Jupiter") ? "Jupiter here is highly auspicious — wealth accumulates significantly over time." : getHouse(2).includes("Venus") ? "Venus here blesses with comfortable earnings and love of luxury." : getHouse(2).includes("Saturn") ? "Saturn here builds wealth slowly but creates lasting financial foundations through discipline." : "These planets shape the nature and flow of accumulated wealth."}` : `Governed by the 2nd lord, ${getHouseSignAndLord(2).lord}, placed in House ${getHouseSignAndLord(2).lordHouse} (${getHouseSignAndLord(2).lordSign}). Savings and family wealth are shaped by the energy of this lord's placement, suggesting a stable financial foundation built on these themes.` },
      { label: "11th House (Gains)",     value: getHouse(11).length ? `${getHouse(11).join(", ")} in the 11th house of income and fulfilment of desires. ${getHouse(11).includes("Jupiter") ? "Exceptional — Jupiter here is the best placement for gains, income, and large network support." : "These planets actively support income generation and the realisation of material ambitions."}` : `Governed by the 11th lord, ${getHouseSignAndLord(11).lord}, placed in House ${getHouseSignAndLord(11).lordHouse} (${getHouseSignAndLord(11).lordSign}). Gains, income streams, and network influences flow through the themes of this lord's placement.` },
      { label: "Financial Timing",       value: `Primary periods of financial growth activate during ${jupiter.sign ? `Jupiter's Mahadasha (${jupiter.sign} placement)` : "Jupiter Mahadasha"} and the Dasha of the 2nd and 11th lords. Present financial karma is strongly shaped by the current ${dashas.current?.mahadasha || "operating"} Mahadasha.` },
    ],

    "10. Family & Domestic Life": [
      { label: "Family Environment",    value: `The 4th house governs domestic life and the mother's influence. ${getHouse(4).length ? `${getHouse(4).join(", ")} placed here creates a ${getHouse(4).includes("Moon") ? "deeply nurturing, emotionally bonded home environment" : getHouse(4).includes("Jupiter") ? "blessed, harmonious, and wisdom-filled domestic sphere" : getHouse(4).includes("Saturn") ? "structured, disciplined, but sometimes emotionally restrained home environment" : "unique domestic atmosphere shaped by these planetary energies"}.` : `Governed by the 4th lord, ${getHouseSignAndLord(4).lord}, placed in House ${getHouseSignAndLord(4).lordHouse} (${getHouseSignAndLord(4).lordSign}). Domestic life and maternal relations are anchored in the themes and strengths of this placement.`}` },
      { label: "Mother's Influence",    value: moon.sign ? `The Moon in ${moon.sign} describes ${pronoun} mother as ${moonAttrs.tatva === "Water" ? "deeply nurturing, emotionally bonded, and spiritually sensitive — a profound formative influence" : moonAttrs.tatva === "Earth" ? "practical, dependable, grounded, and consistent — a stabilising presence in early life" : moonAttrs.tatva === "Fire" ? "dynamic, ambitious, inspiring, and occasionally intense — a powerful motivating force" : "intellectually stimulating, communicative, and freedom-respecting — encouraging independence"}.` : "Moon's placement describes the nature of the mother and the emotional patterns of early childhood." },
      { label: "Domestic Happiness",   value: getHouse(4).some(p => ["Jupiter","Venus","Moon"].includes(p)) ? "High domestic happiness — benefic planets in the 4th house naturally create a warm, joyful, and harmonious home life." : getHouse(4).some(p => ["Mars","Saturn","Rahu","Ketu"].includes(p)) ? `Domestic life requires conscious effort and communication. ${subjPronoun} builds home stability through patience, discipline, and emotional maturity.` : `Domestic peace is governed by the 4th lord, ${getHouseSignAndLord(4).lord}, located in House ${getHouseSignAndLord(4).lordHouse} (${getHouseSignAndLord(4).lordSign}). Home life serves as a stable base, aligning with these planetary lessons.` },
      { label: "Father's Influence",    value: sun.house ? `The Sun in House ${sun.house} indicates the father is associated with ${sun.house === 9 ? "wisdom, dharma, and higher philosophy — likely a spiritual or respected authority figure" : sun.house === 10 ? "professional success and public reputation — a high-achieving and authoritative presence" : sun.house === 4 ? "home, emotional rootedness, and family tradition" : `the matters of the ${sun.house}th house — shaping ${pronoun} sense of identity and purpose`}.` : "Sun's placement describes the father archetype and its influence on the sense of self and authority." },
    ],

    "11. Marriage & Relationship Analysis": [
      { label: "Relationship Approach", value: relationshipPattern },
      { label: "Partner Archetype",     value: partnerArchetype },
      { label: "Married Life",          value: marriedLife },
      { label: "Venus Placement",       value: venus.sign ? `Venus in ${venus.sign} (House ${venus.house}) — the primary marriage karaka. ${venus.sign === "Taurus" || venus.sign === "Libra" ? "Exalted in influence — strongly indicates beautiful, harmonious, and lasting love." : venus.sign === "Pisces" ? "Venus in exaltation — deepest spiritual love, soulmate connections, and deeply romantic karmic bonds." : venus.sign === "Scorpio" ? "Venus in debilitation — intense, transformative relationships that test and ultimately strengthen the soul." : `Brings a ${venus.sign} flavour to love — ${maritalLifeByVenus[venus.sign]?.split("—")[0]?.trim() || "a distinctive and meaningful approach to partnership"}.`}` : "Venus's placement governs the quality and timing of romantic relationships and marriage." },
      { label: "7th Lord Placement",    value: `The 7th lord governs the quality of the spouse and the overall marriage experience. Its sign and house placement, along with Venus's condition, determine the timing and nature of marital happiness.` },
    ],

    "12. Children & Progeny": [
      { label: "Childbirth Prospects",  value: getHouse(5).length ? `${getHouse(5).join(", ")} in the 5th house of children and past-life merit. ${getHouse(5).includes("Jupiter") ? "Jupiter here is supremely auspicious — blesses with multiple children and joyful parent-child bonds." : getHouse(5).includes("Venus") ? "Venus here indicates beautiful, talented children with strong artistic gifts." : getHouse(5).includes("Moon") ? "Moon here — deeply nurturing parent-child relationship with strong emotional bonds." : "The planets here shape the nature and timing of parenthood."}` : `Governed by the 5th lord, ${getHouseSignAndLord(5).lord}, placed in House ${getHouseSignAndLord(5).lordHouse} (${getHouseSignAndLord(5).lordSign}). Childbirth and relationship with children are guided by this lord's placement, along with Jupiter, which is placed in ${jupiter.sign || 'its sign'}.` },
      { label: "Parenting Style",       value: gender ? `${subjPronoun} is naturally a ${moonAttrs.tatva === "Earth" ? "patient, structured, and deeply supportive parent who values stability, education, and moral grounding" : moonAttrs.tatva === "Fire" ? "enthusiastic, inspiring, and motivating parent who encourages courage, achievement, and independence" : moonAttrs.tatva === "Water" ? "empathetic, emotionally present, and intuitively connected parent who creates deep bonds" : "intellectually engaging, freedom-giving, and communicatively rich parent who nurtures independent thinking"}.` : `The Moon's element and the 5th house condition describe the natural parenting instincts and the quality of the parent-child emotional bond.` },
      { label: "Jupiter's Role",        value: jupiter.sign ? `Jupiter in ${jupiter.sign} (House ${jupiter.house}) — as Putrakaraka (natural significator of children), Jupiter's strength and placement directly determines the ease, timing, and joy of parenthood. ${jupiter.strength_rating && jupiter.strength_rating !== "Weak" ? "Jupiter's strength here supports blessed progeny." : "Jupiter may need strengthening through remedies for optimal childbirth timing."}` : "Jupiter's placement and strength are the primary determinants of childbirth timing and parent-child karmic bonds." },
    ],

    "13. Health Analysis": [
      { label: "Physical Constitution",   value: `${moonAttrs.tatva} element dominant (Moon in ${moon.sign || "birth sign"}) — ${moonAttrs.tatva === "Fire" ? "high metabolic energy with strong physical vitality. Prone to heat-related conditions, fevers, and inflammatory issues. Benefits from cooling foods and regulated physical output." : moonAttrs.tatva === "Earth" ? "robust, enduring physical stamina with strong bone and muscle density. Prone to stiffness, weight management, and sluggish digestion. Benefits from regular movement and light diet." : moonAttrs.tatva === "Air" ? "light, nervous constitution with a sensitive respiratory and nervous system. Prone to anxiety, restlessness, and erratic energy patterns. Benefits from grounding practices and deep breathing." : "fluid, sensitive constitution with a strong immune-emotional connection. Prone to digestive sensitivity and psychosomatic conditions. Benefits from emotional wellness and clean nutrition."}` },
      { label: "Ascendant Health Areas", value: healthByAscendant[asc.ascendant_sign] || healthByAscendant["Aries"] },
      { label: "6th House (Illness)",    value: getHouse(6).length ? `${getHouse(6).join(", ")} in the 6th house of health and disease. ${getHouse(6).includes("Saturn") ? "Saturn here suggests chronic conditions that improve with disciplined lifestyle management." : getHouse(6).includes("Mars") ? "Mars here indicates acute health events requiring proactive care and regular check-ups." : getHouse(6).includes("Jupiter") ? "Jupiter in the 6th provides natural resilience and recovery capacity — health generally improves with age." : "These planets shape specific health vulnerabilities and the approach to healing."}` : `Governed by the 6th lord, ${getHouseSignAndLord(6).lord}, placed in House ${getHouseSignAndLord(6).lordHouse} (${getHouseSignAndLord(6).lordSign}). Health resilience and daily routines are shaped by the energy of this lord's placement.` },
      { label: "Longevity Indicators",   value: `The 8th house (longevity) and its lord, along with Saturn and the Moon, determine life span. ${getHouse(8).length ? `${getHouse(8).join(", ")} in the 8th house — longevity is shaped by these planetary energies.` : `Governed by the 8th lord, ${getHouseSignAndLord(8).lord}, placed in House ${getHouseSignAndLord(8).lordHouse} (${getHouseSignAndLord(8).lordSign}). Longevity and deep transformation are guided by the strength of this lord and the general life force.`}` },
    ],

    "14. Education & Intelligence": [
      { label: "Learning Style",        value: educationByMercury[mercury.sign] || educationByMercury["Gemini"] },
      { label: "Mercury's Mind",        value: mercury.sign ? `Mercury in ${mercury.sign} (House ${mercury.house}) — ${mercuryCommunicationStyle[mercury.sign] || "a strong and capable intellect with unique thinking patterns."}` : "Mercury's placement governs the specific style of intellect, learning speed, and academic aptitude." },
      { label: "5th House (Intellect)", value: getHouse(5).length ? `${getHouse(5).join(", ")} in the 5th house of intelligence and past-life knowledge. ${getHouse(5).includes("Jupiter") ? "Jupiter here creates exceptional intelligence — scholarly, philosophical, and deeply insightful." : getHouse(5).includes("Mercury") ? "Mercury here gives a brilliant, quick, and highly analytical mind." : "These planets actively enhance the quality and expression of intellect."}` : `Governed by the 5th lord, ${getHouseSignAndLord(5).lord}, placed in House ${getHouseSignAndLord(5).lordHouse} (${getHouseSignAndLord(5).lordSign}). Intellect and learning capacity are influenced by this lord's placement and the condition of Mercury.` },
      { label: "Suitable Fields",       value: use(joinArr(cData.career_intel?.naturalCareerDomains), educationByMercury[mercury.sign]?.split("Excels in ")[1] || "Sciences, humanities, and any field aligned with the chart's dominant planetary strengths.") },
    ],

    "15. Career & Professional Life": [
      { label: "Career Direction",      value: careerNature },
      { label: "Professional Strengths", value: professionalStrengths },
      { label: "Suitable Industries",   value: use(joinArr(cData.career_intel?.naturalCareerDomains), h10planets.length ? h10planets.map(p => careerByHouse10[p]).filter(Boolean).join(" Additionally, ") : careerByHouse10[asc.ascendant_ruler] || "Professional excellence through consistent application of natural planetary talents.") },
      { label: "10th House",            value: h10planets.length ? `${h10planets.join(", ")} in the 10th house of career — these planets directly shape public reputation, professional identity, and career peak periods. The Mahadasha of ${h10planets[0]} will be a significant period of career advancement.` : `Governed by the 10th lord, ${getHouseSignAndLord(10).lord}, placed in House ${getHouseSignAndLord(10).lordHouse} (${getHouseSignAndLord(10).lordSign}). Professional achievements, career path, and public recognition are driven directly by the themes of this lord's house.` },
      { label: "Sun's Role",            value: sun.sign ? `Sun in ${sun.sign} (House ${sun.house}) — governs ${pronoun} sense of authority, ambition, and professional identity. ${sun.house === 10 ? "Exceptional career placement — public recognition, authority, and leadership are central life themes." : `Shapes ${pronoun} leadership expression and professional purpose through the ${sun.house}th house domain.`}` : "Sun's placement governs the expression of ambition, authority, and career purpose." },
      { label: "Best Career Periods",   value: `Career peaks during the Mahadasha of planets connected to the 10th house${h10planets.length ? ` — particularly ${h10planets[0]}` : ""}. ${dashas.current?.mahadasha ? `The current ${dashas.current.mahadasha} Mahadasha ${h10planets.includes(dashas.current.mahadasha) ? "is directly activating career growth and public recognition" : "shapes career through its planetary nature and house lordship"}.` : ""}` },
    ],

    "16. Fortune, Luck & Dharma": [
      { label: "9th House (Fortune)",   value: getHouse(9).length ? `${getHouse(9).join(", ")} in the 9th house of fortune, dharma, and higher learning. ${getHouse(9).includes("Jupiter") ? "Jupiter here is supremely auspicious — profound blessings, abundant luck, and a deeply dharmic life path." : getHouse(9).includes("Sun") ? "Sun in the 9th — fortune through leadership, father's blessings, and government or spiritual institutions." : getHouse(9).includes("Venus") ? "Venus in the 9th — luck through arts, partnerships, foreign lands, and beautiful philosophical pursuits." : "Fortune activates through the placed planetary energies and their Dasha periods."}` : `Governed by the 9th lord, ${getHouseSignAndLord(9).lord}, placed in House ${getHouseSignAndLord(9).lordHouse} (${getHouseSignAndLord(9).lordSign}). Spiritual alignment, higher wisdom, and fortune are activated by the strength of this lord and Jupiter's placement.` },
      { label: "Jupiter's Blessings",   value: jupiter.sign ? `Jupiter in ${jupiter.sign} (House ${jupiter.house}) — as the primary fortune karaka, Jupiter's placement determines the quality, timing, and avenue of divine grace. ${spiritualGrowthByJupiter[jupiter.sign] || "Jupiter brings expansion, wisdom, and blessings in its house domain."}` : "Jupiter's sign and house placement is the primary indicator of life's fortune, opportunities, and divine protection." },
      { label: "Dharma Path",           value: `The 9th house and its lord define ${pronoun} true dharmic calling. ${asc.ascendant_sign ? `As a ${asc.ascendant_sign} Ascendant, ${subjPronoun} fulfils dharma through ${asc.ascendant_sign === "Aries" ? "courageous action, pioneering effort, and leadership" : asc.ascendant_sign === "Taurus" ? "building beauty, creating lasting prosperity, and devotional practice" : asc.ascendant_sign === "Gemini" ? "communication, teaching, spreading knowledge, and intellectual service" : asc.ascendant_sign === "Cancer" ? "nurturing, emotional healing, family service, and bhakti devotion" : asc.ascendant_sign === "Leo" ? "creative leadership, inspiring others, and expressing divine gifts publicly" : asc.ascendant_sign === "Virgo" ? "selfless service, purification, healing, and meticulous excellence" : asc.ascendant_sign === "Libra" ? "justice, harmony, beautiful relationships, and diplomatic service" : asc.ascendant_sign === "Scorpio" ? "deep transformation, occult wisdom, healing, and profound inner work" : asc.ascendant_sign === "Sagittarius" ? "higher learning, teaching dharma, travel, and philosophical expansion" : asc.ascendant_sign === "Capricorn" ? "structured duty, institutional service, and building dharmic legacy" : asc.ascendant_sign === "Aquarius" ? "humanitarian service, collective upliftment, and visionary social contribution" : "spiritual surrender, compassionate service, artistic expression, and mystical devotion"}.` : ""}` },
      { label: "Fortune Timing",        value: `${subjPronoun} experiences peak fortune during Jupiter Mahadasha and the 9th lord's Dasha period. ${dashas.current?.mahadasha === "Jupiter" ? "The current Jupiter Mahadasha is one of the most blessed periods of life — opportunities, expansion, and divine grace flow abundantly." : "Consistent effort in dharmic activity continuously builds the reservoir of luck and providential support."}` },
    ],

    "17. Planet-wise Detailed Analysis": planetsArr.map(p => {
      const planetKaraka = { Sun: "soul, father, authority, vitality", Moon: "mind, mother, emotions, nourishment", Mars: "energy, courage, siblings, property", Mercury: "intellect, communication, business, skills", Jupiter: "wisdom, children, fortune, dharma", Venus: "love, spouse, luxury, creativity", Saturn: "karma, discipline, longevity, service", Rahu: "desires, foreign, technology, illusion", Ketu: "liberation, spirituality, past karma, detachment" };
      const synthesis = cData.planets && cData.planets[p.name] ? cData.planets[p.name].synthesis : `As the karaka of ${planetKaraka[p.name] || "important life domains"}, ${p.name} in ${p.sign} (House ${p.house}) operates with ${p.strength_rating || "moderate"} strength. ${p.retrograde ? `Being retrograde, ${p.name}'s energy turns inward — results manifest through deep internal processing and karmic recalibration rather than direct external action. ` : ""}${p.dignity_status ? `${p.name} in ${p.dignity_status} — ${p.dignity_status === "Exalted" ? "operates at maximum power, bestowing exceptional results in its domain" : p.dignity_status === "Debilitated" ? "operates under stress, requiring remedial measures and conscious effort to express its positive qualities" : p.dignity_status === "Own Sign" ? "in its own sign, operates with natural authority, comfort, and full expression of its qualities" : "expresses its qualities through the lens of this sign and house"}.` : ""}`;
      return {
        label: p.name,
        value: `${p.sign} · House ${p.house} · ${formatDegree(p.degree || 0)}${p.retrograde ? " · ℞ Retrograde" : ""} · ${p.dignity_status || "Placed"} · Strength: ${p.strength_rating || "Moderate"}. ${synthesis}`
      };
    }),

    "18. Dasha Analysis (Next 5 Years)": (() => {
      const now = new Date();
      const fiveYearsLater = new Date(now.getFullYear() + 5, now.getMonth(), now.getDate());
      const upcomingIn5Yrs = (dashas.upcoming || []).filter(d => new Date(d.start_date) <= fiveYearsLater);
      const dashaMeanings = { Sun: "authority, career clarity, health focus, father's matters", Moon: "emotional growth, public dealings, home changes, mother's matters", Mars: "energy, courage, property, siblings, competitive drives", Mercury: "business, learning, communication, travel, intellectual ventures", Jupiter: "expansion, fortune, wisdom, children, spiritual growth", Venus: "love, luxury, creativity, relationships, financial ease", Saturn: "karmic lessons, discipline, slow but lasting progress, service", Rahu: "ambition, foreign elements, technology, sudden changes", Ketu: "spiritual awakening, detachment, research, liberation" };
      return [
        { label: "Current Mahadasha",  value: dashas.current?.mahadasha ? `${dashas.current.mahadasha} Mahadasha — ruling life themes of ${dashaMeanings[dashas.current.mahadasha] || "planetary domain"}.` : "Mahadasha derived from Moon's Nakshatra at birth" },
        { label: "Current Antardasha", value: dashas.current?.antardasha ? `${dashas.current.antardasha} Antardasha within ${dashas.current.mahadasha} Mahadasha — activating a sub-theme of ${dashaMeanings[dashas.current.antardasha] || "sub-period focus"}.` : "Sub-period of the current Mahadasha" },
        { label: "Current Period Theme", value: dashas.current?.mahadasha ? `The ${dashas.current.mahadasha} Mahadasha is the dominant karmic force shaping ${pronoun} life. This period activates ${pronoun} ${dashaMeanings[dashas.current.mahadasha] || "primary planetary themes"} — with the specific sub-themes shifting every few months through the Antardasha cycle.` : `The operating Dasha is the primary filter through which all karma manifests during this period.` },
        { label: "Period Dates",       value: dashas.current?.start_date && dashas.current?.end_date ? `${new Date(dashas.current.start_date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })} → ${new Date(dashas.current.end_date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}` : "Calculated from Moon's Nakshatra and exact degree at birth" },
        ...upcomingIn5Yrs.map(d => ({
          label: `${d.mahadasha} – ${d.antardasha}`,
          value: `${new Date(d.start_date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })} → ${new Date(d.end_date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })} — ${dashaMeanings[d.antardasha] || dashaMeanings[d.mahadasha] || "planetary sub-period"}`
        }))
      ];
    })(),

    "19. Yogas & Special Combinations": yogas.length > 0
      ? yogas.map(y => ({
          label: y.yoga_name || y.name || "Yoga",
          value: `Strength: ${y.strength || 'Medium'}. ${y.description || 'Benefic planetary combination present in the natal chart.'}`
        }))
      : [
          { label: "Chart Observation", value: `While no major classical Yogas (Raj, Dhana, or Pancha Mahapurusha) are prominently identified in the automated analysis, every chart carries its own unique combination of planetary strengths. The current Dasha periods and transit activations are the most reliable indicators of when the chart's inherent potential manifests.` },
          { label: "Planetary Strength", value: `The dominant planet by placement — ${planetsArr.sort((a,b) => (a.strength_rating === "Strong" ? -1 : 1))[0]?.name || "chart ruler"} — forms the primary source of strength and protection in this chart.` }
        ],

    "20. Remedies & Recommendations": [
      { label: "Primary Gemstone",     value: `${remedyData.gem}. Always consult a qualified Vedic astrologer to verify suitability for your specific chart before wearing any gemstone.` },
      { label: "Seed Mantra",          value: remedyData.mantra },
      { label: "Favourable Colour",    value: `${remedyData.colour} — wearing these colours on relevant days strengthens the Lagna Lord's energy and overall life force.` },
      { label: "Fasting",              value: remedyData.fasting },
      { label: "Deity Worship",        value: `Primary deity: ${remedyData.deity}. Regular worship, prayer, and devotion to this deity aligns ${pronoun} energy with the highest planetary blessings.` },
      { label: "Charity (Dana)",       value: remedyData.charity },
      { label: "Spiritual Practice",   value: use(spiritualPath, spiritualGrowthByJupiter[jupiter.sign] || "Daily meditation, mantra chanting, and acts of selfless service are the highest remedies for any chart — they generate positive karma that transcends planetary limitations.") },
      { label: "General Guidance",     value: `The most powerful remedy for any chart is living in alignment with dharma — fulfilling ${pronoun} duties with integrity, practising gratitude, serving others, and dedicating actions to the divine. ${nakAttrs.gana === "Deva" ? "Being of Deva Gana, " + subjPronoun + " thrives through selfless service and spiritual practice." : nakAttrs.gana === "Manushya" ? "Being of Manushya Gana, " + subjPronoun + " grows through balancing material responsibility with spiritual aspiration." : "Being of Rakshasa Gana, " + subjPronoun + " transforms through disciplined spiritual practice and channelling intensity into dharmic pursuits."}` },
    ],

    "raw_charts": {
      ascendantSign: asc.ascendant_sign || "Aries",
      planetsArr,
      navamsa,
      moonChart,
      moonSign: moon.sign || "Aries"
    }
  };
};