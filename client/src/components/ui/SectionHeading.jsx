// Consistent section heading: optional eyebrow label, a display title, and an
// optional lead paragraph. `align` and `onDark` adjust for context.
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  onDark = false,
  as: TitleTag = 'h2',
  className = '',
}) {
  const alignClasses = align === 'center' ? 'text-center mx-auto' : 'text-left'
  return (
    <div className={`max-w-3xl ${alignClasses} ${className}`}>
      {eyebrow && (
        <p
          className={`mb-3 font-display text-sm font-semibold uppercase tracking-[0.18em] ${
            onDark ? 'text-ember-400' : 'text-ember-600'
          }`}
        >
          {eyebrow}
        </p>
      )}
      <TitleTag
        className={`text-forge-heading text-3xl sm:text-4xl lg:text-5xl ${
          onDark ? 'text-white' : 'text-forge-900'
        }`}
      >
        {title}
      </TitleTag>
      {lead && (
        <p className={`mt-5 text-lg leading-relaxed ${onDark ? 'text-stone-300' : 'text-forge-600'}`}>
          {lead}
        </p>
      )}
    </div>
  )
}
