import { NavLink } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import { RiAdminFill } from 'react-icons/ri';

const adminMenu = (
  <span>
    <RiAdminFill />
  </span>
);

function NavbarAdmin() {
  return (
    <div>
      <NavDropdown title="Admin" id="basic-nav-dropdown" className="desktop">
        <NavDropdown.Item as={NavLink} to="/admin/add-pet">
          Add Pet
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item as={NavLink} to="/admin/show-users">
          Show All Users
        </NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/admin/show-pets">
          Show All Pets
        </NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/admin/show-queries">
          Show User Queries
        </NavDropdown.Item>
      </NavDropdown>

      <NavDropdown title={adminMenu} id="basic-nav-dropdown" className="mobile">
        <NavDropdown.Item as={NavLink} to="/admin/add-pet">
          Add Pet
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item as={NavLink} to="/admin/show-users">
          Show All Users
        </NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/admin/show-pets">
          Show All Pets
        </NavDropdown.Item>
        <NavDropdown.Item as={NavLink} to="/admin/show-queries">
          Show User Queries
        </NavDropdown.Item>
      </NavDropdown>
    </div>
  );
}

export default NavbarAdmin;
