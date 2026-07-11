import Icon from './Icon'

// A checkmark list, used across Programs / Anvils / Faith pages for the many
// "feature list" layouts in the brief. `columns` lays items out in a grid.
export default function FeatureList({ items, columns = 1, onDark = false }) {
  const gridClass =
    columns === 2 ? 'sm:grid-cols-2' : columns === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : ''
  return (
    <ul className={`grid gap-x-8 gap-y-3 ${gridClass}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span
            className={`mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full ${
              onDark ? 'bg-ember-500/20 text-ember-400' : 'bg-ember-600/10 text-ember-700'
            }`}
          >
            <Icon name="check" className="h-4 w-4" />
          </span>
          <span className={onDark ? 'text-stone-200' : 'text-forge-700'}>{item}</span>
        </li>
      ))}
    </ul>
  )
}
