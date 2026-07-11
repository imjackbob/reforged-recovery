// Central place for organization-wide info. Update these placeholders with the
// client's real contact details, social handles, and donation link before launch.

export const ORG = {
  name: 'Reforged Recovery Inc.',
  legalName: 'Reforged Recovery Inc.',
  tagline: 'What was once broken can be Reforged into something stronger.',
  mission:
    'To help individuals rebuild their lives through recovery support, life skills, family restoration, faith, and community connection.',
  // TODO(client): replace with real contact info.
  email: 'info@reforgedrecovery.org',
  phone: '(555) 555-0100',
  phoneHref: 'tel:+15555550100',
  serviceArea: 'Serving our local community and surrounding areas.',
  // TODO(client): the hosted donation page (Donorbox/Givebutter). Also used by
  // the footer + Get Involved donate button.
  donateUrl: 'https://donorbox.org/reforged-recovery',
}

export const SOCIAL = [
  { label: 'Facebook', href: 'https://facebook.com/', icon: 'facebook' },
  { label: 'Instagram', href: 'https://instagram.com/', icon: 'instagram' },
  { label: 'YouTube', href: 'https://youtube.com/', icon: 'youtube' },
  { label: 'Spotify', href: 'https://spotify.com/', icon: 'spotify' },
]

// Primary navigation. `end` marks exact-match routes (used for Home).
export const NAV = [
  { label: 'Home', to: '/', end: true },
  { label: 'About', to: '/about' },
  { label: 'Programs', to: '/programs' },
  { label: 'The Anvils', to: '/anvils' },
  { label: 'Podcast', to: '/podcast' },
  { label: 'Faith & Community', to: '/faith-community' },
  { label: 'Iron Sharpens Iron', to: '/iron-sharpens-iron' },
  { label: 'Resources', to: '/resources' },
  { label: 'Get Involved', to: '/get-involved' },
  { label: 'Contact', to: '/contact' },
]

// Highlighted primary action shown as a button in the header/footer.
export const PRIMARY_CTA = { label: 'Get Help', to: '/get-help' }
