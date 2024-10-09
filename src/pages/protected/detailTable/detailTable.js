import React, { useEffect, useState } from 'react';
import TitleCard from "../../../components/Cards/TitleCard";
import axios from 'axios';

const formatCurrency = (value) => {
  return `Rp ${Number(value).toLocaleString('id-ID', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

const KabupatenTable = ({ provinceId, provinceName }) => {
  const [kabupatenData, setKabupatenData] = useState([]);
  const [kabupatenDetail, setKabupatenDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchKabupatenData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/kabupaten/${provinceId}`);
        setKabupatenData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    const fetchKabupatenDetail = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/kabupatendetail/${provinceId}`);
        setKabupatenDetail(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchKabupatenData();
    fetchKabupatenDetail();
  }, [provinceId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Combine the two data sets
  const combinedData = kabupatenData.map((data, index) => ({
    ...data,
    ...kabupatenDetail[index]
  }));

  return (
    <TitleCard title={"Data Kabupaten " + provinceName}>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>No.</th>
              <th className="normal-case">Kabupaten/Kota</th>
              <th className="normal-case">Target PKB</th>
              <th className="normal-case">Realisasi PKB</th>
              <th className="normal-case">Persentase Realisasi PKB</th>
              <th className="normal-case">Target BBNKB</th>
              <th className="normal-case">Realisasi BBNKB</th>             
              <th className="normal-case">Persentase Realisasi BBNKB</th>
            </tr>
          </thead>
          <tbody>
            {combinedData.map((data, index) => {
              const pkbPercentage = (data.realisasipkb / data.targetpkb) * 100;
              const bbnkbPercentage = (data.realisasibbnkb / data.targetbbnkb) * 100;
    
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{data.kabupatenkota}</td>
                  <td>{formatCurrency(data.targetpkb)}</td>
                  <td>{formatCurrency(data.realisasipkb)}</td>
                  <td style={{ color: pkbPercentage >= 100 ? 'green' : 'text-primary' }}>
                    {pkbPercentage.toFixed(2)}%
                  </td>
                  <td>{formatCurrency(data.targetbbnkb)}</td>
                  <td>{formatCurrency(data.realisasibbnkb)}</td>
                  <td style={{ color: bbnkbPercentage >= 100 ? 'green' : 'text-primary' }}>
                    {bbnkbPercentage.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
}

export default KabupatenTable;
