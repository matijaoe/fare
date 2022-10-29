import { useSidebar } from '~~/store/sidebar.store'

type ShortcutsDefinitions = Record<string, { key: string; handler: () => void }>

const useShortcuts = (shortcuts: ShortcutsDefinitions) => {
  const keys = useMagicKeys()

  type ShortcutsThing = keyof typeof shortcuts

  const defineShortcut = (thing: ShortcutsThing) => {
    const { key, handler } = shortcuts[thing]
    whenever(keys[key], handler)
  }

  const defineShortcuts = () => (Object.keys(shortcuts) as ShortcutsThing[]).forEach(defineShortcut)

  defineShortcuts()
}

export const setupShortcuts = () => {
  const sidebar = useSidebar()

  const { toggleDark } = useTheme()

  const shortcuts = {
    theme: {
      key: 'cmd+j',
      handler: toggleDark,
    },
    sidebar: {
      key: 'cmd+b',
      handler: sidebar.toggle,
    },
  }

  useShortcuts(shortcuts)
}
