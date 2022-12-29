import { NavLink } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

function NavbarLogged() {
  const { setLoggedIn, setUser, setLoginModalShow, setLoggedInForm } =
    useUserContext();

  function signOutHandler() {
    setLoggedIn(false);
    setUser({});
    setLoginModalShow({});
    setLoggedInForm({});
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
      <NavLink to="/" onClick={signOutHandler}>
        Sign Out
      </NavLink>
    </div>
  );
}

export default NavbarLogged;
