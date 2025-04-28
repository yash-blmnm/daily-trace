// src/components/DailyStreakChart.tsx
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function DailyStreakChart() {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Actions Completed',
        data: [2, 3, 1, 4, 5, 2, 3], // Replace this with real fetched data later
        backgroundColor: 'rgba(13, 148, 136, 0.7)', // teal-600 with opacity
      },
      {
        label: 'Reflections Completed',
        data: [1, 2, 0, 3, 4, 1, 2],
        backgroundColor: 'rgba(20, 184, 166, 0.7)', // teal-500 with opacity
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#374151', // text-gray-700
        },
        grid: {
          color: 'rgba(229, 231, 235, 0.5)', // gray-200 with opacity
        }
      },
      x: {
        ticks: {
          color: '#374151', // text-gray-700
        },
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <Bar data={data} options={options} />
    </div>
  );
}
