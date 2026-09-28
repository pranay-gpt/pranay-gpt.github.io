import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion';

/**
 * Count-up on scroll-into-view. 800ms, once, never loops.
 * With reduced motion the final value renders immediately.
 */
export default function CountUp({
  value,
  prefix = '',
  suffix = '',
  duration = 800,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  // Start at the real value, not 0. If the tile is below the fold on first
  // paint, an observer that fires late would otherwise show a reader a
  // half-second of "USD 0k+" while scrolling past. The count-up is a
  // refinement, not a prerequisite for the number being correct.
  const [display, setDisplay] = useState(value);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced || typeof IntersectionObserver === 'undefined') {
      setDisplay(value);
      return;
    }

    let raf = 0;
    let running = false;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || running) continue;
          running = true;
          observer.unobserve(entry.target);

          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            // easeOutExpo — fast start, gentle settle.
            const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
            setDisplay(Math.round(value * eased));
            if (t < 1) {
              raf = requestAnimationFrame(tick);
            } else {
              // Land exactly on the real value, never on a rounded remainder.
              setDisplay(value);
            }
          };
          // Kick off from 0 only now that the tile is definitely on screen,
          // so the "wrong" value is never visible outside the viewport.
          setDisplay(0);
          raf = requestAnimationFrame(tick);
        }
      },
      // Fire as soon as the tile is meaningfully on screen, and well before it
      // reaches the middle. A 0.4 threshold left tiles sitting at 0 for a
      // while, which on first paint reads as a broken number rather than an
      // animation about to start.
      { threshold: 0.15, rootMargin: '0px 0px 12% 0px' },
    );

    observer.observe(el);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      observer.disconnect();
      // `running` is local to this effect run rather than a ref, so StrictMode's
      // mount/unmount/mount cycle re-arms the animation instead of leaving the
      // tile frozen at 0. The ref version silently broke every count-up.
    };
  }, [value, duration, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
