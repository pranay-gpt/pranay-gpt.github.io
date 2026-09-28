/**
 * Portrait
 *
 * One image, three treatments, done in CSS rather than baked into the file:
 *
 *   1. Duotone — grayscale base, accent blue at ~18% via a blend-mode wash.
 *      Preserves the photo's luminosity and pulls it toward the brand without
 *      the flatness of a baked-in tint.
 *   2. Grain — a single inline SVG fractal-noise, tiled. Costs ~0 bytes of
 *      network and reads as film grain rather than compression noise.
 *   3. Contrast lift — the source sits about a stop under on the face, so the
 *      face gets its own gentle lift rather than the whole frame.
 *
 * The `<picture>` serves 2x and 3x separately and drops 2x on phones, which
 * is where the whole point of a phone-first site is.
 */
export default function Portrait({
  variant = 'hero',
  className = '',
}: {
  variant?: 'hero' | 'chip';
  className?: string;
}) {
  if (variant === 'chip') {
    return (
      <span
        className={`relative inline-block shrink-0 overflow-hidden rounded-full ${className}`}
        style={{ width: 44, height: 44, boxShadow: 'inset 0 0 0 1px var(--color-line)' }}
      >
        <img
          src="./img/portrait@2x.jpg"
          srcSet="./img/portrait@2x.jpg 2x, ./img/portrait@3x.jpg 3x"
          alt=""
          width={44}
          height={44}
          className="h-full w-full object-cover"
          style={{ filter: 'grayscale(1) contrast(1.04) brightness(1.1)' }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: 'var(--color-accent)', opacity: 0.2, mixBlendMode: 'multiply' }}
        />
      </span>
    );
  }

  return (
    <figure
      className={`relative overflow-hidden rounded-[20px] ${className}`}
      style={{ background: 'var(--color-bg-tint)', boxShadow: 'var(--shadow-md)' }}
    >
      <div className="relative">
        <img
          src="./img/hero@2x.jpg"
          srcSet="./img/hero@2x.jpg 2x, ./img/hero@3x.jpg 3x"
          alt="Pranay Gupta"
          width={1140}
          height={1425}
          // 4:5, matching the source exactly so nothing stretches.
          className="block w-full"
          style={{
            aspectRatio: '4 / 5',
            objectFit: 'cover',
            // The source sits about a stop under on the face, so it gets a
            // brightness lift as well as a contrast lift. Without the
            // brightness the duotone reads muddy rather than deliberate.
            filter: 'grayscale(1) contrast(1.06) brightness(1.12)',
          }}
        />

        {/* Accent wash — the duotone half. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, var(--color-accent) 0%, #2a6fd0 100%)',
            opacity: 0.2,
            mixBlendMode: 'multiply',
          }}
        />

        {/* A second, cooler pass at the top so the sky separates from the jacket. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'linear-gradient(160deg, rgba(120,180,255,0.5) 0%, rgba(120,180,255,0) 55%)',
            mixBlendMode: 'soft-light',
          }}
        />

        {/* Film grain. Tiled SVG, no network cost. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: '140px 140px',
          }}
        />

        {/* Bottom scrim, so the chips always clear their background. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{
            height: '58%',
            background: 'linear-gradient(180deg, rgba(8,20,40,0) 0%, rgba(8,20,40,0.72) 100%)',
          }}
        />

        {/* Theme chips */}
        <figcaption className="absolute inset-x-0 bottom-0 p-4">
          <ul className="flex flex-wrap gap-1.5">
            {['Reservoir', 'Production', 'AI & Automation'].map((c) => (
              <li
                key={c}
                className="rounded-full px-2.5 py-1 font-mono text-[10px] leading-none tracking-wide"
                style={{
                  background: 'rgba(255,255,255,0.14)',
                  color: '#fff',
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.26)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                {c}
              </li>
            ))}
          </ul>
        </figcaption>
      </div>
    </figure>
  );
}
