import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				grey300: '#e0e0e0',
				black: '#000000',
			},
			fontFamily: {
				cursive: ['"Dancing Script"', 'cursive'],
			},
		},
	},
	plugins: [forms],
};
