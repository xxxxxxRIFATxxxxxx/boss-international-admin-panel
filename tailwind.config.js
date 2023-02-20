const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    ],

    theme: {
        colors: {
            primary: colors.blue,
        },
        extend: {},
    },

    plugins: [require("flowbite/plugin")],
};
