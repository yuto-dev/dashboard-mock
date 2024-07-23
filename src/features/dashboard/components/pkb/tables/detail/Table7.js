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

const Table7 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/tipekendaraan/tidakbayarrupiah');
        const { counts1Years, counts5Years, counts7Years } = response.data;

        // Convert JSON to a format suitable for the table
        const formattedData = Object.keys(counts1Years).map((key) => ({
          tipe: vehicleTypeMap[key],
          tahun1: formatCurrency(counts1Years[key]),
          tahun5: formatCurrency(counts5Years[key]),
          tahun7: formatCurrency(counts7Years[key])
        }));

        setData(formattedData);
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
              <th className="normal-case">1 Tahun</th>
              <th className="normal-case">5 Tahun</th>
              <th className="normal-case">7 Tahun</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{item.tipe}</td>
                <td>{item.tahun1}</td>
                <td>{item.tahun5}</td>
                <td>{item.tahun7}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
};

export default Table7;
