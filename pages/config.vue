<script lang="ts" setup>
import { TabGroup, TabList, TabPanels } from '@headlessui/vue'

const config = useFireConfig()

const { formattedAverageAnnualRate } = toRefs(useNestEggStore())
</script>

<template>
  <LayoutPage>
    <div v-if="formattedAverageAnnualRate" bg-blue-2>
      {{ formattedAverageAnnualRate }}%
    </div>

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
            <FInput v-model="config.fiCalculations.monthlyExpenditure" type="number" />
          </FTabPanel>

          <FTabPanel
            desc="Your government pension parameters"
          >
            <div grid grid-cols-3 gap-4>
              <FInput
                v-model="config.pensionCalculations.retirementAge"
                label="Retirement age"
                placeholder="65"
                type="number"
              />
              <FInput
                v-model="config.pensionCalculations.pensionAccessibilityAg"
                label="Pension accessability age"
                placeholder="55"
                type="number"
              />
            </div>
          </FTabPanel>
        </TabPanels>
      </TabGroup>
    </LayoutSectionWrapper>
  </LayoutPage>
</template>
