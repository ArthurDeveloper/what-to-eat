const production = process.env.NODE_ENV === 'production';

module.exports = {
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          from: { marginTop: '3em', opacity: 0 },
          to: { marginTop: '0', opacity: 1 }
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
        'pulse-slow': 'pulse 1s ease-in-out infinite',
        'pulse-mid': 'pulse 1.25s ease-in-out infinite',
        'pulse-fast': 'pulse 1.5s ease-in-out infinite'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  future: {
    purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
  },
  purge: {
    content: [
     "./src/**/*.svelte",

    ],
    enabled: production // disable purge in dev
  },
}
