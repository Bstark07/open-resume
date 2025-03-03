import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'rgb(var(--foreground-rgb))',
            p: {
              marginTop: '1.5em',
              marginBottom: '1.5em',
            },
          },
        },
      },
      spacing: {
        'resume-sm': '0.5in',
        'resume-md': '0.75in',
        'resume-lg': '1in',
      },
      screens: {
        'print': {'raw': 'print'},
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config; 