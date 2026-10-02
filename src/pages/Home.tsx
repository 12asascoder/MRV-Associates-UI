import { Calculator } from '../components/Calculator'
import { Consultation } from '../components/Consultation'
import { Credentials } from '../components/Credentials'
import { Hero } from '../components/Hero'
import { InstitutionalEdge } from '../components/InstitutionalEdge'
import { Meta } from '../components/Meta'
import { Metrics } from '../components/Metrics'
import { PracticeAreas } from '../components/PracticeAreas'
import { Transactions } from '../components/Transactions'

export function Home() {
  return (
    <>
      <Meta
        title="MRV Associates | Chartered Tax & Corporate Advisory UAE"
        description="Institutional tax advisory, corporate finance, and an illustrative UAE corporate tax and QFZP simulator from MRV Associates."
      />
      <Hero />
      <Metrics />
      <Calculator />
      <PracticeAreas />
      <Transactions />
      <InstitutionalEdge />
      <Credentials />
      <Consultation />
    </>
  )
}
