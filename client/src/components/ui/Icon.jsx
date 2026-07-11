// Dependency-free inline icon set. Line icons on a 24x24 grid using
// currentColor, so they inherit text color and can be sized with width/height
// classes. Decorative by default (aria-hidden); pass a `title` for meaningful
// icons to expose an accessible label.

const PATHS = {
  handshake: (
    <>
      <path d="M12 9 9.5 6.5a2.1 2.1 0 0 0-3 0L2 11l3 3" />
      <path d="m14 12 3.5 3.5a2.1 2.1 0 0 1-3 3L11 15" />
      <path d="M22 11 18 7l-4 4-2 2" />
      <path d="m5 14 3 3M8 11l3 3" />
    </>
  ),
  home: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" />
      <path d="M9.5 21v-6h5v6" />
    </>
  ),
  family: (
    <>
      <circle cx="8" cy="7" r="3" />
      <circle cx="17" cy="8" r="2.3" />
      <path d="M2.5 20v-1a5.5 5.5 0 0 1 11 0v1" />
      <path d="M14.5 20v-.5a4 4 0 0 1 7 0v.5" />
    </>
  ),
  growth: (
    <>
      <path d="M4 20h16" />
      <path d="M7 20v-6M12 20V8M17 20v-9" />
      <path d="m4 9 5-4 3 2 6-5" />
      <path d="M18 2h3v3" />
    </>
  ),
  mic: (
    <>
      <rect x="9" y="2.5" width="6" height="11" rx="3" />
      <path d="M5.5 11a6.5 6.5 0 0 0 13 0" />
      <path d="M12 17.5V21M8.5 21h7" />
    </>
  ),
  community: (
    <>
      <circle cx="12" cy="7" r="3" />
      <circle cx="5" cy="10" r="2.2" />
      <circle cx="19" cy="10" r="2.2" />
      <path d="M7.5 20v-1a4.5 4.5 0 0 1 9 0v1" />
      <path d="M2.5 20v-.5a3.2 3.2 0 0 1 4-3M21.5 20v-.5a3.2 3.2 0 0 0-4-3" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </>
  ),
  faith: (
    <>
      <path d="M12 3v18M8 8h8" />
      <path d="M6 21h12" />
    </>
  ),
  heart: <path d="M12 20s-7-4.5-9.2-9C1.3 8 2.8 4.5 6.2 4.5c2 0 3.2 1.2 3.8 2.3.6-1.1 1.8-2.3 3.8-2.3 3.4 0 4.9 3.5 3.4 6.5C19 15.5 12 20 12 20Z" />,
  phone: <path d="M6.5 3.5h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.5 5.7 2 2 0 0 1 6.5 3.5Z" />,
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3 6.5 9 6 9-6" />
    </>
  ),
  mapPin: (
    <>
      <path d="M12 21s-6.5-5.5-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.5 12 21 12 21Z" />
      <circle cx="12" cy="10" r="2.3" />
    </>
  ),
  arrowRight: <path d="M4 12h15m0 0-6-6m6 6-6 6" />,
  check: <path d="m4 12 5 5 11-11" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="m5 5 14 14M19 5 5 19" />,
  spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />,
  facebook: <path d="M14 8.5V7c0-.8.2-1.2 1.3-1.2H17V3h-2.4C11.7 3 11 4.6 11 6.6v1.9H9V11h2v10h3V11h2.2l.4-2.5H14Z" />,
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  youtube: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="4" />
      <path d="m10.5 9.5 4.5 2.5-4.5 2.5z" fill="currentColor" stroke="none" />
    </>
  ),
  spotify: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M7.5 9.5c3-1 6-.7 8.5.8M8 12.5c2.4-.8 4.8-.5 6.8.7M8.5 15.3c1.9-.6 3.7-.4 5.3.6" />
    </>
  ),
}

export default function Icon({ name, className = 'w-6 h-6', title, ...rest }) {
  const path = PATHS[name]
  if (!path) return null
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      {...rest}
    >
      {title ? <title>{title}</title> : null}
      {path}
    </svg>
  )
}
