import React from 'react';
import Timer from '../components/Timer';
import Quote from '../components/Quote';
import ActivityList from '../components/ActivityList'; // Ensure this is imported
import ProductivityTracker from '../components/ProductivityTracker';
import BudgetTracker from '../components/BudgetTracker';

const Dashboard = () => {
  return (
    <div>
      <BudgetTracker />
      <ProductivityTracker />
      <p>Start a new session or check your suggested activities:</p>
      <Timer />
      <Quote />
      <ActivityList /> {/* Display simplified activity list on dashboard */}
    </div>
  );
};

export default Dashboard;