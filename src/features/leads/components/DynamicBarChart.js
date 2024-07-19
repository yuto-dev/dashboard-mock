import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import TitleCard from '../../../components/Cards/TitleCard';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const DynamicBarChart = ({ provinceId }) => {

    const [chartData, setChartData] = useState(null);
    const [provinceName, setProvinceName] = useState('');
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/province/${provinceId}`);
                const data = response.data;

                // Function to parse the currency string
                const parseCurrency = (currencyString) => {
                  return Math.floor(parseInt(currencyString
                      .replace(/^Rp/, '')                // Remove "Rp"
                      .replace(/\./g, '')                // Remove all dots
                      .replace(/,/g, '')                 // Remove commas
                      .replace(/00$/, '')                 // Remove trailing "00"
                  ) / 1000000000);                      // Convert to billions
                };

                // Prepare the data for the chart
                setChartData({
                  labels: ['PKB', 'BBNKB'],
                  datasets: [
                      {
                          label: 'Anggaran',
                          data: [
                              parseCurrency(data.anggaranpkb), // PKB Anggaran
                              parseCurrency(data.anggaranbbnkb), // BBNKB Anggaran
                          ],
                          backgroundColor: 'rgba(255, 99, 132, 1)',
                      },
                      {
                          label: 'Realisasi',
                          data: [
                              parseCurrency(data.realisasipkb), // PKB Realisasi
                              parseCurrency(data.realisasibbnkb), // BBNKB Realisasi
                          ],
                          backgroundColor: 'rgba(53, 162, 235, 1)',
                      },
                  ],
                });
                setProvinceName(data.daerah);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching chart data:', error);
                setLoading(false);
            }
        };

        fetchChartData();
    }, [provinceId]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
      <TitleCard title={`Data Pajak ${provinceName} (Dalam Miliaran Rupiah)`}>
        <Bar options={options} data={chartData} />
      </TitleCard>
    );
};

export default DynamicBarChart;
