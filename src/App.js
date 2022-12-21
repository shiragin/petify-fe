import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import './scss/App.scss';

function App() {
  return (
    // <UserContextProvider>
    //   <TweetContextProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </BrowserRouter>
    //   </TweetContextProvider>
    // </UserContextProvider>
  );
}

export default App;
