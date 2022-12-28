import { Link } from 'react-router-dom';
import { FaChevronCircleRight } from 'react-icons/fa';
import SavedPets from '../Pet/SavedPets';

function HomeSavedPets() {
  return (
    <div className="home-logged-featured-pets">
      <div className="home-logged-featured-pets-title">
        <span>Your pet wishlist</span>
      </div>
      <div className="container">
        <SavedPets />
        <Link to={'/mypets'} className="chevron">
          <FaChevronCircleRight />
        </Link>
      </div>
    </div>
  );
}

export default HomeSavedPets;
