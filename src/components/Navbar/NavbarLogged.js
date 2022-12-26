import { NavLink } from 'react-router-dom';

function NavbarLogged() {
  return (
    <div className="navbar-links-right">
      <NavLink to="/search">Search</NavLink>
      <NavLink to="/mypets">My Pets</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/profile">Sign Out</NavLink>
    </div>
  );
}

export default NavbarLogged;
