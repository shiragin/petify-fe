import { useUserContext } from '../../libs/UserContext';
function HomeLogged() {
  const { user } = useUserContext();

  console.log(user);
  return (
    <h1>
      Welcome back, {user.firstName} {user.lastName}!
    </h1>
  );
}

export default HomeLogged;
