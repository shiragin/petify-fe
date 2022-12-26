import { useEffect } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { usePetsContext } from '../../libs/PetsContext';
import SearchToggle from './SearchToggle';

function SearchAdvanced() {
  const { getPetsAdvanced, searchAdvanced, setSearchAdvanced, searchType } =
    usePetsContext();

  function searchAdvancedHandler(e, query) {
    // console.log(query);
    const newQuery = {};
    newQuery[query] = e.target.value;
    setSearchAdvanced({ ...searchAdvanced, ...newQuery });
  }

  useEffect(() => {
    if (searchType) getPetsAdvanced(searchAdvanced);
  }, [searchAdvanced]);

  return (
    <div className="search-advanced">
      <Form>
        <Form.Group>
          <Form.Label className="search-advanced-group-label">
            Adoption status
          </Form.Label>
          <Form.Select
            className="search-advanced-group-input"
            defaultValue={'Available'}
            onChange={(e) => searchAdvancedHandler(e, 'adoptionStatus')}
          >
            <option value="Adopted">Adopted</option>
            <option value="Fostered">Fostered</option>
            <option value="Available" default>
              Availabe
            </option>
            <option value="">All</option>
          </Form.Select>
        </Form.Group>
        {/* <Form.Group>
          <Form.Label className="search-advanced-group-label">Type</Form.Label>
          <Form.Select
            className="search-advanced-group-input"
            defaultValue={''}
            onChange={(e) => searchAdvancedHandler(e, 'type')}
          >
            <option value="Cat">Cat</option>
            <option value="Dog">Dog</option>
            <option value="" default>
              All
            </option>
          </Form.Select>
        </Form.Group> */}
        <Form.Group>
          <Form.Label className="search-advanced-group-label">Name</Form.Label>
          <Form.Control
            className="search-advanced-group-input"
            defaultValue={''}
            onChange={(e) => searchAdvancedHandler(e, 'name')}
          />
        </Form.Group>
      </Form>
      {/* <SearchToggle /> */}
    </div>
  );
}

export default SearchAdvanced;
