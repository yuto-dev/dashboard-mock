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

const formatCurrency = (value) => {
  return `Rp ${Number(value).toLocaleString('id-ID')}.00`;
};

const Table14 = () => {
  const [data, setData] = useState({ counts1Years: {}, counts2Years: {}, counts3Years: {} });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/tipekendaraan/xpajak123');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Create a list of vehicle types to be used in the table rows
  const vehicleTypes = Object.keys(vehicleTypeMap);

  return (
    <TitleCard title={"Detail Data"}>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th className="normal-case">Tipe Kendaraan</th>
              <th className="normal-case">1 Tahun</th>
              <th className="normal-case">2 Tahun</th>
              <th className="normal-case">3 Tahun</th>
            </tr>
          </thead>
          <tbody>
            {vehicleTypes.map((type, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{vehicleTypeMap[type]}</td>
                <td>{data.counts1Years[type] || 0}</td>
                <td>{data.counts2Years[type] || 0}</td>
                <td>{data.counts3Years[type] || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
};

export default Table14;
