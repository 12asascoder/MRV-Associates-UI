import { Info } from 'lucide-react'
import { useId, useState } from 'react'
import { useAnimatedNumber } from '../hooks/useAnimatedNumber'
import { formatAed, formatPlain, formatRate } from '../lib/format'
import { illustrateTax, PROFIT_DEFAULT, PROFIT_MAX, PROFIT_MIN, RATE_DEFAULT, ZERO_RATE_BAND } from '../lib/tax'
import { useBriefing } from '../hooks/useBriefing'
import { Reveal, Shell } from './Reveal'
import { cx } from '../lib/cx'

function Tip({ label, text }: { label: string; text: string }) {
  const id = useId()
  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        className="rounded-full p-0.5 text-white/50 hover:text-white"
        aria-describedby={id}
        aria-label={label}
      >
        <Info className="h-3.5 w-3.5" />
      </button>
      <span
        id={id}
        role="tooltip"
        className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-10 w-72 -translate-x-1/2 rounded-lg border border-white/10 bg-[#070b18] px-3 py-2 text-left text-[11px] leading-4 font-sans font-normal tracking-normal text-white normal-case opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {text}
      </span>
    </span>
  )
}

export function Calculator() {
  const [profit, setProfit] = useState(PROFIT_DEFAULT)
  const [profitText, setProfitText] = useState(formatPlain(PROFIT_DEFAULT))
  const [profitFocused, setProfitFocused] = useState(false)
  const [rate, setRate] = useState(RATE_DEFAULT)
  const { openBriefing } = useBriefing()
  const model = illustrateTax(profit, rate)
  const animatedTax = useAnimatedNumber(model.illustratedTax, true, 420)
  const animatedRate = useAnimatedNumber(model.effectiveRate, true, 420)
  const profitFill = `${Math.min(100, Math.max(0, ((Math.min(profit, PROFIT_MAX) - PROFIT_MIN) / (PROFIT_MAX - PROFIT_MIN)) * 100))}%`

  const statusCopy = {
    verified: {
      title: 'De Minimis Threshold Compliant (QRE < 5%)',
      body: 'Qualifying Free Zone Person status maintained securely.',
      badge: 'Verified',
      panel: 'border-[#d7f3e3] bg-[#eefbf4]',
      badgeClass: 'border-[#b7e7cb] bg-white text-emerald',
    },
    review: {
      title: 'De Minimis Threshold Not Illustrated as Met',
      body: 'These inputs sit outside both the 5% statutory screen and the reference 70% planning screen.',
      badge: 'Review',
      panel: 'border-[#f3e2c2] bg-[#fff8ee]',
      badgeClass: 'border-[#efd3a4] bg-white text-[#9a6412]',
    },
    mainland: {
      title: 'Mainland Standard — QFZP Screen Not Applied',
      body: 'A 0% qualifying activity rate is illustrated entirely on the mainland 0% / 9% schedule.',
      badge: 'Mainland',
      panel: 'border-line bg-[#f6f8fb]',
      badgeClass: 'border-line bg-white text-slate',
    },
  }[model.status]

  const commitProfit = (raw: string) => {
    const digits = raw.replace(/[^\d]/g, '')
    const next = digits ? Number(digits) : PROFIT_DEFAULT
    const clamped = Math.min(500_000_000, next)
    setProfit(clamped)
    setProfitText(formatPlain(clamped))
  }

  const scope = [
    'Illustrative simulator values (not an FTA assessment):',
    `Annual net profit before tax: ${formatAed(model.profit)}`,
    `Qualifying free zone activity rate: ${model.qualifyingRate}%`,
    `Projected corporate tax liability: ${formatAed(model.illustratedTax)}`,
    `Effective rate: ${formatRate(model.effectiveRate)}`,
    `Standard mainland tax: ${formatAed(model.mainlandTax)}`,
    `Illustrated QFZP relief: ${formatAed(model.relief)}`,
    `De minimis screen: ${statusCopy.badge}`,
  ].join('\n')

  return (
    <section className="grid-bg py-20 lg:py-24" aria-labelledby="calculator-heading">
      <Shell>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="inline-flex rounded-full border border-[#d5deee] bg-white px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-[#52627d] uppercase">
            Interactive Financial Engine V2.4
          </p>
          <h2 id="calculator-heading" className="mt-5 font-serif text-4xl leading-tight font-medium tracking-tight text-ink sm:text-5xl">
            UAE Corporate Tax & QFZP Restructuring Simulator
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate">
            Figures follow a documented illustration of the 0% / 9% schedule and a 0% rate on the qualifying-activity share. They are not an official tax determination.
          </p>
        </Reveal>

        <div className="gloss-card mt-10 rounded-[28px] border border-white/80 p-5 sm:p-7 lg:p-8">
          <div className="grid items-stretch gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <label htmlFor="profit-slider" className="font-mono text-[11px] tracking-[0.14em] text-[#5d6d86] uppercase">
                  Annual net profit before tax (AED)
                </label>
                <input
                  aria-label="Annual net profit before tax in dirhams"
                  inputMode="numeric"
                  className="w-[170px] rounded-lg border border-line bg-white px-3 py-1.5 text-right text-sm font-semibold text-ink tabular"
                  value={profitFocused ? profitText : `AED ${formatPlain(profit)}`}
                  onFocus={() => {
                    setProfitFocused(true)
                    setProfitText(formatPlain(profit))
                  }}
                  onBlur={() => {
                    setProfitFocused(false)
                    commitProfit(profitText)
                  }}
                  onChange={(event) => {
                    const raw = event.target.value
                    setProfitText(raw)
                    const digits = raw.replace(/[^\d]/g, '')
                    if (digits) setProfit(Math.min(500_000_000, Number(digits)))
                  }}
                />
              </div>
              <input
                id="profit-slider"
                className="range mt-1"
                type="range"
                min={PROFIT_MIN}
                max={PROFIT_MAX}
                step={100000}
                value={Math.min(PROFIT_MAX, Math.max(PROFIT_MIN, profit))}
                style={{ ['--fill' as string]: profitFill }}
                aria-valuemin={PROFIT_MIN}
                aria-valuemax={PROFIT_MAX}
                aria-valuenow={profit}
                aria-valuetext={formatAed(profit)}
                onChange={(event) => {
                  const next = Number(event.target.value)
                  setProfit(next)
                  setProfitText(formatPlain(next))
                }}
              />
              <div className="flex justify-between gap-3 text-[11px] text-muted">
                <span>AED 500K</span>
                <span>AED 10M</span>
                <span>AED 25M+</span>
              </div>

              <div className="mt-8 flex flex-wrap items-end justify-between gap-3">
                <label htmlFor="rate-slider" className="font-mono text-[11px] tracking-[0.14em] text-[#5d6d86] uppercase">
                  Qualifying free zone activity rate (%)
                </label>
                <output className="rounded-lg border border-[#d9e4ff] bg-[#f4f7ff] px-3 py-1.5 text-sm font-semibold text-blue tabular" htmlFor="rate-slider">
                  {rate}%
                </output>
              </div>
              <input
                id="rate-slider"
                className="range mt-1"
                type="range"
                min={0}
                max={100}
                step={1}
                value={rate}
                style={{ ['--fill' as string]: `${rate}%` }}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={rate}
                aria-valuetext={`${rate} percent qualifying activity`}
                onChange={(event) => setRate(Number(event.target.value))}
              />
              <div className="flex justify-between gap-3 text-[11px] text-muted">
                <span>0% (Mainland Standard)</span>
                <span>50% Hybrid</span>
                <span className="text-right">100% Fully Qualifying (0% Tax)</span>
              </div>

              <div className={cx('mt-8 flex items-center justify-between gap-4 rounded-2xl border px-4 py-4', statusCopy.panel)} aria-live="polite">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[12px] text-emerald" aria-hidden="true">
                    {model.status === 'verified' ? '✓' : model.status === 'review' ? '!' : '–'}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">{statusCopy.title}</p>
                    <p className="mt-1 text-xs leading-5 text-slate">{statusCopy.body}</p>
                  </div>
                </div>
                <span className={cx('shrink-0 rounded-md border px-2 py-1 font-mono text-[10px] tracking-[0.14em] uppercase', statusCopy.badgeClass)}>
                  {statusCopy.badge}
                </span>
              </div>
            </div>

            <aside className="gloss-panel flex h-full flex-col rounded-[22px] p-6 text-white sm:p-7">
              <div className="flex items-center gap-2">
                <p className="font-mono text-[10px] tracking-[0.16em] text-white/55 uppercase">Projected corporate tax liability</p>
                <Tip
                  label="How the liability is illustrated"
                  text="Mainland tax is 0% on the first AED 375,000 and 9% above that. The qualifying share is modelled at 0%, and the zero-rate band is applied to the non-qualifying profit. This matches the reference case of AED 78,750 on AED 5,000,000 at 75%."
                />
              </div>
              <p className="mt-3 font-serif text-5xl tracking-tight tabular" aria-live="polite">
                {formatAed(animatedTax)}
              </p>
              <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-white/70">
                Effective Rate:
                <span className="rounded-md bg-emerald px-2 py-0.5 text-xs font-semibold text-white tabular">{formatRate(animatedRate)}</span>
                <span>Standard: 9.0%</span>
              </p>
              <div className="my-5 h-px bg-white/10" />
              <dl className="space-y-3 text-sm">
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-white/60">Standard Mainland Tax:</dt>
                  <dd className="tabular">{formatAed(model.mainlandTax)}</dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-white/60">MRV QFZP Optimization Relief:</dt>
                  <dd className="text-right text-[#7dcea5] tabular">+{formatAed(model.relief)} saved</dd>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <dt className="text-white/60">Statutory Relief Allowance:</dt>
                  <dd className="text-right tabular">{formatAed(ZERO_RATE_BAND)} exempt</dd>
                </div>
              </dl>
              <button
                type="button"
                className="btn btn-blue mt-6 w-full"
                onClick={() => openBriefing({ domain: 'Corporate Tax & QFZP Regime', scope })}
              >
                Structure This Model with MRV
                <span className="arrow" aria-hidden="true">
                  →
                </span>
              </button>
            </aside>
          </div>
        </div>

        <details className="mx-auto mt-6 max-w-3xl text-sm leading-6 text-slate">
          <summary className="cursor-pointer font-medium text-ink">How this illustration is calculated</summary>
          <div className="mt-3 space-y-3">
            <p>
              Standard mainland tax is max(0, profit − AED 375,000) × 9%. The qualifying activity share is illustrated at 0%. Tax is then calculated only on the non-qualifying profit, using the same AED 375,000 band. Relief is the difference between those two figures. At the reference inputs — AED 5,000,000 and 75% — the illustrated liability is AED 78,750, mainland tax is AED 416,250, and relief is AED 337,500.
            </p>
            <p>
              The de minimis panel shows Verified when non-qualifying profit does not exceed the lower of 5% of profit and AED 5,000,000, or when the qualifying rate is at least 70% and non-qualifying profit is within AED 5,000,000. The second limb is what keeps the reference case (75%) in the verified state shown in the design. It is wider than the statutory 5% test and is not an FTA clearance. Arrow keys move either slider.
            </p>
          </div>
        </details>
      </Shell>
    </section>
  )
}
