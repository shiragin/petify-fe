import { NavLink } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';

function NavbarAdmin() {
  return (
    <NavDropdown title="Admin" id="basic-nav-dropdown">
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
    </NavDropdown>
  );
}

export default NavbarAdmin;
