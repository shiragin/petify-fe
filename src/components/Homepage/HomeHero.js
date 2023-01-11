import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';

function HomeHero() {
  const { user } = useUserContext();

  return (
    <div className="hero-logged">
      <div>
        <h1 className="hero-logged-welcome">
          {`Welcome back,\n`}
          {user?.firstName} {user?.lastName}
        </h1>
        <Link to="/search">
          <Button className="skew-left">
            <span>Browse our pets</span>
          </Button>
        </Link>
      </div>
      <div className="gradient" />
    </div>
  );
}

export default HomeHero;
