import { Outlet } from 'react-router-dom';
import NavbarUnlogged from './NavbarUnlogged';
import NavbarLogged from './NavbarUnlogged';
// import NavbarAdmin from './NavbarUnlogged';
import { FaPaw } from 'react-icons/fa';

function Navbar() {
  const loggedIn = false;
  return (
    <div className="navbar">
      <div className="navbar-links">
        <div className="navbar-links-logo">
          <FaPaw /> <span>Pet</span>ify
        </div>
        {loggedIn ? <NavbarLogged /> : <NavbarUnlogged />}
        <Outlet />
      </div>
    </div>
  );
}

export default Navbar;
