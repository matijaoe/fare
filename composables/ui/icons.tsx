export const useIcons = () => {
  const brandIcons = [
    { label: 'Revolut', value: 'simple-icons:revolut' },
    { label: 'Wise', value: 'simple-icons:wise' },
    { label: 'Monzo', value: 'simple-icons:monzo' },
    { label: 'N26', value: 'simple-icons:n26' },
    { label: 'Bunq', value: 'simple-icons:bunq' },
    { label: 'Cashapp', value: 'simple-icons:cashapp' },
    { label: 'Bitcoin', value: 'simple-icons:bitcoin' },
    { label: 'Nubank', value: 'simple-icons:nubank' },
    { label: 'Starling Bank', value: 'simple-icons:starlingbank' },
    { label: 'Bank of America', value: 'simple-icons:bankofamerica' },
    { label: 'Deutsche Bank', value: 'simple-icons:deutschebank' },
    { label: 'Binance', value: 'simple-icons:binance' },
  ]

  const generalIcons = [
    { label: 'Wallet', value: 'tabler:wallet' },
    { label: 'Report', value: 'tabler:report-money' },
    { label: 'Moneybag', value: 'tabler:moneybag' },
    { label: 'Home dollar', value: 'tabler:home-dollar' },
    { label: 'Cash', value: 'tabler:cash' },
    { label: 'Banknote', value: 'tabler:cash-banknote' },
    { label: 'Bank', value: 'tabler:building-bank' },
    { label: 'Mastercard', value: 'tabler:brand-mastercard' },
    { label: 'Visa', value: 'tabler:brand-visa' },
    { label: 'Dollar coin', value: 'tabler:coin' },
    { label: 'Bitcoin coin', value: 'tabler:coin-bitcoin' },
    { label: 'Euro coin', value: 'tabler:coin-euro' },
    { label: 'Pound coin', value: 'tabler:coin-pound' },
    { label: 'Cookie', value: 'tabler:cookie' },
    { label: 'Walk', value: 'tabler:walk' },
  ]

  const allIcons = [...brandIcons, ...generalIcons]

  return {
    brandIcons,
    generalIcons,
    allIcons,
  }
}
