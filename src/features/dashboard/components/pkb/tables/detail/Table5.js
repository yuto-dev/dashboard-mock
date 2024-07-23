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

const Table5 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/tipekendaraan/bayar');
        setData(response.data);
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
              <th className="normal-case">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{vehicleTypeMap[item.tipekendaraan]}</td>
                <td>{formatNumber(item.count)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
};

export default Table5;
