import { Button } from 'react-bootstrap';
import { usePetsContext } from '../../libs/PetsContext';

function SearchSimple() {
  const { getPets, getPetsByType } = usePetsContext();
  function searchSimpleHandler(type) {
    if (!type) getPets();
    getPetsByType(type);
  }

  return (
    <div className="search-simple">
      {/* <h4 className="search-simple-title">Search for</h4> */}
      <div className="search-simple-buttons">
        <Button onClick={() => searchSimpleHandler('Cat')}>
          <span>Cats</span>
        </Button>
        <Button onClick={() => searchSimpleHandler('Dog')}>
          <span>Dogs</span>
        </Button>
        <Button onClick={() => searchSimpleHandler('')}>
          <span>All</span>
        </Button>
      </div>
    </div>
  );
}

export default SearchSimple;
