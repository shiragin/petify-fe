import { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { usePetsContext } from '../../context/PetsContext';

function SearchAdvanced() {
  const { getPetsAdvanced, searchAdvanced, setSearchAdvanced, searchType } =
    usePetsContext();

  function searchAdvancedHandler(e, query) {
    const newQuery = {};
    newQuery[query] = e.target.value;
    setSearchAdvanced({ ...searchAdvanced, ...newQuery });
  }

  useEffect(() => {
    if (searchType) getPetsAdvanced(searchAdvanced);
  }, []);

  useEffect(() => {
    console.log('hayush');
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
            defaultValue={''}
            value={searchAdvanced?.adoptionStatus}
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
        <Form.Group>
          <Form.Label className="search-advanced-group-label">Size</Form.Label>
          <Form.Select
            className="search-advanced-group-input"
            defaultValue={''}
            value={searchAdvanced?.size}
            onChange={(e) => searchAdvancedHandler(e, 'size')}
          >
            <option value="" default>
              All
            </option>
            <option value="Small">Small</option>
            <option value="Medium" default>
              Medium
            </option>
            <option value="Big">Big</option>
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label className="search-advanced-group-label">
            Colour
          </Form.Label>
          <Form.Select
            className="search-advanced-group-input"
            defaultValue={''}
            value={searchAdvanced?.color}
            onChange={(e) => searchAdvancedHandler(e, 'color')}
          >
            <option value="" default>
              All
            </option>
            <option value="White">White</option>
            <option value="Black">Black</option>
            <option value="Brown">Brown</option>
            {/* <option value="Brown">Brown</option> */}
            <option value="Orange">Orange</option>
            <option value="Blue">Blue</option>
            {searchAdvanced.type !== 'Dog' && (
              <option value="Tabby">Tabby</option>
            )}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Form.Label className="search-advanced-group-label">Name</Form.Label>
          <Form.Control
            className="search-advanced-group-input"
            value={searchAdvanced?.name}
            onChange={(e) => searchAdvancedHandler(e, 'name')}
          />
        </Form.Group>
      </Form>
      {/* <SearchToggle /> */}
    </div>
  );
}

export default SearchAdvanced;
