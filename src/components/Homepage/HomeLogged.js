import { useEffect } from 'react';
import { useUserContext } from '../../context/UserContext';
import HomeSavedPets from './HomeSavedPets';
import FeaturedPets from './FeaturedPets';

function HomeLogged() {
  const { user, getUser } = useUserContext();

  return (
    <div className="home-logged">
      <h1 className="home-logged-welcome">
        {`Welcome back,\n`} {user?.firstName} {user?.lastName}!
      </h1>
      <FeaturedPets />
      <HomeSavedPets />
    </div>
  );
}

export default HomeLogged;
