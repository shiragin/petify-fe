import { useUserContext } from '../../libs/UserContext';
import FeaturedPets from './FeaturedPets';
function HomeLogged() {
  const { user } = useUserContext();

  console.log(user);
  return (
    <div className="home-logged">
      <h1 className="home-logged-welcome">
        {`Welcome back,\n`} {user.firstName} {user.lastName}!
      </h1>
      {/* <SavedPets /> */}
      <FeaturedPets />
    </div>
  );
}

export default HomeLogged;
