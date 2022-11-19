<script lang="ts" setup>
const sidebar = useSidebar()
const { mdDown } = useBreakpoints()

const { data: totalBalance, isLoading: isBalanceLoading } = useCashAccountsBalance()

const balance = computed(() => totalBalance.value?.balance ?? 0)
const formattedTotalBalance = useCurrencyFormat(balance)
</script>

<template>
  <div
    absolute inset-0 h-screen overflow-y-auto
    pt-4 font-mono
    bg="white dark:zinc-9"
    border="r-0 md:r-2 base"
    flex="~ col gap-6"
    :class="{ '!hidden': !sidebar.isOpen }"
  >
    <div flex items-center justify-between mt-2 px-6>
      <NuxtLink to="/">
        <FLogo size="lg" />
      </NuxtLink>
      <button
        v-if="mdDown"
        grid content-center p-2
        class="translate-x-2"
      >
        <Icon
          name="tabler:x"
          text="2xl"
          @click="sidebar.close()"
        />
      </button>
    </div>

    <NavList flex-1 />

    <div bg="zinc-1 dark:transparent">
      <div
        flex="~ col gap-0.5"
        p="4 y-3"
      >
        <p text="xs zinc-4" font="sans medium" uppercase>
          Balance
        </p>
        <div flex gap-2 items-center>
          <p text-3xl font-display font-medium>
            <span v-if="isBalanceLoading">€X,XXX.XX</span>
            <span v-else>{{ formattedTotalBalance }}</span>
          </p>
          <FLoader v-if="isBalanceLoading" />
        </div>
      </div>

      <NavControls
        py-4 max-w="fit" mx-auto
      />
    </div>
  </div>
</template>
