<script setup lang="ts">
import { RadioGroup, RadioGroupOption } from '@headlessui/vue'
import type { Prisma } from '@prisma/client'
import { get, set } from '@vueuse/core'
import type { CashAccountWithAccount } from '~~/models/resources/account'
import type { SelectItem } from '~~/models/ui/select'

const modal = useTransactionModal()

// CRUD ---------------------------------
const { mutate: createTransaction, isLoading: isCreateLoading, isError: isErrorCreate, reset: resetCreate } = useTransactionCreate()
const { mutate: updateTransaction, isLoading: isUpdateLoading, isError: isErrorUpdate, reset: resetUpdate } = useTransactionUpdate(toRef(modal, 'transactionId'))
const { mutate: deleteTransaction, isLoading: isDeleteLoading, isError: isErrorDelete, reset: resetDelete } = useTransactionDelete(toRef(modal, 'transactionId'))

const hasError = computed(() => get(isErrorCreate) || get(isErrorUpdate) || get(isErrorDelete))

const isErrorShown = ref(false)
watch(hasError, val => set(isErrorShown, !!val))

const createTransactionHandler = () => {
  createTransaction(modal.form as Prisma.TransactionUncheckedCreateWithoutUserInput, {
    onSuccess: () => {
      modal.hide()
    },
  })
}

const editTransactionHandler = (values: Prisma.TransactionUpdateWithoutUserInput) => {
  updateTransaction(values, {
    onSuccess: () => {
      modal.hide()
    },
  })
}

const deleteTransactionHandler = () => {
  deleteTransaction(undefined, {
    onSuccess: () => {
      modal.hide()
    },
  })
}

// Select options

const { data: categories } = useCategories()
const { data: accounts } = useCashAccounts({ transactions: false })

const categoryOptions = computed(() => get(categories)?.map(category => ({ ...category, label: category.name, value: category.id })) ?? [])
const accountOptions = computed(() => get(accounts)?.map(cashAccount => ({ ...cashAccount, label: cashAccount.account.name, value: cashAccount.id })) ?? [])

const fromAccountOptions = computed(() => get(accountOptions).filter((acc: SelectItem<CashAccountWithAccount>) => acc.id !== modal.form.toAccountId) ?? [])
const toAccountOptions = computed(() => get(accountOptions).filter((acc: SelectItem<CashAccountWithAccount>) => acc.id !== modal.form.fromAccountId) ?? [])

const modalConfig = computed(() => ({
  title: 'Transaction',
  description: modal.isEdit ? 'Edit a transaction' : 'Add a new transaction',
  closable: true,
  panelClass: '!w-full !md:min-w-[600px]',
}))

const onSubmit = () => {
  if (modal.isEdit) {
    editTransactionHandler(modal.form)
  } else {
    createTransactionHandler()
  }
}

const deleteBtn = ref<HTMLElement | null>(null)
const longPressedHook = ref(false)

const onLongPressCallbackHook = () => {
  set(longPressedHook, true)
  deleteTransactionHandler()
}

onLongPress(
  deleteBtn,
  onLongPressCallbackHook,
  {
    modifiers: { prevent: true },
    delay: 1000,
  },
)
</script>

<template>
  <ModalBase
    v-model="modal.opened"
    v-bind="modalConfig"
    @close="modal.hide"
  >
    <form
      mt-4
      flex
      flex-col
      gap-3
      @submit.prevent="onSubmit"
    >
      <FAlert v-if="isErrorCreate" type="info">
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
            v-if="modal.isExpense || modal.isTransfer"
            v-model="modal.selectedFromAccount"
            icon="tabler:arrow-up-right"
            label="From"
            placeholder="Pick an account"
            :items="fromAccountOptions"
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
            v-if="modal.isIncome || modal.isTransfer"
            v-model="modal.selectedToAccount"
            icon="tabler:arrow-down-left"
            label="To"
            placeholder="Pick an account"
            :items="toAccountOptions"
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
            v-if="!modal.isTransfer"
            v-model="modal.selectedCategory"
            icon="tabler:building-bank"
            label="Category"
            placeholder="Pick a category"
            :items="categoryOptions"
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

          <div
            flex
            justify-end
            gap-2
            mt-4
          >
            <FButton type="button" variant="subtle" @click="modal.hide()">
              Cancel
            </FButton>

            <FTooltip content="Hold to delete" placement="bottom">
              <FButton
                v-if="modal.isEdit"
                ref="deleteBtn"
                type="button"
                variant="danger"
                :disabled="isUpdateLoading || isCreateLoading"
                :loading="isDeleteLoading"
                icon="tabler:x"
              >
                Delete
              </FButton>
            </FTooltip>

            <FButton
              v-if="modal.isEdit"
              type="submit"
              icon="tabler:edit"
              :loading="isUpdateLoading"
            >
              Edit
            </FButton>
            <FButton
              v-if="modal.isCreate"
              type="submit"
              icon="tabler:plus"
              :loading="isCreateLoading"
            >
              Create
            </FButton>
          </div>
        </div>
      </div>
    </form>
  </ModalBase>
</template>
