'use client';

import { useEffect, useRef } from 'react';
import { packagingOptions, packagingTypes } from '@/data/company';
import { Package, Box, Container, Tag } from 'lucide-react';
import './Packaging.css';

const iconMap = [Package, Package, Box, Tag];

export default function Packaging() {
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
    <section className="packaging section" id="packaging" ref={sectionRef}>
      <div className="packaging-inner">
        <div className="packaging-header">
          <p className="packaging-label reveal">Packaging</p>
          <h2 className="packaging-headline reveal delay-1">
            Packaged for Global Delivery
          </h2>
          <p className="packaging-subtext reveal delay-2">
            Multiple packaging options designed for safe transit, easy handling and efficient container loading.
          </p>
        </div>

        <div className="packaging-grid">
          {packagingOptions.map((option, i) => {
            const Icon = iconMap[i] || Package;
            return (
              <div
                key={option.size}
                className="packaging-card reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="packaging-card-visual">
                  <Icon />
                </div>
                <span className="packaging-card-size">{option.size}</span>
                <span className="packaging-card-type">{option.type}</span>
                <p className="packaging-card-desc">{option.description}</p>
              </div>
            );
          })}
        </div>

        <div className="packaging-types">
          {packagingTypes.map((type) => (
            <span key={type} className="packaging-type-tag reveal">
              {type}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
