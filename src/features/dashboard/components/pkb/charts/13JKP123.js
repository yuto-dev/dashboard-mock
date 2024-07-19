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

// 13	Data jumlah Kendaraan Bermotor yang membayar Pajak 1,2 dan 3 tahun sebelum (sesuai tipe)

const JKP123BarChart = () => {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/tipekendaraan/pajak123');
                const data = response.data;

                const vehicleTypes = ['Sepeda Motor', 'Mobil Penumpang', 'Truk', 'Kendaraan Roda Tiga', 'Kendaraan Elektrik', 'Kendaraan Diatas Air'];

                // Map the counts to the correct vehicle types
                const countsA = [
                    data.counts1Years.A,
                    data.counts2Years.A,
                    data.counts3Years.A,
                ];

                const countsB = [
                    data.counts1Years.B,
                    data.counts2Years.B,
                    data.counts3Years.B,
                ];

                const countsC = [
                    data.counts1Years.C,
                    data.counts2Years.C,
                    data.counts3Years.C,
                ];

                const countsD = [
                    data.counts1Years.D,
                    data.counts2Years.D,
                    data.counts3Years.D,
                ];

                const countsE = [
                    data.counts1Years.E,
                    data.counts2Years.E,
                    data.counts3Years.E,
                ];

                const countsF = [
                    data.counts1Years.F,
                    data.counts2Years.F,
                    data.counts3Years.F,
                ];
                

                // Prepare the data for the chart
                setChartData({
                    labels: ['2023', '2022', '2021'],
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
                            data: countsF,
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
        <TitleCard title="Jumlah Kendaraan Bermotor yang Membayar Pajak 1,2 dan 3 Tahun Sebelum per Tipe">
            <Bar options={options} data={chartData} />
        </TitleCard>
    );
};



export default JKP123BarChart;
