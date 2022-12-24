import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

export const PetsContext = createContext();

export function usePetsContext() {
  return useContext(PetsContext);
}

export default function PetsContextProvider({ children }) {
  const [pets, setPets] = useState([]);
  const [petPage, setPetPage] = useState({});

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

  async function getPetPage(id) {
    console.log('From function', id);
    try {
      const res = await axios.get(`http://localhost:8080/pets/${id}`);
      if (!res.statusText === 'ok') throw new Error();
      console.log(res);
      const { pet } = await res.data.data;
      setPetPage(pet);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <PetsContext.Provider
      value={{ pets, setPets, petPage, setPetPage, getPets, getPetPage }}
    >
      {children}
    </PetsContext.Provider>
  );
}
