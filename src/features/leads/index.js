import { useEffect, useState, useRef } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import DynamicBarChart from './components/DynamicBarChart';
import ProvinsiTable from "./components/ProvinsiTable";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";

const TopSideButtons = () => {
  const openAddNewLeadModal = () => {
    console.log("Open add new lead modal");
    // Implement modal opening logic here
  };

  return (
    <div className="inline-block float-right">
      {/* <button className="btn px-6 btn-sm normal-case btn-primary" onClick={openAddNewLeadModal}>
        Add New
      </button> */}
    </div>
  );
};

function Leads() {
  const [activeRegion, setActiveRegion] = useState(11);
  const provinsiTableRef = useRef(null);

  const provinces = [
    { id: 1, name: 'Aceh' },
    { id: 2, name: 'Sumatera Utara' },
    { id: 3, name: 'Sumatera Barat' },
    { id: 4, name: 'Riau' },
    { id: 5, name: 'Kepulauan Riau' },
    { id: 6, name: 'Jambi' },
    { id: 7, name: 'Bengkulu' },
    { id: 8, name: 'Sumatera Selatan' },
    { id: 9, name: 'Bangka Belitung' },
    { id: 10, name: 'Lampung' },
    { id: 11, name: 'DKI Jakarta' },
    { id: 12, name: 'Jawa Barat' },
    { id: 13, name: 'Banten' },
    { id: 14, name: 'Jawa Tengah' },
    { id: 15, name: 'Daerah Istimewa Yogyakarta' },
    { id: 16, name: 'Jawa Timur' },
    { id: 17, name: 'Kalimantan Barat' },
    { id: 18, name: 'Kalimantan Tengah' },
    { id: 19, name: 'Kalimantan Selatan' },
    { id: 20, name: 'Kalimantan Timur' },
    { id: 21, name: 'Kalimantan Utara' },
    { id: 22, name: 'Sulawesi Barat' },
    { id: 23, name: 'Sulawesi Utara' },
    { id: 24, name: 'Gorontalo' },
    { id: 25, name: 'Sulawesi Tengah' },
    { id: 26, name: 'Sulawesi Selatan' },
    { id: 27, name: 'Sulawesi Tenggara' },
    { id: 28, name: 'Bali' },
    { id: 29, name: 'Nusa Tenggara Barat' },
    { id: 30, name: 'Nusa Tenggara Timur' },
    { id: 31, name: 'Maluku' },
    { id: 32, name: 'Maluku Utara' },
    { id: 33, name: 'Papua' },
    { id: 34, name: 'Papua Barat' },
    { id: 35, name: 'Papua Barat Daya' },
    { id: 36, name: 'Papua Tengah' },
    { id: 37, name: 'Papua Pegunungan' },
    { id: 38, name: 'Papua Selatan' },
  ];

  return (
    <>
      <div className="dropdown mb-4">
        <label tabIndex={0} className="btn btn-white m-1">Provinsi</label>
        <ul 
          tabIndex={0} 
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 h-60 overflow-y-scroll flex flex-row"
        >
          {provinces.map((province) => (
            <li key={province.id} className="w-full block">
              <a onClick={() => setActiveRegion(province.id)}>{province.name}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid lg:grid-cols-1 mt-4 grid-cols-1 gap-6">
        <DynamicBarChart provinceId={activeRegion} />
      </div>

      <ProvinsiTable ref={provinsiTableRef} />
    </>
  );
}

export default Leads;
