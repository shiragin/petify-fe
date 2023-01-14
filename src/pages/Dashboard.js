import { useEffect, useState } from 'react';
import { Tab, Col, Row, Nav } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import AdminQueries from '../components/Admin/AdminQueries';
import DahsboardList from '../components/Admin/DahsboardList';
import ShowQuery from '../components/Admin/ShowQuery';
import UserDetails from '../components/Admin/UserDetails';
import '../scss/Dashboard.scss';

function Dashboard() {
  const [activeKey, setActiveKey] = useState('users');
  const location = useLocation();

  const [showUser, setShowUser] = useState({ show: false, id: '' });

  const [showQuery, setShowQuery] = useState({
    show: false,
    id: '',
  });

  useEffect(() => {
    if (location.pathname === '/admin/show-pets') {
      setActiveKey('pets');
    } else if (location.pathname === '/admin/show-users') {
      setActiveKey('users');
    } else if (location.pathname === '/admin/show-queries') {
      setActiveKey('queries');
    } else return;
  }, [location]);

  return (
    <div className="main-container mypets">
      <h4 className="profile-title">Dashboard</h4>
      <Tab.Container id="left-tabs-example" activeKey={activeKey}>
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item onClick={() => setActiveKey('users')}>
                <Nav.Link eventKey="users">
                  <span className="text">Users</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={() => setActiveKey('pets')}>
                <Nav.Link eventKey="pets">
                  <span>Pets</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item onClick={() => setActiveKey('queries')}>
                <Nav.Link eventKey="queries">
                  <span>Queries</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="users">
                {showUser.show ? (
                  <UserDetails id={showUser.id} setShowUser={setShowUser} />
                ) : (
                  <DahsboardList list={'users'} setShowUser={setShowUser} />
                )}
              </Tab.Pane>
              <Tab.Pane eventKey="pets">
                <DahsboardList list={'pets'} />
              </Tab.Pane>
              <Tab.Pane eventKey="queries">
                {showQuery.show ? (
                  <ShowQuery id={showQuery.id} setShowQuery={setShowQuery} />
                ) : (
                  <AdminQueries setShowQuery={setShowQuery} />
                )}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
}

export default Dashboard;
