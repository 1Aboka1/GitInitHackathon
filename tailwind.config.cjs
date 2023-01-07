/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
	"./src/**/*.{js,ts,jsx,tsx}",
	"./layout/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
	extend: {
	    colors: {
		'custom-blue': {
		    100: '#a2a9ff',
		    200: '#24528f',
		    300: '#124883',
		    400: '#003e78',
		    500: '#00356d',
		    600: '#002b62',
		    700: '#002358',
		    800: '#001a4d',
		    900: '#001043',
		    1000: '#000000',
		},
	    },
	},
    },
    plugins: [],
};

