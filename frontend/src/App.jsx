import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';
import Profile from './profile';
import Listings from './listings'; // Import Listings component

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
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Profile />} /> {/* Add route for Account */}
        <Route path="/listings" element={<Listings />} /> {/* Add route for Listings */}
      </Routes>
    </Router>
  );
}

export default App;