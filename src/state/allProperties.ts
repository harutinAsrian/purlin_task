import { atom } from 'jotai';
import { Listing } from 'src/types';

const allPropertiesAtom = atom<Listing[] | []>([]);

export { allPropertiesAtom };
