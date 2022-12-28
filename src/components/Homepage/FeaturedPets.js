import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronCircleRight } from 'react-icons/fa';
import { usePetsContext } from '../../libs/PetsContext';
import PetCard from '../Pet/PetCard';
import { Button } from 'react-bootstrap';

function FeaturedPets() {
  const { pets, getRandomPets } = usePetsContext();

  async function showRandomPets() {
    getRandomPets(4);
  }

  useEffect(() => {
    getRandomPets();
  }, []);

  return (
    <div className="home-logged-featured-pets">
      <div className="home-logged-featured-pets-title">
        <span>Featured pets</span>
      </div>
      <div className="home-logged-featured-pets-cards">
        {pets.map(({ _id, name, type, breed, adoptionStatus, picture }) => (
          <PetCard
            key={_id}
            value={{ _id, name, type, breed, adoptionStatus, picture }}
          />
        ))}
        <Link to={'/search'} className="chevron">
          <FaChevronCircleRight />
        </Link>
      </div>
    </div>
  );
}

export default FeaturedPets;
