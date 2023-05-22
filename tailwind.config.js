/** @type {import('tailwindcss').Config} */
module.exports = {
     content: ['./src/**/*.{js,jsx,ts,tsx}'],
     theme: {
          extend: {
               fontFamily: {
                    monoton: ['Monoton', 'cursive'],
                    space: ['Space Mono', 'monospace']
               }
          },
     },
     plugins: [],
}

