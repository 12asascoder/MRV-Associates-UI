import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Download } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useBriefing } from '../hooks/useBriefing'

const MotionLink = motion.create(Link)

const clients = [
  'Emirates NBD',
  'First Abu Dhabi Bank',
  'Abu Dhabi Commercial Bank',
  'Dubai Islamic Bank',
  'Mashreq',
  'Standard Chartered',
  'HSBC',
  'Citi',
  'J.P. Morgan',
  'Goldman Sachs',
  'Morgan Stanley',
  'BlackRock',
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { openBriefing } = useBriefing()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])

  return (
    <section ref={ref} className="relative isolate min-h-[640px] overflow-hidden bg-navy lg:min-h-[calc(100vh-108px)]">
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { scale: 1.04 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.img
          src="/images/dubai-skyline.jpg"
          alt="Aerial view of Downtown Dubai at dusk, with the Burj Khalifa centred above the skyline"
          className="h-[118%] w-full object-cover object-[center_42%]"
          style={reduced ? undefined : { y }}
          width={2400}
          height={1600}
          fetchPriority="high"
        />
      </motion.div>
      <div className="hero-shade absolute inset-0" />
      <div className="hero-dots absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[640px] max-w-[1120px] flex-col items-center justify-center px-6 py-24 pb-28 text-center text-white lg:min-h-[calc(100vh-108px)]">
        <motion.p
          className="gloss-glass inline-flex items-center gap-2 rounded-full border border-white/40 px-4 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-white uppercase"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#3DDC97]" aria-hidden="true" />
          FTA Registered Tax Agents
          <span aria-hidden="true">•</span>
          <span className="text-[#b7c6ff]">DIFC & ADGM Affiliated</span>
        </motion.p>

        <h1 className="mt-8 font-serif text-[2.15rem] leading-[1.08] font-medium tracking-[-0.025em] text-balance sm:text-[3.15rem] lg:text-[3.7rem]">
          <motion.span
            className="block"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.28 }}
          >
            Unlock institutional capital, sovereign
          </motion.span>
          <motion.span
            className="mt-1 block"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42 }}
          >
            resilience &{' '}
            <em className="italic">strategic tax velocity.</em>
          </motion.span>
        </h1>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <motion.button
            type="button"
            className="btn btn-glass btn-glass-blue min-w-[280px]"
            onClick={() => openBriefing({ domain: 'Corporate Tax & QFZP Regime' })}
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.62 }}
          >
            Book Strategic Consultation
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </motion.button>
          <MotionLink
            to="/tax-brief"
            className="btn btn-glass btn-glass-light min-w-[280px]"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.74 }}
          >
            <Download className="h-4 w-4" aria-hidden="true" />
            Download UAE 2025 Tax Brief
          </MotionLink>
        </div>
      </div>

      <div className="client-marquee absolute inset-x-0 bottom-0 z-10" aria-label="Finance clients">
        <div className="client-track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="client-row" aria-hidden={copy === 1}>
              {clients.map((name) => (
                <li key={`${copy}-${name}`}>{name}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
