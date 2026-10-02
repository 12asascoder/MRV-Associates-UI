export const ZERO_RATE_BAND = 375_000
export const STANDARD_RATE = 0.09
export const PROFIT_MIN = 500_000
export const PROFIT_MAX = 25_000_000
export const PROFIT_DEFAULT = 5_000_000
export const RATE_DEFAULT = 75

export type DeMinimisStatus = 'verified' | 'review' | 'mainland'

export type TaxIllustration = {
  profit: number
  qualifyingRate: number
  mainlandTax: number
  illustratedTax: number
  relief: number
  effectiveRate: number
  status: DeMinimisStatus
  nonQualifyingProfit: number
  statutoryCap: number
}

export function clampProfit(value: number) {
  if (!Number.isFinite(value)) return PROFIT_DEFAULT
  return Math.min(500_000_000, Math.max(0, Math.round(value)))
}

export function clampRate(value: number) {
  if (!Number.isFinite(value)) return RATE_DEFAULT
  return Math.min(100, Math.max(0, Math.round(value)))
}

function mainlandTaxOn(profit: number) {
  return Math.max(0, profit - ZERO_RATE_BAND) * STANDARD_RATE
}

export function illustrateTax(profitInput: number, rateInput: number): TaxIllustration {
  const profit = clampProfit(profitInput)
  const qualifyingRate = clampRate(rateInput)
  const qualifyingShare = qualifyingRate / 100
  const nonQualifyingProfit = profit * (1 - qualifyingShare)
  const mainlandTax = mainlandTaxOn(profit)
  const illustratedTax = mainlandTaxOn(nonQualifyingProfit)
  const relief = Math.max(0, mainlandTax - illustratedTax)
  const effectiveRate = profit > 0 ? (illustratedTax / profit) * 100 : 0
  const statutoryCap = Math.min(profit * 0.05, 5_000_000)
  const meetsStatutory = nonQualifyingProfit <= statutoryCap + 0.5
  const meetsReferenceScreen = qualifyingShare >= 0.7 && nonQualifyingProfit <= 5_000_000

  let status: DeMinimisStatus = 'review'
  if (qualifyingRate <= 0) status = 'mainland'
  else if (meetsStatutory || meetsReferenceScreen) status = 'verified'

  return {
    profit,
    qualifyingRate,
    mainlandTax,
    illustratedTax,
    relief,
    effectiveRate,
    status,
    nonQualifyingProfit,
    statutoryCap,
  }
}
