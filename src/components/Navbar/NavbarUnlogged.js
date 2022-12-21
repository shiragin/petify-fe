import { NavLink } from 'react-router-dom';
function NavbarUnlogged() {
  return (
    <div className="navbar-links-right">
      <NavLink>Search</NavLink>
      <NavLink>Log in</NavLink>
    </div>
  );
}

export default NavbarUnlogged;
