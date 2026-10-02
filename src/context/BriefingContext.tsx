import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'

export type BriefingPrefill = {
  domain: string
  scope: string
  token: number
}

type BriefingContextValue = {
  prefill: BriefingPrefill | null
  openBriefing: (next?: { domain?: string; scope?: string }) => void
}

export const BriefingContext = createContext<BriefingContextValue | null>(null)

export function BriefingProvider({ children }: { children: ReactNode }) {
  const [prefill, setPrefill] = useState<BriefingPrefill | null>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const reduced = useReducedMotion()

  const openBriefing = useCallback(
    (next?: { domain?: string; scope?: string }) => {
      if (next?.domain || next?.scope) {
        setPrefill({
          domain: next.domain ?? 'Corporate Tax & QFZP Regime',
          scope: next.scope ?? '',
          token: Date.now(),
        })
      }
      if (location.pathname !== '/') {
        navigate('/#briefing')
        return
      }
      const node = document.getElementById('briefing')
      node?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })
      window.setTimeout(() => document.getElementById('briefing-heading')?.focus(), reduced ? 0 : 450)
    },
    [location.pathname, navigate, reduced],
  )

  const value = useMemo(() => ({ prefill, openBriefing }), [openBriefing, prefill])
  return <BriefingContext.Provider value={value}>{children}</BriefingContext.Provider>
}

