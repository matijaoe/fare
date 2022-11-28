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

  return {
    pensionCalculations,
    fiCalculations,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFireConfig, import.meta.hot))
}
