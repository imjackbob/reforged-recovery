// Layout primitives for consistent vertical rhythm and max-width.

// Centered content container.
export function Container({ children, className = '', size = 'default' }) {
  const max = size === 'narrow' ? 'max-w-3xl' : size === 'wide' ? 'max-w-7xl' : 'max-w-6xl'
  return <div className={`mx-auto w-full ${max} px-5 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}

// A full-width vertical section with a background tone. `tone` options:
//   paper (default), white, light, dark, ember
const TONES = {
  paper: 'bg-stone-50 text-forge-900',
  white: 'bg-white text-forge-900',
  light: 'bg-stone-100 text-forge-900',
  dark: 'bg-forge-900 text-stone-100',
  darker: 'bg-forge-950 text-stone-100',
  ember: 'bg-ember-600 text-white',
}

export function Section({
  children,
  tone = 'paper',
  className = '',
  containerSize = 'default',
  as: Tag = 'section',
  id,
}) {
  return (
    <Tag id={id} className={`${TONES[tone] ?? TONES.paper} py-16 sm:py-20 lg:py-24 ${className}`}>
      <Container size={containerSize}>{children}</Container>
    </Tag>
  )
}
