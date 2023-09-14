/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,js,jsx}', './template.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--primary) / <alpha-value>)',
        typo: 'rgb(var(--typo) / <alpha-value>)',
        'primary-dark': 'rgb(var(--primary-dark) / <alpha-value>)',
        brown: 'rgb(var(--brown) / <alpha-value>)',
        'brown-dark': 'rgb(var(--brown-dark) / <alpha-value>)',
        gray: 'rgb(var(--gray) / <alpha-value>)',
        'gray-dark': 'rgb(var(--gray-dark) / <alpha-value>)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
      borderWidth: {
        '0': '0',
        '1': '1px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
        '5': '5px',
        '6': '6px',
        '8': '8px',
      },
      borderRadius: {
        'sm': '0.25rem',
        DEFAULT: '0.5rem',
        's': '0.75rem',
        'm': '1rem',
        'full': '9999px',
      },
      letterSpacing: {
        text: '-0.06em',
        small: '-0.04em',
        min: '-0.03em',
      },
      fontSize: {
        h1: [
          'var(--h1-font-size)',
          {
            lineHeight: 'var(--h1-line-height)',
            fontWeight: 700,
          },
        ],
        h2: [
          'var(--h2-font-size)',
          {
            lineHeight: 'var(--h2-line-height)',
            fontWeight: 700,
          },
        ],
        h3: [
          'var(--h3-font-size)',
          {
            lineHeight: 'var(--h3-line-height)',
            fontWeight: 700,
          },
        ],
        h4: [
          'var(--h4-font-size)',
          {
            lineHeight: 'var(--h4-line-height)',
            fontWeight: 700,
          },
        ],
        p1: [
          'var(--p1-font-size)',
          {
            lineHeight: 'var(--p1-line-height)',
          },
        ],
        p2: [
          'var(--p2-font-size)',
          {
            lineHeight: 'var(--p2-line-height)',
          },
        ],
        p3: [
          'var(--p3-font-size)',
          {
            lineHeight: 'var(--p3-line-height)',
          },
        ],
        p4: [
          'var(--p4-font-size)',
          {
            lineHeight: 'var(--p4-line-height)',
          },
        ],
        p5: [
          'var(--p5-font-size)',
          {
            lineHeight: 'var(--p5-line-height)',
          },
        ],
        p6: [
          'var(--p6-font-size)',
          {
            lineHeight: 'var(--p6-line-height)',
          },
        ],
      },
      boxShadow: {
        none: 'none',
        1: 'var(--shadow-1)',
        2: 'var(--shadow-2)',
        3: 'var(--shadow-3)',
        4: 'var(--shadow-4)',
        sidebar: 'var(--sidebar-shadow)',
      },
    },
  },
};
