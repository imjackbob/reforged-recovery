import { Container } from './Section'

// Compact hero for interior pages: a dark forged band with an eyebrow, big
// title, and optional intro. The Home page uses its own richer hero.
export default function PageHero({ eyebrow, title, intro, children }) {
  return (
    <header className="relative overflow-hidden bg-forge-900 text-stone-100">
      {/* Subtle ember glow + forge texture, purely decorative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(60% 80% at 85% 0%, rgba(226,87,30,0.28), transparent 60%), radial-gradient(50% 70% at 0% 100%, rgba(58,66,80,0.5), transparent 60%)',
        }}
      />
      <Container className="relative py-16 sm:py-20 lg:py-24">
        {eyebrow && (
          <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.18em] text-ember-400">
            {eyebrow}
          </p>
        )}
        <h1 className="text-forge-heading text-4xl sm:text-5xl lg:text-6xl text-white">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-300">{intro}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </header>
  )
}
