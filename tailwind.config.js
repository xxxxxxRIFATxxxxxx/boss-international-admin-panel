const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    ],

    theme: {
        colors: {
            primary: {
                50: "#fae5a5",
                100: "#f9de8f",
                200: "#f7d778",
                300: "#f6d162",
                400: "#f5ca4b",
                500: "#f3c435",
                600: "#f2bd1e",
                700: "#daaa1b",
                800: "#c29718",
                900: "#a98415",
            },
        },
        extend: {},
    },

    plugins: [require("flowbite/plugin")],
};
