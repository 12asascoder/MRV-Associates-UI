import { ArrowRight, FileText, Landmark, Link2, Receipt, Shield, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { practiceAreas, type PracticeArea } from '../content/site'
import { Reveal, Shell } from './Reveal'

const icons = {
  file: FileText,
  trend: TrendingUp,
  receipt: Receipt,
  landmark: Landmark,
  shield: Shield,
  link: Link2,
}

function Card({ area, index }: { area: PracticeArea; index: number }) {
  const Icon = icons[area.icon]
  return (
    <Reveal delay={index * 0.06} className="h-full">
      <article className="gloss-card group flex h-full flex-col rounded-2xl border border-[#e7edf4] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#c9d6f5]">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[#e6ebf3] text-blue">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-serif text-[1.45rem] leading-snug font-medium text-ink">{area.title}</h3>
        <p className="mt-3 text-sm leading-6 text-slate">{area.summary}</p>
        <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#eef2f6] pt-4">
          <p className="text-[13px] text-[#7b8798]">{area.footer}</p>
          <Link to={`/services/${area.slug}`} className="inline-flex items-center gap-1 text-sm font-semibold text-blue">
            Explore
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </article>
    </Reveal>
  )
}

export function PracticeAreas() {
  return (
    <section id="practice" className="bg-white py-20 lg:py-24" aria-labelledby="practice-heading">
      <Shell>
        <Reveal>
          <p className="eyebrow">Practice Areas</p>
          <h2 id="practice-heading" className="mt-4 max-w-3xl font-serif text-4xl leading-[1.1] font-medium tracking-tight text-ink sm:text-5xl">
            Institutional Advisory Capabilities
          </h2>
          <div className="mt-8 h-px w-full bg-line" />
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {practiceAreas.map((area, index) => (
            <Card key={area.slug} area={area} index={index} />
          ))}
        </div>
      </Shell>
    </section>
  )
}
