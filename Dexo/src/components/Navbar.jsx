import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Dexo ✨</Link>
      <div className="navbar-links">
        <NavLink to="/activities">Activities</NavLink>
        <NavLink to="/progress">Progress</NavLink>
        <NavLink to="/stats">Stats</NavLink>
        <NavLink to="/learn">Learn</NavLink>
        <NavLink to="/profile">Profile</NavLink>
        <NavLink to="/login">Login</NavLink> {/* Added Login link */}
      </div>
    </nav>
  );
};

export default Navbar;