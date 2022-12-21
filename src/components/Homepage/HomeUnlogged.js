import Button from 'react-bootstrap/Button';
import hero from './cover.png';

function HomeUnlogged() {
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
          <Button variant="success" className="skew-left">
            <span>Create an account</span>
          </Button>
          <Button variant="success" className="skew-left">
            <span>Browse our pets</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomeUnlogged;
