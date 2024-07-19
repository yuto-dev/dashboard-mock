import {
    Chart as ChartJS,
    Filler,
    ArcElement,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Scatter } from 'react-chartjs-2';
  import TitleCard from '../../../components/Cards/TitleCard';
  
  ChartJS.register(ArcElement, Tooltip, Legend,
      Tooltip,
      Filler,
      Legend);
  
  function ScatterChart(){
  
      const options = {
            scales: {
              x: {
                type: 'linear',
                position: 'bottom',
                title: {
                    display: true,
                    text: 'Nilai Produksi'
                }
            },
            y: {
                title: {
                    display: true,
                    beginAtZero: true,
                    text: 'Pajak yang Dibayar'
                }
            }
            },
        };
        
        const data = {
          datasets: [
            {
              label: 'Perusahaan Internasional',
              data: Array.from({ length: 100 }, () => ({
                x: Math.random() * 11,
                y: Math.random() * 31,
              })),
              backgroundColor: 'rgba(255, 99, 132, 1)',
            },
            {
                label: 'Perusahaan Lokal',
                data: Array.from({ length: 100 }, () => ({
                  x: Math.random() * 12,
                  y: Math.random() * 12,
                })),
                backgroundColor: 'rgba(0, 0, 255, 1)',
              },
          ],
        };
  
      return(
          <TitleCard title={"Produksi dan Kepatuhan Pembayaran Pajak"}>
                  <Scatter options={options} data={data} />
          </TitleCard>
      )
  }
  
  
  export default ScatterChart