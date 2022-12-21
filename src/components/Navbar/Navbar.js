import { FaPaw } from 'react-icons/fa';

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-links">
        <div className="navbar-links-logo">
          <FaPaw /> Petify
        </div>
        <div className="navbar-links-right">
          <div>Search</div>
          <div>Log in</div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
