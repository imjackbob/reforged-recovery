import { Link } from 'react-router-dom'

// Site mark + wordmark. Uses the RR crest from the brand logo — the full
// lockup is too detailed to read at nav size. The crest artwork has a baked-in
// dark forge background, so it's framed as a rounded tile that reads as
// intentional on both the light header and the dark footer.
export default function Logo({ onDark = false, className = '' }) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Reforged Recovery Inc. — home"
    >
      <img
        src="/brand/reforged-emblem.jpg"
        alt=""
        aria-hidden="true"
        width={36}
        height={36}
        className="h-9 w-9 flex-none rounded-md object-cover ring-1 ring-white/10"
      />
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-lg font-bold uppercase tracking-wide ${
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
