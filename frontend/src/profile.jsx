import React from 'react';
import Navbar from './navbar'; // Import Navbar
import './profile.css'; // Importing CSS for styling

const Profile = () => {
  return (
    <div>
      <Navbar /> {/* Add Navbar manually */}
      <h1>Profile Page</h1>
      {/* Add your profile content here */}
    </div>
  );
};

export default Profile;