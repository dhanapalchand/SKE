'use client';

import { useEffect, useRef } from 'react';

/**
 * Hook that triggers a "revealed" class on elements when they scroll into view.
 * Uses IntersectionObserver for performant scroll detection.
 */
export function useScrollReveal(threshold = 0.15) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      // Immediately reveal all elements
      const elements = container.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
      elements.forEach((el) => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = container.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);

  return containerRef;
}

/**
 * Hook to track the scroll progress of a section (0 to 1).
 * Useful for scroll-linked animations.
 */
export function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      const start = rect.top - viewHeight;
      const end = rect.bottom;
      const total = end - start;
      const current = -start;
      progressRef.current = Math.max(0, Math.min(1, current / total));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { ref, progressRef };
}
