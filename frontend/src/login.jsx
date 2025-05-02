import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Import CSS for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate email
    if (!email.endsWith('.wvu.edu')) {
      setError('Invalid email!');
      return;
    }

    const loginData = { email, password };

    try {
      const response = await fetch('http://localhost:8081/api/login', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        credentials: 'include', // session cookie
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Form submitted with email:', email);
        navigate('/home'); // Navigate to the home page after successful login
      } else {
        console.error('Login failed:', data.message);
      }

    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h1>Log In</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>} {/* Display error message */}

        <label htmlFor="password">Password:</label>
        <input 
          type="password"
          id="password" 
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} 
          required />

        <button type="submit" className="btn">Log In</button>
      </form>
    </div>
  );
};

export default Login;