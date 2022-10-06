import { useSidebar } from '~~/store/sidebar.store'

export const useShortcuts = () => {
  const sidebar = useSidebar()
  const { toggleDark } = useColorscheme()
  const { cmd, b, j } = $(useMagicKeys())

  watchEffect(() => {
    // cmd+b to toggle sidebar
    if (cmd && b) {
      sidebar.toggle()
    }
    // cmd+j to toggle dark mode
    if (cmd && j) {
      toggleDark()
    }
  })
}
