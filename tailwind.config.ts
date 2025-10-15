import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  safelist: [
    'bg-blue-500',
    'bg-green-500',
    'bg-orange-400',
    'bg-purple-500',
    'bg-gray-400',
  ],
  plugins: [],
};

const TYPE_COLORS: Record<string, 'bg-blue-500' | 'bg-green-500' | 'bg-orange-400' | 'bg-purple-500'> = {
  Checkup: 'bg-blue-500',
  Consultation: 'bg-green-500',
  'Follow-up': 'bg-orange-400',
  Procedure: 'bg-purple-500',
};


export default config;
