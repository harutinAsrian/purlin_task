import { atom } from 'jotai';
import { PropertyOfferType } from 'src/types/enum';

const propertyOfferTypeAtom = atom<PropertyOfferType.Rent | PropertyOfferType.Buy>(PropertyOfferType.Buy);

export { propertyOfferTypeAtom };
