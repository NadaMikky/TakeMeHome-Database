import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './createAccount.css';
import backgroundImage from './icons/background.jpg'; // Import the background image

export default function CreateAccount() {
  const [studentID, setStudentID] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [classYear, setClassYear] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      studentID,
      firstName,
      lastName,
      email,
      password,
      classYear,
    };

    // Validate student ID
    if (!/^\d{9}$/.test(studentID)) {
      alert('Student ID must be exactly 9 numeric digits.');
      return;
    }

    // Validate email
    if (!email.endsWith('@mix.wvu.edu')) {
      alert('Email must end with @mix.wvu.edu.');
      return;
    }

    // Send user data to backend
    try {
      const response = await fetch('http://localhost:8081/api/createAccount', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      // Check if the response is ok
      if (response.ok) {
        console.log('Account created successfully:', { firstName, lastName, email });
        navigate('/home'); // Redirect to the home page after successful validation
      } else {
        console.error('Failed to create account');
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div
      className="create-account-page"
      style={{ backgroundImage: `url(${backgroundImage})` }} // Dynamically set the background image
    >
      <form id="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          id="studentID"
          placeholder="Student ID"
          value={studentID}
          onChange={(e) => setStudentID(e.target.value)}
          required
        />
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
        <input
          type="text"
          id="classYear"
          placeholder="Class"
          value={classYear}
          onChange={(e) => setClassYear(e.target.value)}
          required
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}