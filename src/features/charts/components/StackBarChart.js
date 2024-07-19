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
  
  function StackBarChart(){
  
      const options = {
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                },
            },
        };
        
        const labels = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli'];
        
        const data = {
          labels,
          datasets: [
            {
              label: 'Marmer',
              data: labels.map(() => { return Math.random() * 1000 + 500 }),
              backgroundColor: 'rgba(255, 99, 132, 1)',
            },
            {
              label: 'Nitrat',
              data: labels.map(() => { return Math.random() * 1000 + 500 }),
              backgroundColor: 'rgba(53, 162, 235, 1)',
            },
            {
                label: 'Fosfat',
                data: labels.map(() => { return Math.random() * 1000 + 500 }),
                backgroundColor: 'rgba(235, 162, 235, 1)',
              },
          ],
        };
  
      return(
        <TitleCard title={"Pajak per Mineral"} topMargin="mt-2">
              <Bar options={options} data={data} />
        </TitleCard>
  
      )
  }
  
  
  export default StackBarChart