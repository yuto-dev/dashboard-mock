import React, { useEffect, useState } from 'react';
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
import TitleCard from '../../../../../components/Cards/TitleCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Define vehicle types and their labels
const jenisKendaraanNames = {
    A: "Sedan",
    B: "Jeep",
    C: "Minibus",
    D: "Microbus",
    E: "Bus",
    F: "Blind Van",
    G: "Pick Up",
    H: "Light Truck",
    I: "Truck",
    J: "Pick Up Box",
    K: "Mobil Roda Tiga",
    L: "Motor Roda Tiga",
    M: "Sepeda Motor",
    N: "Mobil Listrik",
    O: "Motor Listrik",
    P: "Kendaraan Diatas Air",
    Q: "Alat Berat"
};

// Define the color palette for the vehicle types
const colorPalette = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
    '#FF9F40', '#FF5733', '#C70039', '#900C3F', '#581845',
    '#FFC300', '#DAF7A6', '#FFB6C1', '#7D3C98', '#FF5733',
    '#5D6D7E', '#FF8D1A'
];

function FlexBarChart({ kode_chart, kode_prop, kode_kab, chartLabel }) {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiUrl = process.env.REACT_APP_API_URL; // Ensure this points to your correct API
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/${kode_chart}/${kode_prop}/${kode_kab}`);
                console.log(response)
                console.log(kode_chart)
                console.log(kode_prop)
                console.log(kode_kab)
                console.log(chartLabel)
                
                // Check if the response is OK (status 200-299)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                // Prepare the data for the chart
                const labels = Object.keys(jenisKendaraanNames); // A to Q
                const datasets = labels.map((key, index) => ({
                    label: jenisKendaraanNames[key],
                    data: [data[key] || 0], // Use data or default to 0
                    backgroundColor: colorPalette[index % colorPalette.length],
                }));

                // Set chart data
                setChartData({
                    labels: ['Jumlah Kendaraan'],
                    datasets,
                });

                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [kode_chart, kode_prop, kode_kab]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Jenis Kendaraan',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Jumlah Kendaraan',
                },
            },
        },
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!chartData) {
        return <div>No data available</div>; // Handle the case where chartData is still null
    }

    console.log(chartLabel)

    return (
        <TitleCard title={chartLabel}>
            <Bar options={options} data={chartData} />
        </TitleCard>
    );
}

export default FlexBarChart;
