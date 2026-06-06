import { useContext } from 'react'
import { DiaryContext } from '../context/diaryContext'

export function useDiary() {
  const ctx = useContext(DiaryContext)
  if (!ctx) throw new Error('useDiary must be used within DiaryProvider')
  return ctx
}
