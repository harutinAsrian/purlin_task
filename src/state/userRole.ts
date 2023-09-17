import { atom } from 'jotai';
import { UserRole } from 'src/types/enum';

const userRoleAtom = atom<UserRole.Admin | UserRole.User>(UserRole.User);

export { userRoleAtom };
