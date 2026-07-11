// Brand pull-quote block. Used for the emotional anchor lines in the brief
// ("People can be Reforged.", "It gave me purpose.", etc.).
export default function PullQuote({ children, cite, onDark = false }) {
  return (
    <figure className={`relative border-l-4 border-ember-500 pl-6 sm:pl-8 ${onDark ? '' : ''}`}>
      <blockquote
        className={`text-forge-heading text-2xl sm:text-3xl font-medium leading-snug ${
          onDark ? 'text-white' : 'text-forge-900'
        }`}
      >
        “{children}”
      </blockquote>
      {cite && (
        <figcaption className={`mt-4 text-sm font-semibold uppercase tracking-wide ${onDark ? 'text-ember-400' : 'text-ember-700'}`}>
          — {cite}
        </figcaption>
      )}
    </figure>
  )
}
