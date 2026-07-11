import Seo from '../components/Seo'
import PageHero from '../components/ui/PageHero'
import { Section } from '../components/ui/Section'
import Icon from '../components/ui/Icon'
import FeatureList from '../components/ui/FeatureList'
import PullQuote from '../components/ui/PullQuote'
import Button from '../components/ui/Button'
import { PROGRAMS } from '../data/programs'

export default function Programs() {
  return (
    <>
      <Seo
        title="Programs & Services"
        description="Recovery support services, life skills development, family restoration, and resource assistance from Reforged Recovery Inc."
        path="/programs"
      />
      <PageHero
        eyebrow="Programs & Services"
        title="Support for every step"
        intro="Lasting recovery is built through connection, skills, and belief in what comes next. Explore the programs that make it possible."
      />

      {PROGRAMS.map((program, i) => (
        <Section key={program.id} id={program.id} tone={i % 2 === 0 ? 'white' : 'paper'}>
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
            <div>
              <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-ember-600/10 text-ember-700">
                <Icon name={program.icon} className="h-8 w-8" />
              </span>
              <h2 className="text-forge-heading text-2xl font-bold text-forge-900 sm:text-3xl">
                {program.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-forge-600">{program.intro}</p>
              {program.pullQuote && (
                <div className="mt-8">
                  <PullQuote>{program.pullQuote}</PullQuote>
                </div>
              )}
            </div>
            <div className="lg:pt-2">
              <h3 className="mb-5 font-display text-sm font-semibold uppercase tracking-widest text-ember-700">
                What we offer
              </h3>
              <FeatureList items={program.features} columns={2} />
            </div>
          </div>
        </Section>
      ))}

      <Section tone="dark">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-forge-heading text-3xl font-bold text-white">
            Not sure where to start?
          </h2>
          <p className="max-w-xl text-lg text-stone-300">
            Reach out and we'll help you find the right support for your situation.
          </p>
          <Button to="/get-help" size="lg">
            Get Help <Icon name="arrowRight" className="h-5 w-5" />
          </Button>
        </div>
      </Section>
    </>
  )
}
