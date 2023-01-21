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

  const { setUser, userId } = useUserContext();

  async function getPets() {
    try {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/pets`);
      if (res?.data?.ok) {
        const { pets } = await res.data;
        setPets(pets);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function getPetsByType(type) {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/pets?type=${type}`
      );
      if (res?.data?.ok) {
        const { pets } = await res.data;
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
      const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/pets`, {
        params: filteredParams,
      });
      if (res?.data?.ok) {
        const { pets } = await res.data;
        setPets(pets);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function getPetPage(id) {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/pets/${id}`
      );
      if (res?.data?.ok) {
        const { pet } = await res.data;
        return pet[0];
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function getRandomPets() {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/pets/random`,
        {
          withCredentials: true,
        }
      );
      if (res?.data?.ok) {
        const { pets } = await res.data;
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
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/pets/`,
        newPetForm,
        {
          withCredentials: true,
        }
      );
      if (res?.data?.ok) {
        const { pet: petDetails } = await res.data;
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
        `${process.env.REACT_APP_SERVER_URL}/pets/${id}`,
        newPetForm,
        {
          withCredentials: true,
        }
      );
      if (res?.data?.ok) {
        const { pet: petDetails } = await res.data;
        return { ok: true, petDetails };
      }
    } catch (err) {
      const { message } = err.response.data;
      return { ok: false, message };
    }
  }

  async function getSavedPets(id) {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/pets/user/${id}/`,
        {
          withCredentials: true,
        }
      );
      if (res?.data?.ok) {
        const { savedPets } = await res.data;
        return savedPets;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getOwnedPets(id) {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/pets/user/${id}`,
        {
          withCredentials: true,
        }
      );
      if (res?.data?.ok) {
        const { fosteredPets, adoptedPets } = await res.data;
        return { fosteredPets: fosteredPets, adoptedPets: adoptedPets };
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function addSavedPet(userId, savedPets) {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/pets/${userId}/save`,
        { savedPets },
        { withCredentials: true }
      );
      if (res?.data?.ok) {
        const { user: userData } = res?.data;
        setUser(userData);
        return true;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteSavedPet(userId, savedPets) {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/pets/${userId}/save`,
        {
          withCredentials: true,
          data: {
            savedPets,
          },
        }
      );
      if (res?.data?.ok) {
        const { user: userData } = res?.data;
        setUser(userData);
        return true;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function updateOwnedPet(user, pet, petId) {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/pets/${user._id}/adopt`,
        {
          adoptedPets: user.adoptedPets,
          fosteredPets: user.fosteredPets,
          petId,
          pet,
        },
        { withCredentials: true }
      );
      if (res?.data?.ok) {
        if (user._id === userId) setUser(res.data.user);
        return true;
      }
    } catch (err) {
      console.error(err);
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
      }}
    >
      {children}
    </PetsContext.Provider>
  );
}
