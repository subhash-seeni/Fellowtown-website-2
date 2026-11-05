/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        limestone: '#F6F3EC',
        charcoal: '#1E2426',
        terracotta: '#8C3B1A',
        ochre: '#DCA358',
        slate: '#6C8793',
        pine: '#4E6E58',
        'border-hairline': 'rgba(30, 36, 38, 0.14)',
        'sand-muted': '#D9D4C7',
        'sand-light': '#EFECE4',
      },
      fontFamily: {
        display: ['"Syne"', '"Space Grotesk"', 'sans-serif'],
        sans: ['"Space Grotesk"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        serif: ['"Syne"', '"Space Grotesk"', 'sans-serif'], // Redirect any legacy font-serif references to Syne
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'sun-cast': '8px 12px 28px -4px rgba(30, 36, 38, 0.12), 2px 4px 8px -2px rgba(30, 36, 38, 0.08)',
        'sun-cast-lg': '16px 24px 44px -8px rgba(30, 36, 38, 0.16), 4px 6px 14px -3px rgba(30, 36, 38, 0.09)',
        'tactile-pressed': 'inset 1px 2px 4px rgba(30, 36, 38, 0.25)',
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'tighter': '-0.025em',
        'technical': '0.08em',
        'architectural': '0.14em',
      }
    },
  },
  plugins: [],
}
