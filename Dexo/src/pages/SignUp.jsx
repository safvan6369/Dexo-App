import React, { useState } from 'react';
import './forms.css'; // Import shared form styles
import { useNavigate } from 'react-router-dom'; // For redirection

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }
    console.log('Signing up with:', { username, email, password });
    // In a real app, this would register the user via an API
    alert('Sign Up attempted! (Functionality is front-end only for now)');
    // Simulate successful signup and redirect
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/'); // Redirect to dashboard after 'signup'
  };

  return (
    <div>
      <h1>Create an Account</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;