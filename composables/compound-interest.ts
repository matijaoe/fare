type CompoundInterestReq = {
  principal: number
  rate: number
  months: number
}

export const useCompoundInterest = ({ principal, months, rate }: CompoundInterestReq) => {
  const interest = computed(() => calcInterestAfterMonths({ rate, months }))
  const balance = computed(() => principal * interest.value)

  const formattedInterest = computed(() => formatPercentage(interest.value - 1, {
    maximumFractionDigits: 8,
    maximumSignificantDigits: 8,
    minimumFractionDigits: 8,
    minimumSignificantDigits: 8,
  }))
  const formattedBalance = useCurrencyFormat(balance)

  return {
    interest,
    balance,
    formattedInterest,
    formattedBalance,
  }
}
