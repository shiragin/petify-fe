import { useEffect } from 'react';
import { useUserContext } from '../../context/UserContext';
import { usePetsContext } from '../../context/PetsContext';
import PetCard from './PetCard';

function SavedPets() {
  const { user } = useUserContext();
  const { getPetPage, getSavedPets, setSavedPets, savedPets } =
    usePetsContext();

  async function updateSavedPets() {
    if (!user.SavedPets) return;
    const { _id } = user;
    const pets = await getSavedPets(_id);
    setSavedPets(pets);
  }

  useEffect(() => {
    updateSavedPets();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (user.savedPets) {
        const pets = [];
        for (const pet of user.savedPets) {
          const data = await getPetPage(pet);
          pets.push(data);
        }
        setSavedPets(pets);
      } else {
        updateSavedPets();
      }
    }
    if (!user) return;
    fetchData();
  }, [user]);

  return (
    <div className="home-logged-featured-pets-cards">
      {savedPets.map(({ _id, name, type, breed, adoptionStatus, picture }) => (
        <PetCard
          key={_id}
          value={{ _id, name, type, breed, adoptionStatus, picture }}
        />
      ))}
    </div>
  );
}

export default SavedPets;
