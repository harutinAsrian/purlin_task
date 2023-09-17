import { FC } from 'react';

import { BsFillPinFill } from 'react-icons/bs';
import { selectedPropertyAtom } from 'src/state/selectedProperty';
import { Listing } from 'src/types';
import { useAtom } from 'jotai';
import { NavLink, useNavigate } from 'react-router-dom';
import { userRoleAtom } from 'src/state/userRole';
import { UserRole } from 'src/types/enum';
import { FaRegEdit } from 'react-icons/fa';
import { MdOutlinePlaylistRemove } from 'react-icons/md';
import { removeItemById } from 'src/utils/removeItemById';
import { isRemovedAtom, editingItemIdAtom } from 'src/state/itemState';

interface Props {
  item: Listing;
}

const PropertyCard: FC<Props> = ({ item }) => {
  const navigate = useNavigate();
  const [, setSelectedProperty] = useAtom(selectedPropertyAtom);
  const [userRole] = useAtom(userRoleAtom);
  const [, setIsRemoved] = useAtom(isRemovedAtom);
  const [, setEditingItemId] = useAtom(editingItemIdAtom);

  // TODO: fix the any below
  const handlePinClick: any = (property: Listing) => {
    setSelectedProperty(property);
  };

  const handleEdit = (id: string) => {
    setEditingItemId(id);
    navigate('/sell');
  };

  const handleRemove = (id: string) => {
    removeItemById(id);
    setIsRemoved(true);
  };

  const renderEditRemoveIcons = () => (
    <div className="absolute top-32 right-5 flexBetween gap-3 p-2">
      <span onClick={() => handleEdit(item.id)} className="flex">
        <button
          type="button"
          className="focus:outline-none text-white bg-green-500 hover:bg-green-700 w-11 h-8 font-medium rounded-lg text-sm px-3 py-1 "
        >
          <FaRegEdit className=" text-2xl" />
        </button>
      </span>
      <span onClick={() => handleRemove(item.id)} className="flex ">
        <button
          type="button"
          className="focus:outline-none text-white bg-red-500 hover:bg-red-700 w-11 h-8 font-medium rounded-lg text-sm px-3 py-1 "
        >
          <MdOutlinePlaylistRemove className=" text-xl" />
        </button>
      </span>
    </div>
  );

  return (
    <div className="relative">
      <NavLink
        to={`/property/${item.id}`}
        className="h-96 hover:shadow-xl p-3 transition-shadow cursor-pointer flexCol justify-between rounded-md"
      >
        <div onClick={() => handlePinClick(item)}>
          <img src={item.image_urls[0]} alt="house_image" className="rounded-lg mb-2 aspect-video w-72 " />
          <div className="flexCol max-w-[260px]">
            <span className="mb-2 font-semibold text-sm text-slate-800">{item.property_type}</span>
            <span className="mb-2 font-semibold">{item.address}</span>
            <span className="mb-6">{item.short_description}</span>
          </div>
        </div>
        <div className="flexBetween">
          <span className="text-lg font-bold inline-block">
            {item.currency} {item.price}
          </span>
          <div className="flexBetween divide-x">
            <div className="flexCol items-center px-2">
              <span className="block font-bold">{item.beds}</span>
              <span className="text-stone-600">Beds</span>
            </div>

            <div className="flexCol items-center px-2">
              <span className="block font-bold">{item.sqft}</span>
              <span className="text-stone-600">SqFt</span>
            </div>
          </div>
        </div>
      </NavLink>
      <div
        className="absolute top-5 right-5 rounded-full bg-slate-200 cursor-pointer flexCenter p-2"
        onClick={() => handlePinClick(item)}
      >
        <BsFillPinFill />
      </div>

      {userRole === UserRole.Admin ? renderEditRemoveIcons() : null}
    </div>
  );
};

export default PropertyCard;
