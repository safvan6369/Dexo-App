import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

// Import all your page components
import Dashboard from './pages/Dashboard';
import Activities from './pages/Activities';
import Progress from './pages/Progress';
import Stats from './pages/Stats';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Learn from './pages/Learn';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="container">
        <Routes>
          {/* Core User Pages */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/stats" element={<Stats />} />

          {/* User Management Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />

          {/* Content Pages */}
          <Route path="/learn" element={<Learn />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
