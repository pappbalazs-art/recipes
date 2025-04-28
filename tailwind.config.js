import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
	content: [
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-sans)"],
			},
			colors: {
				primary: "#97AC82",
				secondary: "#21371E",
			},
			animation: {
				"fade-in": "fade-in .25s ease-in-out",
			},
			keyframes: (theme) => ({
				"fade-in": {
					"0%": { opacity: "0%" },
					"100%": { opacity: "100%" },
				},
			}),
		},
	},
	darkMode: "class",
	plugins: [heroui()],
};

module.exports = config;
