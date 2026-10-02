import { useContext } from 'react'
import { BriefingContext } from '../context/BriefingContext'

export function useBriefing() {
  const value = useContext(BriefingContext)
  if (!value) throw new Error('useBriefing must be used within BriefingProvider')
  return value
}
