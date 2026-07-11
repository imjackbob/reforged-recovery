import Seo from '../components/Seo'
import PageHero from '../components/ui/PageHero'
import { Section } from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'
import FeatureList from '../components/ui/FeatureList'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import Form from '../components/forms/Form'
import { volunteerForm, partnershipForm } from '../components/forms/formConfigs'
import { ORG } from '../data/site'

const VOLUNTEER_WAYS = [
  'Mentoring',
  'Community outreach',
  'Events',
  'Administrative support',
]

const PARTNER_TYPES = [
  'Churches & faith organizations',
  'Businesses',
  'Treatment providers',
  'Community organizations',
]

export default function GetInvolved() {
  return (
    <>
      <Seo
        title="Get Involved"
        description="Volunteer, partner, or donate to support Reforged Recovery Inc. Your time, partnership, and generosity help rebuild lives."
        path="/get-involved"
      />
      <PageHero
        eyebrow="Get Involved"
        title="Be part of the reforging"
        intro="Recovery is a community effort. Whether you give your time, your partnership, or your support, you help make transformation possible."
      />

      {/* Volunteer */}
      <Section id="volunteer" tone="white">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Volunteer" title="Give your time and heart" />
            <p className="mt-4 text-lg leading-relaxed text-forge-600">
              Our work is powered by people who care. There are many ways to serve — find the one
              that fits you.
            </p>
            <div className="mt-6">
              <FeatureList items={VOLUNTEER_WAYS} columns={2} />
            </div>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6 sm:p-8">
            <h3 className="text-forge-heading text-xl font-bold text-forge-900">
              Sign up to volunteer
            </h3>
            <p className="mt-2 text-forge-600">Tell us how you'd like to help.</p>
            <div className="mt-6">
              <Form {...volunteerForm} compact />
            </div>
          </div>
        </div>
      </Section>

      {/* Partnerships */}
      <Section id="partnerships" tone="paper">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8 lg:order-2">
            <h3 className="text-forge-heading text-xl font-bold text-forge-900">Partner with us</h3>
            <p className="mt-2 text-forge-600">
              Let's explore how we can work together to strengthen our community.
            </p>
            <div className="mt-6">
              <Form {...partnershipForm} compact />
            </div>
          </div>
          <div className="lg:order-1">
            <SectionHeading eyebrow="Partnerships" title="Build something stronger together" />
            <p className="mt-4 text-lg leading-relaxed text-forge-600">
              We partner with organizations who share our heart for recovery and restoration.
              Together we can reach more people and offer more support.
            </p>
            <div className="mt-6">
              <FeatureList items={PARTNER_TYPES} />
            </div>
          </div>
        </div>
      </Section>

      {/* Donate */}
      <Section id="donate" tone="dark">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading eyebrow="Donate" title="Fuel the fire" onDark />
            <p className="mt-4 text-lg leading-relaxed text-stone-300">
              Every gift helps rebuild a life. Your generosity funds recovery support, life skills,
              family restoration, and the future of The Anvils recovery housing.
            </p>
            <div className="mt-6 rounded-xl border border-forge-700 bg-forge-800/50 p-5">
              <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-ember-400">
                Where your donation goes
              </h3>
              <p className="mt-2 text-stone-300">
                Directly into programs and people — peer support, life skills, family restoration,
                and community outreach. As a nonprofit, we steward every dollar toward transformation.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button href={ORG.donateUrl} size="lg">
                <Icon name="heart" className="h-5 w-5" /> Donate Now
              </Button>
              <Button href={ORG.donateUrl} variant="outlineOnDark" size="lg">
                Give Monthly
              </Button>
            </div>
            <p className="mt-3 text-sm text-stone-500">
              Monthly giving provides the steady support that makes long-term recovery possible.
            </p>
          </div>

          {/*
            DONATION WIDGET EMBED.
            For launch we do NOT process payments ourselves (no PCI burden). Embed
            a hosted nonprofit donation platform (Donorbox / Givebutter). Replace
            the placeholder below with the client's real embed. Donorbox example:

            <iframe src="https://donorbox.org/embed/reforged-recovery"
              name="donorbox" allow="payment"
              className="w-full min-h-[685px] max-w-[500px] border-0"
              seamless />
            Also add before </body> in index.html (once):
            <script src="https://donorbox.org/widget.js" paypalExpress="false"></script>
          */}
          <div className="rounded-2xl border-2 border-dashed border-forge-600 bg-forge-900 p-8 text-center">
            <span className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-ember-600/15 text-ember-400">
              <Icon name="heart" className="h-8 w-8" />
            </span>
            <p className="font-display text-sm font-semibold uppercase tracking-widest text-stone-400">
              Donation widget
            </p>
            <p className="mt-2 text-stone-400">
              The hosted Donorbox / Givebutter giving form will be embedded here. Until then, the
              buttons link to our secure donation page.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}
