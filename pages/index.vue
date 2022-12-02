<script lang="ts" setup>
onMounted(() => setBreadcrumbs([
  { label: 'Dashboard', href: { name: 'index' } },
]))

const {
  isLoading: isNetWorthLoading,
  formattedNetWorth,
  formattedCashBalance,
  formattedInvestmentsBalance,
} = useNetWorth()
</script>

<template>
  <LayoutPage>
    <div grid grid-cols-3 gap-4>
      <FCard flex flex-col gap-6>
        <BalanceNetWorth
          label="Nest egg"
          :loading="isNetWorthLoading"
          :net-worth="formattedNetWorth"
          :cash="formattedCashBalance"
          :investments="formattedInvestmentsBalance"
        />
        <div mt-auto>
          <NuxtLink class="underline" :to="{ name: 'net-worth' }">
            Explore net worth
          </NuxtLink>
        </div>
      </FCard>

      <FCard flex flex-col gap-6>
        <BalanceBasic
          label="Net worth"
          :loading="isNetWorthLoading"
          :balance="formattedInvestmentsBalance"
        />
        <div mt-auto>
          <NuxtLink class="underline" :to="{ name: 'nest-egg' }">
            Explore investments
          </NuxtLink>
        </div>
      </FCard>

      <FCard flex flex-col gap-6>
        <BalanceBasic
          label="Cash accounts"
          :loading="isNetWorthLoading"
          :balance="formattedCashBalance"
        />
        <div mt-auto>
          <NuxtLink class="underline" :to="{ name: 'accounts' }">
            Explore cash accounts
          </NuxtLink>
        </div>
      </FCard>
    </div>
  </LayoutPage>
</template>
