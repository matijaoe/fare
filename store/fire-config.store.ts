import { acceptHMRUpdate, defineStore } from 'pinia'

export const useFireConfig = defineStore('fire-configuration', () => {
  const fiCalculations = reactive({
    monthlyExpenditure: null,
  })

  const pensionCalculations = reactive({
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
