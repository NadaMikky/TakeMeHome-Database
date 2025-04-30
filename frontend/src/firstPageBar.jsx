import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

// Import SVGs from src/icons/
import wvuLogo from './icons/wv_logo.svg';

export default function FirstPageBar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={wvuLogo} alt="WVU Logo" className="navbar-logo-img" />
          <h1 className="navbar-title">Take Me Home</h1>
        </Link>

        <div className="navbar-links">
          <Link to="/login" className="nav-link">Log In</Link> {/* Navigate to login component */}
          <Link to="/create-account" className="nav-link">Sign Up</Link> {/* Navigate to create account */}
        </div>
      </div>
    </nav>
  );
}