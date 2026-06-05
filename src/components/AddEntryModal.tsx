import { useState } from 'react'

interface AddEntryModalProps {
  onClose: () => void
}

function AddEntryModal({ onClose }: AddEntryModalProps) {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [imageUrl, setImageUrl] = useState('')
  const [content, setContent] = useState('')

  function handleSubmit() {
    // TODO: save entry
    onClose()
  }

  return (
    <dialog className="modal modal-open">
      <div className="modal-box max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl">New Diary Entry</h3>
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <label className="form-control col-span-2">
              <div className="label">
                <span className="label-text font-medium">Title</span>
              </div>
              <input
                type="text"
                placeholder="What's on your mind?"
                className="input input-bordered w-full"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text font-medium">Date</span>
              </div>
              <input
                type="date"
                className="input input-bordered w-full"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text font-medium">Image URL</span>
              </div>
              <input
                type="url"
                placeholder="https://..."
                className="input input-bordered w-full"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
              />
            </label>
          </div>

          <label className="form-control">
            <div className="label">
              <span className="label-text font-medium">Content</span>
            </div>
            <textarea
              className="textarea textarea-bordered leading-relaxed"
              placeholder="Write about your day..."
              rows={5}
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </label>

          <div className="modal-action mt-2">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Entry
            </button>
          </div>
        </form>
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </dialog>
  )
}

export default AddEntryModal
