'use client';

import { useEffect, useRef, useCallback } from 'react';
import { heroContent } from '@/data/company';
import { Check } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  // Carbon particle animation
  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }

    const particles: Particle[] = [];
    const count = Math.min(60, Math.floor(width / 25));

    for (let i = 0; i < count; i++) {
      const isAmber = Math.random() > 0.7;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -Math.random() * 0.5 - 0.1,
        opacity: Math.random() * 0.5 + 0.1,
        color: isAmber ? `rgba(217, 119, 6, ` : `rgba(255, 255, 255, `,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.opacity + ')';
        ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    const cleanup = initParticles();
    return () => cleanup?.();
  }, [initParticles]);

  return (
    <section className="hero" id="home">
      {/* Background */}
      <div className="hero-bg">
        <img
          src="/images/hero-industrial.jpg"
          alt="Coconut shell activated carbon production facility"
          className="hero-bg-image"
          loading="eager"
        />
      </div>
      <div className="hero-overlay" />
      <div className="hero-glow" />

      {/* Particles */}
      <canvas ref={canvasRef} className="hero-particles" />

      {/* Content */}
      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          {heroContent.badge}
        </div>

        <h1 className="hero-headline">
          Premium{' '}
          <span className="hero-headline-accent">Coconut Shell</span>{' '}
          Activated Carbon for Global Industries
        </h1>

        <p className="hero-subtext">{heroContent.subtext}</p>

        <div className="hero-ctas">
          <a href="#contact" className="btn btn-primary btn-lg">
            {heroContent.primaryCta}
          </a>
          <a href="#contact" className="btn btn-outline-light">
            {heroContent.secondaryCta}
          </a>
          <a href="#contact" className="btn btn-outline-light">
            {heroContent.tertiaryCta}
          </a>
        </div>

        <div className="hero-features">
          {heroContent.features.map((feature) => (
            <span key={feature} className="hero-feature-tag">
              <Check />
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
