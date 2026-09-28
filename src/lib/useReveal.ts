import { useEffect, useRef, useState } from 'react';

/**
 * Reveal-on-scroll. Native IntersectionObserver rather than a library — this is
 * the whole scroll-reveal mechanism for the site, and it costs nothing.
 *
 * Once visible, stays visible. We never animate out.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(threshold = 0.12) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No-JS / no-observer fallback: show content rather than hide it.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible, className: `reveal${visible ? ' is-visible' : ''}` };
}
