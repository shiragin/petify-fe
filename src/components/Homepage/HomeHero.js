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
      <Carousel.Item>
        <img src={Hero1} alt="First slide" className="w-100" />
        <Carousel.Caption>
          <div>
            <h1 className="hero-logged-welcome">
              {user?.lastLogin ? `Welcome back,\n` : `Welcome,\n`}
              {user?.firstName} {user?.lastName}
            </h1>
            <Link to="/search">
              <Button className="skew-left">
                <span>Browse our pets</span>
              </Button>
            </Link>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={featuredPets[0]?.picture}
          alt="Second slide"
          className="w-100"
        />
        <Carousel.Caption>
          <div className="secondary">
            <h1 className="hero-logged-welcome">{`Have a look at\nour featured pets`}</h1>
            <Link to={`/pet/${featuredPets[0]?._id}`}>
              <Button className="skew-left">
                <span>Meet {featuredPets[0]?.name}</span>
              </Button>
            </Link>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );

  // {
  /* <div>
        <h1 className="hero-logged-welcome">
          {user?.lastLogin ? `Welcome back,\n` : `Welcome,\n`}
          {user?.firstName} {user?.lastName}
        </h1>
        <Link to="/search">
          <Button className="skew-left">
            <span>Browse our pets</span>
          </Button>
        </Link>
      </div>
      <div className="gradient" /> */
  // }
  // </div>
  // );
}

export default HomeHero;
