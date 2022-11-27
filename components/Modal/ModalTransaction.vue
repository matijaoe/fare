<script setup lang="ts">
import { RadioGroup, RadioGroupOption } from '@headlessui/vue'
import type { Prisma } from '@prisma/client'
import { get, set } from '@vueuse/core'
import { format, isDate } from 'date-fns'
import type { CashAccountWithAccount } from '~~/models/resources'
import type { SelectItem } from '~~/models/ui/select'

const modal = useTransactionModal()

const form = $computed(() => modal.form)

const transactionId = toRef(modal, 'transactionId')

const { mutate: createTransaction, isLoading: isCreateLoading, isError: isErrorCreate, reset: resetCreate } = useTransactionCreate()
const { mutate: updateTransaction, isLoading: isUpdateLoading, isError: isErrorUpdate, reset: resetUpdate } = useTransactionUpdate(transactionId)
const { mutate: deleteTransaction, isLoading: isDeleteLoading, isError: isErrorDelete, reset: resetDelete } = useTransactionDelete(transactionId)

const hasError = computed(() => get(isErrorCreate) || get(isErrorUpdate) || get(isErrorDelete))

const createTransactionHandler = async (values: Prisma.TransactionCreateWithoutUserInput) => {
  const userId = (await useAuth()).userId.value as string | undefined
  if (userId) {
    createTransaction({ ...values, userId }, {
      onSuccess: () => modal.hide(),
    })
  }
}

const editTransactionHandler = async (values: Prisma.TransactionUncheckedUpdateInput) => {
  const userId = (await useAuth()).userId.value as string | undefined

  if (userId) {
    updateTransaction({ ...values, userId }, {
      onSuccess: () => modal.hide(),
    })
  }
}

const deleteTransactionHandler = async () => {
  const userId = (await useAuth()).userId.value as string | undefined
  if (userId) {
    deleteTransaction({ userId }, {
      onSuccess: () => modal.hide(),
    })
  }
}

// Select options

const { data: categories } = useCategories()
const { data: accounts } = useCashAccounts({ transactions: false })

const categoryOptions = computed(() => get(categories)?.map(category => ({ ...category, label: category.name, value: category.id })) ?? [])
const accountOptions = computed(() => get(accounts)?.map(cashAccount => ({ ...cashAccount, label: cashAccount.account.name, value: cashAccount.id })) ?? [])

const fromAccountOptions = computed(() => get(accountOptions).filter((acc: SelectItem<CashAccountWithAccount>) => acc.id !== form.values.toAccountId) ?? [])
const toAccountOptions = computed(() => get(accountOptions).filter((acc: SelectItem<CashAccountWithAccount>) => acc.id !== form.values.fromAccountId) ?? [])

const modalConfig = computed(() => ({
  title: 'Transaction',
  description: modal.isEdit ? 'Edit a transaction' : 'Add a new transaction',
  closable: true,
  panelClass: '!w-full !md:min-w-[600px]',
}))

const onSubmit = form.handleSubmit((values) => {
  if (modal.isEdit) {
    editTransactionHandler(values)
  } else {
    createTransactionHandler(values)
  }
}, (err) => {
  console.error('Error submitting form', err)
})

const resetQueries = () => {
  resetCreate()
  resetUpdate()
  resetDelete()
}

