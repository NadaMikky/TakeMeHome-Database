import React, { useState } from 'react';
import './createAccount.css';
import backgroundImage from './icons/background.jpg'; // Import the background image

export default function CreateAccount() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Regular expression to allow only letters
    const nameRegex = /^[A-Za-z]+$/;

    if (!nameRegex.test(firstName)) {
      alert('First Name can only contain letters.');
      return;
    }

    if (!nameRegex.test(lastName)) {
      alert('Last Name can only contain letters.');
      return;
    }

    if (!email.endsWith('@mix.wvu.edu')) {
      alert('Email must end with @mix.wvu.edu.');
      return;
    }

    // Regular expression to check for at least one letter, one number, and one symbol
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      alert('Password must be at least 8 characters long and include at least one letter, one number, and one symbol.');
      return;
    }

    console.log('Account created successfully:', { firstName, lastName, email });
    // Add account creation logic here
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