import { useForm } from 'react-hook-form';
import { Listing } from 'src/types';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { v4 as uuidv4 } from 'uuid';

import propertySchema from './constants/validationSchema';
import { postDataToServer } from 'src/utils/postDataToServer';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { editingItemIdAtom } from 'src/state/itemState';
import { allPropertiesAtom } from 'src/state/allProperties';
import { updateItemById } from 'src/utils/updateItemById';

const Form = () => {
  let navigate = useNavigate();
  const [editingItemId] = useAtom(editingItemIdAtom);
  const [allProperties] = useAtom(allPropertiesAtom);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Listing>({
    resolver: yupResolver(propertySchema as yup.ObjectSchema<Listing>),
    defaultValues: {
      id: uuidv4(),
      currency: 'USD',
      image_urls: ['https://shorturl.at/hjIQ6', 'https://rb.gy/fmc4j', 'https://rb.gy/yw1ma', 'https://rb.gy/gvt3w'],
      location: {
        latitude: 0,
        longitude: 0,
      },
    },
  });

  console.log(errors);

  const handleSubmitForm = (inputs: Listing) => {
    if (editingItemId) {
      updateItemById(editingItemId, inputs);
    } else {
      postDataToServer(inputs);
    }

    navigate('/buy');
  };

  useEffect(() => {
    const editingItem = allProperties.find((property) => property.id === editingItemId);

    for (const key in editingItem) {
      if (editingItem.hasOwnProperty(key)) {
        const validKey = key as keyof Listing;
        setValue(validKey, editingItem[validKey]);
      }
    }
  }, [editingItemId]);

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <div className="bg-white container mx-auto">
        <div className="shadow rounded-lg p-6 mb-6">
          <h3 className="mb-4 font-semibold text-gray-900 ">Profile</h3>

          <p className="mb-10">This information will be displayed publicly so be careful what you share.</p>
          <div className="border focus-within:border-blue-500 mb-9 focus-within:text-blue-500  relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label htmlFor="name" className="bg-white text-gray-600 px-1">
                  Name *
                </label>
              </p>
            </div>
            <p>
              <input
                id="name"
                type="text"
                {...register('agent.name')}
                className="border-none py-1 px-1 text-gray-900 outline-none block h-full w-full"
              />
            </p>
          </div>

          <div className="border focus-within:border-blue-500 mb-9 focus-within:text-blue-500  relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label htmlFor="email" className="bg-white text-gray-600 px-1">
                  email *
                </label>
              </p>
            </div>
            <p>
              <input
                id="email"
                type="email"
                {...register('agent.email')}
                className="border-none py-1 px-1 text-gray-900 outline-none block h-full w-full"
              />
            </p>
          </div>

          <div className="border focus-within:border-blue-500 mb-9 focus-within:text-blue-500  relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label htmlFor="phone" className="bg-white text-gray-600 px-1">
                  phone *
                </label>
              </p>
            </div>
            <p>
              <input
                id="phone"
                type="string"
                {...register('agent.phone')}
                className="border-none py-1 px-1 text-gray-900 outline-none block h-full w-full"
              />
            </p>
          </div>
        </div>

        <div className="shadow rounded-lg p-6">
          <h3 className="mb-4 font-semibold text-gray-900 ">Add your property</h3>
          <ul className="mb-6 items-center w-52 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex ">
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r ">
              <div className="flex items-center pl-3 ">
                <input
                  id="buy"
                  type="radio"
                  value="buy"
                  {...register('listing_type')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                  checked
                />
                <label htmlFor="buy" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 ">
                  Sale
                </label>
              </div>
            </li>
            <li className="w-full border-b border-gray-200 sm:border-b-0  ">
              <div className="flex items-center pl-3 ">
                <input
                  id="rent"
                  type="radio"
                  value="rent"
                  {...register('listing_type')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                />
                <label htmlFor="rent" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 ">
                  Rent
                </label>
              </div>
            </li>
          </ul>

          <div className="border focus-within:border-blue-500 mb-9 focus-within:text-blue-500  relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label htmlFor="address" className="bg-white text-gray-600 px-1">
                  address *
                </label>
              </p>
            </div>
            <p>
              <input
                id="address"
                type="text"
                {...register('address')}
                className="border-none py-1 px-1 text-gray-900 outline-none block h-full w-full"
              />
            </p>
          </div>

          <div className="border focus-within:border-blue-500 mb-9 focus-within:text-blue-500  relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label htmlFor="longitude" className="bg-white text-gray-600 px-1">
                  longitude *
                </label>
              </p>
            </div>
            <p>
              <input
                id="longitude"
                type="number"
                step="any"
                {...register('location.longitude')}
                className="border-none py-1 px-1 text-gray-900 outline-none block h-full w-full"
              />
            </p>
          </div>

          <div className="border focus-within:border-blue-500 mb-9 focus-within:text-blue-500  relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label htmlFor="latitude" className="bg-white text-gray-600 px-1">
                  latitude *
                </label>
              </p>
            </div>
            <p>
              <input
                id="latitude"
                type="number"
                step="any"
                {...register('location.latitude')}
                className="border-none py-1 px-1 text-gray-900 outline-none block h-full w-full"
              />
            </p>
          </div>

          <div className="border focus-within:border-blue-500 mb-9 focus-within:text-blue-500  relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label htmlFor="property type" className="bg-white text-gray-600 px-1">
                  property type *
                </label>
              </p>
            </div>
            <p>
              <input
                id="property type"
                type="text"
                {...register('property_type')}
                className="border-none py-1 px-1 text-gray-900 outline-none block h-full w-full"
              />
            </p>
          </div>

          <div className="border focus-within:border-blue-500 mb-9 focus-within:text-blue-500  relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label htmlFor="price" className="bg-white text-gray-600 px-1">
                  price in USD*
                </label>
              </p>
            </div>
            <p>
              <input
                id="price"
                type="number"
                {...register('price')}
                className="border-none py-1 px-1 text-gray-900 outline-none block h-full w-full"
              />
            </p>
          </div>

          <div className="border focus-within:border-blue-500 mb-9 focus-within:text-blue-500  relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label htmlFor="short_desc" className="bg-white text-gray-600 px-1">
                  short description *
                </label>
              </p>
            </div>
            <p>
              <input
                id="short_desc"
                type="text"
                {...register('short_description')}
                className="border-none py-1 px-1 text-gray-900 outline-none block h-full w-full"
              />
            </p>
          </div>

          <div className="border focus-within:border-blue-500 mb-9 focus-within:text-blue-500  relative rounded p-1">
            <div className="-mt-4 absolute px-1 uppercase text-xs">
              <p>
                <label htmlFor="long_desc" className="bg-white text-gray-600 px-1">
                  long description *
                </label>
              </p>
            </div>
            <textarea
              id="long_desc"
              rows={4}
              {...register('long_description')}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Write your thoughts here..."
            />
          </div>

          <h3 className="mb-4 font-semibold text-gray-900 ">Number Of Rooms</h3>
          <ul className="items-center w-96 text-sm mb-6 font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex ">
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r ">
              <div className="flex items-center pl-3">
                <input
                  id="1"
                  type="radio"
                  value="1"
                  {...register('beds')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                />
                <label htmlFor="1" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 ">
                  1
                </label>
              </div>
            </li>
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r ">
              <div className="flex items-center pl-3">
                <input
                  id="2"
                  type="radio"
                  value="2"
                  {...register('beds')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                />
                <label htmlFor="2" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 ">
                  2
                </label>
              </div>
            </li>
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r ">
              <div className="flex items-center pl-3">
                <input
                  id="3"
                  type="radio"
                  value="3"
                  {...register('beds')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                />
                <label htmlFor="3" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 ">
                  3
                </label>
              </div>
            </li>
            <li className="w-full ">
              <div className="flex items-center pl-3">
                <input
                  id="4"
                  type="radio"
                  value="4"
                  {...register('beds')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                />
                <label htmlFor="4" className="w-full py-3 ml-2 text-sm font-medium text-gray-900 ">
                  4
                </label>
              </div>
            </li>
          </ul>

          <div className="border focus-within:border-blue-500 mb-9 focus-within:text-blue-500  relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label htmlFor="sqft" className="bg-white text-gray-600 px-1">
                  sqft
                </label>
              </p>
            </div>
            <p>
              <input
                id="sqft"
                type="number"
                {...register('sqft')}
                className="border-none py-1 px-1 text-gray-900 outline-none block h-full w-full"
              />
            </p>
          </div>

          <h3 className="mb-4 font-semibold text-gray-900 ">Images</h3>

          <div className="border focus-within:border-blue-500 mb-9 focus-within:text-blue-500  relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label htmlFor="link 1" className="bg-white text-gray-600 px-1">
                  link 1 *
                </label>
              </p>
            </div>
            <p>
              <input
                id="link 1"
                type="text"
                {...register('image_urls.0')}
                className="border-none py-1 px-1 text-gray-900 outline-none block h-full w-full"
              />
            </p>
          </div>

          <div className="border focus-within:border-blue-500 mb-9 focus-within:text-blue-500  relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label htmlFor="link 2" className="bg-white text-gray-600 px-1">
                  link 2 *
                </label>
              </p>
            </div>
            <p>
              <input
                id="link 2"
                type="text"
                {...register('image_urls.1')}
                className="border-none py-1 px-1 text-gray-900 outline-none block h-full w-full"
              />
            </p>
          </div>

          <div className="border focus-within:border-blue-500 mb-9 focus-within:text-blue-500  relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label htmlFor="link 3" className="bg-white text-gray-600 px-1">
                  link 3 *
                </label>
              </p>
            </div>
            <p>
              <input
                id="link 3"
                type="text"
                {...register('image_urls.2')}
                className="border-none py-1 px-1 text-gray-900 outline-none block h-full w-full"
              />
            </p>
          </div>

          <div className="border focus-within:border-blue-500 mb-9 focus-within:text-blue-500  relative rounded p-1">
            <div className="-mt-4 absolute tracking-wider px-1 uppercase text-xs">
              <p>
                <label htmlFor="link 4" className="bg-white text-gray-600 px-1">
                  link 4 *
                </label>
              </p>
            </div>
            <p>
              <input
                id="link 4"
                type="text"
                {...register('image_urls.3')}
                className="border-none py-1 px-1 text-gray-900 outline-none block h-full w-full"
              />
            </p>
          </div>
        </div>

        <div className="border-t mt-6 pt-3 mb-9">
          <input
            type="submit"
            className="rounded text-gray-100 px-3 py-1 bg-blue-500 hover:shadow-inner hover:bg-blue-700 "
          />
        </div>
      </div>
    </form>
  );
};

export default Form;
