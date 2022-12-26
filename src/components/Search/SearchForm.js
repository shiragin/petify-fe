import React, { useContext } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { usePetsContext } from '../../libs/PetsContext';
import SearchSimple from './SearchSimple';
import SearchAdvanced from './SearchAdvanced';

function SearchForm() {
  const { searchType } = usePetsContext();

  return (
    <div>
      <SearchSimple />
      {searchType && <SearchAdvanced />}
    </div>
  );
}

export default SearchForm;
