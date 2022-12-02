export const calcInterestAfterMonths = ({ rate, months }: { rate: number; months: number }) => {
  return (1 + rate) ** months
}

  type CompoundInterestArgs = {
    principal: number
    monthlyContributions: number
    annualRate: number
    years: number

  }

export const calcCompoundInterestWithMonthlyContributions = ({ principal, monthlyContributions, annualRate, years }: CompoundInterestArgs) => {
  const principalCompounded = (principal * (1 + annualRate / 12) ** (12 * years))
  const contributionsCompounded = (monthlyContributions * ((1 + annualRate / 12) ** (12 * years) - 1) / (annualRate / 12))

  const total = principalCompounded + contributionsCompounded

  return total
}
