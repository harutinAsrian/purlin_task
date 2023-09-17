import { NavLink as LinkType } from 'src/types';
import { NavLinks } from 'src/constants';
import { NavLink } from 'react-router-dom';

const Navigation = () => (
  <nav className="">
    <ul className="flex gap-3 space-x-4">
      {NavLinks.map((link: LinkType) => (
        <li key={link.key}>
          <NavLink
            to={link.href}
            className={({ isActive }: { isActive: boolean }) =>
              (isActive ? 'text-red-700 underline decoration-red-700' : '') + ' hover:text-red-400 text-lg'
            }
          >
            {link.text}
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navigation;
