'use client';

import { useEffect, useRef } from 'react';
import { productSpecs, productGrades } from '@/data/company';
import './ProductShowcase.css';

export default function ProductShowcase() {
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
    <section className="product-showcase section" id="products" ref={sectionRef}>
      <div className="product-transition">
        <p className="product-transition-label reveal">Product</p>
        <h2 className="reveal delay-1">
          Activated Carbon Engineered for Performance
        </h2>
        <p className="reveal delay-2">{productSpecs.description}</p>
      </div>

      <div className="product-detail">
        <div className="product-specs-card reveal">
          <h3 className="product-specs-title">{productSpecs.name}</h3>
          <div className="specs-grid">
            {productSpecs.specifications.map((spec) => (
              <div key={spec.label} className="spec-row">
                <span className="spec-label">{spec.label}</span>
                <span className="spec-value">{spec.value}</span>
              </div>
            ))}
          </div>
          <div className="product-note">{productSpecs.note}</div>
        </div>

        <div className="grade-comparison reveal delay-1">
          <div className="grade-header">
            <h3>Product Grades</h3>
            <p>Available iodine value grades for different applications</p>
          </div>
          <table className="grade-table">
            <thead>
              <tr>
                <th>Grade</th>
                <th>Iodine Value</th>
                <th>CTC</th>
                <th>Typical Application</th>
              </tr>
            </thead>
            <tbody>
              {productGrades.map((grade) => (
                <tr key={grade.grade}>
                  <td>
                    <span className="grade-name">{grade.grade}</span>
                  </td>
                  <td>
                    <span className="grade-value">{grade.iodineValue}</span>
                  </td>
                  <td>
                    <span className="grade-value">{grade.ctcValue}</span>
                  </td>
                  <td>{grade.typicalApplication}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
