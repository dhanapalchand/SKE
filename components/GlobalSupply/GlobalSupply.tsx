'use client';

import { useEffect, useRef } from 'react';
import { globalSupply } from '@/data/company';
import './GlobalSupply.css';

// Export destination regions with accurate map positions (viewBox 0 0 1000 500)
const regions = [
  { name: 'Middle East', x: 590, y: 225, labelAnchor: 'middle' as const },
  { name: 'Southeast Asia', x: 760, y: 295, labelAnchor: 'start' as const },
  { name: 'East Africa', x: 560, y: 310, labelAnchor: 'start' as const },
  { name: 'West Africa', x: 440, y: 280, labelAnchor: 'end' as const },
  { name: 'Europe', x: 500, y: 145, labelAnchor: 'middle' as const },
  { name: 'East Asia', x: 790, y: 195, labelAnchor: 'start' as const },
  { name: 'South America', x: 280, y: 350, labelAnchor: 'end' as const },
  { name: 'North America', x: 200, y: 155, labelAnchor: 'end' as const },
  { name: 'Australia', x: 830, y: 390, labelAnchor: 'start' as const },
];

// India origin — Tamil Nadu region
const indiaPos = { x: 670, y: 260 };

export default function GlobalSupply() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Generate curved path from India to region
  const getCurvedPath = (x2: number, y2: number) => {
    const midX = (indiaPos.x + x2) / 2;
    const midY = Math.min(indiaPos.y, y2) - Math.abs(x2 - indiaPos.x) * 0.15;
    return `M${indiaPos.x},${indiaPos.y} Q${midX},${midY} ${x2},${y2}`;
  };

  return (
    <section className="global-supply section" id="global-supply" ref={sectionRef}>
      <div className="global-supply-inner">
        <div className="global-supply-header">
          <p className="global-supply-label reveal">Global Supply</p>
          <h2 className="global-supply-headline reveal delay-1">
            {globalSupply.headline}
          </h2>
          <p className="global-supply-subtext reveal delay-2">
            {globalSupply.subtext}
          </p>
        </div>

        {/* SVG Map with detailed continents */}
        <div className="global-map-container reveal delay-2">
          <svg className="global-map-svg" viewBox="0 0 1000 500" fill="none" xmlns="http://www.w3.org/2000/svg">

            {/* ── Grid lines for visual depth ── */}
            <defs>
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5"/>
              </pattern>
              <radialGradient id="indiaGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#D97706" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="#D97706" stopOpacity="0"/>
              </radialGradient>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D97706" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#D97706" stopOpacity="0.15"/>
              </linearGradient>
            </defs>
            <rect width="1000" height="500" fill="url(#grid)"/>

            {/* ── Continent outlines — detailed paths ── */}
            <g className="continent-shapes">
              {/* North America */}
              <path d="M140,75 L155,68 L170,62 L185,58 L200,60 L220,55 L240,58 L260,65 L275,70
                L285,80 L290,92 L288,105 L295,115 L300,125 L290,130 L280,138
                L272,148 L265,155 L260,165 L250,170 L240,175 L230,180
                L225,190 L218,195 L210,198 L205,210 L200,220 L190,225
                L180,222 L172,218 L165,210 L158,200 L150,195 L145,185
                L140,175 L132,165 L125,155 L120,145 L115,132 L112,120
                L115,108 L120,95 L128,85 Z" className="continent-path"/>
              {/* Central America */}
              <path d="M200,220 L210,225 L218,235 L225,245 L230,255 L228,265
                L222,270 L215,268 L210,260 L205,250 L200,240 L198,230 Z" className="continent-path"/>
              {/* South America */}
              <path d="M228,265 L240,262 L255,268 L268,275 L278,285 L288,300
                L295,315 L298,330 L296,345 L290,360 L282,375 L275,388
                L268,398 L260,408 L252,415 L245,418 L238,412 L232,402
                L228,390 L225,375 L222,358 L220,340 L218,322 L218,305
                L220,290 L222,278 Z" className="continent-path"/>
              {/* Europe */}
              <path d="M460,68 L475,62 L490,58 L505,55 L520,58 L535,62 L548,68
                L558,75 L565,85 L568,95 L570,108 L565,118 L558,128
                L550,135 L540,140 L530,142 L520,140 L510,142 L500,145
                L492,148 L485,152 L478,148 L472,142 L465,135 L458,128
                L452,118 L448,108 L448,95 L450,82 Z" className="continent-path"/>
              {/* Africa */}
              <path d="M468,180 L478,175 L490,172 L505,170 L518,172 L530,178
                L542,185 L550,195 L558,208 L565,222 L570,238 L572,255
                L570,272 L568,288 L565,305 L558,320 L548,335 L538,348
                L528,358 L518,365 L508,368 L498,365 L488,358 L480,348
                L472,335 L465,320 L460,305 L455,288 L452,272 L452,255
                L455,238 L458,222 L462,205 L465,192 Z" className="continent-path"/>
              {/* Asia (mainland) */}
              <path d="M570,45 L595,40 L620,38 L645,42 L670,48 L700,52
                L730,48 L758,45 L780,50 L798,58 L812,68 L822,80
                L828,95 L830,110 L828,125 L822,138 L812,148 L800,155
                L788,160 L775,162 L760,158 L748,152 L735,148 L720,150
                L708,155 L698,162 L690,170 L682,178 L678,188 L680,198
                L685,208 L688,215 L680,218 L670,215 L658,208 L648,198
                L638,190 L628,185 L618,182 L608,178 L598,172 L588,165
                L580,155 L575,145 L570,132 L568,118 L565,105 L562,92
                L560,78 L562,62 Z" className="continent-path"/>

              {/* India — highlighted with detail */}
              <path d="M648,198 L658,192 L668,190 L678,195 L688,205
                L695,218 L698,232 L696,248 L690,262 L682,275 L675,285
                L668,292 L660,288 L654,278 L648,265 L644,252
                L642,238 L642,225 L644,212 Z"
                className="india-shape"/>

              {/* Sri Lanka */}
              <circle cx="680" cy="298" r="5" className="india-shape" style={{opacity: 0.5}}/>

              {/* Southeast Asia */}
              <path d="M720,200 L735,195 L750,198 L762,205 L770,215
                L775,228 L778,242 L775,255 L768,265 L758,272
                L748,275 L738,270 L730,262 L725,250 L720,238
                L718,225 L718,212 Z" className="continent-path"/>
              {/* Indonesia/Maritime SE Asia */}
              <path d="M740,285 L755,282 L770,285 L782,290 L795,288
                L808,292 L818,298 L812,305 L800,308 L785,305
                L770,302 L755,298 L742,295 Z" className="continent-path"/>
              {/* Japan */}
              <path d="M830,115 L838,108 L845,115 L842,128 L838,140 L832,148
                L828,138 L825,128 Z" className="continent-path"/>
              {/* Australia */}
              <path d="M790,355 L810,348 L832,345 L855,348 L872,355
                L885,365 L892,378 L890,392 L882,405 L870,415
                L855,420 L838,422 L822,418 L808,412 L798,402
                L790,390 L785,378 L788,365 Z" className="continent-path"/>
              {/* New Zealand */}
              <path d="M905,400 L912,395 L915,405 L912,418 L905,425
                L900,418 L900,408 Z" className="continent-path"/>
            </g>

            {/* ── India glow effect ── */}
            <circle cx={indiaPos.x} cy={indiaPos.y} r="60" fill="url(#indiaGlow)"/>

            {/* ── Supply route curves from India ── */}
            {regions.map((region, i) => (
              <path
                key={region.name}
                className="supply-curve"
                d={getCurvedPath(region.x, region.y)}
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}

            {/* ── Region destination dots ── */}
            {regions.map((region) => (
              <g key={region.name}>
                <circle className="region-dot-outer" cx={region.x} cy={region.y} r="6"/>
                <circle className="region-dot" cx={region.x} cy={region.y} r="3"/>
                <text
                  className="region-label"
                  x={region.labelAnchor === 'start' ? region.x + 12 : region.labelAnchor === 'end' ? region.x - 12 : region.x}
                  y={region.y - 12}
                  textAnchor={region.labelAnchor}
                >
                  {region.name}
                </text>
              </g>
            ))}

            {/* ── India origin marker ── */}
            <circle className="origin-pulse" cx={indiaPos.x} cy={indiaPos.y} r="5"/>
            <circle className="origin-pulse" cx={indiaPos.x} cy={indiaPos.y} r="5" style={{ animationDelay: '0.7s' }}/>
            <circle className="origin-pulse" cx={indiaPos.x} cy={indiaPos.y} r="5" style={{ animationDelay: '1.4s' }}/>
            <circle className="origin-dot" cx={indiaPos.x} cy={indiaPos.y} r="6"/>

            {/* India label */}
            <text
              x={indiaPos.x}
              y={indiaPos.y + 25}
              textAnchor="middle"
              fontSize="11"
              fontWeight="800"
              fill="#D97706"
              letterSpacing="0.15em"
            >
              INDIA
            </text>
            <text
              x={indiaPos.x}
              y={indiaPos.y + 37}
              textAnchor="middle"
              fontSize="7"
              fontWeight="500"
              fill="rgba(217,119,6,0.6)"
              letterSpacing="0.08em"
            >
              TAMIL NADU
            </text>
          </svg>
        </div>

        <div style={{ textAlign: 'center' }} className="reveal delay-3">
          <span className="origin-badge">
            🇮🇳 India <span className="origin-badge-arrow">→</span> Global B2B Supply
          </span>
        </div>

        <div className="global-regions reveal delay-4">
          {globalSupply.targetRegions.map((region) => (
            <span key={region} className="global-region-tag">
              {region}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
