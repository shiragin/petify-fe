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
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/Login/PrivateRoute';
import './scss/App.scss';
import Footer from './components/Navbar/Footer';
import AdminQueries from './components/Admin/AdminQueries';

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
            <Route path="/pet/:id" element={<Pet />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/mypets"
              element={
                <PrivateRoute>
                  <MyPets />
                </PrivateRoute>
              }
            />
            <Route
              path="/mypets/owned"
              element={
                <PrivateRoute>
                  <MyPets />
                </PrivateRoute>
              }
            />
            <Route
              path="/mypets/saved"
              element={
                <PrivateRoute>
                  <MyPets />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/add-pet"
              element={
                <PrivateRoute>
                  <AddPet />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/show-pets"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/show-users"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/show-queries"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/edit-pet/:id"
              element={
                <PrivateRoute>
                  <AddPet />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/profile/:id"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>
      </PetsContextProvider>
    </UserContextProvider>
  );
}

export default App;
