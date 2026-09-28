/**
 * A small pill. Used for tech tags, proof badges and skill chips.
 *
 * Kept deliberately plain: no shadow, no border, no gradient. The plan's
 * discipline is one background, two surfaces, one accent — and a chip that
 * tries too hard is the first place that discipline breaks.
 */
export default function Tag({
  children,
  tone = 'default',
  highlight = false,
}: {
  children: React.ReactNode;
  tone?: 'default' | 'muted' | 'accent';
  highlight?: boolean;
}) {
  const base = 'inline-flex items-center rounded-full px-2.5 py-1 font-mono text-[11px] leading-none';

  if (highlight || tone === 'accent') {
    return (
      <span
        className={base}
        style={{
          background: 'rgba(76, 194, 255, 0.10)',
          color: 'var(--color-accent)',
          boxShadow: 'inset 0 0 0 1px rgba(76, 194, 255, 0.22)',
        }}
      >
        {children}
      </span>
    );
  }

  if (tone === 'muted') {
    return (
      <span className={base} style={{ background: 'var(--color-surface)', color: 'var(--color-muted)' }}>
        {children}
      </span>
    );
  }

  return (
    <span className={base} style={{ background: 'var(--color-surface-2)', color: 'var(--color-ink)' }}>
      {children}
    </span>
  );
}
