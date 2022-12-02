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

const { data: cashAccounts } = useCashAccounts()
const cashAccountsCount = computed(() => cashAccounts.value?.length ?? 0)

const { investmentAccountsCount, formattedAverageAnnualRate } = toRefs(useNestEggStore())
</script>

<template>
  <LayoutPage>
    <div grid grid-cols-3 gap-4>
      <FCard white flex flex-col gap-6>
        <BalanceNetWorth
          label="Net worth"
          :loading="isNetWorthLoading"
          :net-worth="formattedNetWorth"
          :cash="formattedCashBalance"
          :investments="formattedInvestmentsBalance"
        />

        <ChartNetWorthPie
          :height="100"
          :has-legend="false"
          responsive
        />

        <div mt-auto>
          <div mt-6>
            <NuxtLink class="underline" :to="{ name: 'net-worth' }">
              Explore net worth
            </NuxtLink>
          </div>
        </div>
      </FCard>

      <div grid grid-rows-2 gap-4>
        <FCard white flex flex-col gap-3>
          <BalanceBasic
            label="Cash accounts"
            :loading="isNetWorthLoading"
            :balance="formattedCashBalance"
          />
          <div>
            {{ cashAccountsCount }} accounts
          </div>
          <div mt-auto>
            <div mt-6>
              <NuxtLink class="underline" :to="{ name: 'accounts' }">
                Explore cash accounts
              </NuxtLink>
            </div>
          </div>
        </FCard>

        <FCard white flex flex-col gap-3>
          <BalanceBasic
            label="Nest egg"
            :loading="isNetWorthLoading"
            :balance="formattedInvestmentsBalance"
          />
          <div>
            {{ investmentAccountsCount }} accounts
          </div>

          <div mt-auto>
            <div mt-6>
              <NuxtLink class="underline" :to="{ name: 'nest-egg' }">
                Explore investments
              </NuxtLink>
            </div>
          </div>
        </FCard>
      </div>

      <div grid grid-rows-4 gap-4>
        <FCard white flex flex-col gap-2>
          <div flex items-start justify-between>
            <p font-semibold text-4xl>
              {{ formattedAverageAnnualRate }}
            </p>
            <BasicLabel size="sm">
              Avg annual rate
            </BasicLabel>
          </div>
          <p class="text-dimmed text-sm" mt-auto>
            Calculated off of your investments
          </p>
        </FCard>

        <FCard white flex flex-col gap-2>
          <div flex items-start justify-between>
            <div font-semibold text-4xl>
              {{ formatPercentage(0.04) }}
            </div>
            <BasicLabel size="sm">
              Safe withdrawal rate
            </BasicLabel>
          </div>
          <div mt-auto>
            <FTooltip content="How much you can safely withdraw out of your portfolio per year, without running out of money">
              <div class="text-dimmed text-sm" inline-flex items-start gap-3>
                <Icon name="tabler:info-circle" shrink-0 />
                <p line-clamp-2>
                  How much you can safely withdraw out of your portfolio per year, without running out of money
                </p>
              </div>
            </FTooltip>
          </div>
        </FCard>
      </div>
    </div>
  </LayoutPage>
</template>
