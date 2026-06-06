import type { DiaryEntry } from '../types'

const FALLBACK_IMAGE = 'https://placehold.co/600x400?text=No+Image'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

interface EntryDetailModalProps {
  entry: DiaryEntry
  onClose: () => void
}

function EntryDetailModal({ entry, onClose }: EntryDetailModalProps) {
  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-2xl p-0 overflow-hidden relative">
        <button
          className="btn btn-sm btn-circle absolute top-3 right-3 z-10 bg-black/40 hover:bg-black/60 border-0 text-white shadow-md"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="h-64 bg-base-200">
          <img
            src={entry.imageUrl || FALLBACK_IMAGE}
            alt={entry.title}
            className="w-full h-full object-cover"
            onError={e => { e.currentTarget.src = FALLBACK_IMAGE }}
          />
        </div>
        <div className="p-6 flex flex-col gap-4">
          <div>
            <div className="badge badge-ghost mb-2">{formatDate(entry.date)}</div>
            <h2 className="text-2xl font-bold">{entry.title}</h2>
          </div>
          <p className="text-base-content/80 leading-relaxed whitespace-pre-wrap">{entry.content}</p>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  )
}

export default EntryDetailModal
