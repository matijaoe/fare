import { toTitleCase } from '~~/utils'

export const useAppColors = (color?: string | null) => {
  const availableColors = ref([
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
    'gray',
  ])

  const colorOptions = [
    {
      label: toTitleCase('red'),
      value: 'red',
      bg: 'bg-red-5',
      text: 'text-red-5',
    },
    {
      label: toTitleCase('orange'),
      value: 'orange',
      bg: 'bg-orange-5',
      text: 'text-orange-5',
    },
    {
      label: toTitleCase('amber'),
      value: 'amber',
      bg: 'bg-amber-5',
      text: 'text-amber-5',
    },
    {
      label: toTitleCase('yellow'),
      value: 'yellow',
      bg: 'bg-yellow-5',
      text: 'text-yellow-5',
    },
    {
      label: toTitleCase('lime'),
      value: 'lime',
      bg: 'bg-lime-5',
      text: 'text-lime-5',
    },
    {
      label: toTitleCase('green'),
      value: 'green',
      bg: 'bg-green-5',
      text: 'text-green-5',
    },
    {
      label: toTitleCase('emerald'),
      value: 'emerald',
      bg: 'bg-emerald-5',
      text: 'text-emerald-5',
    },
    {
      label: toTitleCase('teal'),
      value: 'teal',
      bg: 'bg-teal-5',
      text: 'text-teal-5',
    },
    {
      label: toTitleCase('cyan'),
      value: 'cyan',
      bg: 'bg-cyan-5',
      text: 'text-cyan-5',
    },
    {
      label: toTitleCase('sky'),
      value: 'sky',
      bg: 'bg-sky-5',
      text: 'text-sky-5',
    },
    {
      label: toTitleCase('blue'),
      value: 'blue',
      bg: 'bg-blue-5',
      text: 'text-blue-5',
    },
    {
      label: toTitleCase('indigo'),
      value: 'indigo',
      bg: 'bg-indigo-5',
      text: 'text-indigo-5',
    },
    {
      label: toTitleCase('violet'),
      value: 'violet',
      bg: 'bg-violet-5',
      text: 'text-violet-5',
    },
    {
      label: toTitleCase('purple'),
      value: 'purple',
      bg: 'bg-purple-5',
      text: 'text-purple-5',
    },
    {
      label: toTitleCase('fuchsia'),
      value: 'fuchsia',
      bg: 'bg-fuchsia-5',
      text: 'text-fuchsia-5',
    },
    {
      label: toTitleCase('pink'),
      value: 'pink',
      bg: 'bg-pink-5',
      text: 'text-pink-5',
    },
    {
      label: toTitleCase('gray'),
      value: 'gray',
      bg: 'bg-gray-5',
      text: 'text-gray-5',
    },
  ]

  const text9 = computed(() => {
    switch (color) {
      case 'red':
        return 'text-red-9'
      case 'orange':
        return 'text-orange-9'
      case 'amber':
        return 'text-amber-9'
      case 'yellow':
        return 'text-yellow-9'
      case 'lime':
        return 'text-lime-9'
      case 'green':
        return 'text-green-9'
      case 'emerald':
        return 'text-emerald-9'
      case 'teal':
        return 'text-teal-9'
      case 'cyan':
        return 'text-cyan-9'
      case 'sky':
        return 'text-sky-9'
      case 'blue':
        return 'text-blue-9'
      case 'indigo':
        return 'text-indigo-9'
      case 'violet':
        return 'text-violet-9'
      case 'purple':
        return 'text-purple-9'
      case 'fuchsia':
        return 'text-fuchsia-9'
      case 'pink':
        return 'text-pink-9'
      case 'rose':
        return 'text-rose-9'
      case 'gray':
        return 'text-gray-9'
      default:
        return 'text-zinc-9'
    }
  })

  const color4 = computed(() => {
    switch (color) {
      case 'red':
        return 'text-red-4'
      case 'orange':
        return 'text-orange-4'
      case 'amber':
        return 'text-amber-4'
      case 'yellow':
        return 'text-yellow-4'
      case 'lime':
        return 'text-lime-4'
      case 'green':
        return 'text-green-4'
      case 'emerald':
        return 'text-emerald-4'
      case 'teal':
        return 'text-teal-4'
      case 'cyan':
        return 'text-cyan-4'
      case 'sky':
        return 'text-sky-4'
      case 'blue':
        return 'text-blue-4'
      case 'indigo':
        return 'text-indigo-4'
      case 'violet':
        return 'text-violet-4'
      case 'purple':
        return 'text-purple-4'
      case 'fuchsia':
        return 'text-fuchsia-4'
      case 'pink':
        return 'text-pink-4'
      case 'rose':
        return 'text-rose-4'
      case 'gray':
        return 'text-gray-4'
      default:
        return 'text-zinc-4'
    }
  })

  const bg4 = computed(() => {
    switch (color) {
      case 'red':
        return 'bg-red-4'
      case 'orange':
        return 'bg-orange-4'
      case 'amber':
        return 'bg-amber-4'
      case 'yellow':
        return 'bg-yellow-4'
      case 'lime':
        return 'bg-lime-4'
      case 'green':
        return 'bg-green-4'
      case 'emerald':
        return 'bg-emerald-4'
      case 'teal':
        return 'bg-teal-4'
      case 'cyan':
        return 'bg-cyan-4'
      case 'sky':
        return 'bg-sky-4'
      case 'blue':
        return 'bg-blue-4'
      case 'indigo':
        return 'bg-indigo-4'
      case 'violet':
        return 'bg-violet-4'
      case 'purple':
        return 'bg-purple-4'
      case 'fuchsia':
        return 'bg-fuchsia-4'
      case 'pink':
        return 'bg-pink-4'
      case 'rose':
        return 'bg-rose-4'
      case 'gray':
        return 'bg-gray-4'
      default:
        return 'bg-zinc-4'
    }
  })

  const color3 = computed(() => {
    switch (color) {
      case 'red':
        return 'text-red-3'
      case 'orange':
        return 'text-orange-3'
      case 'amber':
        return 'text-amber-3'
      case 'yellow':
        return 'text-yellow-3'
      case 'lime':
        return 'text-lime-3'
      case 'green':
        return 'text-green-3'
      case 'emerald':
        return 'text-emerald-3'
      case 'teal':
        return 'text-teal-3'
      case 'cyan':
        return 'text-cyan-3'
      case 'sky':
        return 'text-sky-3'
      case 'blue':
        return 'text-blue-3'
      case 'indigo':
        return 'text-indigo-3'
      case 'violet':
        return 'text-violet-3'
      case 'purple':
        return 'text-purple-3'
      case 'fuchsia':
        return 'text-fuchsia-3'
      case 'pink':
        return 'text-pink-3'
      case 'rose':
        return 'text-rose-3'
      case 'gray':
        return 'text-gray-3'
      default:
        return 'text-zinc-3'
    }
  })

  const bg3 = computed(() => {
    switch (color) {
      case 'red':
        return 'bg-red-3'
      case 'orange':
        return 'bg-orange-3'
      case 'amber':
        return 'bg-amber-3'
      case 'yellow':
        return 'bg-yellow-3'
      case 'lime':
        return 'bg-lime-3'
      case 'green':
        return 'bg-green-3'
      case 'emerald':
        return 'bg-emerald-3'
      case 'teal':
        return 'bg-teal-3'
      case 'cyan':
        return 'bg-cyan-3'
      case 'sky':
        return 'bg-sky-3'
      case 'blue':
        return 'bg-blue-3'
      case 'indigo':
        return 'bg-indigo-3'
      case 'violet':
        return 'bg-violet-3'
      case 'purple':
        return 'bg-purple-3'
      case 'fuchsia':
        return 'bg-fuchsia-3'
      case 'pink':
        return 'bg-pink-3'
      case 'rose':
        return 'bg-rose-3'
      case 'gray':
        return 'bg-gray-3'
      default:
        return 'bg-zinc-3'
    }
  })

  const borderClr2 = computed(() => {
    switch (color) {
      case 'red':
        return 'border-red-2'
      case 'orange':
        return 'border-orange-2'
      case 'amber':
        return 'border-amber-2'
      case 'yellow':
        return 'border-yellow-2'
      case 'lime':
        return 'border-lime-2'
      case 'green':
        return 'border-green-2'
      case 'emerald':
        return 'border-emerald-2'
      case 'teal':
        return 'border-teal-2'
      case 'cyan':
        return 'border-cyan-2'
      case 'sky':
        return 'border-sky-2'
      case 'blue':
        return 'border-blue-2'
      case 'indigo':
        return 'border-indigo-2'
      case 'violet':
        return 'border-violet-2'
      case 'purple':
        return 'border-purple-2'
      case 'fuchsia':
        return 'border-fuchsia-2'
      case 'pink':
        return 'border-pink-2'
      case 'rose':
        return 'border-rose-2'
      case 'gray':
        return 'border-gray-2'
      default:
        return 'border-zinc-2'
    }
  })

  const color2 = computed(() => {
    switch (color) {
      case 'red':
        return 'text-red-2'
      case 'orange':
        return 'text-orange-2'
      case 'amber':
        return 'text-amber-2'
      case 'yellow':
        return 'text-yellow-2'
      case 'lime':
        return 'text-lime-2'
      case 'green':
        return 'text-green-2'
      case 'emerald':
        return 'text-emerald-2'
      case 'teal':
        return 'text-teal-2'
      case 'cyan':
        return 'text-cyan-2'
      case 'sky':
        return 'text-sky-2'
      case 'blue':
        return 'text-blue-2'
      case 'indigo':
        return 'text-indigo-2'
      case 'violet':
        return 'text-violet-2'
      case 'purple':
        return 'text-purple-2'
      case 'fuchsia':
        return 'text-fuchsia-2'
      case 'pink':
        return 'text-pink-2'
      case 'rose':
        return 'text-rose-2'
      case 'gray':
        return 'text-gray-2'
      default:
        return 'text-zinc-2'
    }
  })

  const bg2 = computed(() => {
    switch (color) {
      case 'red':
        return 'bg-red-2'
      case 'orange':
        return 'bg-orange-2'
      case 'amber':
        return 'bg-amber-2'
      case 'yellow':
        return 'bg-yellow-2'
      case 'lime':
        return 'bg-lime-2'
      case 'green':
        return 'bg-green-2'
      case 'emerald':
        return 'bg-emerald-2'
      case 'teal':
        return 'bg-teal-2'
      case 'cyan':
        return 'bg-cyan-2'
      case 'sky':
        return 'bg-sky-2'
      case 'blue':
        return 'bg-blue-2'
      case 'indigo':
        return 'bg-indigo-2'
      case 'violet':
        return 'bg-violet-2'
      case 'purple':
        return 'bg-purple-2'
      case 'fuchsia':
        return 'bg-fuchsia-2'
      case 'pink':
        return 'bg-pink-2'
      case 'rose':
        return 'bg-rose-2'
      case 'gray':
        return 'bg-gray-2'
      default:
        return 'bg-zinc-2'
    }
  })

  const borderClr3 = computed(() => {
    switch (color) {
      case 'red':
        return 'border-red-3'
      case 'orange':
        return 'border-orange-3'
      case 'amber':
        return 'border-amber-3'
      case 'yellow':
        return 'border-yellow-3'
      case 'lime':
        return 'border-lime-3'
      case 'green':
        return 'border-green-3'
      case 'emerald':
        return 'border-emerald-3'
      case 'teal':
        return 'border-teal-3'
      case 'cyan':
        return 'border-cyan-3'
      case 'sky':
        return 'border-sky-3'
      case 'blue':
        return 'border-blue-3'
      case 'indigo':
        return 'border-indigo-3'
      case 'violet':
        return 'border-violet-3'
      case 'purple':
        return 'border-purple-3'
      case 'fuchsia':
        return 'border-fuchsia-3'
      case 'pink':
        return 'border-pink-3'
      case 'rose':
        return 'border-rose-3'
      case 'gray':
        return 'border-gray-3'
      default:
        return 'border-zinc-3'
    }
  })

  const bg1 = computed(() => {
    switch (color) {
      case 'red':
        return 'bg-red-1 dark:(bg-red-4 filter-saturate-40)'
      case 'orange':
        return 'bg-orange-1 dark:(bg-orange-4 filter-saturate-40)'
      case 'amber':
        return 'bg-amber-1 dark:(bg-amber-4 filter-saturate-40)'
      case 'yellow':
        return 'bg-yellow-1 dark:(bg-yellow-4 filter-saturate-40)'
      case 'lime':
        return 'bg-lime-1 dark:(bg-lime-4 filter-saturate-40)'
      case 'green':
        return 'bg-green-1 dark:(bg-green-4 filter-saturate-40)'
      case 'emerald':
        return 'bg-emerald-1 dark:(bg-emerald-4 filter-saturate-40)'
      case 'teal':
        return 'bg-teal-1 dark:(bg-teal-4 filter-saturate-40)'
      case 'cyan':
        return 'bg-cyan-1 dark:(bg-cyan-4 filter-saturate-40)'
      case 'sky':
        return 'bg-sky-1 dark:(bg-sky-4 filter-saturate-40)'
      case 'blue':
        return 'bg-blue-1 dark:(bg-blue-4 filter-saturate-40)'
      case 'indigo':
        return 'bg-indigo-1 dark:(bg-indigo-4 filter-saturate-40)'
      case 'violet':
        return 'bg-violet-1 dark:(bg-violet-4 filter-saturate-40)'
      case 'purple':
        return 'bg-purple-1 dark:(bg-purple-4 filter-saturate-40)'
      case 'fuchsia':
        return 'bg-fuchsia-1 dark:(bg-fuchsia-4 filter-saturate-40)'
      case 'pink':
        return 'bg-pink-1 dark:(bg-pink-4 filter-saturate-40)'
      case 'rose':
        return 'bg-rose-1 dark:(bg-rose-4 filter-saturate-40)'
      case 'gray':
        return 'bg-gray-1 dark:(bg-gray-4 filter-saturate-40)'
      default:
        return 'bg-zinc-1 dark:(bg-zinc-4 filter-saturate-40)'
    }
  })

  const bg50 = computed(() => {
    switch (color) {
      case 'red':
        return 'bg-red-50 dark:(bg-red-4 filter-saturate-40)'
      case 'orange':
        return 'bg-orange-50 dark:(bg-orange-4 filter-saturate-40)'
      case 'amber':
        return 'bg-amber-50 dark:(bg-amber-4 filter-saturate-40)'
      case 'yellow':
        return 'bg-yellow-50 dark:(bg-yellow-4 filter-saturate-40)'
      case 'lime':
        return 'bg-lime-50 dark:(bg-lime-4 filter-saturate-40)'
      case 'green':
        return 'bg-green-50 dark:(bg-green-4 filter-saturate-40)'
      case 'emerald':
        return 'bg-emerald-50 dark:(bg-emerald-4 filter-saturate-40)'
      case 'teal':
        return 'bg-teal-50 dark:(bg-teal-4 filter-saturate-40)'
      case 'cyan':
        return 'bg-cyan-50 dark:(bg-cyan-4 filter-saturate-40)'
      case 'sky':
        return 'bg-sky-50 dark:(bg-sky-4 filter-saturate-40)'
      case 'blue':
        return 'bg-blue-50 dark:(bg-blue-4 filter-saturate-40)'
      case 'indigo':
        return 'bg-indigo-50 dark:(bg-indigo-4 filter-saturate-40)'
      case 'violet':
        return 'bg-violet-50 dark:(bg-violet-4 filter-saturate-40)'
      case 'purple':
        return 'bg-purple-50 dark:(bg-purple-4 filter-saturate-40)'
      case 'fuchsia':
        return 'bg-fuchsia-50 dark:(bg-fuchsia-4 filter-saturate-40)'
      case 'pink':
        return 'bg-pink-50 dark:(bg-pink-4 filter-saturate-40)'
      case 'rose':
        return 'bg-rose-50 dark:(bg-rose-4 filter-saturate-40)'
      case 'gray':
        return 'bg-gray-50 dark:(bg-gray-4 filter-saturate-40)'
      default:
        return 'bg-zinc-50 dark:(bg-zinc-4 filter-saturate-40)'
    }
  })

  return {
    colorOptions,
    availableColors,
    text9,
    bg4,
    color4,
    bg3,
    borderClr3,
    color3,
    bg2,
    color2,
    borderClr2,
    bg1,
    bg50,
  }
}
