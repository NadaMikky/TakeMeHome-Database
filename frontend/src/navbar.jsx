import React from 'react';
import './navbar.css'; // Importing CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => (window.location.href = 'home.html')}>
          <img src="icons/wv_logo.svg" alt="WVU Logo" className="navbar-logo-img" />
          <h1 className="navbar-title">Take Me Home</h1>
        </div>
        <div className="navbar-links">
          <a href="listings.html" className="nav-link">
            <img src="icons/listings_white.svg" className="nav-icon" alt="Listings Icon" />
            Listings
          </a>
          <a href="account.html" className="nav-link">
            <img src="icons/account_white.svg" className="nav-icon" alt="Account Icon" />
            Account
          </a>
          <a href="login.html" className="nav-link">
            <img src="icons/logout.svg" className="nav-icon" alt="Logout Icon" />
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;