const onClose = () => {
  modal.reset()
  resetQueries()
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

const shownDate = computed({
  get: () => form.values.date ? format(new Date(form.values.date), 'yyyy-MM-dd') : null,
  set: (val: string | null) => form.setFieldValue('date', val ? new Date(val) : null),
})
</script>

<template>
  <ModalBase
    v-model="modal.opened"
    v-bind="modalConfig"
    @close="onClose"
  >
    <form mt-4 flex flex-col gap-3 @submit.prevent="onSubmit">
      <FAlert v-if="hasError" type="error">
        <div flex flex-col items-start>
          <p>Something went wrong</p>
          <ul class="list-disc pl-3.5 mt-2">
            <li v-if="isErrorUpdate" text-sm font-normal>
              You probably did not change any information
            </li>
            <li v-else-if="isErrorCreate" text-sm font-normal>
              Check your info and try again
            </li>
          </ul>
        </div>
      </FAlert>

      <RadioGroup v-model="form.values.type">
        <div flex gap-2 text-center>
          <RadioGroupOption
            v-slot="{ checked }"
            flex-1
            cursor="pointer"
            value="Income"
          >
            <div
              p-6 font-display text-lg
              border="2 base rounded-md"
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
              p-6 font-display text-lg
              border="2 base rounded-md"
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
              p-6 font-display text-lg
              border="2 base rounded-md"
              :class="checked ? 'bg-indigo-1 text-indigo-8 !border-current' : 'bg-transparent hover:bg-zinc-1'"
            >
              Transfer
            </div>
          </RadioGroupOption>
        </div>
      </RadioGroup>

      <div grid grid-cols-2 gap-3>
        <div mt-4 flex flex-col gap-3>
          <FSelectField
            v-if="modal.isExpense || modal.isTransfer"
            v-model:value="form.values.fromAccountId"
            icon="tabler:arrow-up-right"
            label="From"
            placeholder="Pick an account"
            :items="fromAccountOptions"
            block
            :invalid="!!form.errors.fromAccountId"
            :error="form.errors.fromAccountId"
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
            v-model:value="form.values.toAccountId"
            icon="tabler:arrow-down-left"
            label="To"
            placeholder="Pick an account"
            :items="toAccountOptions"
            block
            :invalid="!!form.errors.toAccountId"
            :error="form.errors.toAccountId"
          >
            <template #option="{ item }">
              <div flex items-center gap-4>
                <FBadge :color="item.account.color">
                  {{ item.label }}
                </FBadge>
              </div>
            </template>
            <template #selected="{ item }">
              <div flex items-center justify-between gap-4>
                {{ item.label }}
                <FBadge :color="item.account.color">
                  {{ item.label }}
                </FBadge>
              </div>
            </template>
          </FSelectField>

          <FSelectField
            v-if="!modal.isTransfer"
            v-model:value="form.values.categoryId"
            :items="categoryOptions"
            icon="tabler:building-bank"
            label="Category"
            placeholder="Pick a category"
            block
            :invalid="!!form.errors.categoryId"
            :error="form.errors.categoryId"
          >
            <template #option="{ item }">
              <div flex items-center gap-4>
                <FBadge :color="item.color">
                  {{ item.label }}
                </FBadge>
              </div>
            </template>
            <template #selected="{ item }">
              <div flex items-center justify-between gap-4>
                {{ item.label }}
                <FBadge :color="item.color">
                  {{ item.label }}
                </FBadge>
              </div>
            </template>
          </FSelectField>

          <FInput
            v-model="form.values.amount"
            icon="tabler:currency-euro"
            label="Amount"
            type="number"
            placeholder="8.50"
            :input-props="{ min: 0.01, step: 0.01 }"
            :invalid="!!form.errors.amount"
            :error="form.errors.amount"
          />

          <FInput
            v-model="shownDate"
            type="date"
            icon="tabler:calendar"
            label="Date"
            :invalid="!!form.errors.date"
            :error="form.errors.date"
          />
        </div>

        <div mt-4 flex flex-col gap-3>
          <FInput
            v-model="form.values.name"
            icon="tabler:text-size"
            label="Name"
            placeholder="Lunch"
          />
          <FTextarea
            v-model="form.values.description"
            icon="tabler:align-left"
            label="Description"
            placeholder="Quinoa salad"
            :rows="8"
            :invalid="!!form.errors.description"
            :error="form.errors.description"
          />

          <div flex justify-end gap-2 mt-4>
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
              :disabled="!modal.formValidBasedOnAccountIds"
            >
              <!-- :disabled="!modal.formValid" -->
              Edit
            </FButton>
            <FButton
              v-if="modal.isCreate"
              type="submit"
              icon="tabler:plus"
              :loading="isCreateLoading"
              :disabled="!modal.formValidBasedOnAccountIds"
            >
              <!-- :disabled="!modal.formValid" -->
              Create
            </FButton>
          </div>
        </div>
      </div>
    </form>
  </ModalBase>
</template>
