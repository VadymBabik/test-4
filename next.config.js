/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		GEOCODING_API_URL: process.env.GEOCODING_API_URL,
		WEATHER_API_URL: process.env.WEATHER_API_URL,
	},
};

module.exports = nextConfig;
