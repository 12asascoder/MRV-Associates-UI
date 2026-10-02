import { Users } from 'lucide-react'
import { Reveal, Shell } from './Reveal'

const blocks = [
  {
    key: 'finance',
    title: 'By finance, for finance',
    body: 'Domain expertise is in MRV’s DNA. Our senior directors are veteran chartered accountants, former Big-4 partners, and corporate attorneys who understand the nuance and complexity of high-stakes balance sheets — and why generic accounting firms break down when faced with complex multi-tier holding structures.',
  },
  {
    key: 'outputs',
    title: 'Institutional-grade outputs',
    body: 'MRV produces genuine institutional deliverables: auditable transfer pricing documentation, defensible legal tax positions, bank-accepted valuations, and statutory audit opinions built to withstand rigorous sovereign and regulatory scrutiny.',
  },
  {
    key: 'agents',
    title: 'Agents that understand, and act',
    body: 'We do not provide speculative theories. MRV partners represent your commercial interests directly before the UAE Federal Tax Authority, DIFC Registrar of Companies, and ADGM Registration Authority, translating regulatory complexity into operational peace of mind.',
  },
]

function Mark({ index }: { index: number }) {
  return (
    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#e5ebf4] bg-[#fbfcfe] text-sm font-semibold text-[#2a3a58]">
      {index === 0 ? '$' : null}
      {index === 1 ? '02' : null}
      {index === 2 ? <Users className="h-4 w-4" aria-hidden="true" /> : null}
    </span>
  )
}

export function InstitutionalEdge() {
  return (
    <section id="edge" className="bg-white py-20 lg:py-28" aria-labelledby="edge-heading">
      <Shell>
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">Institutional Integrity</p>
            <h2 id="edge-heading" className="mt-5 font-serif text-[2.6rem] leading-[1.08] font-medium tracking-tight text-ink sm:text-5xl lg:text-[3.35rem]">
              Why sovereign wealth funds, family offices, and multinational enterprises choose MRV.
            </h2>
            <div className="mt-8 h-px w-full max-w-sm bg-line" />
          </div>
          <div>
            {blocks.map((block, index) => (
              <Reveal key={block.key} delay={index * 0.08}>
                <article className={index > 0 ? 'mt-8 border-t border-line pt-8' : ''}>
                  <Mark index={index} />
                  <h3 className="mt-4 font-serif text-[1.7rem] leading-tight font-medium text-ink">{block.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-[#5d6d86]">
                    {block.key === 'agents' ? (
                      <>
                        <span className="bg-[linear-gradient(transparent_62%,rgba(90,120,255,0.22)_62%)]">
                          We do not provide speculative theories.
                        </span>{' '}
                        MRV partners represent your commercial interests directly before the UAE Federal Tax Authority, DIFC Registrar of Companies, and ADGM Registration Authority, translating regulatory complexity into operational peace of mind.
                      </>
                    ) : (
                      block.body
                    )}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Shell>
    </section>
  )
}
