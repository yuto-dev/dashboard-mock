import React, { useEffect, useState } from 'react';
import TitleCard from "../../../components/Cards/TitleCard";
import axios from 'axios';

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
              <th className="normal-case">Data</th>
              <th className="normal-case">Daerah</th>
              <th className="normal-case">Status</th>
              <th className="normal-case">Anggaran PKB</th>
              <th className="normal-case">Realisasi PKB</th>
              <th className="normal-case">Persentase PKB</th>
            </tr>
          </thead>
          <tbody>
            {provinsiData.map((provinsi, index) => (
              <tr key={index}>
                <th>{provinsi.nomor}</th>
                <td>{provinsi.data}</td>
                <td>{provinsi.daerah}</td>
                <td
                                    style={{
                                        color: provinsi.status === "Data Sudah Ada" ? 'green' : provinsi.status === "Belum Isi Data" ? 'red' : 'inherit'
                                    }}
                                >
                                    {provinsi.status}
                                </td>
                <td>{provinsi.anggaranpkb}</td>
                <td>{provinsi.realisasipkb}</td>
                <td>{`${provinsi.persentasepkb}%`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </TitleCard>
  );
}

export default ProvinsiTable;
