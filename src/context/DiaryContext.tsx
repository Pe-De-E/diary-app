import { createContext, useContext, useState, type ReactNode } from 'react'
import type { DiaryEntry } from '../types'

const STORAGE_KEY = 'diary-entries'

interface DiaryContextValue {
  entries: DiaryEntry[]
  saveEntry: (entry: DiaryEntry) => void
}

const DiaryContext = createContext<DiaryContextValue | null>(null)

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

export function useDiary() {
  const ctx = useContext(DiaryContext)
  if (!ctx) throw new Error('useDiary must be used within DiaryProvider')
  return ctx
}
