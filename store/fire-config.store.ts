import type { User } from '@prisma/client'
import { differenceInYears, format, parse } from 'date-fns'
import { acceptHMRUpdate, defineStore } from 'pinia'

type FiConfig = Pick<User, 'yearlyIncome' | 'yearlyExpenditure' | 'yearlyInvestment' | 'safeWithdrawalRate'>
type GeneralConfig = Pick<User, 'birthDate' | 'pensionAccessibilityAge'>

export const useFireConfigStore = defineStore('fire-config', () => {
  const { userId } = useAuth()

  const { data: user } = useUser(userId)

  const fiConfig: FiConfig = reactive({
    yearlyIncome: null,
    yearlyExpenditure: null,
    yearlyInvestment: null, // net - savings
    safeWithdrawalRate: null,
  })

  const generalConfig: GeneralConfig = reactive({
    birthDate: null,
    pensionAccessibilityAge: null,
  })

  const yearlyCashSavings = computed(() => {
    const income = fiConfig.yearlyIncome ?? 0
    const expenditure = fiConfig.yearlyExpenditure ?? 0
    const investments = fiConfig.yearlyInvestment ?? 0
    return income - expenditure - investments
  })

  const yearlyNet = computed(() => {
    const { yearlyIncome, yearlyExpenditure } = fiConfig
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
    get: () => generalConfig.birthDate != null ? format(new Date(generalConfig.birthDate), 'yyyy-MM-dd') : null,
    set: (value: string | null | undefined) => {
      generalConfig.birthDate = value ? new Date(value) : null
    },
  })

  // TODO: how is it calculating age when no age is defined?
  const age = computed(() => {
    return isDefined(dobString) ? calculateAge(dobString.value) : null
  })

  const all = computed(() => ({ ...fiConfig, ...generalConfig }))

  whenever(user, (val) => {
    const fiKeys = ['yearlyIncome', 'yearlyExpenditure', 'yearlyInvestment', 'safeWithdrawalRate'] as (keyof FiConfig)[]
    fiKeys.forEach((key) => {
      fiConfig[key] = val[key]
    })

    const pensionKeys = ['birthDate', 'pensionAccessibilityAge'] as (keyof GeneralConfig)[]
    pensionKeys.forEach((key) => {
      const value = val[key]
      generalConfig[key] = value
    })
  }, { immediate: true })

  const hasChanged = computed(() => {
    return Object.keys(all.value).some((key) => {
      const value = all.value?.[key]
      const same = value !== user.value?.[key]
      return same
    })
  })

  return {
    generalConfig,
    fiConfig,
    age,
    dobString,
    yearlyCashSavings,
    yearlyNet,
    hasChanged,
    all,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFireConfigStore, import.meta.hot))
}
