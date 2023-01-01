import { NavLink } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import NavbarAdmin from './NavbarAdmin';

function NavbarLogged() {
  const { setLoggedIn, setUser, user, setLoginModalShow, setLoggedInForm } =
    useUserContext();

  function signOutHandler() {
    setLoginModalShow({});
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.clear();
    setLoggedIn(false);
    setError({ show: false, message: '' });
    setLoggedInForm({});
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
