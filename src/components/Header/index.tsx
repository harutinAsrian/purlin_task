import { FcHome } from 'react-icons/fc';

import Navigation from '../Navigation';

const Header = () => (
  <header className="shadow-md">
    <div className="flexStart container mx-auto py-6">
      <FcHome className="text-3xl mr-6" />
      <Navigation />
    </div>
  </header>
);

export default Header;
