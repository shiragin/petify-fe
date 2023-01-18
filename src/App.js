import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContextProvider from './context/UserContext';
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
import AdminRoute from './components/Admin/AdminRoute';
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
            <Route path="/pet/:id" element={<Pet />} />
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
              path="/contact"
              element={
                <PrivateRoute>
                  <Contact />
                </PrivateRoute>
              }
            />
            <Route
              path="/myqueries"
              element={
                <PrivateRoute>
                  <Contact />
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
                  <AdminRoute>
                    <AddPet />
                  </AdminRoute>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/show-pets"
              element={
                <PrivateRoute>
                  <AdminRoute>
                    <Dashboard />
                  </AdminRoute>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/show-users"
              element={
                <PrivateRoute>
                  <AdminRoute>
                    <Dashboard />
                  </AdminRoute>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/show-queries"
              element={
                <PrivateRoute>
                  <AdminRoute>
                    <Dashboard />
                  </AdminRoute>
                </PrivateRoute>
              }
            />

            <Route
              path="/admin/edit-pet/:id"
              element={
                <PrivateRoute>
                  <AdminRoute>
                    <AddPet />
                  </AdminRoute>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/show-users/:id"
              element={
                <PrivateRoute>
                  <AdminRoute>
                    <Dashboard />
                  </AdminRoute>
                </PrivateRoute>
              }
            />
            <Route
              path="/admin/show-queries/:id"
              element={
                <PrivateRoute>
                  <AdminRoute>
                    <Dashboard />
                  </AdminRoute>
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </PetsContextProvider>
    </UserContextProvider>
  );
}

export default App;
