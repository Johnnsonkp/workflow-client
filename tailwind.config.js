/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.jsx",
    "./components/**/*.jsx",
  ],
  theme: {
    extend: {
      backgroundImage: {
        // 'custom-gradient': 'linear-gradient(transparent, #7C72FF 30%)',
        'custom-gradient': 'linear-gradient(#7C72FF, 80%, #3FB950)'
      },
      keyframes: {
        pulse: {
          '0%, 100%': {
            opacity: 1,
            transform: 'scale(1)',
          },
          '50%': {
            opacity: 0.5,
            transform: 'scale(1.03)',
          },
        },
      },
      animation: {
        pulse: 'pulse 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};


