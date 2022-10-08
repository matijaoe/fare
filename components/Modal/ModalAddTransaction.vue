<script setup lang="ts">
import type { Prisma } from '@prisma/client'

const modal = useAddTransactionModal()
const { mutate: create } = useTransactionCreate()

const modalConfig = computed(() => ({
  title: 'New transaction',
  description: 'Add a new transaction',
  closable: true,
}))

const createTransaction = () => {
  create(modal.form as Prisma.TransactionUncheckedCreateWithoutUserInput, {
    onSuccess: modal.hide,
  })
}
</script>

<template>
  <ModalBase v-model="modal.opened" v-bind="modalConfig">
    <div flex gap-2>
      <FButton :variant="modal.isType('Income') ? 'primary' : 'outline'" @click="modal.setType('Income')">
        Income
      </FButton>
      <FButton :variant="modal.isType('Expense') ? 'primary' : 'outline'" @click="modal.setType('Expense')">
        Expense
      </FButton>
      <FButton :variant="modal.isType('Transfer') ? 'primary' : 'outline'" @click="modal.setType('Transfer')">
        Transfer
      </FButton>
    </div>
    <form
      mt-4
      flex
      flex-col
      gap-3
      @submit.prevent="createTransaction"
    >
      <FSelectField
        v-model="modal.fromAccount"
        icon="tabler:category"
        label="From account"
        placeholder="Pick an account"
        :items="modal.fromAccountsOptions"
        block
      />
      <FSelectField
        v-model="modal.category"
        icon="tabler:building-bank"
        label="Category"
        placeholder="Pick a category"
        :items="modal.categoryOptions"
        block
      />
      <FInput
        v-model="modal.name"
        icon="tabler:text-size"
        label="Name"
        placeholder="Lunch"
      />
      <FTextarea
        v-model="modal.description"
        icon="tabler:align-left"
        label="Description"
        placeholder="Quinoa salad"
      />
      <FInput
        v-model="modal.amount"
        icon="tabler:currency-euro"
        label="Amount"
        type="number"
        placeholder="8.50"
        :input-props="{ min: 0.10, step: 0.01 }"
      />
      <FInput type="date" icon="tabler:calendar" label="Date" />
      <FButton type="submit">
        Add
      </FButton>
      <pre>{{ modal.form }}</pre>
    </form>
  </ModalBase>
</template>
