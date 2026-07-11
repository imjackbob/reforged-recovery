// Program definitions drive both the Home "Quick Access Programs" grid and the
// Programs & Services page. `icon` keys map to <Icon name="..."> in ui/Icon.jsx.

// Cards shown in the Home "Quick Access Programs" grid.
export const QUICK_ACCESS = [
  {
    icon: 'handshake',
    title: 'Recovery Support Services',
    blurb: 'Peer support, guidance, and accountability for the recovery journey.',
    to: '/programs',
  },
  {
    icon: 'home',
    title: 'The Anvils Recovery Housing',
    blurb: 'Safe, structured recovery housing where transformation happens.',
    to: '/anvils',
  },
  {
    icon: 'family',
    title: 'Family Restoration',
    blurb: 'Rebuilding relationships and helping families heal together.',
    to: '/programs',
  },
  {
    icon: 'growth',
    title: 'Life Skills Development',
    blurb: 'Practical skills for employment, budgeting, and healthy routines.',
    to: '/programs',
  },
  {
    icon: 'mic',
    title: 'Reforged Podcast',
    blurb: 'Stories of hope, recovery testimonies, and community conversations.',
    to: '/podcast',
  },
  {
    icon: 'community',
    title: 'Community Outreach',
    blurb: 'Events, service projects, and recovery awareness in our community.',
    to: '/faith-community',
  },
]

// Detailed sections on the Programs & Services page.
export const PROGRAMS = [
  {
    id: 'recovery-support',
    icon: 'handshake',
    title: 'Recovery Support Services',
    intro:
      'Recovery does not end at treatment — it is strengthened every day through connection and support. Our peer-led services walk alongside individuals as they rebuild.',
    features: [
      'Peer support from people with lived recovery experience',
      'One-on-one recovery guidance',
      'Accountability partnerships',
      'Personal goal setting',
      'Community connection',
      'Resource navigation',
    ],
  },
  {
    id: 'life-skills',
    icon: 'growth',
    title: 'Life Skills Development',
    intro:
      'Lasting recovery is built on a foundation of practical, everyday skills. We help individuals develop the tools to live independently and thrive.',
    features: [
      'Communication skills',
      'Employment readiness',
      'Budgeting & financial literacy',
      'Personal responsibility',
      'Healthy daily routines',
      'Ongoing personal growth',
    ],
  },
  {
    id: 'family-restoration',
    icon: 'family',
    title: 'Family Restoration',
    intro:
      'Addiction affects the whole family — and so does recovery. We support parents and families as they rebuild trust and reconnect.',
    features: [
      'Fatherhood support',
      'Motherhood support',
      'Parenting growth',
      'Rebuilding relationships',
      'Healthy family connections',
    ],
    pullQuote: 'When one person chooses recovery, families can begin healing too.',
  },
  {
    id: 'resource-assistance',
    icon: 'compass',
    title: 'Resource Assistance',
    intro:
      'Navigating recovery means navigating systems. We connect individuals to the practical resources that support a stable, healthy life.',
    features: [
      'Health insurance resources',
      'Therapy services',
      'Medical resources',
      'Transportation assistance',
      'Employment resources',
      'Community programs',
    ],
  },
]
