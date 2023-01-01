import React, { useEffect } from 'react';
import { useUserContext } from '../../context/UserContext';
import { usePetsContext } from '../../context/PetsContext';
import PetCard from './PetCard';

function OwnedPets() {
  const { user } = useUserContext();
  const { getPetPage, getOwnedPets, setOwnedPets, ownedPets } =
    usePetsContext();

  async function updateOwnedPets() {
    if (!user.fosteredPets.length && !user.adoptedPets.length) return;
    const { _id } = user;
    const pets = await getOwnedPets(_id);
    setOwnedPets(pets);
  }

  useEffect(() => {
    updateOwnedPets();
  }, []);

  useEffect(() => {
    updateOwnedPets();
  }, [user]);

  return (
    <div className="home-logged-featured-pets-cards">
      {ownedPets &&
        ownedPets.map(({ _id, name, type, breed, adoptionStatus, picture }) => (
          <PetCard
            key={_id}
            value={{ _id, name, type, breed, adoptionStatus, picture }}
          />
        ))}
    </div>
  );
}

export default OwnedPets;
