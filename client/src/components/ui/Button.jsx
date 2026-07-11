import { Link } from 'react-router-dom'

// Button primitive with brand variants. Renders as:
//   - <Link>   when `to` is passed (internal route)
//   - <a>      when `href` is passed (external link)
//   - <button> otherwise
//
// Variants use AA-verified color pairings:
//   primary   — white text on ember-600 (4.93:1)
//   secondary — white text on forge-800
//   outline   — forge-700 text + border on transparent
//   ghost     — subtle, for tertiary actions
//   onDark    — for use over dark hero sections (stone text, ember hover)

const VARIANTS = {
  primary:
    'bg-ember-600 text-white hover:bg-ember-700 focus-visible:bg-ember-700 shadow-sm',
  secondary: 'bg-forge-800 text-white hover:bg-forge-700',
  outline:
    'border-2 border-forge-700 text-forge-800 hover:bg-forge-800 hover:text-white',
  outlineOnDark:
    'border-2 border-stone-300 text-stone-100 hover:bg-white hover:text-forge-900',
  ghost: 'text-ember-700 hover:bg-ember-600/10',
}

const SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  ...rest
}) {
  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-md font-semibold',
    'font-display uppercase tracking-wide transition-colors duration-150',
    'disabled:opacity-60 disabled:cursor-not-allowed',
    VARIANTS[variant] ?? VARIANTS.primary,
    SIZES[size] ?? SIZES.md,
    className,
  ].join(' ')

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    )
  }
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}
