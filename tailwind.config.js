// const colors = require('tailwindcss/colors')

module.exports = {
    mode: "jit",
    purge: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue,html}"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                white: {
                    DEFAULT: "#FEFEFE",
                    light: "#F6F8FF",
                },
                gray: {
                    DEFAULT: "#697C9A",
                    dark: "#222731",
                    darker: "#4B6A9B",
                    lighter: "#F2F2F2",
                },
            },
            boxShadow: {
                card: "0px 16px 30px -10px rgba(70, 96, 187, 0.198567)",
            },
        },
    },
    plugins: [],
};
