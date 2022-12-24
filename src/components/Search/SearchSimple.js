import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { usePetsContext } from '../../libs/PetsContext';

function SearchSimple() {
  const { getPets, getPetsByType } = usePetsContext();

  const [activeButton, setActiveButton] = useState('all');

  function searchSimpleHandler(e, type) {
    if (!type) getPets();
    getPetsByType(type);
  }

  return (
    <div className="search-simple">
      {/* <h4 className="search-simple-title">Search for</h4> */}
      <div className="search-simple-buttons">
        <Button
          className={`${activeButton === 'cat' && 'active-btn'}`}
          onClick={(e) => {
            setActiveButton('cat');
            searchSimpleHandler(e, 'Cat');
          }}
        >
          <span>Cats</span>
        </Button>
        <Button
          className={`${activeButton === 'dog' && 'active-btn'}`}
          onClick={(e) => {
            setActiveButton('dog');
            searchSimpleHandler(e, 'Dog');
          }}
        >
          <span>Dogs</span>
        </Button>
        <Button
          className={`${activeButton === 'all' && 'active-btn'}`}
          onClick={(e) => {
            setActiveButton('all');
            searchSimpleHandler(e, '');
          }}
        >
          <span>All</span>
        </Button>
      </div>
    </div>
  );
}

export default SearchSimple;
