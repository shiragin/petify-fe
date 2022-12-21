import { NavLink } from 'react-router-dom';
import { useUserContext } from '../../libs/UserContext';
import LoginModal from '../Login/LoginModal';
function NavbarUnlogged() {
  const { loginShow, setLoginShow } = useUserContext();

  function clickHandler() {
    setLoginShow({ show: true, type: 'login' });
  }

  return (
    <div className="navbar-links-right">
      <NavLink>Search</NavLink>
      <NavLink onClick={clickHandler}>Log in</NavLink>
      <LoginModal show={loginShow} onHide={() => setLoginShow(false)} />
    </div>
  );
}

export default NavbarUnlogged;
