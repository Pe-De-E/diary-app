import { useDiary } from '../context/DiaryContext'

function EntryList() {
  const { entries } = useDiary()

  const sorted = [...entries].sort((a, b) => b.date.localeCompare(a.date))

  if (sorted.length === 0) {
    return (
      <div className="text-center text-base-content/50 mt-16">
        <p className="text-lg">No entries yet.</p>
        <p className="text-sm">Click "Add Entry" to write your first one.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {sorted.map(entry => (
        <div key={entry.id} className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow cursor-pointer">
          {entry.imageUrl && (
            <figure className="h-48 overflow-hidden">
              <img src={entry.imageUrl} alt={entry.title} className="w-full h-full object-cover" />
            </figure>
          )}
          <div className="card-body">
            <p className="text-sm text-base-content/50">{entry.date}</p>
            <h2 className="card-title">{entry.title}</h2>
          </div>
        </div>
      ))}
    </div>
  )
}

export default EntryList
