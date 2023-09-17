type MapLocation = {
  latitude: number;
  longitude: number;
};

export type Agent = {
  name: string;
  email: string;
  phone: string;
};

export type Listing = {
  id: string;
  listing_type: 'buy' | 'rent';
  price: number;
  currency: string;
  short_description: string;
  long_description: string;
  address: string;
  location?: MapLocation;
  property_type: string;
  image_urls: string[];
  agent: Agent;
  beds: string;
  sqft: number;
};

export type RealEstateData = {
  listings: Listing[];
};

export type NavLink = {
  href: string;
  key: string;
  text: string;
};
