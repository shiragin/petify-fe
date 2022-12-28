import { useEffect } from 'react';
import { useUserContext } from '../../libs/UserContext';
import { usePetsContext } from '../../libs/PetsContext';
import PetCard from './PetCard';

function SavedPets() {
  const { user } = useUserContext();
  const { pets, getPetPage, getSavedPets, setSavedPets, savedPets, liked } =
    usePetsContext();

  async function updatedSavedPets() {
    const { _id } = user;
    const pets = await getSavedPets(_id);
    setSavedPets(pets);
  }

  useEffect(() => {
    updatedSavedPets();
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (user.savedPets) {
        const pets = [];
        for (const pet of user.savedPets) {
          const data = await getPetPage(pet);
          console.log(pet);
          console.log(data);
          pets.push(data);
        }
        console.log(pets);
        setSavedPets(pets);
      }
    }
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
