import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './createAccount.css';
import backgroundImage from './icons/background.jpg'; // Import the background image

export default function CreateAccount() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.endsWith('@mix.wvu.edu')) {
      alert('Email must end with @mix.wvu.edu.');
      return;
    }

    console.log('Account created successfully:', { firstName, lastName, email });
    navigate('/home'); // Redirect to the home page after successful validation
  };

  return (
    <div
      className="create-account-page"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Dynamically set the background image
    >
      <form id="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="firstName"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          id="lastName"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
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