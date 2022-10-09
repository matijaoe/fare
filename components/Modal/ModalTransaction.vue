<script setup lang="ts">
import {
  RadioGroup,
  RadioGroupLabel,
  RadioGroupOption,
} from '@headlessui/vue'
import type { Prisma } from '@prisma/client'

const modal = useTransactionModal()
const { mutate: create, isError, isLoading } = useTransactionCreate()

const modalConfig = computed(() => ({
  title: 'New transaction',
  description: 'Add a new transaction',
  closable: true,
}))

const createTransaction = () => {
  create(modal.form as Prisma.TransactionUncheckedCreateWithoutUserInput, {
    onSuccess: () => {
      modal.hide()
    },
  })
}
</script>

<template>
  <ModalBase v-model="modal.opened" v-bind="modalConfig" panel-class="!w-full !md:min-w-[600px]">
    <form
      mt-4
      flex
      flex-col
      gap-3
      @submit.prevent="createTransaction"
    >
      <FAlert v-if="isError" type="info">
        Something went wrong.
      </FAlert>

      <RadioGroup v-model="modal.type">
        <div flex gap-2 text-center>
          <RadioGroupOption
            v-slot="{ checked }"
            flex-1
            cursor="pointer"
            value="Income"
          >
            <div
              p-6
              border="2 base rounded-md"
              font-display
              text-lg
              :class="checked ? 'bg-green-1 text-green-8 !border-current' : 'bg-transparent hover:bg-zinc-1'"
            >
              Income
            </div>
          </RadioGroupOption>
          <RadioGroupOption
            v-slot="{ checked }"
            flex-1
            cursor="pointer"
            value="Expense"
          >
            <div
              p-6
              border="2 base rounded-md"
              font-display
              text-lg
              :class="checked ? 'bg-zinc-2 text-zinc-8 !border-current' : 'bg-transparent hover:bg-zinc-1'"
            >
              Expense
            </div>
          </RadioGroupOption>
          <RadioGroupOption
            v-slot="{ checked }"
            flex-1
            cursor="pointer"
            value="Transfer"
          >
            <div
              p-6
              border="2 base rounded-md"
              font-display
              text-lg
              :class="checked ? 'bg-indigo-1 text-indigo-8 !border-current' : 'bg-transparent hover:bg-zinc-1'"
            >
              Transfer
            </div>
          </RadioGroupOption>
        </div>
      </RadioGroup>

      <div grid grid-cols-2 gap-3>
        <div
          mt-4
          flex
          flex-col
          gap-3
        >
          <FSelectField
            v-if="modal.isType('Expense') || modal.isType('Transfer')"
            v-model="modal.fromAccount"
            icon="tabler:arrow-up-right"
            label="From"
            placeholder="Pick an account"
            :items="modal.fromAccountOptions"
            block
          >
            <template #option="{ item }">
              <div flex items-center gap-4>
                <FBadge :color="item.account.color">
                  {{ item.label }}
                </FBadge>
              </div>
            </template>
            <template #selected="{ item }">
              <div
                flex
                items-center
                justify-between
                gap-4
              >
                {{ item.label }}
                <FBadge :color="item.account.color">
                  {{ item.label }}
                </FBadge>
              </div>
            </template>
          </FSelectField>
          <FSelectField
            v-if="modal.isType('Income') || modal.isType('Transfer')"
            v-model="modal.toAccount"
            icon="tabler:arrow-down-left"
            label="To"
            placeholder="Pick an account"
            :items="modal.toAccountOptions"
            block
          >
            <template #option="{ item }">
              <div flex items-center gap-4>
                <FBadge :color="item.account.color">
                  {{ item.label }}
                </FBadge>
              </div>
            </template>
            <template #selected="{ item }">
              <div
                flex
                items-center
                justify-between
                gap-4
              >
                {{ item.label }}
                <FBadge :color="item.account.color">
                  {{ item.label }}
                </FBadge>
              </div>
            </template>
          </FSelectField>

          <FSelectField
            v-if="!modal.isType('Transfer')"
            v-model="modal.category"
            icon="tabler:building-bank"
            label="Category"
            placeholder="Pick a category"
            :items="modal.categoryOptions"
            block
          >
            <template #option="{ item }">
              <div flex items-center gap-4>
                <FBadge :color="item.color">
                  {{ item.label }}
                </FBadge>
              </div>
            </template>
            <template #selected="{ item }">
              <div
                flex
                items-center
                justify-between
                gap-4
              >
                {{ item.label }}
                <FBadge :color="item.color">
                  {{ item.label }}
                </FBadge>
              </div>
            </template>
          </FSelectField>

          <FInput
            v-model="modal.amount"
            icon="tabler:currency-euro"
            label="Amount"
            type="number"
            placeholder="8.50"
            :input-props="{ min: 0.10, step: 0.01 }"
          />

          <FInput
            v-model="modal.date"
            type="date"
            icon="tabler:calendar"
            label="Date"
          />
        </div>

        <div
          mt-4
          flex
          flex-col
          gap-3
        >
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
            :rows="8"
          />

          <div flex justify-end gap-2>
            <FButton type="button" variant="subtle" @click="modal.hide">
              Cancel
            </FButton>
            <FButton type="submit" :loading="isLoading">
              <template #left>
                <Icon name="tabler:plus" />
              </template>
              Add
            </FButton>
          </div>
        </div>
      </div>
    </form>
  </ModalBase>
</template>
