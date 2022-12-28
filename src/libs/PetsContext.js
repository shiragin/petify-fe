import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

export const PetsContext = createContext();

export function usePetsContext() {
  return useContext(PetsContext);
}

export default function PetsContextProvider({ children }) {
  const [pets, setPets] = useState([]);
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
      setPetPage(pet);
    } catch (err) {
      console.error(err);
    }
  }

  async function getRandomPets(num) {
    try {
      const res = await axios.get(`http://localhost:8080/pets/random`);
      if (!res.statusText === 'ok') throw new Error();
      const { pets } = await res.data.data;
      setPets(pets);
    } catch (err) {
      console.error(err);
    }
  }

  async function getSavedPets(id) {
    try {
      const res = await axios.get(`http://localhost:8080/pets/user/${id}`);
      const { pets } = res.data.data;
      setPets(pets);
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
      }}
    >
      {children}
    </PetsContext.Provider>
  );
}
