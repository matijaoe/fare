<script lang="ts" setup>
import { TabGroup, TabList, TabPanels } from '@headlessui/vue'

const config = useFireConfig()
const { userId } = await useAuth()
const { data: user } = useUser(userId)
</script>

<template>
  <LayoutPage>
    <pre>id: {{ userId }}</pre>
    <pre>user: {{ user }}</pre>
    <LayoutSectionWrapper>
      <!-- Tabs -->
      <TabGroup>
        <TabList flex gap-2 pb-3 border="b-2" border-base>
          <FTab>
            FIRE
          </FTab>
          <FTab>
            Pension
          </FTab>
        </TabList>

        <TabPanels as="div" max-w-4xl>
          <FTabPanel
            desc="Fine tune your FIRE plan"
          >
            <div grid grid-cols-3 gap-x-4 gap-y-6>
              <FInput
                v-model="config.fiCalculations.yearlyIncome"
                label="Yearly income"
                placeholder="3500"
                icon="tabler:currency-euro"
                type="number"
              />

              <FInput
                v-model="config.fiCalculations.yearlyExpenditure"
                label="Yearly expenditure"
                placeholder="2250"
                icon="tabler:currency-euro"
                type="number"
              />

              <FInput
                v-model="config.yearlyNet"
                readonly
                label="Yearly net"
                placeholder="5000"
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

              <FInput
                v-model="config.fiCalculations.yearlyInvestments"
                label="Yearly investments"
                placeholder="2250"
                icon="tabler:currency-euro"
                :input-props="{ min: 0, max: config.yearlyNet }"
                type="number"
              />

              <FInput
                v-model="config.yearlyCashSavings"
                readonly
                label="Yearly savings"
                placeholder="5000"
                icon="tabler:currency-euro"
                type="number"
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
                readonly
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
