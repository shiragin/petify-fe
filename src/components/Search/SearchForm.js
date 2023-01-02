import React from 'react';
import { usePetsContext } from '../../context/PetsContext';
import SearchSimple from './SearchSimple';
import SearchAdvanced from './SearchAdvanced';

function SearchForm() {
  const { searchType } = usePetsContext();

  return (
    <div className="search-container">
      <SearchSimple />
      {searchType && <SearchAdvanced />}
    </div>
  );
}

export default SearchForm;
