export default defineNuxtPlugin(async () => {
  // TODO: is this the right place for this
  await useFetch('/api/accounts/cash/balance', { key: 'balance' })
  await useFetch('/api/accounts/cash?transactions=false', { key: 'cash-accounts' })
})
