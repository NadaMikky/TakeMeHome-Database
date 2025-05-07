import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';
import Profile from './account';
import Listings from './listings'; // Import Listings component
import FirstPage from './firstPage'; // Import FirstPage component
import CreateAccount from './createAccount'; // Import CreateAccount component
import Login from './login'; // Import Login component

function App() {
  useEffect(() => {
    fetch('http://localhost:8081/api/users') // Corrected endpoint
      .then(res => res.json())
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} /> {/* Add route for FirstPage */}
        <Route path="/home" element={<Home />} /> {/* Move Home to /home */}
        <Route path="/account" element={<Profile />} /> {/* Add route for Account */}
        <Route path="/listings" element={<Listings />} /> {/* Add route for Listings */}
        <Route path="/create-account" element={<CreateAccount />} /> {/* Add route for CreateAccount */}
        <Route path="/login" element={<Login />} /> {/* Add route for Login */}
      </Routes>
    </Router>
  );
}

export default App;
