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

function BarChartYogyakarta(){

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
            data: [974, 439],
            backgroundColor: 'rgba(255, 99, 132, 1)',
          },
          {
            label: 'Realisasi',
            data: [978, 440],
            backgroundColor: 'rgba(53, 162, 235, 1)',
          },
        ],
      };

    return(
      <TitleCard title={"Data Pajak Prov. Daerah Istimewa Yogyakarta"}>
            <Bar options={options} data={data} />
      </TitleCard>

    )
}


export default BarChartYogyakarta