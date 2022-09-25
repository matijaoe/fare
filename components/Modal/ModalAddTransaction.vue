<script setup lang="ts">
import type { LedgerEntryType } from '@prisma/client'
import { useNewTransactionModal } from '~~/store/modal/add-transaction'

const modal = useNewTransactionModal()

const modalConfig = computed(() => ({
  title: 'Add new entry',
  description: 'Add a new entry to your ledger',
  closable: true,
}))

const isType = (type: LedgerEntryType) => modal.transactionType === type

const setType = (type: LedgerEntryType) => {
  modal.setTransactionType(type)
}

const { data: categories } = useCategories()
const { data: cashAccounts } = useAccounts()

const categoryOptions = computed(() => {
  return categories.value?.map(category => ({
    ...category,
    label: category.name,
    value: category.id,
  })) ?? []
})

const form = reactive({
  name: '',
  description: '',
  amount: 0,
  date: new Date(),
  category: null,
})

// label value, disalbled
// {
//         "id": "cl85t7mxp002277uuos3a2p73",
//         "name": "Snacks",
//         "color": "rose",
//         "icon": "tabler:pizza",
//         "userId": null
//     },
</script>

<template>
  <ModalBase v-model="modal.opened" v-bind="modalConfig">
    <div flex gap-2>
      <FButton :variant="isType('Income') ? 'primary' : 'outline'" @click="setType('Income')">
        Income
      </FButton>
      <FButton :variant="isType('Expense') ? 'primary' : 'outline'" @click="setType('Expense')">
        Expense
      </FButton>
      <FButton :variant="isType('Transfer') ? 'primary' : 'outline'" @click="setType('Transfer')">
        Transfer
      </FButton>
    </div>
    <div
      mt-4
      flex
      flex-col
      gap-3
    >
      <FSelectField
        v-model="form.category"
        icon="tabler:category"
        label="Category"
        placeholder="Pick a category"
        :items="categoryOptions"
        block
      />
      <FInput icon="tabler:text-size" label="Name" placeholder="Lunch" />
      <FTextarea icon="tabler:align-left" label="Description" placeholder="Quinoa salad" />
      <FInput
        icon="tabler:currency-euro"
        label="Amount"
        type="number"
        placeholder="8.50"
        :input-props="{ min: 0.10, step: 0.01 }"
      />
      <FInput type="date" icon="tabler:calendar" label="Date" />
    </div>
  </ModalBase>
</template>
