import axios from 'axios';
import { useEffect, useContext, useState } from 'react';
import { usePetsContext } from '../../libs/PetsContext';
import PetCard from '../Pet/PetCard';

function SearchResults() {
  const { getPets, pets } = usePetsContext();

  useEffect(() => {
    getPets();
  }, []);

  return (
    <div className="search-results-list">
      {pets.map(({ _id, name, type, breed, adoptionStatus, picture }) => (
        <PetCard
          key={_id}
          value={{ _id, name, type, breed, adoptionStatus, picture }}
        />
      ))}
    </div>
  );
}

export default SearchResults;
