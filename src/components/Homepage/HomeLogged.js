import HomeSavedPets from './HomeSavedPets';
import FeaturedPets from './FeaturedPets';

function HomeLogged() {
  return (
    <div className="home-logged">
      <FeaturedPets />
      <HomeSavedPets />
    </div>
  );
}

export default HomeLogged;
