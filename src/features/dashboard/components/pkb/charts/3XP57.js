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

// 3	Data Jumlah Kendaraan bermotor yg tidak membayar pajak selama 5 th
// 4	Data Jumlah Kendaraan bermotor yg tidak membayar pajak selama 7th


const XP57BarChart = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/tipekendaraan/tidakbayar');
                const data = response.data;

                const vehicleTypes = ['Sepeda Motor', 'Mobil Penumpang', 'Truk', 'Kendaraan Roda Tiga', 'Kendaraan Elektrik', 'Kendaraan Diatas Air'];

                // Map the counts to the correct vehicle types
                const countsA = [
                    data.counts5Years.A,
                    data.counts7Years.A,
                ];

                const countsB = [
                    data.counts5Years.B,
                    data.counts7Years.B,
                ];

                const countsC = [
                    data.counts5Years.C,
                    data.counts7Years.C,
                ];

                const countsD = [
                    data.counts5Years.D,
                    data.counts7Years.D,
                ];

                const countsE = [
                    data.counts5Years.E,
                    data.counts7Years.E,
                ];

                const countsF = [
                    data.counts5Years.F,
                    data.counts7Years.F,
                ];
                

                // Prepare the data for the chart
                setChartData({
                    labels: ['5 Tahun', '7 Tahun'],
                    datasets: [
                        {
                            label: 'Sepeda Motor',
                            data: countsA,
                            backgroundColor: 'rgba(255, 99, 132, 1)',
                        },
                        {
                            label: 'Mobil Penumpang',
                            data: countsB,
                            backgroundColor: 'rgba(53, 162, 235, 1)',
                        },
                        {
                            label: 'Truk',
                            data: countsC,
                            backgroundColor: 'rgba(255, 206, 86, 1)',
                        },
                        {
                            label: 'Kendaraan Roda Tiga',
                            data: countsD,
                            backgroundColor: 'rgba(75, 192, 192, 1)',
                        },
                        {
                            label: 'Kendaraan Elektrik',
                            data: countsE,
                            backgroundColor: 'rgba(153, 102, 255, 1)',
                        },
                        {
                            label: 'Kendaraan Diatas Air',
                            data: countsB,
                            backgroundColor: 'rgba(255, 159, 64, 1)',
                        },
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
        <TitleCard title="Jumlah Kendaraan yang Tidak Membayar Pajak (5 Tahun dan 7 Tahun)">
            <Bar options={options} data={chartData} />
        </TitleCard>
    );
};



export default XP57BarChart;
