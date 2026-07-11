import Seo from '../components/Seo'
import PageHero from '../components/ui/PageHero'
import { Section } from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'
import FeatureList from '../components/ui/FeatureList'
import EpisodeList from '../components/EpisodeList'
import { EPISODES } from '../data/episodes'

const HIGHLIGHTS = [
  'Weekly episodes',
  'Recovery testimonies',
  'Guest stories',
  'Community conversations',
  'Video and audio content',
]

export default function Podcast() {
  return (
    <>
      <Seo
        title="Reforged Podcast"
        description="The Reforged Podcast shares stories of hope, recovery testimonies, and community conversations. Your story could be the hope someone else needs."
        path="/podcast"
      />
      <PageHero
        eyebrow="Reforged Podcast"
        title="Share stories that inspire hope"
        intro="Your story could be the hope someone else needs."
      />

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="Episodes" title="Listen & be encouraged" />
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-forge-600">
              Real conversations about recovery, hope, and rebuilding. New episodes are on the way —
              subscribe on your favorite platform so you never miss one.
            </p>
            <div className="mt-8">
              <EpisodeList episodes={EPISODES} />
            </div>
          </div>

          <aside className="lg:pt-2">
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6 sm:p-8">
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-ember-700">
                What to expect
              </h3>
              <div className="mt-5">
                <FeatureList items={HIGHLIGHTS} />
              </div>
              <p className="mt-6 border-t border-stone-200 pt-6 text-sm text-stone-500">
                Have a story to share? We'd love to hear from you — reach out through our{' '}
                <a href="/contact" className="font-semibold text-ember-700 hover:text-ember-800">
                  contact page
                </a>
                .
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  )
}
