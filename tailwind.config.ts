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
            h1: {
              fontSize: 'var(--font-title)',
              lineHeight: 'var(--line-height-tight)',
              fontWeight: 'var(--font-weight-bold)',
              marginBottom: 'var(--spacing-paragraph)',
            },
            h2: {
              fontSize: 'var(--font-header)',
              lineHeight: 'var(--line-height-tight)',
              fontWeight: 'var(--font-weight-semibold)',
              marginBottom: 'var(--spacing-paragraph)',
            },
            h3: {
              fontSize: 'var(--font-subheading)',
              lineHeight: 'var(--line-height-tight)',
              fontWeight: 'var(--font-weight-medium)',
              marginBottom: 'var(--spacing-list)',
            },
            p: {
              fontSize: 'var(--font-body)',
              lineHeight: 'var(--line-height-normal)',
              marginBottom: 'var(--spacing-paragraph)',
            },
            ul: {
              marginBottom: 'var(--spacing-paragraph)',
            },
            li: {
              marginBottom: 'var(--spacing-list)',
            },
          },
        },
      },
      fontSize: {
        title: 'var(--font-title)',
        header: 'var(--font-header)',
        subheading: 'var(--font-subheading)',
        body: 'var(--font-body)',
        secondary: 'var(--font-secondary)',
        micro: 'var(--font-micro)',
      },
      spacing: {
        section: 'var(--spacing-section)',
        paragraph: 'var(--spacing-paragraph)',
        list: 'var(--spacing-list)',
        margins: 'var(--spacing-margins)',
        'resume-sm': '0.5in',
        'resume-md': '0.75in',
        'resume-lg': '1in',
      },
      lineHeight: {
        tight: 'var(--line-height-tight)',
        normal: 'var(--line-height-normal)',
        relaxed: 'var(--line-height-relaxed)',
      },
      fontWeight: {
        normal: 'var(--font-weight-normal)',
        medium: 'var(--font-weight-medium)',
        semibold: 'var(--font-weight-semibold)',
        bold: 'var(--font-weight-bold)',
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