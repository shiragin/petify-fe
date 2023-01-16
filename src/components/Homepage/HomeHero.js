import { useEffect, useState } from 'react';
import { Button, Carousel } from 'react-bootstrap';
import { useUserContext } from '../../context/UserContext';
import { usePetsContext } from '../../context/PetsContext';
import Hero1 from '../../imgs/cover-logged2.jpg';
import { Link } from 'react-router-dom';

function HomeHero() {
  const { featuredPets, savedPets } = usePetsContext();
  const { user } = useUserContext();

  const [newPet, setNewPet] = useState({});
  const [featuredPet, setFeaturedPet] = useState({});
  const [wishedPet, setWishedpet] = useState({});

  function getWishedPet() {
    const num = Math.floor(Math.random() * savedPets.length);
    setWishedpet(savedPets[num]);
  }

  useEffect(() => {
    // let num1, num2;
    // num1 = Math.floor(Math.random() * featuredPets.length);
    // num2 = Math.floor(Math.random() * featuredPets.length);
    // while (num1 === num2) {
    //   num2 = Math.floor(Math.random() * featuredPets.length);
    // }
    setFeaturedPet(featuredPets[0]);
    setNewPet(featuredPets[2]);
  }, [featuredPets]);

  useEffect(() => {
    getWishedPet();
  }, [savedPets]);

  useEffect(() => {
    if (
      wishedPet &&
      (featuredPet?._id === wishedPet?._id || newPet?._id === wishedPet?._id)
    )
      getWishedPet();
  }, [wishedPet]);

  return (
    <Carousel variant="dark" className="hero-logged">
      <Carousel.Item>
        <img src={Hero1} alt="First slide" className="w-100" />
        <Carousel.Caption>
          <div className="caption-box">
            <h1 className="hero-logged-welcome">
              {user?.lastLogin ? `Welcome\nback,\n` : `Welcome,\n`}
              {user?.firstName}
              {`\n`}
              {user?.lastName}
            </h1>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={featuredPet?.picture}
          alt="Second slide"
          className="w-100 secondary"
        />
        <Carousel.Caption className="secondary">
          <div className="caption-box secondary">
            <h1 className="hero-logged-welcome">{`New on Petify!`}</h1>
            <div className="hero-logged-welcome-text">
              Looking for a loving family! Could {featuredPet?.name} be the
              perfect {featuredPet?.type?.toLowerCase()} for you?
            </div>
            <Link to={`/pet/${featuredPet?._id}`}>
              <Button className="hero-button">
                <span>See more</span>
              </Button>
            </Link>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={newPet?.picture}
          alt="Second slide"
          className="w-100 secondary"
        />
        <Carousel.Caption className="secondary left">
          <div className="caption-box secondary left">
            <h1 className="hero-logged-welcome">{`Where\nis my\nfamily?`}</h1>
            <div className="hero-logged-welcome-text">
              {newPet?.name} and many other adorable{' '}
              {newPet?.type?.toLowerCase()}s are waiting for their forever home
            </div>
            <Link to={`/pet/${newPet?._id}`}>
              <Button className="hero-button">
                <span>See more</span>
              </Button>
            </Link>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      {savedPets?.length && wishedPet?.adoptionStatus !== 'Adopted' ? (
        <Carousel.Item>
          <img
            src={wishedPet?.picture}
            alt="Second slide"
            className="w-100 secondary"
          />
          <Carousel.Caption className="secondary">
            <div className="caption-box secondary">
              <h1 className="hero-logged-welcome">{`What about me?`}</h1>
              <div className="hero-logged-welcome-text">
                You previously added this {wishedPet?.type?.toLowerCase()} to
                your wishlist. No better time to adopt {wishedPet?.name} than
                right now!
              </div>
              <Link to={`/pet/${wishedPet?._id}`}>
                <Button className="hero-button">
                  <span>See more</span>
                </Button>
              </Link>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      ) : (
        <Carousel.Item>
          <img
            src={featuredPets[3]?.picture}
            alt="Second slide"
            className="w-100 secondary"
          />
          <Carousel.Caption className="secondary">
            <div className="caption-box secondary">
              <h1 className="hero-logged-welcome">
                {`Want\na ${featuredPets[3]?.type?.toLowerCase()}?`}
              </h1>
              <div className="hero-logged-welcome-text">
                No better time to adopt {featuredPets[3]?.name} than right now!
              </div>
              <Link to={`/pet/${featuredPets[3]?._id}`}>
                <Button className="hero-button">
                  <span>See more</span>
                </Button>
              </Link>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      )}
    </Carousel>
  );
}

export default HomeHero;
