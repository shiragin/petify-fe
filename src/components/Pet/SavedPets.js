import { useEffect } from 'react';
import { useUserContext } from '../../libs/UserContext';
import { usePetsContext } from '../../libs/PetsContext';
import PetCard from './PetCard';

function SavedPets() {
  const { user } = useUserContext();
  const { getSavedPets, pets } = usePetsContext();

  useEffect(() => {
    const { savedPets, _id } = user;
    getSavedPets(_id);
  }, []);

  return (
    <div className="saved-pets">
      {pets.map(({ _id, name, type, breed, adoptionStatus, picture }) => (
        <PetCard
          key={_id}
          value={{ _id, name, type, breed, adoptionStatus, picture }}
        />
      ))}
    </div>
  );
}

export default SavedPets;
