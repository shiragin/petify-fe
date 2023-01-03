import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContextProvider, { useUserContext } from './context/UserContext';
import PetsContextProvider from './context/PetsContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import Profile from './pages/Profile';
import MyPets from './pages/MyPets';
import Pet from './pages/Pet';
import AddPet from './pages/AddPet';
import Dashboard from './pages/Dashboard';
import './scss/App.scss';

function App() {
  // const { setUser, setLoggedIn } = useUserContext();
  // localStorage.clear();

  return (
    <UserContextProvider>
      <PetsContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/mypets" element={<MyPets />} />
            <Route path="/pet/:id" element={<Pet />} />
            <Route path="/admin/add-pet" element={<AddPet />} />
            <Route path="/admin/show-pets" element={<Dashboard />} />
            <Route path="/admin/show-users" element={<Dashboard />} />
            <Route path="/admin/edit-pet/:id" element={<AddPet />} />
            <Route path="/admin/profile/:id" element={<Profile />} />
          </Routes>
        </BrowserRouter>
      </PetsContextProvider>
    </UserContextProvider>
  );
}

export default App;
