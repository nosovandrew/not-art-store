const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            screens: {}, // custom responsive variables (def sm:640 md:768 lg:1024 xl:1028)
            colors: {
                'ivory': 'var(--base-ivory)',
                'ocean': 'var(--base-ocean)',
                'miami-pink': 'var(--base-miami-pink)',
                'palm': 'var(--base-palm)',
            }, // color variables
            fontFamily: {
                primary: [
                    'Press\\ Start\\ 2P',
                    ...defaultTheme.fontFamily.sans,
                ], // pixel or def sans
            },
            dropShadow: {
                'pixel': '10px 10px 0 rgba(0, 0, 0, 0.25)'
            },
        },
    },
    plugins: [],
};
