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
import axios from 'axios';
import TitleCard from '../../../../../../components/Cards/TitleCard';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// 13	Data jumlah Kendaraan Bermotor yang membayar Pajak 1,2 dan 3 tahun sebelum (sesuai tipe)

const fetchData = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
};

const calculateDifference = (data1, data2) => {
    const result = {};
    for (const key in data1) {
      if (data1.hasOwnProperty(key) && data2.hasOwnProperty(key)) {
        result[key] = {};
        for (const subKey in data1[key]) {
          if (data1[key].hasOwnProperty(subKey) && data2[key].hasOwnProperty(subKey)) {
            result[key][subKey] = data1[key][subKey] - data2[key][subKey];
          }
        }
      }
    }
    return result;
};

const calculatePercentage = (data1, data2) => {
    const result = {};
    for (const key in data1) {
      if (data1.hasOwnProperty(key) && data2.hasOwnProperty(key)) {
        result[key] = {};
        for (const subKey in data1[key]) {
          if (data1[key].hasOwnProperty(subKey) && data2[key].hasOwnProperty(subKey)) {
            result[key][subKey] = ((data1[key][subKey] / data2[key][subKey]) * 100).toFixed(2);
          }
        }
      }
    }
    return result;
  };

const vehicleTypeMap = {
    'A': 'Sepeda Motor',
    'B': 'Mobil Penumpang',
    'C': 'Truk',
    'D': 'Kendaraan Roda Tiga',
    'E': 'Kendaraan Elektrik',
    'F': 'Kendaraan Diatas Air'
  };

  const formatCurrency = (value) => {
    return `${value.toLocaleString('id-ID')}`;
  };

const Selisih13 = () => {
    const [data, setData] = useState(null);
    const [percentage, setPercentage] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiUrl = process.env.REACT_APP_API_URL;
  
    useEffect(() => {
      const fetchDataAsync = async () => {
        const data1 = await fetchData(`${apiUrl}/api/tipekendaraan/pajak123`);
        const data2 = await fetchData(`${apiUrl}/api/tipekendaraan/xpajak123`);
        
        if (data1 && data2) {
          const difference = calculateDifference(data1, data2);
          const percentage = calculatePercentage(data1, data2);
          setData(difference);
          setPercentage(percentage);
        }
  
        setLoading(false);
      };
  
      fetchDataAsync();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (!data || !percentage) {
      return <div>Error loading data</div>;
    }
  
    const rows = Object.keys(vehicleTypeMap).map((key) => ({
      tipe: vehicleTypeMap[key],
      tahun1: data.counts1Years[key],
      tahun2: data.counts2Years[key],
      tahun3: data.counts3Years[key],
      percentTahun1: percentage.counts1Years[key],
      percentTahun2: percentage.counts2Years[key],
      percentTahun3: percentage.counts3Years[key],
    }));
    

    if (loading) {
        return <div>Loading...</div>;
    }

    return(
        <TitleCard title={"Selisih Jumlah Kendaraan Membayar dan Tidak Membayar Pajak"}>
             {/** Table Data */}
             <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th className="normal-case">Tipe</th>
            <th className="normal-case">Tahun 1</th>
            <th className="normal-case">% Tahun 1</th>
            <th className="normal-case">Tahun 2</th>
            <th className="normal-case">% Tahun 2</th>
            <th className="normal-case">Tahun 3</th>
            <th className="normal-case">% Tahun 3</th>
          </tr>
        </thead>
        <tbody>
          {
            rows.map((row, index) => (
              <tr key={index}>
                <td>{row.tipe}</td>
                <td style={{ color: row.tahun1 >= 0 ? 'green' : 'red' }}>{formatCurrency(row.tahun1)}</td>
                <td style={{ color: row.tahun1 >= 100 ? 'green' : 'red' }}>{row.percentTahun1}%</td>
                <td style={{ color: row.tahun2 >= 0 ? 'green' : 'red' }}>{formatCurrency(row.tahun2)}</td>
                <td style={{ color: row.tahun2 >= 100 ? 'green' : 'red' }}>{row.percentTahun2}%</td>
                <td style={{ color: row.tahun3 >= 0 ? 'green' : 'red' }}>{formatCurrency(row.tahun3)}</td>
                <td style={{ color: row.tahun3 >= 100 ? 'green' : 'red' }}>{row.percentTahun3}%</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
        </TitleCard>
    )
};



export default Selisih13;
