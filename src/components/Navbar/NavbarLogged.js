import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import NavbarAdmin from './NavbarAdmin';

function NavbarLogged() {
  const {
    setLoggedIn,
    setUser,
    user,
    setError,
    setLoginModalShow,
    setLoginForm,
  } = useUserContext();

  // const [isExpired, setIsExpired] = useState(false);

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

  // return isExpired;

  function getTokenExpirationTime() {
    // Get the expiration time of the token from the client-side storage
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
    setUser({});
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
      <NavLink
        to="/profile"
        style={({ isActive }) => ({
          color: isActive ? '#f9404f' : '#003a4d',
        })}
      >
        Profile
      </NavLink>
      {user.isAdmin && <NavbarAdmin />}
      <NavLink to="/" onClick={signOutHandler}>
        Sign Out
      </NavLink>
    </div>
  );
}

export default NavbarLogged;
