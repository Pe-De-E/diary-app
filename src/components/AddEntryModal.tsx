import { useState } from 'react'
import type { DiaryEntry } from '../types'
import { useDiary } from '../hooks/useDiary'
import Toast from './Toast'

interface FormState {
  date: string
  title: string
  imageUrl: string
  content: string
  editingId: string | null
}

function buildFormState(date: string, entries: DiaryEntry[]): FormState {
  const match = entries.find(e => e.date === date) ?? null
  return {
    date,
    title: match?.title ?? '',
    imageUrl: match?.imageUrl ?? '',
    content: match?.content ?? '',
    editingId: match?.id ?? null,
  }
}

interface AddEntryModalProps {
  onClose: () => void
}

function AddEntryModal({ onClose }: AddEntryModalProps) {
  const { entries, saveEntry } = useDiary()

  const [form, setForm] = useState<FormState>(() =>
    buildFormState(new Date().toISOString().split('T')[0], entries)
  )
  const [showToast, setShowToast] = useState(() =>
    buildFormState(new Date().toISOString().split('T')[0], entries).editingId !== null
  )
  const [imageValid, setImageValid] = useState(false)

  const isValid = form.title.trim() !== '' && form.date !== '' && form.content.trim() !== ''

  function handleDateChange(newDate: string) {
    const newForm = buildFormState(newDate, entries)
    setForm(newForm)
    setShowToast(newForm.editingId !== null)
  }

  function handleSubmit() {
    saveEntry({
      id: form.editingId ?? crypto.randomUUID(),
      title: form.title,
      date: form.date,
      imageUrl: form.imageUrl,
      content: form.content,
    })
    onClose()
  }

  return (
    <>
      <Toast
        show={showToast}
        message="Für diesen Tag gibt es bereits einen Eintrag."
        description="Du kannst ihn jetzt bearbeiten oder morgen wiederkommen."
        onClose={() => setShowToast(false)}
      />
      <dialog className="modal modal-open">
        <div className="modal-box max-w-lg bg-white/10 backdrop-blur-xl border border-white/15">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-xl text-white">
              {form.editingId ? 'Edit Entry' : 'New Diary Entry'}
            </h3>
            <button
              type="button"
              className="btn btn-sm btn-circle bg-white/10 hover:bg-white/20 border border-white/20 text-white"
              onClick={onClose}
            >
              ✕
            </button>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <label className="form-control col-span-2">
                <div className="label pb-2">
                  <span className="label-text font-medium text-white">Title</span>
                </div>
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  className="input input-bordered w-full"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                />
              </label>

              <label className="form-control">
                <div className="label pb-2">
                  <span className="label-text font-medium text-white">Date</span>
                </div>
                <input
                  type="date"
                  className="input input-bordered w-full"
                  value={form.date}
                  onChange={e => handleDateChange(e.target.value)}
                />
              </label>

              <label className="form-control">
                <div className="label pb-2">
                  <span className="label-text font-medium text-white">
                    Image URL <span className="text-white/40 font-normal">(optional)</span>
                  </span>
                </div>
                <input
                  type="url"
                  placeholder="https://..."
                  className="input input-bordered w-full"
                  value={form.imageUrl}
                  onChange={e => { setForm(f => ({ ...f, imageUrl: e.target.value })); setImageValid(false) }}
                />
                {form.imageUrl && imageValid && (
                  <div className="mt-2 h-28 rounded-lg overflow-hidden border border-white/10">
                    <img
                      src={form.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                {form.imageUrl && !imageValid && (
                  <img
                    src={form.imageUrl}
                    alt=""
                    className="hidden"
                    onLoad={() => setImageValid(true)}
                    onError={() => setImageValid(false)}
                  />
                )}
              </label>

              <label className="form-control col-span-2">
                <div className="label pb-2">
                  <span className="label-text font-medium text-white">Content</span>
                </div>
                <textarea
                  className="textarea textarea-bordered leading-relaxed w-full"
                  placeholder="Write about your day..."
                  rows={5}
                  value={form.content}
                  onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                />
              </label>
            </div>

            <div className="modal-action mt-2">
              <button
                type="button"
                className="btn bg-white/10 hover:bg-white/20 border border-white/20 text-white"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0 text-white disabled:opacity-40 disabled:cursor-not-allowed disabled:from-purple-500 disabled:to-pink-500"
                disabled={!isValid}
              >
                {form.editingId ? 'Update Entry' : 'Save Entry'}
              </button>
            </div>
          </form>
        </div>
        <div className="modal-backdrop" onClick={onClose} />
      </dialog>
    </>
  )
}

export default AddEntryModal
