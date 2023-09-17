import { Listing } from 'src/types';

export const searchByValue = (data: Listing[], value: string) => {
  const valueLower = value.toLowerCase();

  const searchResults = data.filter((item) => {
    const address = item.address.toLowerCase();
    const description = item.short_description.toLowerCase();
    const propertyType = item.property_type.toLowerCase();
    const agentName = item.agent.name.toLowerCase();

    return (
      address.includes(valueLower) ||
      description.includes(valueLower) ||
      propertyType.includes(valueLower) ||
      agentName.includes(valueLower)
    );
  });

  return searchResults;
};
