import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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

  const { setSearchType, setSearchAdvanced } = usePetsContext();

  const navigate = useNavigate();

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
    setSearchType(false);
    setLoginModalShow({});
    navigate('/');
    localStorage.clear();
    setLoggedIn(false);
    setError({ show: false, message: '' });
    setLoginForm({});
    setUser(null);
    setSearchAdvanced({});
  }

  return (
    <div className="navbar-links-right">
      <NavLink
        className="full"
        to="/search"
        style={({ isActive }) => ({
          color: isActive ? '#f9404f' : '#003a4d',
        })}
      >
        Search
      </NavLink>
      <NavLink
        className="full"
        to="/mypets"
        style={({ isActive }) => ({
          color: isActive ? '#f9404f' : '#003a4d',
        })}
      >
        My Pets
      </NavLink>
      <NavDropdown className="mobile" title="Explore" id="basic-nav-dropdown">
        <NavDropdown.Item as={NavLink} to="/search">
          Search
        </NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/mypets">
          My Pets
        </NavDropdown.Item>
      </NavDropdown>

      <NavDropdown title="Settings" id="basic-nav-dropdown">
        <NavDropdown.Item as={NavLink} to="/profile">
          Edit Profile
        </NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/contact">
          Contact Us
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={signOutHandler}>Sign Out</NavDropdown.Item>
      </NavDropdown>
      {user?.isAdmin && <NavbarAdmin />}
    </div>
  );
}

export default NavbarLogged;
