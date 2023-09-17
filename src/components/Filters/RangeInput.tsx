import { useState } from 'react';

import { useAtom } from 'jotai';
import ReactSlider from 'react-slider';
import { allPropertiesAtom } from 'src/state/allProperties';
import { filterPropertiesByPriceRange } from 'src/utils/filterPropertiesByPriceRange';
import { filteredPropertiesAtom } from 'src/state/filteredProperties';
import { filterPropertiesByOfferType } from 'src/utils/filterPropertiesByOfferType';
import { propertyOfferTypeAtom } from 'src/state/propertyOfferType';

const RangeInput = () => {
  const [values, setValues] = useState([250, 500]);
  const [allProperties] = useAtom(allPropertiesAtom);
  const [, setFilteredProperties] = useAtom(filteredPropertiesAtom);
  const [propertyOfferType] = useAtom(propertyOfferTypeAtom);

  const handleChange = (newValues: number | number[]) => {
    const updatedValues = Array.isArray(newValues) ? [...newValues] : [newValues];

    setValues(updatedValues);
  };

  const filterByPriceAndOfferType = () => {
    const filteredByPrice = filterPropertiesByPriceRange(allProperties, values);
    const filteredByOfferType = filterPropertiesByOfferType(filteredByPrice, propertyOfferType);

    setFilteredProperties(filteredByOfferType);
  };

  return (
    <>
      <div className="w-72 ">
        <div className="flexBetween mb-3">
          <span className="text-lg block">Price Range</span>
          <div>
            Range: {values[0]} - {values[1]} 000$
          </div>
        </div>
        <ReactSlider
          value={values}
          onChange={handleChange}
          min={1}
          max={500}
          className="customSlider"
          trackClassName="h-3 bg-red-200 rounded-lg appearance-none cursor-pointer range-lg"
          thumbClassName="customSlider-thumb"
          markClassName="customSlider-mark"
        />
      </div>
      <button
        type="button"
        className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center "
        onClick={filterByPriceAndOfferType}
      >
        <svg
          className="w-3.5 h-3.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </button>
    </>
  );
};

export default RangeInput;
