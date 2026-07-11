import { Link } from 'react-router-dom'

// Wordmark + anvil mark. `onDark` swaps the wordmark color for dark backgrounds.
export default function Logo({ onDark = false, className = '' }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Reforged Recovery Inc. — home"
    >
      <svg viewBox="0 0 64 64" className="h-9 w-9 flex-none" aria-hidden="true">
        <rect width="64" height="64" rx="12" fill="#14171c" />
        <path
          d="M13 24 h19 c1.1 0 1.7 .8 1.8 1.8 C34 29.5 37.5 32 43 32 h7 v5 h-6 c-6.2 0-9.6-2.2-11.2-4.8 V35 h4.2 l-3.2 6.4 H21.4 l-3.2-6.4 h4.2 v-6 H13 z"
          fill="#e2571e"
        />
        <rect x="20" y="46" width="24" height="4" rx="1.5" fill="#a8a096" />
      </svg>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-lg font-700 font-bold uppercase tracking-wide ${
            onDark ? 'text-white' : 'text-forge-900'
          }`}
        >
          Reforged
        </span>
        <span
          className={`font-display text-[0.7rem] font-semibold uppercase tracking-[0.22em] ${
            onDark ? 'text-ember-400' : 'text-ember-700'
          }`}
        >
          Recovery Inc.
        </span>
      </span>
    </Link>
  )
}
