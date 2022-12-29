import { Tab, Col, Row, Nav } from 'react-bootstrap';
import OwnedPets from '../components/Pet/OwnedPets';
import SavedPets from '../components/Pet/SavedPets';
import '../scss/MyPets.scss';

function MyPets() {
  return (
    <div className="main-container mypets">
      <h4 className="mypets-title">My Pets</h4>
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">
                  <span className="text">Owned Pets</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">
                  <span>Saved Pets</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">
                <OwnedPets />
              </Tab.Pane>
              <Tab.Pane eventKey="second">
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
