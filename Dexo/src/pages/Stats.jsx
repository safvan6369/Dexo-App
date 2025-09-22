import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { subDays, format } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Stats = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const sessions = JSON.parse(localStorage.getItem('detoxSessions')) || [];

    const dataByDate = {};
    for (let i = 6; i >= 0; i--) {
      const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
      dataByDate[date] = 0;
    }

    sessions.forEach(session => {
      const sessionDate = format(new Date(session.id), 'yyyy-MM-dd');
      if (dataByDate[sessionDate] !== undefined) {
        dataByDate[sessionDate] += session.duration;
      }
    });

    const labels = Object.keys(dataByDate).map(date => format(new Date(date), 'MMM d'));
    const data = Object.values(dataByDate);

    // --- ADD THESE CONSOLE LOGS ---
    console.log("Stats Page - Sessions:", sessions);
    console.log("Stats Page - Data by Date:", dataByDate);
    console.log("Stats Page - Labels for Chart:", labels);
    console.log("Stats Page - Data for Chart:", data);
    // --- END ADDED CONSOLE LOGS ---

    if (data.every(val => val === 0)) {
       console.warn("Stats Page - All data values are zero. Chart might appear empty.");
    }

    setChartData({
      labels,
      datasets: [
        {
          label: 'Minutes of Detox per Day',
          data,
          backgroundColor: 'rgba(76, 175, 80, 0.6)',
          borderColor: 'rgba(76, 175, 80, 1)',
          borderWidth: 1,
        },
      ],
    });
  }, []);

  // ... rest of your component (options and return statement) ...
};

export default Stats;
