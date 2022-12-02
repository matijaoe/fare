import { calcCompoundInterestWithMonthlyContributions, monthsToYears } from '~~/utils'

export const useFireCalculation = () => {
  const {
    balance: cashBalance,
  } = useBalanceCash()

  const {
    balance: investmentsBalance,
    averageAnnualRate: annualRate,
  } = useNestEgg()

  const yearlySpending = 20000

  const monthlySavings = 1000
  const monthlyContribution = 0

  const safeWithdrawalRate = 0.04
  const netWorthGoalMultiplier = 100 / (100 * safeWithdrawalRate)
  const netWorthGoal = netWorthGoalMultiplier * yearlySpending

  // months to years

  const getCompoundedNestEgg = (months: number) => {
    const compoundedNestEgg = calcCompoundInterestWithMonthlyContributions({
      principal: investmentsBalance.value,
      monthlyContributions: monthlyContribution,
      annualRate: annualRate.value,
      years: monthsToYears(months),
    })

    return compoundedNestEgg
  }

  const getCompoundedNetWorth = (months: number) => {
    const compoundedNestEgg = getCompoundedNestEgg(months)
    const totalCash = cashBalance.value + (monthlySavings * months)
    const total = compoundedNestEgg + totalCash
    return {
      total,
      totalCash,
      compoundedNestEgg,
    }
  }

  const compoundedNetWorthForNextYears = computed(() => {
    return Array.from({ length: 4 }, (_, i) => i * 12).map((months) => {
      const { total, totalCash, compoundedNestEgg } = getCompoundedNetWorth(months)
      return {
        months,
        compoundedNestEgg,
        total,
        totalCash,
      }
    })
  })

  return {
    compoundedNetWorthForNextYears,
    getCompoundedNestEgg,
    getCompoundedNetWorth,
  }
}

/*
useInvestmentsMonthlyBalance

*/
