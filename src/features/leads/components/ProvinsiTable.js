import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TitleCard from "../../../components/Cards/TitleCard";
import axios from 'axios';

const getDataStatus = (status) => {
  if(status  === "Data Sudah Ada")return <div className="badge badge-success">{status}</div>
  if(status  === "Belum Isi Data")return <div className="badge badge-error">{status}</div>
  else return <div className="badge badge-ghost">{status}</div>
}

function ProvinsiTable() {
  const [provinsiData, setProvinsiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/province/all');
        setProvinsiData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <TitleCard title={"Data Provinsi"}>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>No.</th>
              <th className="normal-case">Daerah</th>
              <th className="normal-case">Target PKB</th>
              <th className="normal-case">Realisasi PKB</th>
              <th className="normal-case">Persentase Realisasi PKB</th>
              <th className="normal-case">Status</th>
            </tr>
          </thead>
          <tbody>
            {provinsiData.map((provinsi, index) => (
              <tr key={index}>
                <th>{provinsi.nomor}</th>
                <td>
                  <Link to={`/app/provinsi/${index+1}`}>
                    {provinsi.daerah}
                  </Link>
                </td>
                <td>{provinsi.anggaranpkb}</td>
                <td>{provinsi.realisasipkb}</td>
                <td style={{ color: provinsi.persentasepkb >= 100 ? 'green' : 'text-primary' }}>
                  {`${provinsi.persentasepkb}%`}</td>
                <td>{getDataStatus(provinsi.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
}

export default ProvinsiTable;
