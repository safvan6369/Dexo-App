import React, { useState, useEffect } from 'react';
import { budgetActivities } from '../data/budgetActivities';
import './BudgetTracker.css';

const DAILY_BUDGET = 400;

const BudgetTracker = () => {
  const [budget, setBudget] = useState(DAILY_BUDGET);
  const [lastReset, setLastReset] = useState(new Date().toDateString());

  useEffect(() => {
    const savedBudget = JSON.parse(localStorage.getItem('userBudget'));
    const today = new Date().toDateString();

    if (savedBudget && savedBudget.lastReset === today) {
      setBudget(savedBudget.currentPoints);
      setLastReset(savedBudget.lastReset);
    } else {
      const newBudgetState = { currentPoints: DAILY_BUDGET, lastReset: today };
      localStorage.setItem('userBudget', JSON.stringify(newBudgetState));
      setBudget(DAILY_BUDGET);
      setLastReset(today);
    }
  }, []);

  const updateBudget = (points) => {
    setBudget(prevBudget => {
      const newPoints = prevBudget + points;
      const newBudgetState = { currentPoints: newPoints, lastReset: lastReset };
      localStorage.setItem('userBudget', JSON.stringify(newBudgetState));
      return newPoints;
    });
  };

  const budgetPercentage = (budget / DAILY_BUDGET) * 100;
  let progressBarColor = '#4caf50'; // Green
  if (budgetPercentage < 50) progressBarColor = '#ffc107'; // Amber
  if (budgetPercentage < 25) progressBarColor = '#f44336'; // Red

  return (
    <div className="budget-container">
      <div className="budget-header">
        <h2>Daily Productivity Budget</h2>
        <div className="budget-points" style={{ color: progressBarColor }}>
          {budget}
          <span className="budget-total"> / {DAILY_BUDGET}</span>
        </div>
      </div>
      <div className="budget-progress-bar-container">
        <div 
          className="budget-progress-bar" 
          style={{ width: `${budgetPercentage}%`, backgroundColor: progressBarColor }}
        ></div>
      </div>
      
      <div className="actions-grid">
        <div className="action-column">
          <h3>Productive Actions (+)</h3>
          {budgetActivities.productive.map(activity => (
            <button 
              key={activity.id} 
              className="action-button productive"
              onClick={() => updateBudget(activity.points)}
            >
              {activity.name} <span>+{activity.points}</span>
            </button>
          ))}
        </div>
        <div className="action-column">
          <h3>Non-Productive Actions (-)</h3>
          {budgetActivities.nonProductive.map(activity => (
            <button 
              key={activity.id} 
              className="action-button non-productive"
              onClick={() => updateBudget(activity.points)}
            >
              {activity.name} <span>{activity.points}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetTracker;