import { Link } from 'react-router-dom'
import { ORG, SOCIAL, NAV } from '../data/site'
import Logo from './Logo'
import Button from './ui/Button'
import Icon from './ui/Icon'

export default function Footer() {
  const year = 2026 // build-time constant; bump on redeploy if needed.

  return (
    <footer className="bg-forge-950 text-stone-300">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand + mission */}
          <div className="lg:col-span-2">
            <Logo onDark />
            <p className="mt-4 max-w-md text-stone-400">{ORG.mission}</p>
            <p className="mt-4 font-display text-lg font-medium text-stone-200">
              Your past does not define you. Your future can be rebuilt.
            </p>
            <div className="mt-6">
              <Button href={ORG.donateUrl} variant="primary" size="sm">
                <Icon name="heart" className="h-4 w-4" /> Support Our Mission
              </Button>
            </div>
          </div>

          {/* Explore links */}
          <nav aria-label="Footer">
            <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-stone-200">
              Explore
            </h2>
            <ul className="mt-4 space-y-2">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-stone-400 transition-colors hover:text-ember-400"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-stone-200">
              Contact
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={ORG.phoneHref}
                  className="inline-flex items-center gap-2 text-stone-400 transition-colors hover:text-ember-400"
                >
                  <Icon name="phone" className="h-5 w-5 text-ember-400" /> {ORG.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${ORG.email}`}
                  className="inline-flex items-center gap-2 text-stone-400 transition-colors hover:text-ember-400"
                >
                  <Icon name="mail" className="h-5 w-5 text-ember-400" /> {ORG.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-stone-400">
                <Icon name="mapPin" className="mt-0.5 h-5 w-5 flex-none text-ember-400" />
                {ORG.serviceArea}
              </li>
            </ul>

            {/* Social */}
            <ul className="mt-6 flex gap-2">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-forge-800 text-stone-300 transition-colors hover:bg-ember-600 hover:text-white"
                  >
                    <Icon name={s.icon} className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-forge-700 pt-6 text-sm text-stone-500 sm:flex-row sm:items-center">
          <p>
            © {year} {ORG.legalName}. A registered nonprofit organization.
          </p>
          <p className="text-stone-500">
            If you or someone you know is in crisis, call or text{' '}
            <a href="tel:988" className="font-semibold text-stone-300 hover:text-ember-400">
              988
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
