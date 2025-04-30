// src/navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import './navbar.css';

// Import SVGs from src/icons/
import wvuLogo from './icons/wv_logo.svg';
import listingsIcon from './icons/listings_white.svg';
import accountIcon from './icons/account_white.svg';
import logoutIcon from './icons/logout.svg';

export default function Navbar() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing user session)
    console.log('User logged out');
    navigate('/firstPage'); // Navigate to the firstPage
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={wvuLogo} alt="WVU Logo" className="navbar-logo-img" />
          <h1 className="navbar-title">Take Me Home</h1>
        </Link>

        <div className="navbar-links">
          <Link to="/listings" className="nav-link">
            <img src={listingsIcon} alt="Listings Icon" className="nav-icon" />
            Listings
          </Link>
          <Link to="/account" className="nav-link">
            <img src={accountIcon} alt="Profile Icon" className="nav-icon" />
            Profile
          </Link>
          <Link to="/firstPage" className="nav-link" onClick={handleLogout}>
            <img src={logoutIcon} alt="Logout Icon" className="nav-icon" />
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}
