'use client';

import { useEffect, useRef } from 'react';
import { whyChooseFeatures } from '@/data/company';
import './WhyChoose.css';

export default function WhyChoose() {
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
    <section className="why-choose section" ref={sectionRef}>
      <div className="why-choose-inner">
        <div className="why-choose-header">
          <p className="why-choose-label reveal">Why Choose SKE</p>
          <h2 className="why-choose-headline reveal delay-1">
            Built for Reliable B2B Supply
          </h2>
        </div>

        <div className="why-choose-grid">
          {whyChooseFeatures.map((feature, i) => (
            <div
              key={feature.title}
              className="why-feature reveal"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <span className="why-feature-number">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="why-feature-line" />
              <h3 className="why-feature-title">{feature.title}</h3>
              <p className="why-feature-desc">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
