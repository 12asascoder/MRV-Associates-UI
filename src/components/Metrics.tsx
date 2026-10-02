import { useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { metrics } from '../content/site'
import { useAnimatedNumber } from '../hooks/useAnimatedNumber'
import { Reveal, Shell } from './Reveal'
import { cx } from '../lib/cx'

function MetricFigure({
  target,
  prefix,
  suffix,
  decimals,
  active,
}: {
  target: number
  prefix: string
  suffix: string
  decimals: number
  active: boolean
}) {
  const value = useAnimatedNumber(active ? target : 0, active, 900)
  const shown = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString()
  return (
    <span className="tabular">
      {prefix}
      {shown}
      {suffix}
    </span>
  )
}

export function Metrics() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reduced = useReducedMotion()

  return (
    <section ref={ref} className="bg-white py-16 lg:py-20" aria-label="Institutional metrics">
      <Shell>
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4 xl:gap-0">
          {metrics.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 0.08} className={cx('xl:px-7', index > 0 && 'xl:border-l xl:border-line')}>
              <span className={cx('mb-6 block h-px w-12', metric.tone === 'emerald' ? 'bg-emerald' : 'bg-ink')} />
              <p className={cx('font-serif text-[2.7rem] leading-none font-medium tracking-tight', metric.tone === 'emerald' ? 'text-emerald' : 'text-ink')}>
                {reduced ? (
                  metric.value
                ) : (
                  <MetricFigure
                    target={metric.target}
                    prefix={metric.prefix}
                    suffix={metric.suffix}
                    decimals={metric.decimals}
                    active={inView}
                  />
                )}
              </p>
              <p className={cx('mt-4 font-mono text-[11px] tracking-[0.14em] uppercase', metric.tone === 'emerald' ? 'text-emerald' : 'text-[#24324a]')}>
                {metric.label}
              </p>
              <p className="mt-3 max-w-xs text-sm leading-6 text-slate">{metric.copy}</p>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  )
}
