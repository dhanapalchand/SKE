'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { processStages, qualityParameters } from '@/data/company';
import './ProcessStory.css';

function PorousStructure() {
  const [activePores, setActivePores] = useState<Set<number>>(new Set());

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setActivePores(new Set(Array.from({ length: 48 }, (_, i) => i)));
      return;
    }

    const interval = setInterval(() => {
      setActivePores((prev) => {
        const next = new Set(prev);
        const idx = Math.floor(Math.random() * 48);
        next.add(idx);
        return next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="porous-viz">
      <div className="porous-grid">
        {Array.from({ length: 48 }).map((_, i) => (
          <div
            key={i}
            className={`pore ${activePores.has(i) ? 'active' : ''}`}
            style={{
              animationDelay: `${i * 0.03}s`,
              opacity: activePores.has(i) ? 1 : 0.3,
            }}
          />
        ))}
      </div>
      <span className="porous-label">Microscopic Porous Structure</span>
    </div>
  );
}

function GranuleFall() {
  const granules = useMemo(() =>
    Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: 15 + Math.random() * 70,
      top: 10 + Math.random() * 80,
      size: 6 + Math.random() * 14,
      delay: Math.random() * 2,
    })), []);

  const screens = useMemo(() => [30, 50, 70], []);

  return (
    <div className="granule-container">
      {screens.map((top) => (
        <div key={top} className="screen-line" style={{ top: `${top}%` }} />
      ))}
      {granules.map((g) => (
        <div
          key={g.id}
          className="granule-fall"
          style={{
            left: `${g.left}%`,
            top: `${g.top}%`,
            width: `${g.size}px`,
            height: `${g.size}px`,
          }}
        />
      ))}
      <span className="porous-label">6×12 Mesh Screening</span>
    </div>
  );
}

function StageVisual({ stage }: { stage: typeof processStages[0] }) {
  if (stage.number === '03') {
    return <PorousStructure />;
  }
  if (stage.number === '04') {
    return <GranuleFall />;
  }
  if (stage.number === '05') {
    return (
      <div className="process-stage-visual" style={{ background: 'var(--charcoal)' }}>
        <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', height: '100%', justifyContent: 'center' }}>
          {qualityParameters.map((param) => (
            <div key={param} className="stage-parameter">
              <span className="stage-parameter-dot" />
              {param}
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="process-stage-visual">
      <div style={{
        width: '100%', height: '100%',
        background: stage.colorTheme === 'brown'
          ? 'linear-gradient(135deg, #3D2B1F 0%, #6B4226 50%, #8B5E3C 100%)'
          : stage.colorTheme === 'amber'
          ? 'linear-gradient(135deg, #1C1C1C 0%, #3D2B1F 30%, #D97706 100%)'
          : 'linear-gradient(135deg, #111 0%, #1C1C1C 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: '5rem', fontWeight: 800, opacity: 0.08, color: '#fff' }}>
          {stage.number}
        </span>
      </div>
      <div className="stage-visual-overlay" />
    </div>
  );
}

export default function ProcessStory() {
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -80px 0px' }
    );

    const stages = storyRef.current?.querySelectorAll('.process-stage-text, .process-stage-visual, .porous-viz, .granule-container');
    stages?.forEach((el) => {
      el.classList.add('reveal');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="process-story" id="process" ref={storyRef}>
      <div className="process-intro">
        <p className="process-intro-label">Our Process</p>
        <h2 className="process-intro-headline">
          From Coconut Shell to Activated Carbon
        </h2>
        <p className="process-intro-text">
          Follow the journey of how a natural coconut shell is transformed into
          high-performance activated carbon through controlled industrial processing.
        </p>
      </div>

      <div className="process-stages">
        {processStages.map((stage) => (
          <div
            key={stage.number}
            className="process-stage"
            data-theme={stage.colorTheme}
          >
            <div className="process-stage-bg">
              {stage.colorTheme === 'amber' && <div className="stage-glow" />}
            </div>

            <div className="process-stage-inner">
              <div className="process-stage-text">
                <span className="stage-number">{stage.number}</span>
                <span className="stage-label">
                  <span className="stage-label-line" />
                  {stage.number} / {stage.label}
                </span>
                <h3 className="stage-title">{stage.title}</h3>
                <p className="stage-description">{stage.description}</p>
                {stage.technicalLabel && (
                  <span className="stage-technical-label">
                    {stage.technicalLabel}
                  </span>
                )}
                {stage.number === '05' && (
                  <div className="stage-parameters" style={{ display: 'none' }}>
                    {/* Parameters shown in visual instead */}
                  </div>
                )}
              </div>

              <StageVisual stage={stage} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
