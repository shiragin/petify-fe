import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContextProvider from './libs/UserContext';
import PetsContextProvider from './libs/PetsContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import Pet from './pages/Pet';
import './scss/App.scss';

function App() {
  return (
    <UserContextProvider>
      <PetsContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/pet" element={<Pet />} />
          </Routes>
        </BrowserRouter>
      </PetsContextProvider>
    </UserContextProvider>
  );
}

export default App;
