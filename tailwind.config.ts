import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Soft warm page background — subtle cream, not stark white
        cream: {
          50:  '#FFFEF9',
          100: '#FFFDF5',
          200: '#FFF9E6',
          300: '#FFF3D0',
        },
        // Tesla-inspired neutral scale — pure grays, no color cast
        neutral: {
          50: '#FAFAFA',
          100: '#F4F4F4',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        // Single accent — warm slate-blue. Tech-forward but human.
        // Softer than Tesla's #3E6AE1 to match emotions/relationships theme.
        accent: {
          50: '#F0F4F8',
          100: '#DCE6F0',
          200: '#B8CDE0',
          300: '#8AADC9',
          400: '#5E8CAD',
          500: '#3E6E91',
          600: '#2F5878',
          700: '#254863',
          800: '#1D3A51',
          900: '#152C3E',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        '4': '4px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
