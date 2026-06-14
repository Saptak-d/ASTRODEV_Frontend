export const signsMap = {
  "Aries": 1, "Taurus": 2, "Gemini": 3, "Cancer": 4, "Leo": 5, "Virgo": 6,
  "Libra": 7, "Scorpio": 8, "Sagittarius": 9, "Capricorn": 10, "Aquarius": 11, "Pisces": 12
};

export const planetShortNames = {
  "Sun": "Su", "Moon": "Mo", "Mars": "Ma", "Mercury": "Me",
  "Jupiter": "Ju", "Venus": "Ve", "Saturn": "Sa", "Rahu": "Ra", "Ketu": "Ke"
};

// Coordinates for the 12 houses in a 400x400 North Indian Chart
const houseCenters = {
  1: { x: 200, y: 90 },
  2: { x: 100, y: 40 },
  3: { x: 40, y: 100 },
  4: { x: 90, y: 200 },
  5: { x: 40, y: 300 },
  6: { x: 100, y: 360 },
  7: { x: 200, y: 310 },
  8: { x: 300, y: 360 },
  9: { x: 360, y: 300 },
  10: { x: 310, y: 200 },
  11: { x: 360, y: 100 },
  12: { x: 300, y: 40 }
};

const houseSignPositions = {
  1: { x: 200, y: 160 }, // Bottom of H1
  2: { x: 160, y: 15 },
  3: { x: 15, y: 160 },
  4: { x: 160, y: 200 },
  5: { x: 15, y: 240 },
  6: { x: 160, y: 395 },
  7: { x: 200, y: 240 }, // Top of H7
  8: { x: 240, y: 395 },
  9: { x: 385, y: 240 },
  10: { x: 240, y: 200 },
  11: { x: 385, y: 160 },
  12: { x: 240, y: 15 }
};

/**
 * Generate a beautiful North Indian Kundli SVG
 * @param {Array} planets - Array of objects { name: "Sun", house: 1, sign: "Aries" }
 * @param {String} ascendantSign - Name of Ascendant sign (e.g., "Scorpio")
 */
export const generateKundliSVG = (planets, ascendantSign) => {
  const ascNum = signsMap[ascendantSign] || 1;

  // Group planets by house (1-12)
  const houses = {};
  for (let i = 1; i <= 12; i++) {
    houses[i] = [];
  }

  planets.forEach(p => {
    if (p.house && p.name !== "Ascendant") {
      const shortName = planetShortNames[p.name] || p.name.substring(0, 2);
      let pLabel = p.retrograde ? `${shortName}(R)` : shortName;
      houses[p.house].push(pLabel);
    }
  });

  let svgContent = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="100%" height="100%" style="background-color: transparent;">
      <defs>
        <style>
          .line { stroke: rgba(42, 27, 24, 0.8); stroke-width: 2; fill: none; }
          .sign-num { font-family: 'Georgia', serif; font-size: 14px; fill: rgba(42, 27, 24, 0.5); font-weight: bold; text-anchor: middle; dominant-baseline: middle; }
          .planet-text { font-family: 'Arial', sans-serif; font-size: 14px; fill: #1A110F; font-weight: bold; text-anchor: middle; dominant-baseline: middle; }
        </style>
      </defs>
      
      <!-- Outer Square -->
      <rect x="2" y="2" width="396" height="396" class="line" />
      
      <!-- Diagonals -->
      <line x1="0" y1="0" x2="400" y2="400" class="line" />
      <line x1="400" y1="0" x2="0" y2="400" class="line" />
      
      <!-- Inner Diamond -->
      <polygon points="200,0 400,200 200,400 0,200" class="line" />
  `;

  // Place Sign Numbers and Planets
  for (let i = 1; i <= 12; i++) {
    // Calculate which Zodiac sign number falls in this house
    const signNumber = ((ascNum + i - 2) % 12) + 1;
    
    // Draw sign number
    const sPos = houseSignPositions[i];
    svgContent += `<text x="${sPos.x}" y="${sPos.y}" class="sign-num">${signNumber}</text>`;

    // Draw planets
    const pPos = houseCenters[i];
    const housePlanets = houses[i];
    
    if (housePlanets.length > 0) {
      if (housePlanets.length <= 2) {
        svgContent += `<text x="${pPos.x}" y="${pPos.y}" class="planet-text">${housePlanets.join(", ")}</text>`;
      } else {
        // Split into two lines
        const line1 = housePlanets.slice(0, 2).join(", ");
        const line2 = housePlanets.slice(2).join(", ");
        svgContent += `
          <text x="${pPos.x}" y="${pPos.y - 10}" class="planet-text">${line1}</text>
          <text x="${pPos.x}" y="${pPos.y + 10}" class="planet-text">${line2}</text>
        `;
      }
    }
  }

  // Draw Ascendant marker in House 1 (Optional, but usually understood as H1)
  // svgContent += `<text x="200" y="40" class="planet-text" style="fill:#8C7D6B;">Asc</text>`;

  svgContent += `</svg>`;
  return svgContent;
};
