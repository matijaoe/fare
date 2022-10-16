export default defineNuxtPlugin(async () => {
  // TODO: is this the right place for this?
  await Promise.all([
    useFetch('/api/accounts/cash/balance', { key: 'balance' }),
  ])
})
