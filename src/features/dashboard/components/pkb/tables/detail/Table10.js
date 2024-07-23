import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TitleCard from '../../../../../../components/Cards/TitleCard';

// Mapping from payment method to descriptions
const paymentMethodMap = {
  'online': 'Online',
  'offline': 'Offline'
};

const formatCurrency = (value) => {
  return `${Number(value).toLocaleString('id-ID')}`;
};

const Table10 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/paymethod/count');
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
              <th className="normal-case">Metode Pembayaran</th>
              <th className="normal-case">Jumlah</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{paymentMethodMap[item.metodepembayaran]}</td>
                <td>{formatCurrency(item.count)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
};

export default Table10;
