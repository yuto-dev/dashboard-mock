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

function BarChartJakarta(){

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        },
      };
      
      const labels = [ 'PKB', 'BBNKB'];
      
      const data = {
        labels,
        datasets: [
          {
            label: 'Anggaran',
            data: [9100, 6250],
            backgroundColor: 'rgba(255, 99, 132, 1)',
          },
          {
            label: 'Realisasi',
            data: [9416, 6643],
            backgroundColor: 'rgba(53, 162, 235, 1)',
          },
        ],
      };

    return(
      <TitleCard title={"Data Pajak Prov. DKI Jakarta"}>
            <Bar options={options} data={data} />
      </TitleCard>

    )
}


export default BarChartJakarta