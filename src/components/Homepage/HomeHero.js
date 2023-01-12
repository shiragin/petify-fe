import { Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import { usePetsContext } from '../../context/PetsContext';
import Hero1 from '../../imgs/cover-logged2.jpg';
import Hero2 from '../../imgs/cover-logged.jpg';

function HomeHero() {
  const { featuredPets, getRandomPets } = usePetsContext();
  const { user } = useUserContext();

  return (
    <Carousel variant="dark" className="hero-logged">
      <Carousel.Item interval={100000}>
        <img src={Hero1} alt="First slide" className="w-100" />
        <Carousel.Caption>
          <div className="caption-box">
            <h1 className="hero-logged-welcome">
              {user?.lastLogin ? `Welcome\nback,\n` : `Welcome,\n`}
              {user?.firstName}
              {`\n`}
              {user?.lastName}
            </h1>
            {/* <Link to="/search">
              <Button className="skew-left">
                <span>Browse our pets</span>
              </Button>
            </Link> */}
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={featuredPets[2]?.picture}
          alt="Second slide"
          className="w-100 secondary"
        />
        <Carousel.Caption interval={100000} className="secondary">
          <div className="caption-box secondary">
            <h1 className="hero-logged-welcome">{`New on Petify!`}</h1>
            <div className="hero-logged-welcome-text">
              Looking for a loving family! Could {featuredPets[2]?.name} be the
              perfect {featuredPets[2]?.type?.toLowerCase()} for you?
            </div>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={featuredPets[0]?.picture}
          alt="Second slide"
          className="w-100 secondary"
        />
        <Carousel.Caption interval={100000} className="secondary">
          <div className="caption-box secondary">
            <h1 className="hero-logged-welcome">
              {`Meet\n${featuredPets[0]?.name}`}
            </h1>
            <div className="hero-logged-welcome-text">
              This {featuredPets[0]?.type?.toLowerCase()} and many other
              adorable pets are waiting for their forever home
            </div>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HomeHero;
