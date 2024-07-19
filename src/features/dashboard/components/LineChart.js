import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import TitleCard from '../../../components/Cards/TitleCard';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function LineChart(){

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  
  const labels = [ '2019', '2020', '2021', '2022', '2023', '2024'];

  const data = {
  labels,
  datasets: [
    {
      fill: false,
      label: 'Contoh 1',
      data: labels.map(() => { return Math.random() * 100 + 500 }),
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 1)',
    },
    {
      fill: false,
      label: 'Contoh 1',
      data: labels.map(() => { return Math.random() * 100 + 500 }),
      borderColor: 'rgba(53, 162, 235, 1)',
      backgroundColor: 'rgba(53, 162, 235, 1)',
    },
  ],
};
  

    return(
      <TitleCard title={"Data Historik"}>
          <Line data={data} options={options}/>
      </TitleCard>
    )
}


export default LineChart