import { get } from '@vueuse/core'

export const useTheme = () => {
  const color = useColorMode()

  const { value: colorValue } = toRefs(color)
  const isDark = computed(() => get(colorValue) === 'dark')

  const toggleDark = () => {
    color.preference = get(isDark) ? 'light' : 'dark'
  }

  return {
    isDark,
    toggleDark,
  }
}
