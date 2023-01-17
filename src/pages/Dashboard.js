import { useEffect, useState } from 'react';
import { Tab, Col, Row, Nav } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import AdminQueries from '../components/Admin/AdminQueries';
import DahsboardList from '../components/Admin/DahsboardList';
import ShowQuery from '../components/Admin/ShowQuery';
import UserDetails from '../components/Admin/UserDetails';
import '../scss/Dashboard.scss';

function Dashboard() {
  const [activeKey, setActiveKey] = useState('users');
  const location = useLocation();
  const navigate = useNavigate();

  const [showUser, setShowUser] = useState({ show: false, id: '' });

  const [showQuery, setShowQuery] = useState({
    show: false,
    id: '',
  });

  const { id } = useParams();

  useEffect(() => {
    console.log(location.pathname);
    // console.log(id);
    // if (typeof id === 'string') {
    //   setActiveKey('users');
    //   navigate(`/admin/show-users/${id}`);
    if (location.pathname === '/admin/show-pets') {
      setActiveKey('pets');
    } else if (location.pathname.indexOf('/admin/show-users') > -1) {
      console.log('HIII');
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
              <Nav.Item
                onClick={() => {
                  setActiveKey('users');
                  navigate('/admin/show-users');
                }}
              >
                <Nav.Link eventKey="users">
                  <span className="text">Users</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item
                onClick={() => {
                  setActiveKey('pets');
                  navigate('/admin/show-pets');
                }}
              >
                <Nav.Link eventKey="pets">
                  <span>Pets</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item
                onClick={() => {
                  setActiveKey('queries');
                  navigate('/admin/show-queries');
                }}
              >
                <Nav.Link eventKey="queries">
                  <span>Queries</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="users">
                {showUser.show || id ? (
                  <UserDetails
                    id={showUser.id || id}
                    setShowUser={setShowUser}
                    onLoad={() => navigate(`/admin/show-users/${id}`)}
                  />
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
