import Button from './ui/Button'
import Icon from './ui/Icon'

// Renders the podcast episode list. Each episode can carry:
//   - `embedUrl`: renders a responsive <iframe> (Spotify/Apple/YouTube embed)
//   - `link`:     renders an external "Listen" button
//   - neither:    shows a "Coming soon" note (useful before episodes go live)
//
// This is intentionally decoupled from the data source so EPISODES can later be
// replaced by a fetch to GET /api/podcast/episodes without touching this file.
function formatDate(iso) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function EpisodeList({ episodes }) {
  return (
    <ul className="space-y-6">
      {episodes.map((ep) => (
        <li
          key={ep.id}
          className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm"
        >
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-forge-heading text-xl font-bold text-forge-900">{ep.title}</h3>
              {ep.date && (
                <time dateTime={ep.date} className="text-sm font-medium text-stone-500">
                  {formatDate(ep.date)}
                </time>
              )}
            </div>
            <p className="mt-3 text-forge-600">{ep.description}</p>

            {ep.embedUrl ? (
              <div className="mt-5 overflow-hidden rounded-lg">
                <iframe
                  src={ep.embedUrl}
                  title={ep.title}
                  loading="lazy"
                  className="h-[152px] w-full border-0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                />
              </div>
            ) : ep.link ? (
              <div className="mt-5">
                <Button href={ep.link} variant="outline" size="sm">
                  <Icon name="mic" className="h-4 w-4" /> Listen
                </Button>
              </div>
            ) : (
              <p className="mt-5 inline-flex items-center gap-2 rounded-md bg-stone-100 px-3 py-1.5 text-sm font-medium text-stone-500">
                <Icon name="spark" className="h-4 w-4" /> Episode coming soon
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
