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

function AdditionalChartRupiah(){

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          }
        },
      };
      
      const labels = ['Sepeda Motor', 'Mobil Penumpang', 'Truk', 'April', 'Mei', 'Juni', 'Juli'];
      
      const data = {
        labels: ['5 Tahun Kebawah', '5 Tahun Keatas'],
        datasets: [
            {
                label: 'Sepeda Motor',
                data: labels.map(() => { return Math.random() * 1000000 + 500 }),
                backgroundColor: 'rgba(255, 99, 132, 1)',
            },
            {
                label: 'Mobil Penumpang',
                data: labels.map(() => { return Math.random() * 1000000 + 500 }),
                backgroundColor: 'rgba(53, 162, 235, 1)',
            },
            {
                label: 'Truk',
                data: labels.map(() => { return Math.random() * 1000000 + 500 }),
                backgroundColor: 'rgba(255, 206, 86, 1)',
            },
            {
                label: 'Kendaraan Roda Tiga',
                data: labels.map(() => { return Math.random() * 1000000 + 500 }),
                backgroundColor: 'rgba(75, 192, 192, 1)',
            },
            {
                label: 'Kendaraan Elektrik',
                data: labels.map(() => { return Math.random() * 1000000 + 500 }),
                backgroundColor: 'rgba(153, 102, 255, 1)',
            },
            {
                label: 'Kendaraan Diatas Air',
                data: labels.map(() => { return Math.random() * 1000000 + 500 }),
                backgroundColor: 'rgba(255, 159, 64, 1)',
            },
        ],
      };

    return(
      <TitleCard title={"Nilai Kendaraan Bermotor Yang Tidak Membayar Pajak (Dalam Rupiah)"} topMargin="mt-2">
            <Bar options={options} data={data} />
      </TitleCard>

    )
}



export default AdditionalChartRupiah;
