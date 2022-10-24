export const useColorscheme = () => {
  const isDark = useDark()
  const toggleDark = useToggle(isDark)

  return {
    isDark,
    toggleDark,
  }
}
