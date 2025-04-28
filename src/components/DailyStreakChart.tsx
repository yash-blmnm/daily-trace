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
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
      },
      {
        label: 'Reflections Completed',
        data: [1, 2, 0, 3, 4, 1, 2],
        backgroundColor: 'rgba(79, 70, 229, 0.7)',
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
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <Bar data={data} options={options} />
    </div>
  );
}
