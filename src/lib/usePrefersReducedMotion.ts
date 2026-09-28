import { useEffect, useState } from 'react';

/**
 * Honours prefers-reduced-motion.
 *
 * This is a real accessibility signal, not a nicety: the site must reach full
 * content parity with animation off, and the 2D canvas must stop entirely.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
