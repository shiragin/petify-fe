import React, { useEffect } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import NavbarUnlogged from './NavbarUnlogged';
import { FaPaw } from 'react-icons/fa';
import '../../scss/Navbar.scss';
import NavbarLog from './NavbarLog';

function Navbar() {
  const { loggedIn, setLoggedIn, setUser, user, userId, getUserProfile } =
    useUserContext();

  async function setUserDetails() {
    setLoggedIn(true);
    const currentUser = await getUserProfile(userId);
    setUser(currentUser);
  }

  useEffect(
    () => {
      if (!userId) {
        setLoggedIn(false);
      } else {
        if (!user.email) setUserDetails();
      }
    },
    [],
    [user],
    [userId]
  );

  return (
    <div className="navbar">
      <div className="navbar-links">
        <NavLink to="/">
          <div className="navbar-links-logo">
            <FaPaw /> <span>Pet</span>ify
          </div>
        </NavLink>
        {loggedIn ? <NavbarLog /> : <NavbarUnlogged />}
        <Outlet />
      </div>
    </div>
  );
}

export default Navbar;
