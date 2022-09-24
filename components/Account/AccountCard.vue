<script setup lang="ts">
import type { Account } from '@prisma/client'

type Props = {
  account: Account
}

const props = defineProps<Props>()

const {
  colorSolidBg,
  colorSolidText,
  colorDotText,
  colorDotBg,
} = useAppColors(props.account.color)
</script>

<template>
  <FCard
    overflow-hidden
    white
    paddingless
    aspect="2/1 sm:3/2"
    flex="~ col"
    relative
  >
    <div p-4 flex="1 ~ col">
      <div
        flex
        items-center
        gap-4
        z-2
      >
        <div
          rounded-full
          :class="[colorSolidBg]"
          w-10
          h-10
          flex-center
          absolute
          top--4
          left--4
          z-1
          class="transform origin-center scale-800 sm:scale-600 dark:opacity-25"
        />
        <Icon :name="account.icon" :class="[colorDotText]" z-2 />
        <p z-2 font="display">
          {{ account.name }}
        </p>
      </div>

      <div
        mt-3
        flex="1 ~ col"
        justify-center
        relative
        z-2
        text-center
        font-mono
      >
        <div
          text="3xl"
        >
          €2478.23
        </div>
        <div text-sm mt-1 opacity-70>
          -€150.45 this month
        </div>
      </div>
    </div>

    <div
      mt-auto
      z-2
      grid="~ cols-2"
      border="base dark:zinc-7 t-dashed t-2"
      text-center
      relative
      bg="white dark:zinc-8"
      text="lg"
    >
      <div
        z-2
        py-4
        border="base dark:zinc-7 r-dashed r-1"
        w-full
        font="mono"
      >
        €189.40
      </div>
      <div
        z-2
        py-4
        border="base dark:zinc-7 l-dashed l-1"
        w-full
        font="mono"
      >
        €324.95
      </div>
    </div>
  </FCard>
</template>
