'use client';

import { useState, useEffect, useRef } from 'react';
import { faqItems } from '@/data/company';
import './FAQ.css';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
    <section className="faq section" id="faq" ref={sectionRef}>
      <div className="faq-inner">
        <div className="faq-header">
          <p className="faq-label reveal">FAQ</p>
          <h2 className="faq-headline reveal delay-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="faq-list">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className={`faq-item reveal ${openIndex === i ? 'open' : ''}`}
              style={{ transitionDelay: `${i * 0.05}s` }}
            >
              <button
                className="faq-question"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span>{item.question}</span>
                <span className="faq-icon" />
              </button>
              <div className="faq-answer">
                <p className="faq-answer-text">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
