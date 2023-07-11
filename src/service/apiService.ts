import axios from 'axios';
import { City, ResponseGeocoding } from '@/types/types';

const geocodingApi = process.env.GEOCODING_API_URL;
const weatherApi = process.env.WEATHER_API_URL;

export const api = {
	weather: {
		weatherCity: (city: City) =>
			axios
				.get(
					`${weatherApi}${city.latitude}&longitude=${city.longitude}&daily=temperature_2m_max,temperature_2m_min&current_weather=true&timezone=GMT&past_days=6&forecast_days=1`,
				)
				.then(res => ({ ...res.data, city })),
	},
	geocoding: {
		geocodingCity: (name: string) =>
			axios
				.get<ResponseGeocoding>(
					`${geocodingApi}${name}&count=10&language=en&format=json`,
				)
				.then(res => res.data),
	},
};
