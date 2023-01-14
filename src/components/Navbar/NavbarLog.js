import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { usePetsContext } from '../../context/PetsContext';
import NavbarAdmin from './NavbarAdmin';
import { NavDropdown } from 'react-bootstrap';

function NavbarLogged() {
  const {
    setLoggedIn,
    setUser,
    user,
    setError,
    setLoginModalShow,
    setLoginForm,
  } = useUserContext();

  const { setSearchType, setSearchAdvanced } = usePetsContext;

  useEffect(() => {
    const tokenExpirationTime = getTokenExpirationTime();
    if (tokenExpirationTime) {
      const timeoutId = setInterval(() => {
        if (Date.now() > tokenExpirationTime) {
          console.log('EXPIRED!');
          clearInterval(timeoutId);
          signOutHandler();
        }
      }, 10000);
    }
  }, []);

  function getTokenExpirationTime() {
    const expirationTime = localStorage.getItem('exp');
    return expirationTime ? Number(expirationTime) : null;
  }

  function signOutHandler() {
    console.log('SIGNING OUT');
    setLoginModalShow({});
    localStorage.clear();
    setLoggedIn(false);
    setError({ show: false, message: '' });
    setLoginForm({});
    setUser(null);
    setSearchType(false);
    setSearchAdvanced({});
  }

  return (
    <div className="navbar-links-right">
      <NavLink
        to="/search"
        style={({ isActive }) => ({
          color: isActive ? '#f9404f' : '#003a4d',
        })}
      >
        Search
      </NavLink>
      <NavLink
        to="/mypets"
        style={({ isActive }) => ({
          color: isActive ? '#f9404f' : '#003a4d',
        })}
      >
        My Pets
      </NavLink>
      {user?.isAdmin && <NavbarAdmin />}
      <NavDropdown title="Settings" id="basic-nav-dropdown">
        <NavDropdown.Item as={NavLink} to="/profile">
          Edit Profile
        </NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/contact">
          Contact Us
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item as={NavLink} to="/signout" onClick={signOutHandler}>
          Sign Out
        </NavDropdown.Item>
      </NavDropdown>
      {/* <NavLink
        to="/profile"
        style={({ isActive }) => ({
          color: isActive ? '#f9404f' : '#003a4d',
        })}
      >
        Profile
      </NavLink> */}
      {/* <NavLink to="/" onClick={signOutHandler}>
        Sign Out
      </NavLink> */}
    </div>
  );
}

export default NavbarLogged;
