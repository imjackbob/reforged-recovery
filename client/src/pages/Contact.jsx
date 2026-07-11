import Seo from '../components/Seo'
import PageHero from '../components/ui/PageHero'
import { Section } from '../components/ui/Section'
import Icon from '../components/ui/Icon'
import Form from '../components/forms/Form'
import { contactForm } from '../components/forms/formConfigs'
import { ORG, SOCIAL } from '../data/site'

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        description="Get in touch with Reforged Recovery Inc. — by phone, email, or the contact form. We'd love to hear from you."
        path="/contact"
      />
      <PageHero
        eyebrow="Contact"
        title="Let's connect"
        intro="Questions, ideas, or just want to say hello? Reach out — we'd love to hear from you."
      />

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          {/* Contact details */}
          <div>
            <h2 className="text-forge-heading text-2xl font-bold text-forge-900">Reach us</h2>
            <ul className="mt-6 space-y-5">
              <li className="flex items-start gap-3">
                <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-ember-600/10 text-ember-700">
                  <Icon name="phone" className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
                    Phone
                  </p>
                  <a href={ORG.phoneHref} className="text-lg text-forge-800 hover:text-ember-700">
                    {ORG.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-ember-600/10 text-ember-700">
                  <Icon name="mail" className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
                    Email
                  </p>
                  <a
                    href={`mailto:${ORG.email}`}
                    className="text-lg text-forge-800 hover:text-ember-700"
                  >
                    {ORG.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-ember-600/10 text-ember-700">
                  <Icon name="mapPin" className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
                    Service Area
                  </p>
                  <p className="text-lg text-forge-800">{ORG.serviceArea}</p>
                </div>
              </li>
            </ul>

            <div className="mt-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
                Follow along
              </p>
              <ul className="mt-3 flex gap-2">
                {SOCIAL.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-forge-900 text-stone-200 transition-colors hover:bg-ember-600 hover:text-white"
                    >
                      <Icon name={s.icon} className="h-5 w-5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact form (reuses the shared Form via the contact config) */}
          <div className="rounded-2xl border border-stone-200 bg-stone-50 p-6 sm:p-8">
            <h2 className="text-forge-heading text-2xl font-bold text-forge-900">
              Send us a message
            </h2>
            <div className="mt-6">
              <Form {...contactForm} />
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
