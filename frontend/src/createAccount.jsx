import React, { useState } from 'react';
import './createAccount.css';
import backgroundImage from './icons/background.jpg'; // Import the background image

export default function CreateAccount() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.endsWith('@mix.wvu.edu')) {
      alert('Email must end with @mix.wvu.edu.');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    console.log('Account created successfully');
    // Add account creation logic here
  };

  return (
    <div
      className="create-account-page"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Dynamically set the background image
    >
      <form id="signup-form" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          placeholder="Mix email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}