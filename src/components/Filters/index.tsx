import { useAtom } from 'jotai';
import { userRoleAtom } from 'src/state/userRole';
import { UserRole } from 'src/types/enum';

import Search from './Search';
import RangeInput from './RangeInput';

const Filters = () => {
  const [userRole, setUserRole] = useAtom(userRoleAtom);

  const handleToggle = () => {
    setUserRole((prev) => (prev === UserRole.Admin ? UserRole.User : UserRole.Admin));
  };

  return (
    <div className="py-4 border-b-2">
      <div className="flexBetween container mx-auto ">
        <div className="flex gap-6">
          <div className="w-72 ">
            <Search />
          </div>
          <RangeInput />
        </div>

        <button className="bg-red-300 hover:bg-red-500 text-white font-bold py-2 px-4 rounded" onClick={handleToggle}>
          {`Switch to ${userRole === UserRole.Admin ? UserRole.User : UserRole.Admin}`}
        </button>
      </div>
    </div>
  );
};

export default Filters;
