import { createContext } from 'react'
import type { DiaryEntry } from '../../types'

export interface DiaryContextValue {
  entries: DiaryEntry[]
  saveEntry: (entry: DiaryEntry) => void
}

export const DiaryContext = createContext<DiaryContextValue | null>(null)
