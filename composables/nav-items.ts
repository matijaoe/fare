import type { NavItemModel } from '~~/models/nav'

export const useNavItems = () => {
  const items = ref<NavItemModel[]>([
    {
      label: 'Dashboard',
      icon: 'tabler:home',
      route: {
        name: 'index',
      },
    },
    {
      label: 'Transactions',
      icon: 'tabler:receipt',
      route: {
        name: 'transactions',
      },
      children: [
        {
          label: 'Income',
          icon: 'tabler:arrows-transfer-up',
          route: {
            name: 'transactions-income',
          },
        },
        {
          label: 'Transfers',
          icon: 'tabler:arrows-transfer-down',
          route: {
            name: 'transactions-transfers',
          },
        },

      ],
    },
    {
      label: 'Accounts',
      icon: 'tabler:wallet',
      route: {
        name: 'accounts',
      },
    },
    {
      label: 'Net worth',
      icon: 'tabler:businessplan',
      route: {
        name: 'net-worth',
      },
    },
    {
      label: 'FI',
      icon: 'tabler:flame',
      route: {
        name: 'fi',
      },
    },
    {
      label: 'Progress',
      icon: 'tabler:chart-area-line',
      route: {
        name: 'progress',
      },
      children: [
        {
          label: 'Coast FIRE',
          icon: 'tabler:chart-area-line',
          route: {
            name: 'progress-fire',
          },
        },
      ],
    },
    {
      label: 'Tools',
      icon: 'tabler:tools',
      route: {
        name: 'tools',
      },
    },
    {
      label: 'Resources',
      icon: 'tabler:books',
      route: {
        name: 'resources',
      },
    },
  ])

  return {
    items,
  }
}
