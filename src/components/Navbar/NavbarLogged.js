import { NavLink } from 'react-router-dom';
import { useUserContext } from '../../libs/UserContext';

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
      <NavLink to="/search">Search</NavLink>
      <NavLink to="/mypets">My Pets</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/" onClick={signOutHandler}>
        Sign Out
      </NavLink>
    </div>
  );
}

export default NavbarLogged;
