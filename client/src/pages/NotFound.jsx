import Seo from '../components/Seo'
import { Section } from '../components/ui/Section'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found" path="/404" />
      <Section tone="dark" className="min-h-[60vh] flex items-center">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-forge-heading text-6xl font-bold text-ember-500">404</p>
          <h1 className="mt-4 text-forge-heading text-3xl font-bold text-white">
            This page couldn't be found
          </h1>
          <p className="mt-4 text-lg text-stone-300">
            The page you're looking for may have moved or no longer exists. Let's get you back on
            solid ground.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button to="/" size="lg">
              <Icon name="home" className="h-5 w-5" /> Back Home
            </Button>
            <Button to="/get-help" variant="outlineOnDark" size="lg">
              Get Help
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
