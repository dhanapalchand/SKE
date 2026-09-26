'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { navLinks, company } from '@/data/company';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="navbar-inner">
        <a href="#home" className="navbar-logo" onClick={(e) => handleLinkClick(e, '#home')}>
          <Image
            src="/ske-logo.png"
            alt="SKE — Sri Krishi Enterprises logo"
            width={64}
            height={48}
            className="navbar-logo-img"
            priority
          />
          <div className="navbar-logo-text">
            <span className="navbar-logo-name">{company.name}</span>
            <span className="navbar-logo-sub">Activated Carbon</span>
          </div>
        </a>

        <div className="navbar-links">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="navbar-link"
              onClick={(e) => handleLinkClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="navbar-right">
          <LanguageSwitcher />
          <div className="navbar-cta">
            <a
              href="#contact"
              className="btn btn-primary btn-sm"
              onClick={(e) => handleLinkClick(e, '#contact')}
            >
              Request a Quote
            </a>
          </div>
        </div>

        <button
          className={`navbar-hamburger ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`navbar-mobile ${mobileOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="navbar-mobile-link"
            onClick={(e) => handleLinkClick(e, link.href)}
          >
            {link.label}
          </a>
        ))}
        <div className="navbar-mobile-cta">
          <div className="navbar-mobile-lang">
            <LanguageSwitcher />
          </div>
          <a
            href="#contact"
            className="btn btn-primary btn-lg"
            style={{ width: '100%' }}
            onClick={(e) => handleLinkClick(e, '#contact')}
          >
            Request a Quote
          </a>
        </div>
      </div>
    </nav>
  );
}
