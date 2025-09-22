import React, { useState, useEffect } from 'react';
import './Progress.css';

const Progress = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const savedSessions = JSON.parse(localStorage.getItem('detoxSessions')) || [];
    setSessions(savedSessions.reverse());
  }, []);

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear your entire history? This cannot be undone.")) {
      localStorage.removeItem('detoxSessions');
      localStorage.removeItem('userStats'); // Clear related stats as well
      localStorage.removeItem('userBudget'); // Clear budget for a clean slate
      setSessions([]);
      // Reload to ensure dashboard components also reflect cleared state
      window.location.reload(); 
    }
  };

  return (
    <div>
      <div className="progress-header">
        <h1>Progress & History</h1>
        {sessions.length > 0 && (
          <button onClick={clearHistory} className="clear-button">
            Clear All Data
          </button>
        )}
      </div>

      {sessions.length === 0 ? (
        <p>You haven't completed any sessions yet. Go to the Dashboard to start one!</p>
      ) : (
        <div className="sessions-list">
          {sessions.map((session) => (
            <div key={session.id} className="session-card">
              <p className="session-date">{session.date}</p>
              <p className="session-duration">{session.duration} minutes</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Progress;