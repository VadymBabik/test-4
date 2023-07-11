import { Fragment, useEffect, useState } from 'react';
import useGeocoding from '@/hooks/useGeocoding/useGeocoding';
import { size, some } from 'lodash';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import { Cities, City } from '@/types/types';

interface SearchCityProps {
	cities: Cities;
	setCity: (city: City) => void;
}

const SearchCity = ({ cities, setCity }: SearchCityProps) => {
	const [people, setPeople] = useState<Cities>(cities);
	const [query, setQuery] = useState<string>('');
	const { data } = useGeocoding(query);
	useEffect(() => {
		if (data?.results && size(data?.results) > 0) {
			setPeople(prevState => prevState.concat(data.results));
		}
	}, [data]);

	const filteredPeople =
		query === ''
			? people
			: people.filter(person =>
					person.name
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, '')),
			  );
	return (
		<div className="relative w-[190px]">
			<Combobox
				value={people[0]}
				onChange={e => {
					setCity(e);
					setPeople([...cities, e]);
				}}
			>
				<div className=" w-full cursor-default overflow-hidden rounded-lg  text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
					<Combobox.Input
						placeholder="Country"
						className="basic-input"
						onChange={event => setQuery(event.target.value)}
					/>
					<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-1">
						<ChevronDownIcon
							className="h-5 w-5 text-gray-400"
							aria-hidden="true"
						/>
					</Combobox.Button>
				</div>
				<Transition
					as={Fragment}
					leave="transition ease-in duration-100"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
					afterLeave={() => setQuery('')}
				>
					<Combobox.Options className="no-scrollbar w-full absolute z-50 mt-1 max-h-60 overflow-auto rounded-md bg-gray-light border border-gray py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
						{filteredPeople.length === 0 && query !== '' ? (
							<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
								Nothing found.
							</div>
						) : (
							filteredPeople.map(person => (
								<Combobox.Option
									key={person.name}
									disabled={some(cities, ['name', person.name])}
									className={({ active }) =>
										`relative cursor-default select-none py-2 pl-10 pr-4 ${
											active
												? 'bg-gray-dark text-gray cursor-pointer'
												: 'text-gray'
										}`
									}
									value={person}
								>
									{({ selected, disabled }) => (
										<span>
											{disabled && (
												<CheckIcon
													className="h-5 w-5 absolute inset-y-0 left-1 top-2"
													aria-hidden="true"
												/>
											)}
											<span
												className={`block truncate disabled${
													selected ? 'font-medium' : 'font-normal'
												}`}
											>
												{person.name}
											</span>
										</span>
									)}
								</Combobox.Option>
							))
						)}
					</Combobox.Options>
				</Transition>
			</Combobox>
		</div>
	);
};

export default SearchCity;
