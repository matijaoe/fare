import type { Ref } from 'vue'
import { calcCompoundInterestWithMonthlyContributions, monthsToYears } from '~~/utils'

export const useFireCalculation = (yearCount: Ref<number>) => {
  const {
    balance: cashBalance,
  } = useBalanceCash()

  const fireConfig = useFireConfig()

  const {
    balance: investmentsBalance,
    averageAnnualRate: annualRate,
  } = useNestEgg()

  const { netWorth } = useNetWorth()

  const netWorthGoal = computed(() => {
    const { safeWithdrawalRate, yearlyExpenditure } = fireConfig.fiCalculations

    if (!safeWithdrawalRate || !yearlyExpenditure) {
      return null
    }

    const multiplier = 100 / safeWithdrawalRate
    return multiplier * yearlyExpenditure
  })

  const moneyTillNetWorthGoal = computed(() => {
    if (!netWorthGoal.value) {
      return null
    }

    return netWorthGoal.value - netWorth.value
  })

  const getCompoundedNestEgg = (months: number) => {
    const yearlyInvestments = fireConfig.fiCalculations.yearlyInvestments ?? 0
    const monthlyContribution = yearlyInvestments / 12

    const compoundedNestEgg = calcCompoundInterestWithMonthlyContributions({
      principal: investmentsBalance.value,
      monthlyContributions: monthlyContribution,
      annualRate: annualRate.value,
      years: monthsToYears(months),
    })

    return compoundedNestEgg
  }

  const getCompoundedNetWorth = (months: number) => {
    const { yearlyCashSavings } = fireConfig
    const monthlySavings = yearlyCashSavings / 12

    const compoundedNestEgg = getCompoundedNestEgg(months)
    const totalCash = cashBalance.value + (monthlySavings * months)
    const total = compoundedNestEgg + totalCash

    const yearlyInvestments = fireConfig.fiCalculations.yearlyInvestments ?? 0
    const monthlyContribution = yearlyInvestments / 12

    const earnedPureInterest = compoundedNestEgg - investmentsBalance.value - (monthlyContribution * months)

    return {
      total,
      totalCash,
      compoundedNestEgg,
      earnedPureInterest,
    }
  }

  // TODO: something aint right
  const compoundedNetWorthForNextYears = computed(() => {
    return [...Array.from({ length: 1 + yearCount.value }, (_, i) => {
      const months = i * 12
      return months
    })]
      .map((months) => {
        const data = getCompoundedNetWorth(months)
        return {
          months,
          ...data,
        }
      })
  })

  return {
    netWorthGoal,
    compoundedNetWorthForNextYears,
    getCompoundedNestEgg,
    getCompoundedNetWorth,
    moneyTillNetWorthGoal,
  }
}

