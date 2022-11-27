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
    'bg-base': 'bg-zinc-50 dark:bg-zinc-9',
    'color-base': 'text-zinc-9 dark:text-zinc-3',
    'color-base-lighter': 'text-zinc-7 dark:text-zinc-3/80',
    'flex-center': 'flex items-center justify-center',
  },
  theme: {
    maxWidth: {
      default: '1440px',
    },
    colors: {
      accent: '#5D8D7B',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: {
          name: 'Satoshi',
          provider: 'fontshare',
          weights: [400, 500, 600, 700, 800, 900],
        },
        mono: {
          name: 'Iosevka',
          provider: 'none',
          weights: [400, 500, 600, 700, 800, 900],
        },
        display: 'Khand',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
