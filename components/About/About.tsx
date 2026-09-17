'use client';

import { useEffect, useRef } from 'react';
import { aboutContent, company } from '@/data/company';
import './About.css';

export default function About() {
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
    <section className="about section" id="about" ref={sectionRef}>
      <div className="about-inner">
        <div className="about-main">
          <p className="about-label reveal">About</p>
          <h2 className="about-headline reveal delay-1">{aboutContent.headline}</h2>
          <p className="about-role reveal delay-2">{company.role}</p>

          <div className="about-points reveal delay-3">
            {aboutContent.description.map((point) => (
              <div key={point} className="about-point">
                {point}
              </div>
            ))}
          </div>
        </div>

        <div className="about-mv">
          <div className="about-mv-card reveal delay-2">
            <p className="about-mv-label">Our Mission</p>
            <p className="about-mv-text">{aboutContent.mission}</p>
          </div>

          <div className="about-mv-card reveal delay-3">
            <p className="about-mv-label">Our Vision</p>
            <p className="about-mv-text">{aboutContent.vision}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
