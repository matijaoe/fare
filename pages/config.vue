<script lang="ts" setup>
import { TabGroup, TabList, TabPanels } from '@headlessui/vue'

const config = useFireConfig()
</script>

<template>
  <LayoutPage>
    <LayoutSectionWrapper>
      <!-- Tabs -->
      <TabGroup>
        <TabList flex gap-2 pb-3 border-b-2 border-b-zinc-2>
          <FTab>
            FIRE
          </FTab>
          <FTab>
            Pension
          </FTab>
        </TabList>

        <TabPanels as="div" max-w-3xl>
          <FTabPanel
            desc="Fine tune your FIRE plan"
          >
            <div grid grid-cols-3 gap-x-4 gap-y-6>
              <FInput
                v-model="config.fiCalculations.monthlyIncome"
                label="Monthly income"
                placeholder="3500"
                icon="tabler:currency-euro"
                type="number"
              />

              <FInput
                v-model="config.fiCalculations.monthlyExpenditure"
                label="Monthly expenditure"
                placeholder="2250"
                icon="tabler:currency-euro"
                type="number"
              />

              <FInput
                v-model="config.fiCalculations.safeWithdrawalRate"
                label="Safe withdrawal rate"
                placeholder="4%"
                icon="tabler:percentage"
                type="number"
                :input-props="{ min: 0, max: 100 }"
              />
            </div>
          </FTabPanel>

          <FTabPanel
            desc="Your government pension parameters"
          >
            <div grid grid-cols-3 gap-x-4 gap-y-6>
              <FInput
                v-model="config.pensionCalculations.birthDate"
                label="Birth date"
                placeholder="10.12.1999."
                type="date"
              />

              <FInput
                v-model="config.pensionCalculations.retirementAge"
                label="Retirement age"
                placeholder="65"
                type="number"
                :input-props="{ min: 10, max: 120 }"
              />

              <FInput
                v-model="config.age"
                label="Current age"
                placeholder="65"
                type="number"
                disabled
                :input-props="{ min: 1, max: 120 }"
              />

              <FInput
                v-model="config.pensionCalculations.pensionAccessibilityAg"
                label="Pension accessability age"
                placeholder="55"
                type="number"
                :input-props="{ min: 20, max: 120 }"
              />
            </div>
          </FTabPanel>
        </TabPanels>
      </TabGroup>
    </LayoutSectionWrapper>
  </LayoutPage>
</template>
