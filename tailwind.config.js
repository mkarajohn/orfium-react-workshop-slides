import deps from './deps.json';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', ...deps],
  theme: {
    extend: {},
  },
  plugins: [],
};
