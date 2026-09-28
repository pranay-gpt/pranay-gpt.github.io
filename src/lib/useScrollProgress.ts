import { useEffect, useState } from 'react';

/**
 * Live scroll position as a fraction of total scrollable height, plus the
 * current depth reading in metres for the core-sample gauge.
 *
 * requestAnimationFrame-throttled so we never do layout work per scroll event.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [depth, setDepth] = useState(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setProgress(ratio);
      setDepth(Math.round(ratio * 2600));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return { progress, depth };
}
