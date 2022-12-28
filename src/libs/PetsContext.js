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
  const [petPage, setPetPage] = useState({});
  const [searchType, setSearchType] = useState(false);
  const [searchAdvanced, setSearchAdvanced] = useState({});

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
      const res = await axios.get(`http://localhost:8080/pets/user/${id}`);
      const { pets } = res.data.data;
      console.log('Ragil: ', pets);
      console.log('Sorted: ', pets.sort());
      // setSavedPets(pets);
      return pets.sort((a, b) =>
        a.addedAt > b.addedAt ? 1 : b.addedAt > a.addedAt ? -1 : 0
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function getSavedPetsByID(id) {
    console.log('hello from functionnn');
    try {
      console.log(id);
      const res = await axios.get(`http://localhost:8080/pets/${id}`);
      const { pet } = res.data.data;
      return pet.sort((a, b) =>
        a.addedAt > b.addedAt ? 1 : b.addedAt > a.addedAt ? -1 : 0
      );
    } catch (error) {
      console.error(error);
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
      }}
    >
      {children}
    </PetsContext.Provider>
  );
}
