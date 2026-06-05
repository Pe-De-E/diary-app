import { useDiary } from '../context/DiaryContext'

const FALLBACK_IMAGE = 'https://placehold.co/600x400?text=No+Image'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function EntryList() {
  const { entries } = useDiary()

  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date))

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-24 gap-3 text-base-content/40">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        <p className="text-xl font-medium">No entries yet</p>
        <p className="text-sm">Click "Add Entry" to write your first one.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {sorted.map(entry => (
        <div
          key={entry.id}
          className="card bg-base-100 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer overflow-hidden"
        >
          <div className="h-52 overflow-hidden bg-base-200">
            <img
              src={entry.imageUrl || FALLBACK_IMAGE}
              alt={entry.title}
              className="w-full h-full object-cover"
              onError={e => { e.currentTarget.src = FALLBACK_IMAGE }}
            />
          </div>
          <div className="card-body gap-1 p-5">
            <div className="badge badge-ghost text-xs">{formatDate(entry.date)}</div>
            <h2 className="card-title text-base mt-1">{entry.title}</h2>
            <p className="text-sm text-base-content/60 line-clamp-2 mt-1">{entry.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default EntryList
