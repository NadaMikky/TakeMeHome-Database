import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FirstPage from './firstPage';
import Home from './home';
import Profile from './profile';
import Listings from './listings';
import Login from './login';
import Navbar from './navbar';

function App() {
  useEffect(() => {
    fetch('http://localhost:8081/Users')
      .then(res => res.json())
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} /> {/* FirstPage without Navbar */}
        <Route
          path="*"
          element={
            <>
              <Navbar /> {/* Navbar for all other pages */}
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/listings" element={<Listings />} />
              </Routes>
            </>
          }
        />
        <Route path="/login" element={<Login />} /> {/* Login page without Navbar */}
      </Routes>
    </Router>
  );
}

export default App;