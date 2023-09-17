import { Listing } from 'src/types';

export const filterPropertiesByPriceRange = (data: Listing[], priceRange: number[]) => {
  const [minPrice, maxPrice] = priceRange;

  const filteredData = data.filter((item) => {
    const price = item.price;
    return price >= minPrice * 1000 && price <= maxPrice * 1000;
  });

  return filteredData;
};
