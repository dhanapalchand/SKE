'use client';

import { useEffect, useRef } from 'react';
import { globalSupply } from '@/data/company';
import './GlobalSupply.css';

// Simplified world map coordinates for SVG (viewBox 0 0 1000 500)
const regions = [
  { name: 'Middle East', x: 600, y: 230 },
  { name: 'Southeast Asia', x: 770, y: 280 },
  { name: 'Africa', x: 510, y: 310 },
  { name: 'Europe', x: 510, y: 160 },
  { name: 'South Asia', x: 680, y: 250 },
];

const indiaPos = { x: 680, y: 265 };

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

  return (
    <section className="global-supply section" id="global-supply" ref={sectionRef}>
      {/* Subtle background map */}
      <div className="global-map-bg">
        <svg viewBox="0 0 1000 500" fill="none">
          {/* Simplified continent outlines */}
          {/* North America */}
          <path d="M120,120 Q150,80 200,90 Q250,70 280,100 Q300,90 310,110 Q280,140 290,170 Q260,200 230,210 Q200,220 180,200 Q150,190 130,160 Z" fill="currentColor" />
          {/* South America */}
          <path d="M230,280 Q260,260 270,280 Q290,310 280,350 Q270,390 250,410 Q230,420 220,400 Q210,360 220,320 Z" fill="currentColor" />
          {/* Europe */}
          <path d="M470,100 Q500,80 530,90 Q560,85 570,100 Q580,120 560,140 Q540,150 520,145 Q500,150 480,140 Q470,125 470,100 Z" fill="currentColor" />
          {/* Africa */}
          <path d="M480,200 Q510,190 540,200 Q560,220 570,260 Q560,310 540,350 Q520,370 500,360 Q480,340 470,300 Q460,250 480,200 Z" fill="currentColor" />
          {/* Asia */}
          <path d="M580,80 Q650,60 720,70 Q780,80 820,100 Q850,120 840,150 Q820,170 790,180 Q750,190 720,200 Q690,210 660,200 Q630,190 610,170 Q590,150 580,120 Z" fill="currentColor" />
          {/* India */}
          <path d="M650,200 Q680,190 700,210 Q710,240 700,270 Q685,290 670,280 Q655,260 650,230 Z" fill="currentColor" />
          {/* Southeast Asia */}
          <path d="M740,220 Q770,210 800,230 Q810,250 790,270 Q760,260 740,250 Z" fill="currentColor" />
          {/* Australia */}
          <path d="M790,360 Q830,340 870,350 Q890,370 880,400 Q860,420 830,420 Q800,410 790,390 Z" fill="currentColor" />
        </svg>
      </div>

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

        {/* SVG Map with connections */}
        <div className="global-map-container reveal delay-2">
          <svg className="global-map-svg" viewBox="0 0 1000 500" fill="none">
            {/* Connection lines from India */}
            {regions.map((region) => (
              <line
                key={region.name}
                className="supply-line"
                x1={indiaPos.x}
                y1={indiaPos.y}
                x2={region.x}
                y2={region.y}
              />
            ))}

            {/* India origin */}
            <circle className="origin-pulse" cx={indiaPos.x} cy={indiaPos.y} r="4" />
            <circle className="origin-pulse" cx={indiaPos.x} cy={indiaPos.y} r="4" style={{ animationDelay: '1s' }} />
            <circle className="origin-dot" cx={indiaPos.x} cy={indiaPos.y} r="5" />

            {/* Region dots and labels */}
            {regions.map((region) => (
              <g key={region.name}>
                <circle className="region-dot" cx={region.x} cy={region.y} r="3" />
                <text
                  className="region-label"
                  x={region.x}
                  y={region.y - 10}
                  textAnchor="middle"
                >
                  {region.name}
                </text>
              </g>
            ))}

            {/* India label */}
            <text
              x={indiaPos.x}
              y={indiaPos.y + 20}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="#D97706"
              letterSpacing="0.1em"
            >
              INDIA
            </text>
          </svg>
        </div>

        <div style={{ textAlign: 'center' }} className="reveal delay-3">
          <span className="origin-badge">
            India <span className="origin-badge-arrow">→</span> Global B2B Supply
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
