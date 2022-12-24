import SearchForm from '../components/Search/SearchForm';
import SearchResults from '../components/Search/SearchResults';
import '../scss/Search.scss';

function Search() {
  return (
    <div className="main-container search">
      <SearchForm />
      <SearchResults />
    </div>
  );
}

export default Search;
