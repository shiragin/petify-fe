import axios from 'axios';
import { useEffect, useContext } from 'react';
import { usePetsContext } from '../../libs/PetsContext';
import PetCard from './PetCard';

function SearchResults() {
  const { getPets, pets } = usePetsContext();

  useEffect(() => {
    getPets();
  }, []);

  console.log(pets);

  return (
    <div className="search-results-list">
      {pets.map(({ _id, name, type, breed }) => (
        <PetCard key={_id} value={{ _id, name, type, breed }} />
      ))}
    </div>
  );
}

export default SearchResults;
