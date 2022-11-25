export const locale = 'en-US'

export * from './numbers'
export * from './strings'
export * from './arrays'

export const getYearMonthKey = (date: Date) => {
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${pad(date.getFullYear())}-${pad(date.getMonth() + 1)}`
}

