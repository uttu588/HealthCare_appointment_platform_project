/** @type {import('tailwindcss').Config} */
export default {
	darkMode: "class",
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			gridTemplateColumns: {
				auto: "repeat(auto-fill, minmax(200px, 1fr))",
			},
			colors: {
				primary: "#5F6FFF",
			},
			animation: {
				ticker: "ticker linear infinite",
			},
			keyframes: {
				ticker: {
					"0%": { transform: "translateX(0)" },
					"100%": { transform: "translateX(-100%)" },
				},
			},
		},
	},
	plugins: [],
};
