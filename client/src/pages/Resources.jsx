import { useState } from 'react'
import Seo from '../components/Seo'
import PageHero from '../components/ui/PageHero'
import { Section } from '../components/ui/Section'
import Icon from '../components/ui/Icon'
import { RESOURCES, RESOURCE_CATEGORIES } from '../data/resources'

const ALL = { id: 'all', label: 'All' }
const TABS = [ALL, ...RESOURCE_CATEGORIES]

export default function Resources() {
  const [active, setActive] = useState('all')

  const visible =
    active === 'all' ? RESOURCES : RESOURCES.filter((r) => r.category === active)

  return (
    <>
      <Seo
        title="Resources"
        description="Recovery, family, mental health, community, and educational resources curated by Reforged Recovery Inc."
        path="/resources"
      />
      <PageHero
        eyebrow="Resources"
        title="Help, gathered in one place"
        intro="A growing collection of trusted resources for recovery and everyday life. Filter by category to find what you need."
      />

      <Section tone="white">
        {/* Category tabs */}
        <div
          role="tablist"
          aria-label="Resource categories"
          className="flex flex-wrap gap-2"
        >
          {TABS.map((tab) => {
            const isActive = active === tab.id
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(tab.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-ember-600 text-white'
                    : 'bg-stone-100 text-forge-700 hover:bg-stone-200'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Resource grid */}
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((r) => (
            <li key={r.title}>
              <a
                href={r.href}
                target={r.external ? '_blank' : undefined}
                rel={r.external ? 'noopener noreferrer' : undefined}
                className={`group flex h-full flex-col rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md focus-visible:ring-2 focus-visible:ring-ember-500 ${
                  r.urgent ? 'border-ember-600/40' : 'border-stone-200'
                }`}
              >
                {r.urgent && (
                  <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-ember-600/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-ember-700">
                    <Icon name="phone" className="h-3.5 w-3.5" /> Immediate help
                  </span>
                )}
                <h3 className="text-lg font-semibold text-forge-900">{r.title}</h3>
                <p className="mt-2 flex-1 text-forge-600">{r.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-display text-sm font-semibold uppercase tracking-wide text-ember-700 group-hover:gap-2.5 transition-all">
                  {r.linkLabel}
                  <Icon name="arrowRight" className="h-4 w-4" />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-8 rounded-lg bg-stone-100 px-4 py-3 text-sm text-stone-600">
          This list is a starting point and will keep growing. Some links are placeholders the team
          will update with local resources. If you need help now, call or text{' '}
          <a href="tel:988" className="font-semibold text-ember-700 hover:text-ember-800">
            988
          </a>
          .
        </p>
      </Section>
    </>
  )
}
