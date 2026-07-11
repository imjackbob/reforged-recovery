import Seo from '../components/Seo'
import PageHero from '../components/ui/PageHero'
import { Section } from '../components/ui/Section'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'

export default function IronSharpensIron() {
  return (
    <>
      <Seo
        title="Iron Sharpens Iron"
        description="Recovery is strengthened through connection. Iron sharpens iron — no one should walk the journey alone."
        path="/iron-sharpens-iron"
      />
      <PageHero eyebrow="Our Philosophy" title="Iron Sharpens Iron" />

      <Section tone="white">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-forge-heading text-3xl font-semibold leading-snug text-ember-700 sm:text-4xl">
            “As iron sharpens iron, so one person sharpens another.”
          </p>

          <div className="mx-auto mt-10 max-w-2xl space-y-5 text-left text-lg leading-relaxed text-forge-600 sm:text-center">
            <p className="text-forge-heading text-2xl font-medium text-forge-900">
              Recovery is strengthened through connection.
            </p>
            <p>
              Iron doesn't sharpen itself. It takes the friction of another blade — the pressure,
              the resistance, the honest edge — to bring out its strength. People are no different.
              We grow through relationship: through the people who challenge us, encourage us, and
              refuse to let us walk alone.
            </p>
            <p>
              This is the heart of everything we do. No one should face recovery in isolation. In
              community, accountability becomes support, struggle becomes shared, and the very things
              that once broke us become the places where we're made stronger.
            </p>
            <p className="text-forge-heading text-xl font-semibold text-forge-900">
              You were never meant to walk this journey alone.
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to="/get-involved" size="lg">
              Find Your Community <Icon name="arrowRight" className="h-5 w-5" />
            </Button>
            <Button to="/get-help" variant="outline" size="lg">
              Get Help
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
