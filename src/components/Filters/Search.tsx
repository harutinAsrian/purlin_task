import { ChangeEvent, useEffect, useState } from 'react';

import { useAtom } from 'jotai';
import { allPropertiesAtom } from 'src/state/allProperties';
import { filteredPropertiesAtom } from 'src/state/filteredProperties';
import { searchByValue } from 'src/utils/searchByValue';
import { filterPropertiesByOfferType } from 'src/utils/filterPropertiesByOfferType';
import { propertyOfferTypeAtom } from 'src/state/propertyOfferType';

const Search = () => {
  const [allProperties] = useAtom(allPropertiesAtom);
  const [value, setValue] = useState('');
  const [, setFilteredProperties] = useAtom(filteredPropertiesAtom);
  const [propertyOfferType] = useAtom(propertyOfferTypeAtom);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const filteredByAdress = searchByValue(allProperties, value);
    const filteredByOfferType = filterPropertiesByOfferType(filteredByAdress, propertyOfferType);

    setFilteredProperties(filteredByOfferType);
  }, [value]);

  return (
    <form>
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-[#f0eff2] focus:ring-red-500 focus:border-red-500 "
          placeholder="Search "
          required
          onChange={(e) => handleChange(e)}
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;
