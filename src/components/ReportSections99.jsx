import React from 'react';
import { generateFullReport } from '../utils/fullReportEngine';
import { generateKundliSVG } from '../utils/svgChart';

function Section({ title, children, svgContent }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-sm border border-amber-900/10 mb-8 transition-all hover:shadow-md">
      <h2 className="text-xl md:text-2xl font-bold text-amber-950 mb-6 border-b-2 border-amber-600/30 pb-2 uppercase tracking-wide">
        {title}
      </h2>
      {svgContent && (
        <div className="flex justify-center mb-8 bg-amber-50/50 rounded-lg p-4">
          <div
            className="w-full max-w-[320px] aspect-square"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        </div>
      )}
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  if (value === null || value === undefined) return null;
  const v = String(value).trim();
  if (v === '') return null;
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-start py-3 border-b border-amber-900/5 hover:bg-amber-50/50 transition-colors px-2 rounded-md group">
      <span className="text-sm md:text-base font-semibold text-amber-900/80 uppercase tracking-wider mb-1 sm:mb-0 sm:w-[38%] group-hover:text-amber-900 transition-colors flex-shrink-0">
        {label}
      </span>
      <span className="text-base font-medium text-amber-950 sm:text-right sm:max-w-[58%] leading-relaxed">
        {v}
      </span>
    </div>
  );
}

export default function ReportSections99({ report }) {
  if (!report || !report.factsJson) {
    return <p className="text-center p-8 text-amber-800">No report data available.</p>;
  }

  const reportData = generateFullReport(report);
  const rawCharts = reportData.raw_charts;

  let lagnaSvg = null;
  let moonSvg = null;
  let navamsaSvg = null;

  if (rawCharts) {
    lagnaSvg = generateKundliSVG(rawCharts.planetsArr, rawCharts.ascendantSign);

    if (rawCharts.moonChart && rawCharts.moonChart.length > 0) {
      moonSvg = generateKundliSVG(rawCharts.moonChart, rawCharts.moonSign);
    }

    if (rawCharts.navamsa && rawCharts.navamsa.length > 0) {
      const navAsc = rawCharts.navamsa.find(n => n.name === "Ascendant")?.sign || "Aries";
      const signs = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
      const navAscIndex = signs.indexOf(navAsc);
      const navPlanets = rawCharts.navamsa.map(n => {
        const signIndex = signs.indexOf(n.sign);
        const house = signIndex === -1 ? 1 : ((signIndex - navAscIndex + 12) % 12) + 1;
        return { name: n.name, sign: n.sign, house };
      });
      navamsaSvg = generateKundliSVG(navPlanets, navAsc);
    }
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">
      {Object.entries(reportData)
        .filter(([key]) => key !== "raw_charts")
        .map(([sectionTitle, items], idx) => {
          let currentSvg = null;
          if (sectionTitle.includes("Lagna Chart"))   currentSvg = lagnaSvg;
          if (sectionTitle.includes("Moon Chart"))    currentSvg = moonSvg;
          if (sectionTitle.includes("Navamsa Chart")) currentSvg = navamsaSvg;

          // Strip leading "1. " prefix for display
          const displayTitle = sectionTitle.replace(/^\d+\.\s*/, '');

          // Only render sections with valid rows
          const validItems = (items || []).filter(
            item => item && item.value !== null && item.value !== undefined && String(item.value).trim() !== ''
          );
          if (validItems.length === 0 && !currentSvg) return null;

          return (
            <Section key={idx} title={displayTitle} svgContent={currentSvg}>
              {validItems.map((item, i) => (
                <InfoRow key={i} label={item.label} value={item.value} />
              ))}
            </Section>
          );
        })}
    </div>
  );
}
