import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronCircleRight } from 'react-icons/fa';
import { usePetsContext } from '../../context/PetsContext';
import PetCard from '../Pet/PetCard';

function FeaturedPets() {
  const { featuredPets, getRandomPets } = usePetsContext();

  useEffect(() => {
    getRandomPets();
  }, []);

  return (
    <div className="home-logged-featured-pets">
      <div className="home-logged-featured-pets-title">
        <span>Featured pets</span>
      </div>
      <div className="container">
        <div className="home-logged-featured-pets-cards">
          {featuredPets.map(
            ({ _id, name, type, breed, adoptionStatus, picture }) => (
              <PetCard
                key={_id}
                value={{ _id, name, type, breed, adoptionStatus, picture }}
              />
            )
          )}
        </div>
        <Link to={'/search'} className="chevron">
          <FaChevronCircleRight />
        </Link>
      </div>
    </div>
  );
}

export default FeaturedPets;
