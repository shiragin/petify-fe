import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { usePetsContext } from '../../context/PetsContext';
import SearchToggle from './SearchToggle';

function SearchSimple() {
  const {
    getPets,
    getPetsByType,
    searchType,
    getPetsAdvanced,
    searchAdvanced,
    setSearchAdvanced,
  } = usePetsContext();

  const [activeButton, setActiveButton] = useState('');

  function searchSimpleHandler(type) {
    setActiveButton(type);
    const newQuery = {};
    newQuery.type = type;
    setSearchAdvanced({ ...searchAdvanced, ...newQuery });
  }

  useEffect(() => {
    if (searchAdvanced.type) {
      const { type } = searchAdvanced;
      setActiveButton(type);
    }
  }, []);

  useEffect(() => {
    if (!searchType) {
      if (activeButton) {
        getPetsByType(activeButton);
      } else if (searchAdvanced.type) {
        searchSimpleHandler(searchAdvanced.type);
      } else {
        getPets();
      }
    }
  }, [searchType]);

  useEffect(() => {
    if (!searchType && searchAdvanced.type) {
      getPetsByType(searchAdvanced.type);
    } else if (searchType) {
      getPetsAdvanced(searchAdvanced);
    } else {
      getPets();
    }
  }, [activeButton]);

  return (
    <div className="search-simple">
      <div className="search-simple-buttons">
        <Button
          className={`${activeButton === 'Cat' && 'active-btn'}`}
          onClick={() => searchSimpleHandler('Cat')}
        >
          <span>Cats</span>
        </Button>
        <Button
          className={`${activeButton === 'Dog' && 'active-btn'}`}
          onClick={() => {
            searchSimpleHandler('Dog');
          }}
        >
          <span>Dogs</span>
        </Button>
        <Button
          className={`${activeButton === '' && 'active-btn'}`}
          onClick={() => searchSimpleHandler('')}
        >
          <span>All</span>
        </Button>
        <div className="search-simple-buttons-more">
          <SearchToggle />
        </div>
      </div>
    </div>
  );
}

export default SearchSimple;
