import React, { useState, useEffect } from 'react';
import { isToday, isYesterday } from 'date-fns';
import './Timer.css';

const Timer = () => {
  const initialTime = 60 * 60; // 60 minutes
  const [time, setTime] = useState(initialTime);
  const [isActive, setIsActive] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0); // New state to track time spent in a session

  const saveSession = (duration) => {
    if (duration < 60) { // Don't save sessions less than a minute
      alert("Session too short to save or earn points (min 1 minute).");
      return;
    }

    const durationInMinutes = Math.round(duration / 60);

    // --- SAVE THE SESSION LOG ---
    const session = {
      id: new Date().toISOString(), // Unique ID for tracking
      date: new Date().toLocaleDateString(),
      duration: durationInMinutes, // Save duration in minutes
    };
    const sessions = JSON.parse(localStorage.getItem('detoxSessions')) || [];
    sessions.push(session);
    localStorage.setItem('detoxSessions', JSON.stringify(sessions));

    // --- UPDATE THE BUDGET ---
    const pointsEarned = Math.floor(durationInMinutes / 10) * 5; // 5 points per 10 mins
    if (pointsEarned > 0) {
      const today = new Date().toDateString();
      const savedBudget = JSON.parse(localStorage.getItem('userBudget')) || { currentPoints: 400, lastReset: today };
      
      if (savedBudget.lastReset !== today) { // Reset if the day has changed
        savedBudget.currentPoints = 400; 
        savedBudget.lastReset = today;
      }
      
      savedBudget.currentPoints += pointsEarned;
      localStorage.setItem('userBudget', JSON.stringify(savedBudget));
    }
    
    // --- UPDATE STREAK LOGIC ---
    const stats = JSON.parse(localStorage.getItem('userStats')) || { streak: 0, lastSessionDate: null };
    const todayForStreak = new Date();
    const lastDate = stats.lastSessionDate ? new Date(stats.lastSessionDate) : null;

    if (lastDate) {
      if (isYesterday(lastDate)) {
        stats.streak += 1; // Increment streak if last session was yesterday
      } else if (!isToday(lastDate)) {
        stats.streak = 1; // Reset streak if they missed a day (and it's not today)
      }
      // If it's the same day, do nothing to the streak
    } else {
      stats.streak = 1; // First session ever
    }
    stats.lastSessionDate = todayForStreak.toISOString(); // Update last session date
    localStorage.setItem('userStats', JSON.stringify(stats));

    // --- NOTIFY USER AND REFRESH ---
    alert(`Session of ${durationInMinutes} minutes saved! You earned ${pointsEarned} budget points!`);
    window.location.reload(); // Simple refresh to update dashboard components
  };

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
        setTimeSpent((prevSpent) => prevSpent + 1); // Increment time spent
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
      saveSession(timeSpent); // Save session when timer hits zero
    }
    // Cleanup function to clear interval on component unmount or dependency change
    return () => clearInterval(interval);
  }, [isActive, time, timeSpent]); // Dependencies for the effect

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    if (timeSpent > 0 && confirm("Are you sure you want to reset? Current session will be saved.")) {
      saveSession(timeSpent); // Save progress if reset mid-session
    } else if (timeSpent === 0) {
        alert("Timer reset.");
    }
    setIsActive(false);
    setTime(initialTime);
    setTimeSpent(0); // Reset time spent
  };

  const formatTime = (seconds) => {
    const getSeconds = `0${seconds % 60}`.slice(-2);
    const minutes = `${Math.floor(seconds / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(seconds / 3600)}`.slice(-2);
    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  return (
    <div className="timer-container">
      <h2>Detox Timer</h2>
      <div className="time-display">{formatTime(time)}</div>
      <div className="timer-controls">
        <button onClick={toggleTimer} className="timer-button">
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button onClick={resetTimer} className="timer-button reset-button">
          Reset & Save
        </button>
      </div>
    </div>
  );
};

export default Timer;