import { isDef } from '@vueuse/core'
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

  const timeToNetWorthGoal = computed(() => {
    if (!netWorthGoal.value) {
      return null
    }

    // TODO: reuse already calculated values

    for (let i = 0; ; i++) {
      const months = i
      const nwData = getCompoundedNetWorth(months)
      if (nwData.total >= netWorthGoal.value) {
        return months
      }
      if (months > yearsToMonths(120)) {
        return null
      }
    }
  })

  // TODO: something aint right
  const compoundedNetWorthForNextYears = computed(() => {
    const years = isDefined(timeToNetWorthGoal) ? monthsToYears(timeToNetWorthGoal.value) + 1 : yearCount.value
    // TODO: dont use year count but use timeToNetWorthGoal
    return [...Array.from({ length: 1 + years }, (_, i) => {
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
    timeToNetWorthGoal,
  }
}

