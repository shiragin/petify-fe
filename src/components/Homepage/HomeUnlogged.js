import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
// import LoginModal from '../Login/LoginModal';
import { useUserContext } from '../../libs/UserContext';
import hero from '../../imgs/cover.png';

function HomeUnlogged() {
  const { setLoginShow } = useUserContext();

  return (
    <div className="hero">
      <img
        src={hero}
        className="hero-img"
        alt="A sweet kitten raising its paw"
      />
      <div className="hero-content">
        <h1 className="hero-title">{`Welcome\nto Petify`}</h1>
        <p className="hero-text">Meet your new best friend today</p>
        <div className="hero-buttons">
          <Button
            variant="success"
            className="skew-left"
            onClick={() => {
              setLoginShow({ show: true, type: 'signup' });
            }}
          >
            <span>Create an account</span>
          </Button>
          <Link to="/search">
            <Button variant="success" className="skew-left">
              <span>Browse our pets</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomeUnlogged;
