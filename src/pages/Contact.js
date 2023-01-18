import { useState } from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import ShowQuery from '../components/Admin/ShowQuery';
import ContactForm from '../components/Login/ContactForm';
import '../scss/Dashboard.scss';
import '../scss/Profile.scss';
import ContactQueries from '../components/Login/ContactQueries';

function Contact() {
  const [activeKey, setActiveKey] = useState('contact');
  const location = useLocation();

  const { userId } = useUserContext();

  // useEffect(() => {
  //   if (location.pathname === '/mypets/owned') {
  //     setActiveKey('owned');
  //   } else if (location.pathname === '/mypets/saved') {
  //     setActiveKey('saved');
  //   } else return;
  // }, [location]);

  return (
    <div className="main-container contact profile mypets">
      <h1 className="profile-title">Contact</h1>
      <Tab.Container id="left-tabs-example" activeKey={activeKey}>
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item onClick={() => setActiveKey('contact')}>
                <Nav.Link eventKey="contact">
                  <span className="text">Contact Us</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={() => setActiveKey('queries')}>
                <Nav.Link eventKey="queries">
                  <span>Your Queries</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="contact">
                <ContactForm />
              </Tab.Pane>
              <Tab.Pane eventKey="queries">
                <ContactQueries id={userId} />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default Contact;
