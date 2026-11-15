'use client';

import { useEffect, useRef } from 'react';
import { company } from '@/data/company';
import { Phone, MapPin, MessageCircle } from 'lucide-react';
import './Contact.css';

export default function Contact() {
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
    <section className="contact section" id="contact" ref={sectionRef}>
      <div className="contact-inner">
        <div className="contact-info">
          <p className="contact-label reveal">Contact Us</p>
          <h2 className="contact-headline reveal delay-1">
            Let&apos;s Discuss Your Activated Carbon Requirement
          </h2>
          <p className="contact-subtext reveal delay-2">
            Reach out to us directly for enquiries regarding grades, iodine value, CTC, mesh size, quantity, packaging, and global delivery.
          </p>

          <div className="contact-details reveal delay-3">
            <div className="contact-detail">
              <div className="contact-detail-icon">
                <Phone />
              </div>
              <div className="contact-detail-content">
                <span className="contact-detail-label">Phone / WhatsApp</span>
                <a href={`tel:${company.phone.replace(/\s+/g, '')}`} className="contact-detail-value">
                  {company.phone}
                </a>
              </div>
            </div>

            <div className="contact-detail">
              <div className="contact-detail-icon">
                <MapPin />
              </div>
              <div className="contact-detail-content">
                <span className="contact-detail-label">Location</span>
                <span className="contact-detail-value">{company.location}</span>
              </div>
            </div>
          </div>

          <div className="contact-whatsapp reveal delay-4">
            <a
              href={`https://wa.me/919600319788?text=${encodeURIComponent('Hello, I would like to enquire about coconut shell activated carbon.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <MessageCircle style={{ width: 18, height: 18 }} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
