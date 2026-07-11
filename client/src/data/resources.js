// Resources shown on /resources as a filterable grid. Content is placeholder —
// the client can add, edit, or replace entries here. Each resource has a
// `category` used by the category tab filter.
//
// If a resource is a national hotline it can be marked `urgent: true` to pin it
// visually. Links marked `external: true` open in a new tab.

export const RESOURCE_CATEGORIES = [
  { id: 'recovery', label: 'Recovery' },
  { id: 'family', label: 'Family' },
  { id: 'mental-health', label: 'Mental Health' },
  { id: 'community', label: 'Community' },
  { id: 'educational', label: 'Educational' },
]

export const RESOURCES = [
  {
    category: 'recovery',
    title: 'SAMHSA National Helpline',
    description:
      'Free, confidential, 24/7 treatment referral and information service (in English and Spanish).',
    href: 'https://www.samhsa.gov/find-help/national-helpline',
    linkLabel: 'Call 1-800-662-4357',
    external: true,
    urgent: true,
  },
  {
    category: 'recovery',
    title: 'Local Recovery Meetings',
    description:
      'Placeholder — add links to local AA / NA / SMART Recovery meeting schedules for your service area.',
    href: '#',
    linkLabel: 'Find a meeting',
  },
  {
    category: 'family',
    title: 'Support for Families',
    description:
      'Placeholder — resources for family members supporting a loved one in recovery (Al-Anon, Nar-Anon, family therapy).',
    href: '#',
    linkLabel: 'Learn more',
  },
  {
    category: 'mental-health',
    title: '988 Suicide & Crisis Lifeline',
    description:
      'Free, confidential support for people in distress, 24 hours a day, 7 days a week.',
    href: 'https://988lifeline.org/',
    linkLabel: 'Call or text 988',
    external: true,
    urgent: true,
  },
  {
    category: 'mental-health',
    title: 'Therapy & Counseling',
    description:
      'Placeholder — links to local counseling services and directories for finding a therapist.',
    href: '#',
    linkLabel: 'Find support',
  },
  {
    category: 'community',
    title: 'Community Programs',
    description:
      'Placeholder — local community centers, food assistance, and support programs.',
    href: '#',
    linkLabel: 'Explore',
  },
  {
    category: 'educational',
    title: 'Understanding Addiction & Recovery',
    description:
      'Placeholder — educational articles and materials about the science of addiction and the recovery process.',
    href: '#',
    linkLabel: 'Read more',
  },
]
