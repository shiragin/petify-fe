import React, { useEffect } from 'react';
import { useUserContext } from '../../context/UserContext';
import { usePetsContext } from '../../context/PetsContext';
import PetCard from './PetCard';

function OwnedPets() {
  const { user } = useUserContext();
  const { getPetPage, getOwnedPets, setOwnedPets, ownedPets } =
    usePetsContext();

  async function updateOwnedPets() {
    if (!user) return;
    const { _id } = user;
    const pets = await getOwnedPets(_id);
    setOwnedPets(pets);
  }

  useEffect(() => {
    updateOwnedPets();
  }, []);

  return (
    <div className="home-logged-featured-pets-cards">
      {ownedPets.map(({ _id, name, type, breed, adoptionStatus, picture }) => (
        <PetCard
          key={_id}
          value={{ _id, name, type, breed, adoptionStatus, picture }}
        />
      ))}
    </div>
  );
}

export default OwnedPets;
