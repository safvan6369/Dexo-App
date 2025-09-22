import React from 'react';
import { Link } from 'react-router-dom'; // <--- ADD THIS LINE
import { detoxActivities } from '../data/activities';
import './ActivityList.css';

const ActivityList = () => {
  return (
    <div className="activity-list-container">
      <h2>Things To Do During Detox</h2>
      <div className="activity-grid-small"> {/* Changed class for dashboard view */}
        {detoxActivities.slice(0, 6).map((activity) => ( /* Show only first 6 on dashboard */
          <div key={activity.id} className="activity-item-small">
            <h3>{activity.title}</h3>
            <p>{activity.description}</p>
          </div>
        ))}
      </div>
      <p style={{textAlign: 'center', marginTop: '1rem'}}>
        <Link to="/activities" style={{color: '#4caf50', textDecoration: 'none', fontWeight: 'bold'}}>
          View All Activities &rarr;
        </Link>
      </p>
    </div>
  );
};

export default ActivityList;