import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL;

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Report() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/report`)
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="card">Loading...</div>;
  if (!data) return <div className="card">No data</div>;

  const chartData = {
    labels: data.ranges.map(r => r.label),
    datasets: [
      {
        label: 'Number of users',
        data: data.ranges.map(r => r.count),
        backgroundColor: 'rgba(25, 118, 210, 0.7)',
        borderRadius: 8,
        barThickness: 24,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Capsim Quiz Score Distribution',
        font: { size: 22, weight: 700 },
        color: '#1976d2',
        padding: { bottom: 16 }
      },
      tooltip: {
        callbacks: {
          label: ctx => ` ${ctx.parsed.x} users`
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        stepSize: 1,
        title: {
          display: true,
          text: 'Number of users',
          font: { size: 15, weight: 600 },
          color: '#444'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Score Range',
          font: { size: 15, weight: 600 },
          color: '#444'
        }
      }
    }
  };

  return (
    <div className="card">
      <div style={{ marginBottom: 18, color: '#555', fontSize: 16 }}>
        <b>Quiz Report:</b> See how participants are scoring. Each bar shows the number of users in each score range.
      </div>
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default Report; 