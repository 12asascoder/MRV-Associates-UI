import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { transactions } from '../content/site'
import { useAnimatedNumber } from '../hooks/useAnimatedNumber'
import { Reveal, Shell } from './Reveal'

function Metric({ kind, value, label, active }: { kind: 'aed-million' | 'percent' | 'aed-zero'; value: number; label: string; active: boolean }) {
  const animated = useAnimatedNumber(active ? value : 0, active, 800)
  if (kind === 'aed-zero') return <span>{label}</span>
  if (kind === 'percent') return <span className="tabular">{Math.round(animated)}% Ring-Fenced</span>
  return <span className="tabular">AED {animated.toFixed(1)}M</span>
}

export function Transactions() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })

  return (
    <section id="transactions" ref={ref} className="bg-mist py-20 lg:py-24" aria-labelledby="transactions-heading">
      <Shell>
        <Reveal>
          <p className="eyebrow">Verifiable Track Record</p>
          <h2 id="transactions-heading" className="mt-4 max-w-3xl font-serif text-4xl leading-tight font-medium tracking-tight text-ink sm:text-5xl">
            Strategic Transformations in Practice
          </h2>
          <p className="mt-4 max-w-2xl text-base text-slate">
            How MRV Associates engineers defensive resilience and fiscal efficiency for industry leaders.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {transactions.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.08} className="h-full">
              <article className="gloss-card flex h-full flex-col rounded-2xl border border-[#e7edf4] p-6 transition duration-300 hover:-translate-y-0.5 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <p className="font-mono text-[11px] tracking-[0.14em] text-blue uppercase">{item.category}</p>
                  <p className="text-right text-[13px] text-muted">{item.reference}</p>
                </div>
                <h3 className="mt-6 min-h-[5.6rem] font-serif text-[1.45rem] leading-snug font-medium text-ink">{item.title}</h3>
                <div className="mt-6 h-px bg-line" />
                <p className="mt-6 font-serif text-[2rem] leading-none font-medium text-ink">
                  <Metric kind={item.metricKind} value={item.metricValue} label={item.metric} active={inView} />
                </p>
                <p className="mt-3 font-mono text-[11px] tracking-[0.14em] text-emerald uppercase">{item.caption}</p>
                <Link to={`/services/${item.practiceSlug}#${item.slug}`} className="mt-6 text-sm font-semibold text-blue">
                  Read the published reference
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  )
}
