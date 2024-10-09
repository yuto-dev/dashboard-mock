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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PKBBarChart = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/api/tipekendaraan/count`);
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

                // Sort the data alphabetically by tipekendaraan
                data.sort((a, b) => a.tipekendaraan.localeCompare(b.tipekendaraan));

                const labels = data.map(item => vehicleTypeMap[item.tipekendaraan]);
                const colors = [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(153, 102, 255, 1)'
                ];
                const borderColors = [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)'
                ];

                const datasets = data.map((item, index) => ({
                    label: vehicleTypeMap[item.tipekendaraan],
                    data: [parseInt(item.count, 10)], // Ensure counts are integers
                    backgroundColor: colors[index % colors.length],
                    borderColor: borderColors[index % borderColors.length],
                    borderWidth: 1,
                }));

                setChartData({
                    labels: ['Jumlah Kendaraan'],
                    datasets,
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

export default PKBBarChart;
