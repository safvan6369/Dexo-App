import React, { useState, useEffect } from 'react';
import './forms.css'; // Use shared form styles

const Profile = () => {
  const [username, setUsername] = useState('GuestUser');
  const [email, setEmail] = useState('guest@example.com');
  const [weeklyGoal, setWeeklyGoal] = useState(300);
  const [isEditingGoal, setIsEditingGoal] = useState(false);

  useEffect(() => {
    // In a real app, this would load user data from a backend
    // For now, let's load the weekly goal from localStorage if it exists
    const savedStats = JSON.parse(localStorage.getItem('userStats')) || {};
    if (savedStats.weeklyGoal) {
      setWeeklyGoal(savedStats.weeklyGoal);
    }
  }, []);

  const handleGoalSave = () => {
    if (weeklyGoal < 60) {
      alert("Weekly goal must be at least 60 minutes.");
      return;
    }
    const savedStats = JSON.parse(localStorage.getItem('userStats')) || {};
    savedStats.weeklyGoal = weeklyGoal;
    localStorage.setItem('userStats', JSON.stringify(savedStats));
    setIsEditingGoal(false);
    alert('Weekly goal updated!');
    window.location.reload(); // Refresh to update dashboard
  };

  return (
    <div>
      <h1>Your Profile & Settings</h1>
      <div className="form-container">
        <div className="form-group">
          <label>Username:</label>
          <input type="text" value={username} readOnly />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} readOnly />
        </div>

        <div className="form-group">
          <label htmlFor="weekly-goal">Weekly Detox Goal (minutes):</label>
          {isEditingGoal ? (
            <>
              <input
                type="number"
                id="weekly-goal"
                value={weeklyGoal}
                onChange={(e) => setWeeklyGoal(Number(e.target.value))}
                min="60"
              />
              <button onClick={handleGoalSave} className="form-button" style={{marginTop: '1rem', backgroundColor: '#007bff'}}>Save Goal</button>
              <button onClick={() => setIsEditingGoal(false)} className="form-button" style={{marginTop: '0.5rem', backgroundColor: '#6c757d'}}>Cancel</button>
            </>
          ) : (
            <>
              <p style={{fontSize: '1.2rem', fontWeight: 'bold', color: '#fff'}}>{weeklyGoal} minutes</p>
              <button onClick={() => setIsEditingGoal(true)} className="form-button" style={{marginTop: '1rem'}}>Edit Goal</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;