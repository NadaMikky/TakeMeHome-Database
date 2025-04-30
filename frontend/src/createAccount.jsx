import React from 'react';
import './createAccount.css';
import backgroundImage from './icons/background.jpg'; // Import the background image

export default function CreateAccount() {
  return (
    <div
      className="create-account-page"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Dynamically set the background image
    >
      <form id="signup-form">
        <input type="email" id="email" placeholder="Mix email" required />
        <input type="password" id="password" placeholder="Password" required />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}