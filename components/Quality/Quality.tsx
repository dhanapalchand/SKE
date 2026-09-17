'use client';

import { useEffect, useRef } from 'react';
import { qualityParameters, qualityDocuments } from '@/data/company';
import { FileText } from 'lucide-react';
import './Quality.css';

const gaugeData = qualityParameters.map((param, i) => ({
  label: param,
  // Visual representation — target values are aesthetic, not live data
  target: 283 - (180 + Math.random() * 80),
}));

export default function Quality() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate gauges when in view
            const gauges = entry.target.querySelectorAll('.gauge-fill');
            gauges.forEach((g) => g.classList.add('animated'));

            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal, .quality-gauges');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="quality section" id="quality" ref={sectionRef}>
      <div className="quality-inner">
        <div className="quality-header">
          <p className="quality-label reveal">Quality</p>
          <h2 className="quality-headline reveal delay-1">
            Quality You Can Specify
          </h2>
        </div>

        <div className="quality-gauges">
          {gaugeData.map((gauge) => (
            <div key={gauge.label} className="quality-gauge reveal">
              <svg className="gauge-svg" viewBox="0 0 100 100">
                <circle className="gauge-track" cx="50" cy="50" r="45" />
                <circle
                  className="gauge-fill"
                  cx="50"
                  cy="50"
                  r="45"
                  style={{ '--gauge-target': gauge.target } as React.CSSProperties}
                />
              </svg>
              <span className="gauge-label">{gauge.label}</span>
            </div>
          ))}
        </div>

        <div className="quality-docs">
          {qualityDocuments.map((doc) => (
            <div key={doc} className="quality-doc reveal">
              <div className="quality-doc-icon">
                <FileText />
              </div>
              <span className="quality-doc-name">{doc}</span>
            </div>
          ))}
        </div>

        <div className="quality-cta reveal">
          <a href="#contact" className="btn btn-primary btn-lg">
            Request Product Specifications
          </a>
        </div>
      </div>
    </section>
  );
}
