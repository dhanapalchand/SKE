'use client';

import { useEffect, useRef } from 'react';
import { contactFields, company } from '@/data/company';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic to be implemented
    alert('Thank you for your enquiry. We will respond shortly.');
  };

  return (
    <section className="contact section" id="contact" ref={sectionRef}>
      <div className="contact-inner">
        <div className="contact-info">
          <p className="contact-label reveal">Contact</p>
          <h2 className="contact-headline reveal delay-1">
            Let&apos;s Discuss Your Activated Carbon Requirement
          </h2>
          <p className="contact-subtext reveal delay-2">
            Send us your required grade, iodine value, CTC, mesh size, quantity,
            packaging and delivery location.
          </p>

          <div className="contact-details reveal delay-3">
            <div className="contact-detail">
              <div className="contact-detail-icon">
                <Phone />
              </div>
              <div className="contact-detail-content">
                <span className="contact-detail-label">Phone / WhatsApp</span>
                <span className="contact-detail-value">{company.phone}</span>
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

        <div className="contact-form-wrapper reveal delay-2">
          <form className="contact-form" onSubmit={handleSubmit}>
            {contactFields.map((field) => (
              <div
                key={field.name}
                className={`form-group ${field.type === 'textarea' ? 'full-width' : ''}`}
              >
                <label className="form-label" htmlFor={field.name}>
                  {field.label}
                  {field.required && ' *'}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    className="form-textarea"
                    id={field.name}
                    name={field.name}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    required={field.required}
                  />
                ) : (
                  <input
                    className="form-input"
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    placeholder={`Enter ${field.label.toLowerCase()}`}
                    required={field.required}
                  />
                )}
              </div>
            ))}

            <div className="contact-form-submit">
              <button type="submit" className="btn btn-primary btn-lg">
                Request a Quote
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
