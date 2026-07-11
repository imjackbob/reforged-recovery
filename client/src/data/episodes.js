// Podcast episodes.
//
// v1 uses this static array. The <EpisodeList> component is structured so each
// entry can carry an `embedUrl` (Spotify / Apple / YouTube embed) that renders
// an <iframe>, or just a `link` that renders an external "Listen" button.
//
// PHASE 2 / optional: swap this file for a fetch to GET /api/podcast/episodes so
// staff can manage episodes without a redeploy (see server README). The shape
// below intentionally matches that planned API response.
export const EPISODES = [
  {
    id: 'ep-001',
    title: 'Reforged: Why We Started',
    date: '2026-01-15',
    description:
      'Meet the team behind Reforged Recovery and hear the vision for rebuilding lives, families, and community through recovery.',
    // Example: 'https://open.spotify.com/embed/episode/XXXXXXXX'
    embedUrl: null,
    link: null,
  },
  {
    id: 'ep-002',
    title: 'From Addiction to Purpose',
    date: '2026-01-22',
    description:
      'A recovery testimony about finding hope, becoming a present parent, and turning personal experience into purpose.',
    embedUrl: null,
    link: null,
  },
  {
    id: 'ep-003',
    title: 'Iron Sharpens Iron: The Power of Community',
    date: '2026-01-29',
    description:
      'Why no one should walk the recovery journey alone, and how connection strengthens lasting change.',
    embedUrl: null,
    link: null,
  },
]
