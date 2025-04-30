import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src="icons/wv_logo.svg" alt="WVU Logo" className="navbar-logo-img" />
            <h1 className="navbar-title">Take Me Home</h1>
          </Link>
        </div>
        <div className="navbar-links">
          <Link to="/listings" className="nav-link">
            <img src="icons/listings_white.svg" className="nav-icon" alt="Listings Icon" />
            Listings
          </Link>
          <Link to="/account" className="nav-link">
            <img src="icons/account_white.svg" className="nav-icon" alt="Account Icon" />
            Account
          </Link>
          <Link to="/login" className="nav-link">
            <img src="icons/logout.svg" className="nav-icon" alt="Logout Icon" />
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;