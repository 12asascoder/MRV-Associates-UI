import { useEffect, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { nav } from '../content/site'
import { useBriefing } from '../hooks/useBriefing'
import { cx } from '../lib/cx'

export function Header() {
  const [scrollY, setScrollY] = useState(() => window.scrollY)
  const [open, setOpen] = useState(false)
  const [observed, setObserved] = useState('')
  const location = useLocation()
  const { openBriefing } = useBriefing()
  const pathKey = `${location.pathname}${location.hash}`
  const [menuPath, setMenuPath] = useState(pathKey)
  if (pathKey !== menuPath) {
    setMenuPath(pathKey)
    setOpen(false)
  }
  const active = location.pathname === '/' ? observed : ''
  const scrolled = scrollY > 8
  const concealed = location.pathname === '/' && scrollY > 64 && !open

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  useEffect(() => {
    if (location.pathname !== '/') {
      return
    }
    const nodes = nav
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) setObserved(visible.target.id)
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.15, 0.4] },
    )
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [location.pathname])

  return (
    <header
      className={cx(
        'sticky top-0 z-50 border-b border-[#e7edf4] bg-white/95 backdrop-blur-md transition-[translate,box-shadow] duration-500',
        scrolled && !concealed && 'shadow-[0_10px_30px_rgba(8,13,36,0.06)]',
        concealed && 'pointer-events-none -translate-y-full',
      )}
      aria-hidden={concealed}
      inert={concealed}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="border-b border-[#eef1f6] bg-[#f7f8fa]">
        <div className="mx-auto flex max-w-[1160px] items-center gap-3 overflow-x-auto px-6 py-2 text-[11px] text-[#3e4c66] lg:px-8">
          <span className="inline-flex h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" aria-hidden="true" />
          <p className="flex min-w-max items-center gap-3 font-mono tracking-[0.04em]">
            <span>
              AED/USD: <span className="text-ink">3.6725</span>{' '}
              <span className="text-emerald" title="Official UAE dirham peg to the US dollar">
                Pegged
              </span>
            </span>
            <span className="text-[#d5dbe6]" aria-hidden="true">
              |
            </span>
            <span>
              QFZP De Minimis Cap: <span className="text-emerald">&lt; 5% Threshold</span>
            </span>
            <span className="text-[#d5dbe6]" aria-hidden="true">
              |
            </span>
            <a
              href="https://www.difc.ae/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-emerald hover:text-[#0b6b3e]"
              title="Opens the Dubai International Financial Centre website. The ADGM website is linked from Credentials."
            >
              DIFC & ADGM Regulatory Portal
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1160px] items-center justify-between gap-6 px-6 py-3.5 lg:px-8">
        <Link to="/" className="shrink-0" aria-label="MRV Associates home">
          <span className="flex items-center gap-2.5 text-[15px] tracking-[0.16em] text-navy">
            <span className="font-bold">MRV</span>
            <span className="h-3.5 w-px bg-navy/25" aria-hidden="true" />
            <span className="font-medium">ASSOCIATES</span>
          </span>
          <span className="mt-1 block text-[9px] font-semibold tracking-[0.16em] text-blue">
            CHARTERED TAX & CORPORATE ADVISORY UAE
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.id}
              href={`/#${item.id}`}
              className={cx(
                'text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors duration-300',
                active === item.id ? 'text-blue' : 'text-[#243049] hover:text-blue',
              )}
              aria-current={active === item.id ? 'true' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button type="button" className="btn btn-navy hidden px-4 py-2.5 text-[11px] lg:inline-flex" onClick={() => { setOpen(false); openBriefing() }}>
            Schedule Briefing
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line text-navy lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-navigation" className="mobile-nav border-t border-line bg-white lg:hidden">
          <nav className="flex flex-col px-6 py-4" aria-label="Mobile">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`/#${item.id}`}
                className="border-b border-[#f0f3f8] py-3 text-[13px] font-semibold tracking-[0.14em] text-navy uppercase"
              >
                {item.label}
              </a>
            ))}
            <button type="button" className="btn btn-navy mt-4 w-full" onClick={() => { setOpen(false); openBriefing() }}>
              Schedule Briefing
              <span className="arrow" aria-hidden="true">
                →
              </span>
            </button>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
