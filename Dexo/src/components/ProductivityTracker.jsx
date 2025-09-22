import React, { useState, useEffect } from 'react';
import { isYesterday, startOfWeek, isWithinInterval } from 'date-fns';
import './ProductivityTracker.css';

const ProductivityTracker = () => {
  const [streak, setStreak] = useState(0);
  const [weeklyGoal, setWeeklyGoal] = useState(300); // Default goal: 300 mins
  const [weeklyProgress, setWeeklyProgress] = useState(0);

  useEffect(() => {
    const sessions = JSON.parse(localStorage.getItem('detoxSessions')) || [];
    const stats = JSON.parse(localStorage.getItem('userStats')) || { streak: 0, lastSessionDate: null };

    // --- Calculate Streak ---
    if (stats.lastSessionDate) {
      const lastDate = new Date(stats.lastSessionDate);
      if (isYesterday(lastDate)) {
        setStreak(stats.streak);
      } else if (new Date().toDateString() !== lastDate.toDateString()) {
        setStreak(0); // Reset streak if they missed a day
      } else {
        setStreak(stats.streak);
      }
    }

    // --- Calculate Weekly Progress ---
    const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday as start of week
    const endOfThisWeek = new Date();
    const thisWeekSessions = sessions.filter(s => 
      isWithinInterval(new Date(s.id), { start: startOfThisWeek, end: endOfThisWeek })
    );
    const totalMinutesThisWeek = thisWeekSessions.reduce((acc, curr) => acc + curr.duration, 0);
    setWeeklyProgress(totalMinutesThisWeek);

  }, []);

  const progressPercentage = Math.min((weeklyProgress / weeklyGoal) * 100, 100);

  return (
    <div className="tracker-container">
      {/* Streak Counter */}
      <div className="tracker-card">
        <div className="tracker-value">{streak} 🔥</div>
        <div className="tracker-label">Day Streak</div>
      </div>

      {/* Weekly Goal */}
      <div className="tracker-card goal-card">
        <div className="goal-header">
          <div className="tracker-label">Weekly Goal Progress</div>
          <div className="tracker-value">{weeklyProgress} / {weeklyGoal} min</div>
        </div>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default ProductivityTracker;