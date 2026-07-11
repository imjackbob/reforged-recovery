import Seo from '../components/Seo'
import Button from '../components/ui/Button'
import Icon from '../components/ui/Icon'
import { Section, Container } from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'
import { FeatureCard } from '../components/ui/Card'
import { QUICK_ACCESS } from '../data/programs'
import { ORG } from '../data/site'

export default function Home() {
  return (
    <>
      <Seo
        title="What was once broken can be Reforged"
        description="Reforged Recovery Inc. is a nonprofit addiction recovery organization helping individuals rebuild their lives through recovery support, life skills, family restoration, faith, and community."
        path="/"
      />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-forge-950 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(70% 90% at 80% -10%, rgba(226,87,30,0.35), transparent 55%), radial-gradient(60% 80% at 10% 110%, rgba(58,66,80,0.6), transparent 60%)',
          }}
        />
        {/* Forge "sparks" texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              'radial-gradient(1px 1px at 20% 30%, #f2803a 100%, transparent), radial-gradient(1px 1px at 70% 60%, #f7a878 100%, transparent), radial-gradient(1.5px 1.5px at 40% 80%, #e2571e 100%, transparent)',
          }}
        />
        <Container className="relative py-20 sm:py-28 lg:py-32">
          <p className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.22em] text-ember-400">
            Nonprofit Addiction Recovery
          </p>
          <h1 className="text-forge-heading text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl">
            Reforged
            <br className="hidden sm:block" /> Recovery Inc.
          </h1>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-stone-200 sm:text-2xl">
            What was once broken can be{' '}
            <span className="font-semibold text-ember-400">Reforged</span> into something stronger.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button to="/get-help" size="lg">
              Get Help <Icon name="arrowRight" className="h-5 w-5" />
            </Button>
            <Button to="/about" size="lg" variant="outlineOnDark">
              Our Story
            </Button>
            <Button href={ORG.donateUrl} size="lg" variant="outlineOnDark">
              <Icon name="heart" className="h-5 w-5" /> Support Our Mission
            </Button>
          </div>
        </Container>
      </section>

      {/* ── The Reforged Message ─────────────────────────────── */}
      <Section tone="white">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="The Reforged Message"
              title="Broken things can be made stronger"
            />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-forge-600">
              <p>
                To <strong className="text-forge-900">reforge</strong> is to take something
                broken — worn down, damaged, seemingly beyond repair — and place it back in the
                fire. Not to destroy it, but to reshape it. Under heat and pressure, on the anvil,
                it is hammered into something new. Something stronger than before.
              </p>
              <p>
                Recovery works the same way. The struggles, the setbacks, the hardest chapters of a
                life — none of them are the end of the story. They are the raw material for
                transformation.
              </p>
              <p className="text-forge-heading text-2xl font-semibold text-ember-700">
                People can be Reforged.
              </p>
            </div>
          </div>

          {/* Decorative forge/anvil illustration */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-forge-900 p-8 shadow-lg">
              <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="An anvil beneath rising sparks, representing transformation">
                <defs>
                  <radialGradient id="glow" cx="50%" cy="30%" r="60%">
                    <stop offset="0%" stopColor="#e2571e" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#e2571e" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width="400" height="300" fill="#14171c" />
                <ellipse cx="200" cy="120" rx="150" ry="110" fill="url(#glow)" />
                {/* sparks */}
                {[
                  [150, 70], [180, 45], [220, 55], [250, 80], [200, 35], [170, 95], [235, 100],
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r={i % 2 ? 2 : 3} fill="#f7a878" />
                ))}
                {/* anvil */}
                <g fill="#e2571e">
                  <path d="M110 175 h150 c8 0 8 10 0 12 c-30 4 -45 14 -60 30 v10 h28 l-22 40 H150 l-22 -40 h28 v-40 h-58 c-8 0 -8 -12 0 -12 z" />
                </g>
                <rect x="150" y="270" width="100" height="14" rx="4" fill="#3a4250" />
              </svg>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Who We Are ───────────────────────────────────────── */}
      <Section tone="paper">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <SectionHeading eyebrow="Who We Are" title="A community built for recovery" />
          <div className="space-y-4 text-lg leading-relaxed text-forge-600 lg:pt-2">
            <p>
              Reforged Recovery Inc. is a nonprofit organization led by a board of professionals and
              recovery advocates — people with both the credentials and the lived experience to walk
              alongside those rebuilding their lives.
            </p>
            <p>
              We exist for the season after treatment ends, when lasting change is truly built:
              through peer support, life skills, family restoration, faith, and genuine community
              connection.
            </p>
            <div>
              <Button to="/about" variant="ghost" className="px-0">
                Read our story <Icon name="arrowRight" className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Our Mission ──────────────────────────────────────── */}
      <Section tone="dark">
        <div className="mx-auto max-w-4xl text-center">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.18em] text-ember-400">
            Our Mission
          </p>
          <p className="mt-6 text-forge-heading text-2xl font-medium leading-snug text-white sm:text-3xl lg:text-4xl">
            {ORG.mission}
          </p>
          <p className="mt-8 text-lg text-stone-300">
            Your past does not define you. Your future can be rebuilt.
          </p>
        </div>
      </Section>

      {/* ── Quick Access Programs ────────────────────────────── */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Quick Access"
          title="Programs & Services"
          lead="Explore the ways Reforged Recovery supports individuals and families on the road to lasting recovery."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_ACCESS.map((program) => (
            <FeatureCard key={program.title} {...program} />
          ))}
        </div>
      </Section>

      {/* ── Closing CTA ──────────────────────────────────────── */}
      <Section tone="ember">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-forge-heading text-3xl font-bold text-white sm:text-4xl">
            Ready to take the first step?
          </h2>
          <p className="max-w-2xl text-lg text-white/90">
            Whether you are seeking help, supporting a loved one, or looking to give back — there is
            a place for you here.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button to="/get-help" variant="secondary" size="lg">
              Get Help Today
            </Button>
            <Button to="/get-involved" variant="outlineOnDark" size="lg">
              Get Involved
            </Button>
          </div>
        </div>
      </Section>
    </>
  )
}
