import { NavLink } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import LoginModal from '../Login/LoginModal';
function NavbarUnlogged() {
  const { loginModalShow, setLoginModalShow } = useUserContext();

  return (
    <div className="navbar-links-right">
      <NavLink to="/search">Search</NavLink>
      {/* <NavLink to="/contact">Contact Us</NavLink> */}
      <NavLink
        onClick={() => {
          setLoginModalShow({ show: true, type: 'login' });
        }}
      >
        Log in
      </NavLink>
      <LoginModal
        show={loginModalShow.show}
        onHide={() => setLoginModalShow({ ...loginModalShow, show: false })}
      />
    </div>
  );
}

export default NavbarUnlogged;
