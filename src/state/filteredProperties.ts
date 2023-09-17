import { atom } from 'jotai';
import { Listing } from 'src/types';

const filteredPropertiesAtom = atom<Listing[] | []>([]);

export { filteredPropertiesAtom };
