'use client';

import { company, footerLinks } from '@/data/company';
import { Phone, MapPin } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-main">
          <div className="footer-brand">
            <h3 className="footer-brand-name">{company.name}</h3>
            <p className="footer-brand-tagline">{company.tagline}</p>
            <span className="footer-brand-badge">Activated Carbon</span>
          </div>

          <div className="footer-links">
            <span className="footer-links-title">Quick Links</span>
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="footer-link"
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="footer-contact">
            <span className="footer-contact-title">Contact</span>
            <div className="footer-contact-item">
              <Phone />
              <span>{company.phone}</span>
            </div>
            <div className="footer-contact-item">
              <MapPin />
              <span>{company.location}</span>
            </div>
            <div className="footer-cta">
              <a
                href="#contact"
                className="btn btn-primary btn-sm"
                onClick={(e) => handleLinkClick(e, '#contact')}
              >
                Request a Quote
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <p className="footer-made">{company.location}</p>
        </div>
      </div>
    </footer>
  );
}
