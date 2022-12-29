import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { usePetsContext } from '../../context/PetsContext';
import NavbarUnlogged from './NavbarUnlogged';
import NavbarLogged from './NavbarLogged';
import { FaPaw } from 'react-icons/fa';
import '../../scss/Navbar.scss';

function Navbar() {
  const { loggedIn, setLoggedIn, setUser } = useUserContext();
  const { pets } = usePetsContext();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      setLoggedIn(true);
    }
  }, []);

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
