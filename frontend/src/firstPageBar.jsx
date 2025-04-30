import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const FirstPageBar = () => {
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
          <Link to="/login" className="nav-link">Log In</Link> {/* Navigate to login component */}
          <Link to="/create-account" className="nav-link">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default FirstPageBar;