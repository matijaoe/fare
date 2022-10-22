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

  const colorSolidBg = computed(() => {
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
  const colorSolidText = computed(() => {
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

  const colorDotText = computed(() => {
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
  const colorDotBg = computed(() => {
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

  return {
    availableColors,
    colorSolidBg,
    colorSolidText,
    colorDotText,
    colorDotBg,
  }
}
