import { useState, type ReactNode } from 'react'
import type { DiaryEntry } from '../../types'
import { DiaryContext } from './context'

const STORAGE_KEY = 'diary-entries'

export function DiaryProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<DiaryEntry[]>(() =>
    JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  )

  function saveEntry(entry: DiaryEntry) {
    setEntries(prev => {
      const exists = prev.some(e => e.id === entry.id)
      const updated = exists
        ? prev.map(e => e.id === entry.id ? entry : e)
        : [entry, ...prev]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }

  return (
    <DiaryContext.Provider value={{ entries, saveEntry }}>
      {children}
    </DiaryContext.Provider>
  )
}
