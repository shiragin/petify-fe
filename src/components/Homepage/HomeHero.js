import { useUserContext } from '../../context/UserContext';

function HomeHero() {
  const { user } = useUserContext();

  return (
    <div className="hero-logged">
      <h1 className="hero-logged-welcome">
        {`Welcome back,`} {user?.firstName} {user?.lastName}
      </h1>
      <div className="gradient" />
    </div>
  );
}

export default HomeHero;
