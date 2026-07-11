import Seo from '../components/Seo'
import PageHero from '../components/ui/PageHero'
import { Section } from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'
import FeatureList from '../components/ui/FeatureList'
import Badge from '../components/ui/Badge'
import Icon from '../components/ui/Icon'
import Form from '../components/forms/Form'
import { anvilsNotifyForm } from '../components/forms/formConfigs'

const HOUSING = [
  {
    title: "Men's Anvil",
    icon: 'home',
    features: [
      'Stability',
      'Accountability',
      'Recovery support',
      'Life skills',
      'Employment goals',
      'Personal growth',
    ],
  },
  {
    title: "Women & Children's Anvil",
    icon: 'family',
    features: [
      'Recovery support',
      'Parenting growth',
      'Family stability',
      'Life skills',
      'Safe housing',
      'Healthy futures',
    ],
  },
]

export default function Anvils() {
  return (
    <>
      <Seo
        title="The Anvils Recovery Housing"
        description="The Anvils are Reforged Recovery's future recovery housing programs — safe, structured homes where transformation happens."
        path="/anvils"
      />
      <PageHero
        eyebrow="The Anvils Recovery Housing"
        title="Where transformation happens"
        intro="An anvil is where the reforging takes place — the solid foundation that withstands the hammer and the heat. Our recovery homes are built to be exactly that."
      />

      {/* The anvil metaphor */}
      <Section tone="white">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-forge-heading text-2xl font-medium leading-snug text-forge-900 sm:text-3xl">
            An anvil is where transformation happens.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-forge-600">
            The Anvils will offer safe, structured recovery housing — a stable place to stand while
            rebuilding a life. These programs are in development and{' '}
            <strong className="text-forge-900">not yet operational</strong>, but we're building
            toward opening their doors.
          </p>
        </div>
      </Section>

      {/* Two program cards */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Future Programs"
          title="Two homes, one mission"
          lead="Both Anvil homes are being developed. Sign up below to be notified as they become available."
          align="center"
          className="mx-auto"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {HOUSING.map((home) => (
            <div
              key={home.title}
              className="flex flex-col rounded-2xl border border-stone-200 bg-white p-8 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-forge-900 text-ember-400">
                  <Icon name={home.icon} className="h-8 w-8" />
                </span>
                <Badge tone="soon">Coming Soon</Badge>
              </div>
              <h3 className="text-forge-heading text-2xl font-bold text-forge-900">{home.title}</h3>
              <p className="mt-1 text-sm font-medium uppercase tracking-wide text-stone-500">
                Future program
              </p>
              <div className="mt-6">
                <FeatureList items={home.features} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Notify-me mini form */}
      <Section tone="dark">
        <div className="mx-auto max-w-xl">
          <SectionHeading
            eyebrow="Stay in the loop"
            title="Interested in future housing?"
            lead="Leave your name and email and we'll notify you when The Anvils open for applications. (This is not an application — just a way to stay informed.)"
            onDark
            align="center"
            className="mx-auto"
          />
          <div className="mt-8 rounded-2xl bg-white p-6 sm:p-8">
            <Form {...anvilsNotifyForm} compact />
          </div>
        </div>
      </Section>
    </>
  )
}
