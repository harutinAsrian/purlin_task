import { useAtom } from 'jotai';
import { selectedPropertyAtom } from 'src/state/selectedProperty';
import { Listing } from 'src/types';
import { FaBed } from 'react-icons/fa';
import { MdOutlinePhotoSizeSelectSmall } from 'react-icons/md';
import Carousel from 'src/components/Carousel';
import AgentContact from 'src/components/Agent/AgentContact';

const PropertyDetail = () => {
  const [selectedProperty] = useAtom(selectedPropertyAtom);
  const selected = selectedProperty as Listing;

  if (!Object.keys(selectedProperty).length) {
    // Clould be handeled better, with useParam and stuff like that...
    return <div>Please Go Back and select again</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-4xl mb-4 font-semibold">{selected.address}</h2>
      <span className="text-md text-xl font-bold mb-3 block">
        {selected.currency} {selected.price}
      </span>
      <div className="flexBetween gap-10 w-60 text-slate-800 mb-6">
        <div className="flex gap-2 items-center">
          <FaBed />
          {selected.beds} beds
        </div>
        <div className="flex gap-2 items-center">
          <MdOutlinePhotoSizeSelectSmall />
          {selected.sqft} SqFt
        </div>
      </div>

      <div className="flex gap-4 items-start">
        <div className="flex-1 w-2/3 mb-24">
          <Carousel images={selected.image_urls} />
        </div>
        <div className="w-1/3 text-lg">
          <div>{selected.long_description}</div>
        </div>
      </div>
      <AgentContact agent={selected.agent} />
    </div>
  );
};

export default PropertyDetail;
