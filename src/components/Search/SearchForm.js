import React, { useContext } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { usePetsContext } from '../../libs/PetsContext';
import SearchSimple from './SearchSimple';
import SearchAdvanced from './SearchAdvanced';

function SearchForm() {
  const { searchType } = usePetsContext();

  return <div>{searchType ? <SearchAdvanced /> : <SearchSimple />}</div>;
}

export default SearchForm;
