/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			boxShadow: {
				top: "0 -4px 15px rgba(0, 0, 0, 0.10)",
				// toptop: "0px -4px 22px rgba(0, 0, 0, 0.08)",
			},
		},
	},
	plugins: [],
};
