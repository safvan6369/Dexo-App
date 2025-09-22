import React, { useState } from 'react';
import { detoxActivities } from '../data/activities';
import './Activities.css';

const Activities = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredActivities = detoxActivities.filter(activity =>
    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Find an Activity</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for activities like 'Read' or 'Meditate'..."
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="activity-grid-full">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity) => (
            <div key={activity.id} className="activity-card-full">
              <h3>{activity.title}</h3>
              <p>{activity.description}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No activities found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default Activities;