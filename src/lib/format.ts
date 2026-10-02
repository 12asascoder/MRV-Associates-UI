const aed = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 })

export function formatAed(value: number) {
  return `AED ${aed.format(Math.round(value))}`
}

export function formatPlain(value: number) {
  return aed.format(Math.round(value))
}

export function formatRate(value: number) {
  return `${value.toFixed(2)}%`
}
