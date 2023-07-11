import { useQuery } from 'react-query';
import { api } from '@/service/apiService';
import { useDebounce } from 'usehooks-ts';

const useGeocoding = (city: string) => {
	const debouncedValue = useDebounce<string>(city, 200);
	const { data, isLoading, isFetched } = useQuery([`geocoding-${city}`], () =>
		api.geocoding.geocodingCity(debouncedValue),
	);
	return { data, isLoading, isFetched };
};

export default useGeocoding;
