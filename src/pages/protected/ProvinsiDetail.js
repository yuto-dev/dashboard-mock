// src/pages/protected/ProvinsiDetail.js
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { setPageTitle } from '../../features/common/headerSlice'
import TitleCard from '../../components/Cards/TitleCard';
import KabupatenTable from './detailTable/detailTable';
//import { fetchDataById } from '../../features/leads/components/ProvinsiTable'; // Assuming fetchData can be modified to fetch data by ID
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route

const fetchDataById = async (id) => {
    // Example: Fetch data from an API endpoint that accepts an ID
    const response = await fetch(`http://localhost:3001/api/province/${id}`);
    const data = await response.json();
    return data;
  };

const ProvinsiDetail = () => {

  const dispatch = useDispatch()

  const { id } = useParams(); // Get the province ID from the URL
  const [provinceData, setProvinceData] = useState(null);
    console.log(id)
  useEffect(() => {
    fetchDataById(id).then(data => setProvinceData(data)); // Fetch data for the province
    dispatch(setPageTitle({ title : "Detail"}))
  }, [id]);

  if (!provinceData) return <div>Loading...</div>;

  return (
    <div>

        <Link to ="/app/provinsi">
        <button className="bg-primary hover:secondary text-white font-bold py-2 px-4 rounded">
          Kembali
        </button>
        </Link>
      <KabupatenTable provinceId={id} provinceName={provinceData.daerah} />

    </div>
  );
};

export default ProvinsiDetail;