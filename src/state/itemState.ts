import { atom } from 'jotai';

const isRemovedAtom = atom<boolean>(false);
const editingItemIdAtom = atom<string>('');

export { isRemovedAtom, editingItemIdAtom };
