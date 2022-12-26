import { GiLobArrow } from 'react-icons/gi';
import { usePetsContext } from '../../libs/PetsContext';

function SearchToggle() {
  const { searchType, setSearchType } = usePetsContext();

  return (
    <div>
      {
        <GiLobArrow
          className={searchType ? 'search-toggle rotate' : 'search-toggle'}
          // className="search-toggle"

          onClick={() => setSearchType(!searchType)}
        />
      }
    </div>
  );
}

export default SearchToggle;
