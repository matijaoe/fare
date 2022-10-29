import { get, set } from '@vueuse/core'

export const useTheme = () => {
  const isDark = useDark()

  const toggleDark = () => set(isDark, !get(isDark))

  return {
    isDark,
    toggleDark,
  }
}
