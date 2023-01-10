<script lang="ts" setup>
const {
  isLoading: isNetWorthLoading,
  formattedNetWorth,
  formattedCashBalance,
  formattedInvestmentsBalance,
} = useNetWorth()

const { netWorthGoal, timeToNetWorthGoal, fiDate, isTimeToLoading } = $(useFireCalculation())

const { data: cashAccounts } = useCashAccounts()
const cashAccountsCount = computed(() => cashAccounts.value?.length ?? 0)

const { investmentAccountsCount, formattedAverageAnnualRate, isAccountsLoading: isAvgAnnualRateLoading } = useNestEgg()
</script>

<template>
  <LayoutPage>
    <div grid md:grid-cols-3 gap-4>
      <FCard white flex flex-col gap-6>
        <BalanceNetWorth
          label="Net worth"
          :loading="isNetWorthLoading"
          :net-worth="formattedNetWorth"
          :cash="formattedCashBalance"
          :investments="formattedInvestmentsBalance"
        />

        <div flex justify-center align-center>
          <ClientOnly>
            <ChartNetWorthPie
              total-data
              :height="300"
              :has-legend="false"
            />
          </ClientOnly>
        </div>

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
          <TransitionFade>
            <div v-if="(!isNetWorthLoading && cashAccountsCount > 0)">
              {{ cashAccountsCount }} accounts
            </div>
          </TransitionFade>
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
          <TransitionFade>
            <div v-if="(!isNetWorthLoading && investmentAccountsCount > 0)">
              {{ investmentAccountsCount }} accounts
            </div>
          </TransitionFade>

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
            <FSkeleton v-if="isAvgAnnualRateLoading" class="w-28 h-40px" />
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

        <FCard white row-span-2 flex flex-col gap-2>
          <template v-if="fiDate">
            <div flex flex-col items-start>
              You can achieve Financial Independence in
              <div font-bold text-3xl mt-2>
                <FSkeleton v-if="isTimeToLoading" class="w-40 h-36px" />
                <span v-else-if="timeToNetWorthGoal">
                  {{ monthsToYearsAndMonthsString(timeToNetWorthGoal) }}
                </span>
              </div>

              <div font-semibold text-lg mt-2>
                <FSkeleton v-if="isTimeToLoading" class="w-30 h-28px" />
                <span v-else-if="fiDate.age">
                  by the age of {{ fiDate.age }}
                </span>
              </div>
            </div>

            <div mt-auto>
              <div mt-6>
                <NuxtLink class="underline" :to="{ name: 'fi' }">
                  Explore FI
                </NuxtLink>
              </div>
            </div>
          </template>

          <template v-else>
            <p>Your Financial Independence date is unknown.</p>
            <div mt-auto>
              <div mt-6>
                <NuxtLink class="underline" :to="{ name: 'fi' }">
                  Configure your parameters.
                </NuxtLink>
              </div>
            </div>
          </template>
        </FCard>
      </div>
    </div>
  </LayoutPage>
</template>
