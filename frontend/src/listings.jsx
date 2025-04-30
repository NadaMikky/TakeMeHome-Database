import React from 'react';
import Navbar from './navbar'; // Import Navbar
import './listings.css'; // Importing CSS for styling

const Listings = () => {
  return (
    <div>
      <Navbar /> {/* Add Navbar manually */}
      <h1>Listings Page</h1>
      {/* Add your listings content here */}
    </div>
  );
};

export default Listings;