import { useUserContext } from '../libs/UserContext';
import HomeUnlogged from '../components/Homepage/HomeUnlogged';
import HomeLogged from '../components/Homepage/HomeLogged';
import '../scss/Homepage.scss';

function Home() {
  const { setLoggedIn, loggedIn } = useUserContext();

  return (
    <div className="main-container">
      {loggedIn ? <HomeLogged /> : <HomeUnlogged />}
    </div>
  );
}

export default Home;
