import { useUserContext } from '../context/UserContext';
import HomeUnlogged from '../components/Homepage/HomeUnlogged';
import HomeLogged from '../components/Homepage/HomeLogged';
import '../scss/Homepage.scss';
import HomeHero from '../components/Homepage/HomeHero';

function Home() {
  const { loggedIn } = useUserContext();
  console.log(loggedIn);

  return (
    <div>
      {loggedIn && <HomeHero />}
      <div className="main-container">
        {loggedIn ? <HomeLogged /> : <HomeUnlogged />}
      </div>
    </div>
  );
}

export default Home;
