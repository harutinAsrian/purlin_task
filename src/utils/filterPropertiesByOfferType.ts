import { Listing } from 'src/types';

export const filterPropertiesByOfferType = (properties: Listing[], listingType: string) => {
  const filtered = properties.filter((property) => property.listing_type === listingType);
  return filtered;
};
