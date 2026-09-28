/**
 * Portrait
 *
 * The colour work is BAKED into the file, not done here.
 *
 * `process_portrait.py` does selective colourisation: it keys on hue distance
 * from the brand blue and keeps real saturation only where the photo already
 * carries that hue — so the shirt stays blue and everything else drops to
 * greyscale, with a smoothstep falloff so there is no hard edge. It also lifts
 * the face, which the forest canopy leaves about a stop under, using a gamma
 * curve that touches shadows without blowing the already-bright background.
 *
 * Baking it means: no SVG colour-matrix chain to tune, no filter render cost,
 * and the result could be inspected before shipping. Re-run the script if the
 * source photo or the brand blue changes.
 *
 * What stays in CSS is the grain — a tiled SVG fractal noise, which is free at
 * runtime and needs no image file.
 *
 * The `<picture>`/srcset serves 2x and 3x separately and a phone only ever
 * fetches the small square, which is the point of a phone-first site.
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
        style={{ width: 88, height: 88, boxShadow: 'inset 0 0 0 1px var(--color-line)' }}
      >
        <img
          src="./img/portrait@2x.jpg"
          srcSet="./img/portrait@2x.jpg 2x, ./img/portrait@3x.jpg 3x"
          alt=""
          width={88}
          height={88}
          className="h-full w-full object-cover"
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
          style={{ aspectRatio: '4 / 5', objectFit: 'cover' }}
        />

        {/* A whisper of the theme blue over everything, so the greys sit in the
            palette rather than beside it. Kept very low — the shirt is the
            only thing carrying real colour, and this must not compete. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, var(--color-accent) 0%, #2a6fd0 100%)',
            opacity: 0.07,
            mixBlendMode: 'multiply',
          }}
        />

        {/* Film grain. Tiled SVG, no network cost. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.055] mix-blend-overlay"
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
            height: '52%',
            background: 'linear-gradient(180deg, rgba(8,20,40,0) 0%, rgba(8,20,40,0.74) 100%)',
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
