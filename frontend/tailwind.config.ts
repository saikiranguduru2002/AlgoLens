import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './visualizers/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  darkMode: ['class'],
  theme: {
    extend: {
      colors: {
        ink: '#10212b',
        mist: '#e4eef2',
        accent: '#ff7a18',
        cyan: '#2bc5d6',
        slate: '#203746'
      },
      boxShadow: {
        panel: '0 18px 50px rgba(16, 33, 43, 0.12)'
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Manrope"', 'sans-serif']
      }
    }
  },
  plugins: []
};

export default config;
