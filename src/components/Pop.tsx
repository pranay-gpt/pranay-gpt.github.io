import { useEffect, useRef, useState, type ReactNode } from 'react';
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion';

/**
 * POP — the card that rises and settles as it enters the viewport.
 *
 * One shot, transform + opacity only so it stays on the compositor, and
 * staggered by `data-delay` so a grid arrives as a sequence rather than a
 * block. Under reduced motion the content is simply present from the start.
 */
export default function Pop({
  children,
  delay = 0,
  as: Tag = 'div',
  className = '',
}: {
  children: ReactNode;
  /** 0–5. Maps to the staggered animation-delay in index.css. */
  delay?: number;
  as?: 'div' | 'article' | 'li' | 'section';
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <Tag
      // @ts-expect-error — generic element ref across the union of tag names
      ref={ref}
      className={`pop${inView ? ' is-in' : ''}${className ? ` ${className}` : ''}`}
      data-delay={delay || undefined}
    >
      {children}
    </Tag>
  );
}
