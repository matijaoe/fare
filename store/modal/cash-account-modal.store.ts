import type { Account } from '@prisma/client'
import { get, set } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { toTitleCase } from '~~/utils'

type ActionType = 'create' | 'edit'

export const useCashAccountModal = defineStore('modal-account', () => {
  const type = ref<ActionType>('create')

  const name = ref()
  const color = ref()
  const icon = ref()
  const $account = ref<Account>()

  const form = computed(() => ({
    name: get(name),
    icon: get(icon).value,
    color: get(color).value,
  }))

  const resetForm = () => {
    set($account, undefined)
    set(name, '')
    set(color, undefined)
    set(icon, undefined)
  }

  const open = ref(false)

  const opened = computed({
    get: () => open.value,
    set: value => set(open, value),
  })

  const launch = (account?: Account) => {
    set(open, true)

    if (account) {
      set(type, 'edit')
      set($account, account)
      set(name, account.name)
      set(color, {
        label: toTitleCase(account.color ?? 'None'),
        value: account.color,
        bg: `bg-${account.color}-5`,
        text: `text-${account.color}-5`,
      },
      )
      set(icon, {
        label: toTitleCase(account.icon?.split(':').at(-1) || 'None'),
        value: account.icon,
      })
    } else {
      set(type, 'create')
      resetForm()
    }
  }

  const hide = () => {
    set(open, false)
    set(type, 'create')
  }

  watch(type, (val) => {
    if (val === 'create') {
      resetForm()
    }
  })

  const isEdit = computed(() => type.value === 'edit')
  const isCreate = computed(() => type.value === 'create')

  return {
    type,
    isEdit,
    isCreate,
    opened,
    launch,
    hide,
    name,
    color,
    icon,
    form,
    account: $account,
    resetForm,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCashAccountModal, import.meta.hot))
}
