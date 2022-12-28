import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePetsContext } from '../../libs/PetsContext';
import PetCard from '../Pet/PetCard';

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
      <h4>Featured pets</h4>
      <div className="home-logged-featured-pets-cards">
        {pets.map(({ _id, name, type, breed, adoptionStatus, picture }) => (
          <PetCard
            key={_id}
            value={{ _id, name, type, breed, adoptionStatus, picture }}
          />
        ))}
        <Link to={'/search'} className="chevron">
          {'>>'}
        </Link>
      </div>
    </div>
  );
}

export default FeaturedPets;
