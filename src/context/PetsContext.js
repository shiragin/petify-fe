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

  const { setUser } = useUserContext();

  async function getPets() {
    try {
      const res = await axios.get(`http://localhost:8080/pets`);
      if (res?.data?.ok) {
        const { pets } = await res.data.data;
        setPets(pets);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function getPetsByType(type) {
    try {
      const res = await axios.get(`http://localhost:8080/pets?type=${type}`);
      if (res?.data?.ok) {
        const { pets } = await res.data.data;
        setPets(pets);
      }
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
      if (res?.data?.ok) {
        const { pets } = await res.data.data;
        setPets(pets);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function getPetPage(id) {
    try {
      const res = await axios.get(`http://localhost:8080/pets/${id}`);
      if (res?.data?.ok) {
        const { pet } = await res.data.data;
        return pet[0];
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function getRandomPets() {
    try {
      const res = await axios.get(`http://localhost:8080/pets/random`, {
        withCredentials: true,
      });
      if (res?.data?.ok) {
        const { pets } = await res.data.data;
        setFeaturedPets(pets);
      }
    } catch (err) {
      console.error(err);
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
        withCredentials: true,
      });
      if (res?.data?.ok) {
        const { pet: petDetails } = await res.data.data;
        return { ok: true, petDetails };
      }
    } catch (err) {
      const { message } = err.response.data;
      return { ok: false, message };
    }
  }

  async function updatePet(id, pet) {
    try {
      const newPetForm = new FormData();
      for (const key in pet) {
        newPetForm.append(key, pet[key]);
      }
      const res = await axios.patch(
        `http://localhost:8080/pets/${id}`,
        newPetForm,
        { withCredentials: true }
      );
      if (res?.data?.ok) {
        const { pet: petDetails } = await res.data.data;
        return { ok: true, petDetails };
      }
    } catch (err) {
      const { message } = err.response.data;
      return { ok: false, message };
    }
  }

  async function getSavedPets(id) {
    try {
      const res = await axios.get(`http://localhost:8080/pets/user/${id}/`, {
        withCredentials: true,
      });
      if (res?.data?.ok) {
        const { savedPets } = await res.data.data;
        return savedPets;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getOwnedPets(id) {
    try {
      const res = await axios.get(`http://localhost:8080/pets/user/${id}`, {
        withCredentials: true,
      });
      if (res?.data?.ok) {
        const { fosteredPets, adoptedPets } = await res.data.data;
        return { fosteredPets: fosteredPets, adoptedPets: adoptedPets };
      }
    } catch (error) {
      console.error(error);
    }
  }

  // async function getSavedPetsByID(id) {
  //   try {
  //     const res = await axios.get(`http://localhost:8080/pets/${id}`, {
  //       withCredentials: true,
  //     });
  //     if (res?.data?.ok) {
  //       const { pet } = await res.data.data;
  //       return pet.sort((a, b) =>
  //         a.addedAt > b.addedAt ? 1 : b.addedAt > a.addedAt ? -1 : 0
  //       );
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async function addSavedPet(userId, savedPets) {
    try {
      const res = await axios.post(
        `http://localhost:8080/pets/${userId}/save`,
        { savedPets },
        { withCredentials: true }
      );
      if (res?.data?.ok) {
        const { user: userData } = res?.data?.data;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteSavedPet(userId, savedPets) {
    try {
      console.log('DATA', userId, savedPets);
      const res = await axios.delete(
        `http://localhost:8080/pets/${userId}/save`,
        {
          withCredentials: true,
          data: {
            savedPets,
          },
        }
      );
      if (res?.data?.ok) {
        const { user: userData } = res?.data?.data;
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function updateOwnedPet(user, pet, petId) {
    const res = await axios.post(
      `http://localhost:8080/pets/${user._id}/adopt`,
      {
        adoptedPets: user.adoptedPets,
        fosteredPets: user.fosteredPets,
        petId,
        pet,
      },
      { withCredentials: true }
    );
    if (res?.data?.ok) {
      const { user: userData } = res?.data?.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
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
        // getSavedPetsByID,
        updatePet,
        petModalShow,
        setPetModalShow,
        ownedPets,
        setOwnedPets,
        getOwnedPets,
        addNewPet,
        addSavedPet,
        deleteSavedPet,
        updateOwnedPet,
        // returnOwnedPet,
      }}
    >
      {children}
    </PetsContext.Provider>
  );
}
