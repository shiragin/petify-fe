import { useUserContext } from '../context/UserContext';
import HomeUnlogged from '../components/Homepage/HomeUnlogged';
import HomeLogged from '../components/Homepage/HomeLogged';
import '../scss/Homepage.scss';

function Home() {
  const { loggedIn } = useUserContext();

  return (
    <div className="main-container">
      {loggedIn ? <HomeLogged /> : <HomeUnlogged />}
    </div>
  );
}

export default Home;
