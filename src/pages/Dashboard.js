import { useEffect, useState } from 'react';
import { Tab, Col, Row, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import DahsboardList from '../components/Admin/DahsboardList';
import '../scss/Dashboard.scss';

function ShowPets() {
  const [activeKey, setActiveKey] = useState('first');
  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname);
    if (location.pathname === '/admin/show-pets') {
      console.log('PETS');
      setActiveKey('pets');
    } else if (location.pathname === '/admin/show-users') {
      console.log('USERS');
      setActiveKey('users');
    } else return;
  }, [location]);

  return (
    <div className="main-container mypets">
      <h4 className="profile-title">Dashboard</h4>
      <Tab.Container
        id="left-tabs-example"
        // defaultActiveKey={activeKey}
        activeKey={activeKey}
      >
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item onClick={() => setActiveKey('users')}>
                <Nav.Link eventKey="users">
                  <span className="text">Show Users</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={() => setActiveKey('pets')}>
                <Nav.Link eventKey="pets">
                  <span>Show Pets</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="users">
                <DahsboardList list={'users'} />
              </Tab.Pane>
              <Tab.Pane eventKey="pets">
                <DahsboardList list={'pets'} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
    // <div className="main-container show-pets">
    //   <h1 className="profile-title">All Pets List</h1>
    //   <PetList />
    // </div>
  );
}

export default ShowPets;
