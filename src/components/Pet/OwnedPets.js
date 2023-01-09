import React, { useEffect } from 'react';
import { useUserContext } from '../../context/UserContext';
import { usePetsContext } from '../../context/PetsContext';
import PetCard from './PetCard';

function OwnedPets() {
  const { user } = useUserContext();
  const { getOwnedPets, setOwnedPets, ownedPets } = usePetsContext();

  async function updateOwnedPets() {
    if (!user?.fosteredPets?.length && !user?.adoptedPets?.length) return;
    const { _id } = user;
    const { fosteredPets, adoptedPets } = await getOwnedPets(_id);
    setOwnedPets([...adoptedPets, ...fosteredPets]);
  }

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
      {!ownedPets.length && (
        <h4>
          {`You currently have no pets.\nBrowse our `}
          <a href="/search">search page</a>
          {` to find a fluffy friend today!`}
        </h4>
      )}
    </div>
  );
}

export default OwnedPets;
