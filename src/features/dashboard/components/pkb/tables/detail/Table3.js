import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TitleCard from '../../../../../../components/Cards/TitleCard';

// Mapping from letters to vehicle types
const vehicleTypeMap = {
  'A': 'Sepeda Motor',
  'B': 'Mobil Penumpang',
  'C': 'Truk',
  'D': 'Kendaraan Roda Tiga',
  'E': 'Kendaraan Elektrik',
  'F': 'Kendaraan Diatas Air'
};

const formatNumber = (value) => {
  return `${value.toLocaleString('id-ID')}`;
};

const Table3 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/tipekendaraan/tidakbayar');
        const counts5Years = response.data.counts5Years;
        const counts7Years = response.data.counts7Years;

        // Combine both counts into a single array of objects
        const combinedData = Object.keys(counts5Years).map(key => ({
          tipekendaraan: key,
          counts5Years: counts5Years[key],
          counts7Years: counts7Years[key] || 0, // Default to 0 if no value for 7 years
        }));

        setData(combinedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <TitleCard title={"Detail Data"}>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th className="normal-case">Tipe Kendaraan</th>
              <th className="normal-case">5 Tahun</th>
              <th className="normal-case">7 Tahun</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{vehicleTypeMap[item.tipekendaraan]}</td>
                <td>{formatNumber(item.counts5Years)}</td>
                <td>{formatNumber(item.counts7Years)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
};

export default Table3;
