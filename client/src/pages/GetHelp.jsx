import Seo from '../components/Seo'
import PageHero from '../components/ui/PageHero'
import { Section } from '../components/ui/Section'
import Icon from '../components/ui/Icon'
import Form from '../components/forms/Form'
import { getHelpForm } from '../components/forms/formConfigs'
import { ORG } from '../data/site'

/*
  GET HELP — primary contact/intake form.

  This page hosts the primary intake form. It is the template for future forms
  (see components/forms/formConfigs.js), which will plug in the same way:
    - Recovery housing application  (when The Anvils open)
    - Volunteer application         (currently a lighter mini-form on Get Involved)
    - Support request form
  Each is just another config passed to <Form>; no new plumbing needed.
*/
export default function GetHelp() {
  return (
    <>
      <Seo
        title="Get Help"
        description="Reach out to Reforged Recovery Inc. for recovery support, housing interest, family restoration, life skills, or general questions. You don't have to do this alone."
        path="/get-help"
      />
      <PageHero
        eyebrow="Get Help"
        title="You don't have to do this alone"
        intro="Reaching out takes courage. Tell us how we can help, and a member of our team will be in touch. Every message is treated with care and confidentiality."
      />

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          {/* Intake form */}
          <div>
            <h2 className="text-forge-heading text-2xl font-bold text-forge-900">
              Request Support
            </h2>
            <p className="mt-2 text-forge-600">
              Fill out the form below and we'll reach out as soon as we can.
            </p>
            <div className="mt-8">
              <Form {...getHelpForm} />
            </div>
          </div>

          {/* Reassurance + crisis info sidebar */}
          <aside className="lg:pt-2">
            <div className="rounded-2xl border border-ember-600/20 bg-ember-600/5 p-6 sm:p-8">
              <h3 className="text-forge-heading text-lg font-bold text-forge-900">
                Need help right now?
              </h3>
              <p className="mt-3 text-forge-600">
                If you or someone you know is in crisis or immediate danger, please reach out
                immediately:
              </p>
              <ul className="mt-5 space-y-4">
                <li>
                  <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
                    Suicide & Crisis Lifeline
                  </p>
                  <a
                    href="tel:988"
                    className="inline-flex items-center gap-2 text-lg font-semibold text-ember-700 hover:text-ember-800"
                  >
                    <Icon name="phone" className="h-5 w-5" /> Call or text 988
                  </a>
                </li>
                <li>
                  <p className="text-sm font-semibold uppercase tracking-wide text-stone-500">
                    Reforged Recovery
                  </p>
                  <a
                    href={ORG.phoneHref}
                    className="inline-flex items-center gap-2 text-lg font-semibold text-ember-700 hover:text-ember-800"
                  >
                    <Icon name="phone" className="h-5 w-5" /> {ORG.phone}
                  </a>
                  <br />
                  <a
                    href={`mailto:${ORG.email}`}
                    className="mt-1 inline-flex items-center gap-2 text-forge-600 hover:text-ember-700"
                  >
                    <Icon name="mail" className="h-5 w-5" /> {ORG.email}
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  )
}
