import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'border-base': 'border-zinc-2 dark:border-zinc-8',
    'bg-base': 'bg-white dark:bg-zinc-9',
    'color-base': 'text-zinc-9 dark:text-zinc-3',
    'color-base-lighter': 'text-zinc-8 dark:text-zinc-3/90',
    'flex-center': 'flex items-center justify-center',
    'max-w-base': 'max-w-1440px',
  },
  theme: {
    maxWidth: {
      default: '1440px',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetTypography(),
    presetWebFonts({
      provider: 'google', // default provider
      fonts: {
        sans: 'Cabin',
        mono: [
          {
            name: 'Iosevka Nerd Font',
            provider: 'none',
          },
          {
            name: 'Inconsolata',
            provider: 'google',
          },
        ],
        display: 'Staatliches',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
