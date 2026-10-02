import { credentials } from '../content/site'
import { Reveal, Shell } from './Reveal'

export function Credentials() {
  return (
    <section id="credentials" className="bg-[#f3f6fa] py-16 lg:py-20" aria-labelledby="credentials-heading">
      <Shell>
        <Reveal>
          <h2 id="credentials-heading" className="text-center font-mono text-[11px] tracking-[0.18em] text-[#5c6d86] uppercase">
            Registered, licensed & accredited by sovereign authorities
          </h2>
        </Reveal>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          {credentials.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="gloss-card flex h-full min-h-[118px] flex-col items-center justify-center rounded-xl border border-[#e7edf4] px-3 py-5 text-center transition duration-300 hover:-translate-y-0.5 hover:border-[#c9d6f5]"
              >
                <span className="text-[11px] font-bold tracking-[0.08em] text-ink uppercase">{item.title}</span>
                <span className="mt-2 text-[12px] leading-5 text-slate">{item.detail}</span>
                <span className="sr-only">Opens the official website</span>
              </a>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  )
}
