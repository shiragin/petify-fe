import Button from 'react-bootstrap/Button';
import hero from './krista-mangulsone-unsplash.jpg';

function HomeUnlogged() {
  return (
    <div className="hero">
      {/* <img src={hero} className="hero-img" /> */}
      <div className="hero-content">
        <h1 className="hero-title">Welcome to Petify</h1>
        <p className="hero-text">Meet your new best friend today</p>
        <div className="hero-buttons">
          <Button variant="success">Create an account</Button>
          <Button variant="success">Browse our pets</Button>
        </div>
      </div>
    </div>
  );
}

export default HomeUnlogged;
