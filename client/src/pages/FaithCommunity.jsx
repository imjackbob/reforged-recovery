import Seo from '../components/Seo'
import PageHero from '../components/ui/PageHero'
import { Section } from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'
import FeatureList from '../components/ui/FeatureList'
import Icon from '../components/ui/Icon'

const OUTREACH = [
  'Outreach events',
  'Community service projects',
  'Resource connections',
  'Recovery awareness events',
  'Family support opportunities',
]

export default function FaithCommunity() {
  return (
    <>
      <Seo
        title="Faith, Hope & Community"
        description="We believe in the role of faith in healing and restoration, and in the power of community outreach to strengthen recovery."
        path="/faith-community"
      />
      <PageHero
        eyebrow="Faith, Hope & Community"
        title="Restored through faith and connection"
        intro="Recovery is deeply personal — and it is never meant to be walked alone. We believe faith, hope, and community are woven together in the work of rebuilding a life."
      />

      {/* Faith Foundation */}
      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-ember-600/10 text-ember-700">
              <Icon name="faith" className="h-8 w-8" />
            </span>
            <SectionHeading eyebrow="Faith Foundation" title="Hope that runs deeper" />
          </div>
          <div className="space-y-4 text-lg leading-relaxed text-forge-600 lg:pt-2">
            <p>
              At the heart of Reforged Recovery is a belief in God's role in healing, restoration,
              and purpose. We've seen that when hope is rooted in something greater than ourselves,
              it can carry people through the hardest days of recovery.
            </p>
            <p>
              We honor each person's journey and meet people where they are. As we grow, we plan to
              partner with local churches and faith organizations to surround individuals and
              families with a community of encouragement, prayer, and practical support.
            </p>
          </div>
        </div>
      </Section>

      {/* Community Outreach */}
      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div>
            <span className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-ember-600/10 text-ember-700">
              <Icon name="community" className="h-8 w-8" />
            </span>
            <SectionHeading eyebrow="Community Outreach" title="Showing up for our community" />
            <p className="mt-4 text-lg leading-relaxed text-forge-600">
              Recovery grows stronger when it's connected to community. We create opportunities to
              serve, to connect people with resources, and to raise awareness about recovery.
            </p>
          </div>
          <div className="lg:pt-2">
            <h3 className="mb-5 font-display text-sm font-semibold uppercase tracking-widest text-ember-700">
              How we show up
            </h3>
            <FeatureList items={OUTREACH} columns={2} />
          </div>
        </div>
      </Section>
    </>
  )
}
