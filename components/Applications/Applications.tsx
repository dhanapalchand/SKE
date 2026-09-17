'use client';

import { useEffect, useRef, useMemo } from 'react';
import { applications } from '@/data/company';
import { Droplets, GlassWater, Factory, Wind, UtensilsCrossed, FlaskConical, Gem } from 'lucide-react';
import './Applications.css';

const iconMap = [Droplets, GlassWater, Factory, Wind, UtensilsCrossed, FlaskConical, Gem];

export default function Applications() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const particles = useMemo(() =>
    Array.from({ length: 5 }).map((_, i) => ({
      id: i,
      left: 10 + Math.random() * 80,
      top: 20 + Math.random() * 60,
      driftX: (Math.random() - 0.5) * 80,
      driftY: -60 - Math.random() * 80,
      delay: i * 0.4,
    })), []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="applications section" id="applications" ref={sectionRef}>
      <div className="applications-inner">
        <div className="applications-header">
          <p className="applications-label reveal">Applications</p>
          <h2 className="applications-headline reveal delay-1">
            Engineered for Critical Applications
          </h2>
          <p className="applications-subtext reveal delay-2">
            Our coconut shell activated carbon serves diverse industries requiring high-performance adsorption solutions.
          </p>
        </div>

        <div className="applications-grid">
          {applications.map((app, i) => {
            const Icon = iconMap[i] || Droplets;
            return (
              <div key={app.title} className="application-card reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="application-card-particles">
                  {particles.map((p) => (
                    <div
                      key={p.id}
                      className="app-particle"
                      style={{
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                        '--drift-x': `${p.driftX}px`,
                        '--drift-y': `${p.driftY}px`,
                        animationDelay: `${p.delay}s`,
                      } as React.CSSProperties}
                    />
                  ))}
                </div>
                <div className="application-card-icon">
                  <Icon />
                </div>
                <span className="application-card-number">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="application-card-title">{app.title}</h3>
                <p className="application-card-desc">{app.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
