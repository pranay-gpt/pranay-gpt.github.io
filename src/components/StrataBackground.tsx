import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../lib/usePrefersReducedMotion';

/**
 * STRATA BACKGROUND — the core-sample metaphor in one canvas.
 *
 * Soft sediment bands drifting at low parallax amplitude, drawn in the
 * property palette. Deliberately NOT a particle field and NOT stars: this
 * should read as subsurface, because that is the visual vocabulary.
 *
 * Cost: ~2KB of dependency-free 2D canvas. Three layers, drawn once and
 * offset — no per-frame allocation, no filters, capped at 30fps.
 *
 * Accessibility: honours prefers-reduced-motion by rendering a single static
 * frame and stopping. WebGL is irrelevant here; this is plain 2D.
 */
export default function StrataBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Palette, in the same tokens the rest of the site uses.
    const BANDS = [
      { color: 'rgba(76, 194, 255, 0.16)', speed: 0.0045, h: 0.16, phase: 0.0 },
      { color: 'rgba(139, 154, 176, 0.13)', speed: 0.0075, h: 0.13, phase: 1.7 },
      { color: 'rgba(255, 180, 84, 0.085)', speed: 0.0110, h: 0.09, phase: 3.1 },
    ];

    let raf = 0;
    let w = 0;
    let h = 0;
    let t = 0;
    let last = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // cap at 2
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /**
     * Each band is a stack of horizontal strata whose y positions drift with
     * time and whose thickness varies sinusoidally — enough irregularity to
     * look like sediment rather than a gradient.
     */
    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const band of BANDS) {
        const drift = t * band.speed;
        const lines = 14;
        const step = h / lines;

        for (let i = 0; i < lines; i++) {
          const seed = i + band.phase;
          // Irregular spacing, and a slow vertical breathe.
          const wobble = Math.sin(t * 0.0004 + seed * 1.7) * step * 0.35;
          const y = i * step + step * 0.5 + wobble - (drift * h * 0.6) % h;
          // Thickness tapers toward the edges of the band.
          const thickness = band.h * step * (0.5 + 0.5 * Math.sin(seed * 0.9));

          ctx.fillStyle = band.color;
          ctx.fillRect(0, y, w, Math.max(1, thickness));
        }
      }

      // Bottom-anchored core glow: the wellbore getting deeper.
      const grad = ctx.createLinearGradient(0, h * 0.35, 0, h);
      grad.addColorStop(0, 'rgba(76, 194, 255, 0)');
      grad.addColorStop(1, 'rgba(76, 194, 255, 0.10)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, h * 0.35, w, h * 0.65);
    };

    const loop = (time: number) => {
      raf = requestAnimationFrame(loop);
      // Cap at ~30fps: on a phone, the canvas competing with scrolling is the
      // single easiest way to make a site feel slow.
      if (time - last < 33) return;
      last = time;
      t = time;
      draw();
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    if (reduced) {
      // One static frame, then stop. Content parity guaranteed.
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [reduced]);

  return (
    <div className="strata-bg" aria-hidden="true" data-print="hide">
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* Vignette, so text always has contrast against whatever is drifting. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(10,14,20,0) 0%, rgba(10,14,20,0.30) 55%, rgba(10,14,20,0.72) 100%)',
        }}
      />
    </div>
  );
}
