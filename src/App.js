import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContextProvider from './libs/UserContext';
import PetsContextProvider from './libs/PetsContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import './scss/App.scss';

function App() {
  return (
    <UserContextProvider>
      <PetsContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} /> */}
          </Routes>
        </BrowserRouter>
      </PetsContextProvider>
    </UserContextProvider>
  );
}

export default App;
