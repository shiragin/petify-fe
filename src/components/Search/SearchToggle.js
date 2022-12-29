import { GiLobArrow } from 'react-icons/gi';
import { usePetsContext } from '../../context/PetsContext';

function SearchToggle() {
  const { searchType, setSearchType } = usePetsContext();

  return (
    <div>
      {
        <GiLobArrow
          className={searchType ? 'search-toggle rotate' : 'search-toggle'}
          onClick={() => setSearchType(!searchType)}
        />
      }
    </div>
  );
}

export default SearchToggle;
