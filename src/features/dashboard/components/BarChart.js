import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart(){

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        },
      };
      
      const labels = [ '2019', '2020', '2021', '2022', '2023', '2024'];
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Contoh 1',
            data: labels.map(() => { return Math.random() * 1000 + 500 }),
            backgroundColor: 'rgba(255, 99, 132, 1)',
          },
          {
            label: 'Contoh 2',
            data: labels.map(() => { return Math.random() * 1000 + 500 }),
            backgroundColor: 'rgba(53, 162, 235, 1)',
          },
        ],
      };

    return(
      <TitleCard title={"Bar Chart"}>
            <Bar options={options} data={data} />
      </TitleCard>

    )
}


export default BarChart