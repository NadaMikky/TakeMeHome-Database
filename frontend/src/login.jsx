import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Import CSS for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Validate email to ensure it ends with .wvu.edu
    if (!value.endsWith('.wvu.edu')) {
      setError('Invalid email!');
    } else {
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.endsWith('.wvu.edu')) {
      setError('Please enter a valid WVU email address.');
      return;
    }
    // Proceed with form submission logic
    console.log('Form submitted with email:', email);
    navigate('/home'); // Navigate to the home page after successful login
  };

  return (
    <div className="login-container">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        {error && <p className="error-message">{error}</p>} {/* Display error message */}

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" placeholder="Enter your password" required />

        <button type="submit" className="btn">Log In</button>
      </form>
    </div>
  );
};

export default Login;