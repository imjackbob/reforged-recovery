import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { NAV, PRIMARY_CTA } from '../data/site'
import Logo from './Logo'
import Button from './ui/Button'
import Icon from './ui/Icon'

// Sticky site header. Full horizontal nav on xl+ screens; a slide-down menu
// (hamburger) below that. The nav has many items, so the desktop bar uses a
// compact type scale and the mobile menu takes over early.
export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  // Prevent background scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const linkClass = ({ isActive }) =>
    [
      'rounded px-2.5 py-2 text-sm font-medium transition-colors',
      isActive
        ? 'text-ember-700'
        : 'text-forge-700 hover:text-ember-700 hover:bg-ember-600/5',
    ].join(' ')

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200 bg-stone-50/95 backdrop-blur supports-[backdrop-filter]:bg-stone-50/80">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-6 lg:px-8"
      >
        <Logo />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-0.5 xl:flex">
          {NAV.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} end={item.end} className={linkClass}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden xl:block">
          <Button to={PRIMARY_CTA.to} size="sm">
            {PRIMARY_CTA.label}
          </Button>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 xl:hidden">
          <Button to={PRIMARY_CTA.to} size="sm" className="hidden sm:inline-flex">
            {PRIMARY_CTA.label}
          </Button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-forge-800 hover:bg-forge-900/5"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <Icon name={open ? 'close' : 'menu'} className="h-6 w-6" />
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-stone-200 bg-stone-50 xl:hidden"
        >
          <ul className="mx-auto max-w-7xl px-4 py-3">
            {NAV.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    [
                      'block rounded-md px-3 py-3 text-base font-medium',
                      isActive
                        ? 'bg-ember-600/10 text-ember-700'
                        : 'text-forge-800 hover:bg-forge-900/5',
                    ].join(' ')
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
            <li className="mt-3 px-1">
              <Button to={PRIMARY_CTA.to} className="w-full">
                {PRIMARY_CTA.label}
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
