// src/navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

// Import SVGs from src/icons/
import wvuLogo      from './icons/wv_logo.svg';
import listingsIcon from './icons/listings_white.svg';
import accountIcon  from './icons/account_white.svg';
import logoutIcon   from './icons/logout.svg';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* .navbar-logo now on the Link itself */}
        <Link to="/" className="navbar-logo">
          <img
            src={wvuLogo}
            alt="WVU Logo"
            className="navbar-logo-img"
          />
          <h1 className="navbar-title">Take Me Home</h1>
        </Link>

        <div className="navbar-links">
          <Link to="/listings" className="nav-link">
            <img
              src={listingsIcon}
              alt="Listings Icon"
              className="nav-icon"
            />
            Listings
          </Link>
          <Link to="/account" className="nav-link">
            <img
              src={accountIcon}
              alt="Account Icon"
              className="nav-icon"
            />
            Account
          </Link>
          <Link to="/login" className="nav-link">
            <img
              src={logoutIcon}
              alt="Logout Icon"
              className="nav-icon"
            />
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}
