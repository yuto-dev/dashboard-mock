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

const POOBarChart = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/paymethod/count');
                const data = response.data;

                const labels = data.map(item => item.metodepembayaran.charAt(0).toUpperCase() + item.metodepembayaran.slice(1));
                const counts = data.map(item => item.count);

                // Assigning counts array values to separate variables
                const onlinePayments = counts[0];
                const offlinePayments = counts[1];

                console.log('Online Payments:', onlinePayments); // 3217
                console.log('Offline Payments:', offlinePayments); // 1445562

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Jumlah Pembayaran',
                            data: counts,
                            backgroundColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)'
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
        <TitleCard title="Jumlah Pembayaran per Metode">
            <Bar options={options} data={chartData} />
        </TitleCard>
    );
};

export default POOBarChart;
