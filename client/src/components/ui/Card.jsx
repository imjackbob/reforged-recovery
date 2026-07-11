import { Link } from 'react-router-dom'
import Icon from './Icon'

// Generic surface card.
export function Card({ children, className = '', as: Tag = 'div' }) {
  return (
    <Tag
      className={`rounded-xl border border-stone-200 bg-white p-6 shadow-sm ${className}`}
    >
      {children}
    </Tag>
  )
}

// Feature card with an icon, title, blurb, and optional link. Used in the Home
// "Quick Access Programs" grid. When `to` is set the whole card is clickable.
export function FeatureCard({ icon, title, blurb, to }) {
  const inner = (
    <>
      <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-ember-600/10 text-ember-700">
        <Icon name={icon} className="h-7 w-7" />
      </span>
      <h3 className="text-xl font-semibold text-forge-900">{title}</h3>
      <p className="mt-2 text-forge-600">{blurb}</p>
      {to && (
        <span className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-semibold uppercase tracking-wide text-ember-700 group-hover:gap-2.5 transition-all">
          Learn more <Icon name="arrowRight" className="h-4 w-4" />
        </span>
      )}
    </>
  )

  const base =
    'group flex flex-col rounded-xl border border-stone-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md'

  if (to) {
    return (
      <Link
        to={to}
        className={`${base} focus-visible:ring-2 focus-visible:ring-ember-500`}
      >
        {inner}
      </Link>
    )
  }
  return <div className={base}>{inner}</div>
}
