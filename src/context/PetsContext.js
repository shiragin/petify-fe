import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

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
      const res = await axios.get(`http://localhost:8080/pets/random`);
      if (!res.statusText === 'ok') throw new Error();
      const { pets } = await res.data.data;
      setFeaturedPets(pets);
    } catch (err) {
      console.error(err);
    }
  }

  async function getSavedPets(id) {
    try {
      const res = await axios.get(`http://localhost:8080/pets/user/${id}/`);
      const { savedPets } = res.data.data;
      // return pets.sort((a, b) =>
      //   a.addedAt > b.addedAt ? 1 : b.addedAt > a.addedAt ? -1 : 0
      // );
      return savedPets;
    } catch (error) {
      console.error(error);
    }
  }

  async function getOwnedPets(id) {
    try {
      const res = await axios.get(`http://localhost:8080/pets/user/${id}`);
      const { ownedPets } = res.data.data;
      // return pets.sort((a, b) =>
      //   a.addedAt > b.addedAt ? 1 : b.addedAt > a.addedAt ? -1 : 0
      // );
      return ownedPets;
    } catch (error) {
      console.error(error);
    }
  }

  async function getSavedPetsByID(id) {
    try {
      const res = await axios.get(`http://localhost:8080/pets/${id}`);
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
      console.log('hi from function');
      console.log(pet);
      const res = await axios.post(`http://localhost:8080/pets/`, pet);
      console.log(res);
      const { pet: petDetails } = await res.data.data;
      console.log(petDetails);
      return res.status === 201 ? petDetails : '';
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async function updatePet(id, pet) {
    try {
      const res = await axios.patch(`http://localhost:8080/pets/${id}`, pet);
      const { pet: petDetails } = await res.data.data;
      return res.status === 200 ? true : false;
    } catch (err) {
      console.error(err);
      return false;
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
      }}
    >
      {children}
    </PetsContext.Provider>
  );
}
