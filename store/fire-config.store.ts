import { differenceInYears, format, parse } from 'date-fns'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useFireConfig = defineStore('fire-configuration', () => {
  const fiCalculations = reactive({
    yearlyIncome: 45000,
    yearlyExpenditure: 25000,
    // net is investments + savings
    yearlyInvestments: 16000,
    safeWithdrawalRate: 4,
  })

  const yearlyCashSavings = computed(() => {
    const income = fiCalculations.yearlyIncome ?? 0
    const expenditure = fiCalculations.yearlyExpenditure ?? 0
    const investments = fiCalculations.yearlyInvestments ?? 0
    return income - expenditure - investments
  })

  const yearlyNet = computed(() => {
    const { yearlyIncome, yearlyExpenditure } = fiCalculations
    return yearlyIncome - yearlyExpenditure
  })

  const pensionCalculations = reactive({
    birthDate: format(new Date('1999-12-10'), 'yyyy-MM-dd'),
    retirementAge: null,
    pensionAccessibilityAg: null,
  })

  const calculateAge = (dob: string): number => {
    const date = parse(dob, 'yyyy-MM-dd', new Date())
    return differenceInYears(new Date(), date)
  }

  const age = computed(() => {
    const dob = pensionCalculations.birthDate
    return dob ? calculateAge(dob) : null
  })

  return {
    pensionCalculations,
    fiCalculations,
    age,
    yearlyCashSavings,
    yearlyNet,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFireConfig, import.meta.hot))
}
