import Seo from '../components/Seo'
import PageHero from '../components/ui/PageHero'
import { Section } from '../components/ui/Section'
import SectionHeading from '../components/ui/SectionHeading'
import PullQuote from '../components/ui/PullQuote'
import { TEAM } from '../data/team'

// Build initials for the avatar placeholder (client will supply real headshots).
function initials(name) {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function About() {
  return (
    <>
      <Seo
        title="About Us"
        description="Our story, our founder's journey, and the leadership team behind Reforged Recovery Inc."
        path="/about"
      />
      <PageHero
        eyebrow="About Us"
        title="Rebuilt with purpose"
        intro="Reforged Recovery was founded on a simple belief: recovery is not the end of a story — it is the beginning of a stronger one."
      />

      {/* Our Story */}
      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <SectionHeading eyebrow="Our Story" title="Why we exist" />
          <div className="space-y-4 text-lg leading-relaxed text-forge-600 lg:pt-2">
            <p>
              Reforged Recovery Inc. was created to meet a need that so many recovery communities
              share: the gap that opens after treatment ends. Getting sober is a profound
              achievement — but staying well, rebuilding a life, and restoring relationships takes
              ongoing support that too many people simply don't have.
            </p>
            <p>
              We saw individuals leave treatment with hope in their hearts and no structure to hold
              them up. We saw families longing to reconnect but unsure how. We saw a community full
              of people who had been through the fire and wanted to help others through it too.
            </p>
            <p>
              Our vision is to reach individuals and families at exactly this point — to provide the
              connection, skills, and belief in their future that makes lasting recovery possible.
            </p>
          </div>
        </div>
      </Section>

      {/* Founder's Story */}
      <Section tone="dark">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="Founder's Story" title="From addiction to purpose" onDark />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-stone-300">
              <p>
                Our founder knows this journey personally. Addiction took a heavy toll — not only on
                his own life, but on the people he loved most. For years, its weight pressed down on
                his family and the future he hoped to give them.
              </p>
              <p>
                Recovery changed everything. Through the honesty of recovery testimonies — hearing
                others speak openly about their struggles and their hope — he discovered that his
                own story could take a different shape. He became present again. He became the
                father his children needed.
              </p>
              <p>
                What began as personal survival became a calling: to take everything recovery gave
                him and turn it into purpose for others.
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <PullQuote cite="Reforged Recovery Founder" onDark>
              My recovery gave me more than sobriety. It gave me purpose.
            </PullQuote>
          </div>
        </div>
      </Section>

      {/* Leadership Team */}
      <Section tone="paper">
        <SectionHeading
          eyebrow="Leadership"
          title="Our Leadership Team"
          lead="The board and recovery advocates guiding the mission of Reforged Recovery."
        />
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TEAM.map((member) => (
            <li
              key={member.name}
              className="flex items-center gap-4 rounded-xl border border-stone-200 bg-white p-5 shadow-sm"
            >
              {/* Avatar placeholder — swap for member.photo when supplied */}
              {member.photo ? (
                <img
                  src={member.photo}
                  alt={`${member.name}, ${member.title}`}
                  className="h-16 w-16 flex-none rounded-full object-cover"
                  loading="lazy"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-forge-900 font-display text-xl font-semibold text-ember-400"
                >
                  {initials(member.name)}
                </span>
              )}
              <div>
                <h3 className="text-lg font-semibold text-forge-900">{member.name}</h3>
                <p className="text-forge-600">{member.title}</p>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-stone-500">
          One additional headshot is on the way and will be added soon.
        </p>
      </Section>
    </>
  )
}
