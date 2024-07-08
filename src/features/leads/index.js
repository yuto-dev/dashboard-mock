import { useEffect, useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
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
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    // Hardcoded leads data
    const hardcodedLeads = [
      {
        nomor: "I",
        data: "ETPD",
        daerah: "Prov. Aceh",
        statusData: "Data Sudah Ada",
        anggaran: "551.425.856.554",
        realisasi: "540.799.238.889",
        persentase: "98,07"
      },
      {
        nomor: "II",
        data: "ETPD",
        daerah: "Prov. Sumatera Utara",
        statusData: "Data Sudah Ada",
        anggaran: "410.000.000.004",
        realisasi: "359.251.201.934",
        persentase: "87,62"
      },
      {
        nomor: "III",
        data: "ETPD",
        daerah: "Prov. Sumatera Barat",
        statusData: "Data Sudah Ada",
        anggaran: "906376154000",
        realisasi: "724.528.071.275",
        persentase: "79,94"
      },
      {
        nomor: "IV",
        data: "ETPD",
        daerah: "Prov. Riau",
        statusData: "Data Sudah Ada",
        anggaran: "1.374.281.303.645",
        realisasi: "1.592.655.758.668",
        persentase: "115,89"
      },
      {
        nomor: "V",
        data: "BITLY",
        daerah: "Prov. Kepulauan Riau",
        statusData: "Data Sudah Ada",
        anggaran: "475.473.925.512",
        realisasi: "535.895.634.154",
        persentase: "112,71"
      },
      {
        nomor: "VI",
        data: "BITLY",
        daerah: "Prov. Jambi",
        statusData: "Data Sudah Ada",
        anggaran: "615.413.085.084",
        realisasi: "604.470.700.510",
        persentase: "98,22"
      },
      {
        nomor: "VII",
        data: "ETPD",
        daerah: "Prov. Bengkulu",
        statusData: "Data Sudah Ada",
        anggaran: "260.157.037.971",
        realisasi: "255.407.209.000",
        persentase: "98,17"
      },
      {
        nomor: "VIII",
        data: "BITLY",
        daerah: "Prov. Sumatera Selatan",
        statusData: "Data Sudah Ada",
        anggaran: "1.144.681.213.000",
        realisasi: "1.226.526.688.289",
        persentase: "107,15"
      },
      {
        nomor: "IX",
        data: "BITLY",
        daerah: "Prov. Bangka Belitung",
        statusData: "Data Sudah Ada",
        anggaran: "276.231.446.500",
        realisasi: "291.500.615.959",
        persentase: "105,53"
      },
      {
        nomor: "X",
        data: "BITLY",
        daerah: "Prov. Lampung",
        statusData: "Data Sudah Ada",
        anggaran: "975.000.000.000",
        realisasi: "1.028.551.329.873",
        persentase: "105,49"
      },
      {
        nomor: "XI",
        data: "BITLY",
        daerah: "Prov. DKI Jakarta",
        statusData: "Data Sudah Ada",
        anggaran: "9.100.000.000.000",
        realisasi: "9.416.563.568.950",
        persentase: "103,48"
      },
      {
        nomor: "XII",
        data: "BITLY",
        daerah: "Prov. Jawa Barat",
        statusData: "Data Sudah Ada",
        anggaran: "9.006.038.416.156",
        realisasi: "9.201.226.492.084",
        persentase: "102,17"
      },
      {
        nomor: "XIII",
        data: "BITLY",
        daerah: "Prov. Banten",
        statusData: "Data Sudah Ada",
        anggaran: "3.244.480.437.000",
        realisasi: "3.328.533.786.800",
        persentase: "102,59"
      },
      {
        nomor: "XIV",
        data: "ETPD",
        daerah: "Prov. Jawa Tengah",
        statusData: "Data Sudah Ada",
        anggaran: "6.022.354.487.000",
        realisasi: "5.509.919.832.575",
        persentase: "91,49"
      },
      {
        nomor: "XV",
        data: "BITLY",
        daerah: "Prov. Daerah Istimewa Yogyakarta",
        statusData: "Data Sudah Ada",
        anggaran: "974.677.970.600",
        realisasi: "978.969.042.100",
        persentase: "100,44"
      },
      {
        nomor: "XVI",
        data: "BITLY",
        daerah: "Prov. Jawa Timur",
        statusData: "Data Sudah Ada",
        anggaran: "7.500.000.000.000",
        realisasi: "7.782.571.000.310",
        persentase: "103,77"
      },
      {
        nomor: "XVII",
        data: "ETPD",
        daerah: "Prov. Kalimantan Barat",
        statusData: "Data Sudah Ada",
        anggaran: "750.022.715.965",
        realisasi: "633.120.622.375",
        persentase: "84,41"
      },
      {
        nomor: "XVIII",
        data: "BITLY",
        daerah: "Prov. Kalimantan Tengah",
        statusData: "Data Sudah Ada",
        anggaran: "452.557.118.366",
        realisasi: "37.998.511.300",
        persentase: "8,40"
      },
      {
        nomor: "XIX",
        data: "BITLY",
        daerah: "Prov. Kalimantan Selatan",
        statusData: "Data Sudah Ada",
        anggaran: "825.000.000.000",
        realisasi: "845.229.310.635",
        persentase: "102,45"
      },
      {
        nomor: "XX",
        data: "ETPD",
        daerah: "Prov. Kalimantan Timur",
        statusData: "Data Sudah Ada",
        anggaran: "1.300.000.000.000",
        realisasi: "1.314.497.454.976",
        persentase: "101,12"
      },
      {
        nomor: "XXI",
        data: "BITLY",
        daerah: "Prov. Kalimantan Utara",
        statusData: "Data Sudah Ada",
        anggaran: "95.000.000.000",
        realisasi: "96.600.320.800",
        persentase: "101,68"
      },
      {
        nomor: "XXII",
        data: "ETPD",
        daerah: "Prov. Sulawesi Barat",
        statusData: "Data Sudah Ada",
        anggaran: "86.441.937.347",
        realisasi: "83.551.830.957",
        persentase: "96,66"
      },
      {
        nomor: "XXIII",
        data: "BITLY",
        daerah: "Prov. Sulawesi Utara",
        statusData: "Data Sudah Ada",
        anggaran: "420.000.000.000",
        realisasi: "387.851.874.524",
        persentase: "92,35"
      },
      {
        nomor: "XXIV",
        data: "ETPD",
        daerah: "Prov. Gorontalo",
        statusData: "Data Sudah Ada",
        anggaran: "148.960.709.724",
        realisasi: "109.371.900.217",
        persentase: "73,42"
      },
      {
        nomor: "XXV",
        data: "BITLY",
        daerah: "Prov. Sulawesi Tengah",
        statusData: "Data Sudah Ada",
        anggaran: "312.500.000.000",
        realisasi: "342.123.239.844",
        persentase: "109,48"
      },
      {
        nomor: "XXVI",
        data: "ETPD",
        daerah: "Prov. Sulawesi Selatan",
        statusData: "Data Sudah Ada",
        anggaran: "1.594.505.119.000",
        realisasi: "1.463.240.937.062",
        persentase: "91,77"
      },
      {
        nomor: "XXVII",
        data: "ETPD",
        daerah: "Prov.Sulawesi Tenggara",
        statusData: "Data Sudah Ada",
        anggaran: "305.622.345.000",
        realisasi: "305.622.345.000",
        persentase: "100"
      },
      {
        nomor: "XXVIII",
        data: "BITLY",
        daerah: "Prov. Bali",
        statusData: "Data Sudah Ada",
        anggaran: "1.495.870.827.460",
        realisasi: "1.732.461.333.000",
        persentase: "115,82"
      },
      {
        nomor: "XXIX",
        data: "BITLY",
        daerah: "Prov. Nusa Tenggara Barat",
        statusData: "Data Sudah Ada",
        anggaran: "540.218.000.000",
        realisasi: "543.721.817.346",
        persentase: "100,65"
      },
      {
        nomor: "XXX",
        data: "ETPD",
        daerah: "Prov. Nusa Tenggara Timur",
        statusData: "Data Sudah Ada",
        anggaran: "494.519.393.435",
        realisasi: "261.528.137.061",
        persentase: "52,89"
      },
      {
        nomor: "XXXI",
        data: "ETPD",
        daerah: "Prov. Maluku",
        statusData: "Data Sudah Ada",
        anggaran: "94.902.500.000",
        realisasi: "96.664.827.744",
        persentase: "101,86"
      },
      {
        nomor: "XXXII",
        data: "ETPD",
        daerah: "Prov. Maluku Utara",
        statusData: "Data Sudah Ada",
        anggaran: "70.883.148.200",
        realisasi: "68.917.402.222",
        persentase: "97,23"
      },
      {
        nomor: "XXXIII",
        data: "ETPD",
        daerah: "Prov. Papua",
        statusData: "Data Sudah Ada",
        anggaran: "122.237.528.000",
        realisasi: "470.994.239.964",
        persentase: "385,31"
      },
      {
        nomor: "XXXIV",
        data: "ETPD",
        daerah: "Prov. Papua Barat",
        statusData: "Data Sudah Ada",
        anggaran: "96.634.955.000",
        realisasi: "73.068.843.100",
        persentase: "75,61"
      },
      {
        nomor: "XXXV",
        data: "ETPD",
        daerah: "Prov. Papua Barat Daya",
        statusData: "Belum Isi Data",
        anggaran: "-",
        realisasi: "-",
        persentase: "-"
      },
      {
        nomor: "XXXII",
        data: "ETPD",
        daerah: "Prov. Papua Tengah",
        statusData: "Belum Isi Data",
        anggaran: "-",
        realisasi: "-",
        persentase: "-"
      },
      {
        nomor: "XXXI",
        data: "ETPD",
        daerah: "Prov. Papua Pegunungan",
        statusData: "Belum Isi Data",
        anggaran: "-",
        realisasi: "-",
        persentase: "-"
      },
      {
        nomor: "XXXII",
        data: "ETPD",
        daerah: "Prov. Papua Selatan",
        statusData: "Belum Isi Data",
        anggaran: "-",
        realisasi: "-",
        persentase: "-"
      },

      
      // Add more hardcoded leads as needed
    ];
    setLeads(hardcodedLeads);
  }, []);

  const deleteCurrentLead = (index) => {
    console.log(`Delete lead at index ${index}`);
    // Implement delete logic here
  };

  return (
    <>
      <TitleCard title="Data Provinsi" topMargin="mt-2" TopSideButtons={<TopSideButtons />}>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Nomor</th>
                <th>Data</th>
                <th>Daerah</th>
                <th>Status Data</th>
                <th>Anggaran</th>
                <th>Realisasi</th>
                <th>Persentase</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead, index) => (
                <tr key={index}>
                  <td>{lead.nomor}</td>
                  <td>{lead.data}</td>
                  <td>{lead.daerah}</td>
                  <td>{lead.statusData}</td>
                  <td>Rp {lead.anggaran}</td>
                  <td>Rp {lead.realisasi}</td>
                  <td>{lead.persentase}%</td>
                  {/* <td>
                    <button className="btn btn-square btn-ghost" onClick={() => deleteCurrentLead(index)}>
                      <TrashIcon className="w-5" />
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default Leads;
