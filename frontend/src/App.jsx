import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FirstPage from './firstPage'; // Import FirstPage
import Home from './home';
import Profile from './profile';
import Listings from './listings';
import Login from './login'; // Import Login component
import Navbar from './navbar'; // Import Navbar component

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
        <Route path="/" element={<FirstPage />} /> {/* Set FirstPage as the default route */}
        <Route
          path="*"
          element={
            <>
              <Navbar /> {/* Add Navbar to all pages except FirstPage */}
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/listings" element={<Listings />} />
                <Route path="/login" element={<Login />} />
              </Routes>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;