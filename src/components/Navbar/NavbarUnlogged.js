import { NavLink } from 'react-router-dom';
import { useUserContext } from '../../libs/UserContext';
import LoginModal from '../Login/LoginModal';
function NavbarUnlogged() {
  const { loginShow, setLoginShow } = useUserContext();

  return (
    <div className="navbar-links-right">
      <NavLink to="/search">Search</NavLink>
      <NavLink
        onClick={() => {
          setLoginShow({ show: true, type: 'login' });
        }}
      >
        Log in
      </NavLink>
      <LoginModal
        show={loginShow.show}
        onHide={() => setLoginShow({ ...loginShow, show: false })}
      />
    </div>
  );
}

export default NavbarUnlogged;
