'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { applications } from '@/data/company';
import { Droplets, GlassWater, Factory, Wind, UtensilsCrossed, FlaskConical, Gem, Flame, Beaker, Droplet, Leaf, Pipette, Sparkles } from 'lucide-react';
import './Applications.css';

const iconMap = [Droplets, GlassWater, Beaker, FlaskConical, Flame, Droplet, Wind, Factory, Gem, Droplets, Factory, Leaf, Sparkles];

const staticParticles = [
  { id: 0, left: 25, top: 35, driftX: -20, driftY: -100, delay: 0 },
  { id: 1, left: 65, top: 50, driftX: 30, driftY: -80, delay: 0.4 },
  { id: 2, left: 45, top: 65, driftX: -15, driftY: -110, delay: 0.8 },
  { id: 3, left: 80, top: 30, driftX: 25, driftY: -95, delay: 1.2 },
  { id: 4, left: 20, top: 75, driftX: 15, driftY: -105, delay: 1.6 },
];

export default function Applications() {
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
                  {staticParticles.map((p) => (
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
                <div className="application-card-image">
                  <Image
                    src={app.image}
                    alt={app.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                  <span className="application-card-number">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="application-card-content">
                  <div className="application-card-icon">
                    <Icon />
                  </div>
                  <h3 className="application-card-title">{app.title}</h3>
                  <p className="application-card-desc">{app.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
