import { useEffect } from 'react';

import { useAtom } from 'jotai';
import { allPropertiesAtom } from 'src/state/allProperties';
import { fetchProperties } from 'src/utils/fetchProperties';
import { filteredPropertiesAtom } from 'src/state/filteredProperties';
import { PropertyOfferType } from 'src/types/enum';
import { useParams } from 'react-router-dom';
import { filterPropertiesByOfferType } from 'src/utils/filterPropertiesByOfferType';
import { propertyOfferTypeAtom } from 'src/state/propertyOfferType';

import PropertyList from '../../components/Property/PropertyList';
import { editingItemIdAtom, isRemovedAtom } from 'src/state/itemState';

const Client = () => {
  const [allProperties, setAllProperties] = useAtom(allPropertiesAtom);
  const [propertyOfferType, setPropertyOfferType] = useAtom(propertyOfferTypeAtom);
  const [, setFilteredProperties] = useAtom(filteredPropertiesAtom);
  const [, setEditingItemId] = useAtom(editingItemIdAtom);
  const [isRemoved] = useAtom(isRemovedAtom);

  const { offerType } = useParams<{ offerType: PropertyOfferType.Rent | PropertyOfferType.Buy }>();

  useEffect(() => {
    if (offerType) {
      setPropertyOfferType(offerType);
    }
  }, [offerType]);

  const fetchData = async () => {
    try {
      const data = await fetchProperties();
      const filteredList = filterPropertiesByOfferType(data, propertyOfferType);

      setAllProperties(data);
      setFilteredProperties(filteredList);
    } catch (error) {
      console.error('Error fetching or filtering data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isRemoved]);

  useEffect(() => {
    const filteredList = filterPropertiesByOfferType(allProperties, propertyOfferType);
    setFilteredProperties(filteredList);
  }, [propertyOfferType]);

  useEffect(() => {
    setEditingItemId('');
  }, []);

  return (
    <div>
      <PropertyList />
    </div>
  );
};

export default Client;
