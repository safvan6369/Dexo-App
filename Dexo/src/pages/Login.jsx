import React, { useState } from 'react';
import './forms.css'; // Import shared form styles
import { useNavigate } from 'react-router-dom'; // For redirection

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please fill in both fields.');
      return;
    }
    console.log('Logging in with:', { email, password });
    // In a real app, you'd make an API call here for authentication
    alert('Login attempted! (Functionality is front-end only for now)');
    // Simulate successful login and redirect
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/'); // Redirect to dashboard after 'login'
  };

  return (
    <div>
      <h1>Login</h1>
      <form className="form-container" onSubmit={handleSubmit}>
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
        <button type="submit" className="form-button">Login</button>
      </form>
    </div>
  );
};

export default Login;