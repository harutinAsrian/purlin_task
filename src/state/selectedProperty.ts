import { atom } from 'jotai';
import { Listing } from 'src/types';

const selectedPropertyAtom = atom<Listing | object>({});

export { selectedPropertyAtom };
