import { useState } from 'react'
import type { DiaryEntry } from '../types'

const STORAGE_KEY = 'diary-entries'

interface FormState {
  date: string
  title: string
  imageUrl: string
  content: string
  editingId: string | null
}

function buildFormState(date: string): FormState {
  const entries: DiaryEntry[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
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
  const [form, setForm] = useState<FormState>(() =>
    buildFormState(new Date().toISOString().split('T')[0])
  )
  const [showToast, setShowToast] = useState(() =>
    buildFormState(new Date().toISOString().split('T')[0]).editingId !== null
  )

  const isValid = form.title.trim() !== '' && form.date !== '' && form.imageUrl.trim() !== '' && form.content.trim() !== ''

  function handleDateChange(newDate: string) {
    const newForm = buildFormState(newDate)
    setForm(newForm)
    setShowToast(newForm.editingId !== null)
  }

  function handleSubmit() {
    const entries: DiaryEntry[] = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')

    if (form.editingId) {
      const updated = entries.map(e =>
        e.id === form.editingId
          ? { ...e, title: form.title, date: form.date, imageUrl: form.imageUrl, content: form.content }
          : e
      )
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } else {
      const newEntry: DiaryEntry = {
        id: crypto.randomUUID(),
        title: form.title,
        date: form.date,
        imageUrl: form.imageUrl,
        content: form.content,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify([newEntry, ...entries]))
    }

    onClose()
  }

  return (
    <>
    {showToast && (
      <div className="toast toast-top toast-center z-50">
        <div className="alert alert-info flex flex-col items-start gap-1">
          <span className="font-medium">Für diesen Tag gibt es bereits einen Eintrag.</span>
          <span className="text-sm">Du kannst ihn jetzt bearbeiten oder morgen wiederkommen.</span>
          <button className="btn btn-xs btn-ghost self-end" onClick={() => setShowToast(false)}>✕</button>
        </div>
      </div>
    )}
    <dialog className="modal modal-open">
      <div className="modal-box max-w-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl">{form.editingId ? 'Edit Entry' : 'New Diary Entry'}</h3>
          <button type="button" className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>
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
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              />
            </label>

            <label className="form-control">
              <div className="label">
                <span className="label-text font-medium">Date</span>
              </div>
              <input
                type="date"
                className="input input-bordered w-full"
                value={form.date}
                onChange={e => handleDateChange(e.target.value)}
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
                value={form.imageUrl}
                onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
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
              value={form.content}
              onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
            />
          </label>

          <div className="modal-action mt-2">
            <button type="button" className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={!isValid}>
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
