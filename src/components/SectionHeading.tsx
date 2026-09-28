export default function SectionHeading({
  children,
  as: Tag = 'h3',
}: {
  children: React.ReactNode;
  as?: 'h2' | 'h3' | 'h4';
}) {
  return (
    <Tag
      className="mb-3 text-lg md:text-xl"
      style={{ color: 'var(--color-ink)' }}
    >
      {children}
    </Tag>
  );
}
