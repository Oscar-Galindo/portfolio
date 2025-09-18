import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-8 py-4 rounded-full inline-block bg-white text-black font-medium cursor-pointer hover:bg-gray-200 transition-all duration-300 transform hover:scale-105'],
    ['btn-outline', 'px-8 py-4 rounded-full inline-block border-2 border-white text-white font-medium cursor-pointer hover:bg-white hover:text-black transition-all duration-300'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100'],
    ['card', 'rounded-2xl overflow-hidden transition-all duration-500'],
    ['section-padding', 'px-6 md:px-12 lg:px-24 xl:px-32'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/'
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'Inter:100,200,300,400,500,600,700,800,900',
        display: 'Inter:900',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  theme: {
    colors: {
      dark: '#0a0a0a',
      darker: '#000000',
      light: '#ffffff',
      gray: {
        50: '#fafafa',
        100: '#f4f4f5',
        200: '#e4e4e7',
        300: '#d4d4d8',
        400: '#a1a1aa',
        500: '#71717a',
        600: '#52525b',
        700: '#3f3f46',
        800: '#27272a',
        900: '#18181b',
      }
    },
    animation: {
      keyframes: {
        'fade-in': '{from{opacity:0}to{opacity:1}}',
        'fade-up': '{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}',
        'scale-in': '{from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)}}',
      },
      durations: {
        'fade-in': '0.5s',
        'fade-up': '0.6s',
        'scale-in': '0.5s',
      }
    }
  }
})