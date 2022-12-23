import { NavLink, Outlet } from 'react-router-dom';
import NavbarUnlogged from './NavbarUnlogged';
import NavbarLogged from './NavbarUnlogged';
// import NavbarAdmin from './NavbarUnlogged';
import { FaPaw } from 'react-icons/fa';
import '../../scss/Navbar.scss';

function Navbar() {
  const loggedIn = false;
  return (
    <div className="navbar">
      <div className="navbar-links">
        <NavLink to="/">
          <div className="navbar-links-logo">
            <FaPaw /> <span>Pet</span>ify
          </div>
        </NavLink>
        {loggedIn ? <NavbarLogged /> : <NavbarUnlogged />}
        <Outlet />
      </div>
    </div>
  );
}

export default Navbar;
