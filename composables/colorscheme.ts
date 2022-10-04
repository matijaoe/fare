const isDark = useDark()

export const useColorscheme = () => {
  const toggleDark = useToggle(isDark)

  return {
    isDark,
    toggleDark,
  }
}
