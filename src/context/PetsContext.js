import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useUserContext } from './UserContext';

export const PetsContext = createContext();

export function usePetsContext() {
  return useContext(PetsContext);
}

export default function PetsContextProvider({ children }) {
  const [pets, setPets] = useState([]);
  const [savedPets, setSavedPets] = useState([]);
  const [featuredPets, setFeaturedPets] = useState([]);
  const [ownedPets, setOwnedPets] = useState([]);
  const [petPage, setPetPage] = useState({});
  const [searchType, setSearchType] = useState(false);
  const [searchAdvanced, setSearchAdvanced] = useState({});
  const [petModalShow, setPetModalShow] = useState(false);

  const { token, setUser } = useUserContext();

  async function getPets() {
    try {
      const res = await axios.get(`http://localhost:8080/pets`);
      if (!res.statusText === 'ok') throw new Error();
      const { pets } = await res.data.data;
      setPets(pets);
    } catch (err) {
      console.error(err);
    }
  }

  async function getPetsByType(type) {
    try {
      const res = await axios.get(`http://localhost:8080/pets?type=${type}`);
      if (!res.statusText === 'ok') throw new Error();
      const { pets } = await res.data.data;
      setPets(pets);
    } catch (err) {
      console.error(err);
    }
  }

  async function getPetsAdvanced(search) {
    const params = Object.keys(search);

    let filteredParams = {};

    params.map((param) => {
      if (search[param])
        filteredParams = { ...filteredParams, [param]: search[param] };
    });

    try {
      const res = await axios.get(`http://localhost:8080/pets`, {
        params: filteredParams,
      });
      if (!res.statusText === 'ok') throw new Error();
      const { pets } = await res.data.data;
      setPets(pets);
    } catch (err) {
      console.error(err);
    }
  }

  async function getPetPage(id) {
    try {
      const res = await axios.get(`http://localhost:8080/pets/${id}`);
      if (!res.statusText === 'ok') throw new Error();
      const { pet } = await res.data.data;
      return pet[0];
    } catch (err) {
      console.error(err);
    }
  }

  async function getRandomPets(num) {
    try {
      const res = await axios.get(`http://localhost:8080/pets/random`, {
        headers: { authorization: `Bearer ${token}` },
      });
      if (!res.statusText === 'ok') throw new Error();
      const { pets } = await res.data.data;
      setFeaturedPets(pets);
    } catch (err) {
      console.error(err);
    }
  }

  async function getSavedPets(id) {
    try {
      const res = await axios.get(`http://localhost:8080/pets/user/${id}/`, {
        headers: { authorization: `Bearer ${token}` },
      });
      const { savedPets } = res.data.data;
      return savedPets;
    } catch (error) {
      console.error(error);
    }
  }

  async function getOwnedPets(id) {
    try {
      const res = await axios.get(`http://localhost:8080/pets/user/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      const { ownedPets } = res.data.data;
      return ownedPets;
    } catch (error) {
      console.error(error);
    }
  }

  async function getSavedPetsByID(id) {
    try {
      const res = await axios.get(`http://localhost:8080/pets/${id}`, {
        headers: { authorization: `Bearer ${token}` },
      });
      const { pet } = res.data.data;
      return pet.sort((a, b) =>
        a.addedAt > b.addedAt ? 1 : b.addedAt > a.addedAt ? -1 : 0
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function addNewPet(pet) {
    try {
      if (!pet.picture)
        pet.picture = `https://source.unsplash.com/random/?${pet.type.toLowerCase()},${pet.colour
          .join(',')
          .toLowerCase()}`;
      const newPetForm = new FormData();
      for (const key in pet) {
        newPetForm.append(key, pet[key]);
      }
      const res = await axios.post(`http://localhost:8080/pets/`, newPetForm, {
        headers: { authorization: `Bearer ${token}` },
      });
      const { pet: petDetails } = await res.data.data;
      return res.status === 201 ? petDetails : '';
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async function updatePet(id, pet) {
    try {
      console.log(id, pet);
      const newPetForm = new FormData();
      for (const key in pet) {
        newPetForm.append(key, pet[key]);
      }
      const res = await axios.patch(
        `http://localhost:8080/pets/${id}`,
        newPetForm,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      console.log(res.data);
      const { pet: petDetails } = await res.data.data;
      return res.data.ok ? petDetails : '';
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async function addSavedPet(petId, userId, user) {
    console.log('USER', user);
    try {
      console.log(petId, userId);
      const res = await axios.post(
        `http://localhost:8080/pets/${userId}/save`,
        { user },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      console.log(res);
      if (res?.data?.ok) {
        const { user: userData } = res?.data?.data;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteSavedPet(petId, userId, user) {
    try {
      console.log('USER', user);

      const res = await axios.delete(
        `http://localhost:8080/pets/${userId}/save`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },

          data: {
            user,
          },
        }
      );
      console.log('RES', res);
      if (res?.data?.ok) {
        const { user: userData } = res?.data?.data;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <PetsContext.Provider
      value={{
        pets,
        setPets,
        petPage,
        setPetPage,
        getPets,
        getPetPage,
        getPetsByType,
        searchType,
        setSearchType,
        getPetsAdvanced,
        searchAdvanced,
        setSearchAdvanced,
        getRandomPets,
        getSavedPets,
        setSavedPets,
        savedPets,
        setFeaturedPets,
        featuredPets,
        getSavedPetsByID,
        updatePet,
        petModalShow,
        setPetModalShow,
        ownedPets,
        setOwnedPets,
        getOwnedPets,
        addNewPet,
        addSavedPet,
        deleteSavedPet,
      }}
    >
      {children}
    </PetsContext.Provider>
  );
}
