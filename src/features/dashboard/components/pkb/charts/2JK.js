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
import TitleCard from '../../../../../components/Cards/TitleCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const JKBarChart = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/tipekendaraan/count');
                const data = response.data;

                // Map letters to vehicle types
                const vehicleTypeMap = {
                    'A': 'Sepeda Motor',
                    'B': 'Mobil Penumpang',
                    'C': 'Truk',
                    'D': 'Kendaraan Roda Tiga',
                    'E': 'Kendaraan Elektrik',
                    'F': 'Kendaraan Diatas Air'
                };

                const labels = Object.values(vehicleTypeMap);
                const counts = data.map(item => item.count);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Jumlah Kendaraan',
                            data: counts,
                            backgroundColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1,
                        }
                    ],
                });

                setLoading(false);
            } catch (error) {
                console.error('Error fetching chart data:', error);
                setLoading(false);
            }
        };

        fetchChartData();
    }, []);

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
      <TitleCard title="Jumlah Kendaraan per Tipe">
        <Bar options={options} data={chartData} />
      </TitleCard>
    );
};

export default JKBarChart;
