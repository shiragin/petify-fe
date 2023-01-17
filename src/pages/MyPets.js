import { useEffect, useState } from 'react';
import { Tab, Col, Row, Nav } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import OwnedPets from '../components/Pet/OwnedPets';
import SavedPets from '../components/Pet/SavedPets';
import '../scss/MyPets.scss';

function MyPets() {
  const [activeKey, setActiveKey] = useState('owned');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === '/mypets/owned') {
      setActiveKey('owned');
    } else if (location.pathname === '/mypets/saved') {
      setActiveKey('saved');
    } else setActiveKey('owned');
  }, [location]);

  return (
    <div className="main-container mypets">
      <h4 className="profile-title">My Pets</h4>
      <Tab.Container id="left-tabs-example" activeKey={activeKey}>
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item
                onClick={() => {
                  setActiveKey('owned');
                  navigate('/mypets/owned');
                }}
              >
                <Nav.Link eventKey="owned">
                  <span className="text">Owned Pets</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item
                onClick={() => {
                  setActiveKey('saved');
                  navigate('/mypets/saved');
                }}
              >
                <Nav.Link eventKey="saved">
                  <span>Saved Pets</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="owned">
                <OwnedPets />
              </Tab.Pane>
              <Tab.Pane eventKey="saved">
                <SavedPets />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default MyPets;
