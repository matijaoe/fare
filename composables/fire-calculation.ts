import { addMonths } from 'date-fns'
import type { Ref } from 'vue'
import { calcCompoundInterestWithMonthlyContributions, monthsToYears } from '~~/utils'

export const useFireCalculation = (_yearCount?: Ref<number>) => {
  const {
    balance: cashBalance,
    isBalanceLoading,
  } = $(useBalanceCash())

  const fireConfigStore = useFireConfigStore()
  const {
    balance: investmentsBalance,
    averageAnnualRate: annualRate,
  } = useNestEgg()

  const { netWorth } = useNetWorth()

  const netWorthGoal = computed(() => {
    const { safeWithdrawalRate, yearlyExpenditure } = fireConfigStore.fiConfig

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
    const yearlyInvestment = fireConfigStore.fiConfig.yearlyInvestment ?? 0
    const monthlyContribution = yearlyInvestment / 12

    const compoundedNestEgg = calcCompoundInterestWithMonthlyContributions({
      principal: investmentsBalance.value,
      monthlyContributions: monthlyContribution,
      annualRate: annualRate.value,
      years: monthsToYears(months),
    })

    return compoundedNestEgg
  }

  const getCompoundedNetWorth = (months: number) => {
    const { yearlyCashSavings } = fireConfigStore
    const monthlySavings = yearlyCashSavings / 12

    const compoundedNestEgg = getCompoundedNestEgg(months)
    const totalCash = cashBalance + (monthlySavings * months)
    const total = compoundedNestEgg + totalCash

    const yearlyInvestment = fireConfigStore.fiConfig.yearlyInvestment ?? 0
    const monthlyContribution = yearlyInvestment / 12

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

  const fiDate = computed(() => {
    if (timeToNetWorthGoal.value == null) {
      return null
    }

    const { birthDate } = fireConfigStore.generalConfig

    const fiDate = addMonths(new Date(), timeToNetWorthGoal.value)
    const fiAge = birthDate ? new Date(fiDate).getFullYear() - new Date(birthDate).getFullYear() : null

    return {
      date: fiDate,
      age: fiAge,
    }
  })

  const isTimeToLoading = computed(() => {
    return isBalanceLoading || !isDefined(timeToNetWorthGoal) || !isDefined(netWorthGoal)
  })

  const yearCount = computed(() => _yearCount?.value ?? 0)

  const compoundedNetWorthForNextYears = computed(() => {
    const years = isDefined(timeToNetWorthGoal) ? monthsToYears(timeToNetWorthGoal.value) + 1 : yearCount.value
    return [...Array.from({ length: 1 + years + yearCount.value }, (_, i) => {
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
    fiDate,
    isTimeToLoading,
  }
}
