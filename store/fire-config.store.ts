import { differenceInYears, parse } from 'date-fns'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useFireConfig = defineStore('fire-configuration', () => {
  const fiCalculations = reactive({
    monthlyIncome: null,
    monthlyExpenditure: null,
    safeWithdrawalRate: 4,
  })

  const pensionCalculations = reactive({
    birthDate: null,
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
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFireConfig, import.meta.hot))
}
