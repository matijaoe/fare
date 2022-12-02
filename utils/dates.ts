export const getYearMonthKey = (date: Date) => {
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${pad(date.getFullYear())}-${pad(date.getMonth() + 1)}`
}

export const monthsToYears = (months: number) => months / 12
export const yearsToMonths = (years: number) => years * 12
