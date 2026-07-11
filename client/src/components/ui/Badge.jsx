// Small status pill. Used for "Coming Soon" markers on the Anvils programs.
const TONES = {
  ember: 'bg-ember-600/12 text-ember-700 ring-ember-600/25',
  steel: 'bg-steel-500/12 text-steel-700 ring-steel-500/25',
  soon: 'bg-ember-500 text-white ring-transparent',
}

export default function Badge({ children, tone = 'ember', className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ring-1 ring-inset ${
        TONES[tone] ?? TONES.ember
      } ${className}`}
    >
      {children}
    </span>
  )
}
