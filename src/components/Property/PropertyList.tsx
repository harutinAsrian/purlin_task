import { useAtom } from 'jotai';
import { filteredPropertiesAtom } from 'src/state/filteredProperties';

import LeaflatMap from '../Map';

import PropertyCard from './PropertyCard';

const PropertyList = () => {
  const [filteredProperties] = useAtom(filteredPropertiesAtom);

  return (
    <div className="flex flex-col md:flex-row container mx-auto">
      <div className="py-6 flex-1 ">
        <span className="text-3xl mb-3 block">Huston, TX Real Estate & Homes For Sale</span>
        <span className="mb-9 block">{filteredProperties.length} Homes available</span>
        <div className="flexCenter md:justify-start flex-wrap gap-4">
          {filteredProperties.map((item) => (
            <PropertyCard item={item} key={item.id} />
          ))}
        </div>
      </div>

      <div className="w-1/3">
        <LeaflatMap />
      </div>
    </div>
  );
};

export default PropertyList;
