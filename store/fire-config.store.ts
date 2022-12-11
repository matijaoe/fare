import type { User } from '@prisma/client'
import { differenceInYears, format, parse } from 'date-fns'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { set } from '@vueuse/core'

type FiCalculations = Pick<User, 'yearlyIncome' | 'yearlyExpenditure' | 'yearlyInvestment' | 'safeWithdrawalRate'>
type PensionCalculations = Pick<User, 'birthDate' | 'retirementAge' | 'pensionAccessibilityAge'>

export const useFireConfig = defineStore('fire-configuration', () => {
  const userId = ref<string>()
  const setUserId = (id: string) => set(userId, id)

  const { data: user } = useUser(userId)

  const fiCalculations: FiCalculations = reactive({
    yearlyIncome: null,
    yearlyExpenditure: null,
    yearlyInvestment: null, // net - savings
    safeWithdrawalRate: null,
  })

  const pensionCalculations: PensionCalculations = reactive({
    birthDate: null,
    retirementAge: null,
    pensionAccessibilityAge: null,
  })

  const yearlyCashSavings = computed(() => {
    const income = fiCalculations.yearlyIncome ?? 0
    const expenditure = fiCalculations.yearlyExpenditure ?? 0
    const investments = fiCalculations.yearlyInvestment ?? 0
    return income - expenditure - investments
  })

  const yearlyNet = computed(() => {
    const { yearlyIncome, yearlyExpenditure } = fiCalculations
    if (!yearlyIncome || !yearlyExpenditure) {
      return 0
    }
    return yearlyIncome - yearlyExpenditure
  })

  const calculateAge = (dob: string): number => {
    const date = parse(dob, 'yyyy-MM-dd', new Date())
    return differenceInYears(new Date(), date)
  }

  const dobString = computed({
    get: () => pensionCalculations.birthDate != null ? format(pensionCalculations.birthDate, 'yyyy-MM-dd') : null,
    set: (value: string | null | undefined) => {
      pensionCalculations.birthDate = value ? new Date(value) : null
    },
  })

  // TODO: how is it calculating age when no age is defined?
  const age = computed(() => {
    return isDefined(dobString) ? calculateAge(dobString.value) : null
  })

  const all = computed(() => ({ ...fiCalculations, ...pensionCalculations }))

  whenever(user, (val) => {
    console.log('user changed', val)
    const fiKeys = ['yearlyIncome', 'yearlyExpenditure', 'yearlyInvestment', 'safeWithdrawalRate'] as (keyof FiCalculations)[]
    fiKeys.forEach((key) => {
      fiCalculations[key] = val[key]
    })

    const pensionKeys = ['birthDate', 'retirementAge', 'pensionAccessibilityAge'] as (keyof PensionCalculations)[]
    pensionKeys.forEach((key) => {
      const value = val[key]
      pensionCalculations[key] = val[key]
    })
  })

  const hasChanged = computed(() => {
    return Object.keys(all.value).some((key) => {
      const value = all.value?.[key]
      const same = value !== user.value?.[key]
      console.log(same, key, value, user.value?.[key])
      return same
    })
  })

  return {
    pensionCalculations,
    fiCalculations,
    age,
    dobString,
    yearlyCashSavings,
    yearlyNet,
    setUserId,
    hasChanged,
    all,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFireConfig, import.meta.hot))
}
