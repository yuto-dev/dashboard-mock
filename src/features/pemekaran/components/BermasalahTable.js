import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TitleCard from '../../../components/Cards/TitleCard';

const BMTable = () => {
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTableData = async () => {
            try {
                // Define the Uraian values, their corresponding endpoints, and keys
                const uraianValues = [
                    { uraian: 'Plat Lama Sebelum Pemekaran', endpoint: 'platbm', key: 'plat_bm' },
                    { uraian: 'Plat Khusus Daerah', endpoint: 'platbpserix', key: 'plat_bp_seri_x' },
                    { uraian: 'Tipe Kosong', endpoint: 'tipekosong', key: 'tipe_kosong' },
                    { uraian: 'Tipe Ada, Golkend Kosong', endpoint: 'tipegolkendkosong', key: 'tipe_ada_golkend_kosong' },
                    { uraian: 'No Plat Ganda', endpoint: 'noplatganda', key: 'no_plat_ganda' },
                    { uraian: 'No Chasis Ganda', endpoint: 'nochasisganda', key: 'no_chasis_ganda' },
                    { uraian: 'No Mesin Ganda', endpoint: 'nomesinganda', key: 'no_mesin_ganda' },
                ];

                // Fetch data from all endpoints
                const fetchedData = await Promise.all(
                    uraianValues.map(({ endpoint }) =>
                        axios.get(`http://localhost:3001/api/pemekaran/${endpoint}`)
                    )
                );

                // Prepare the table data
                const preparedData = uraianValues.map((uraian, index) => ({
                    nomor: index + 1,
                    uraian: uraian.uraian,
                    masaTunggakan: ['0-5 Tahun', '6-10 Tahun', '>10 Tahun', 'Total'],
                    jumlah: [
                        fetchedData[index].data[0]?.[uraian.key] ?? 0,
                        fetchedData[index].data[1]?.[uraian.key] ?? 0,
                        fetchedData[index].data[2]?.[uraian.key] ?? 0,
                        fetchedData[index].data[3]?.[uraian.key] ?? 0,
                    ]
                }));

                setTableData(preparedData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching table data:', error);
                setLoading(false);
            }
        };

        fetchTableData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <TitleCard title="Jumlah Kendaraan Bermotor Bermasalah Bapenda Pemerintah Provinsi Kepulauan Riau">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th className="py-2">Nomor</th>
                        <th className="py-2">Uraian</th>
                        <th className="py-2">Masa Tunggakan</th>
                        <th className="py-2">Jumlah</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, rowIndex) => (
                        <React.Fragment key={rowIndex}>
                            {row.masaTunggakan.map((masa, masaIndex) => (
                                <tr key={masaIndex} className={masa === 'Total' ? 'font-bold' : ''}>
                                    {masaIndex === 0 && (
                                        <>
                                            <td rowSpan={4} className="border px-4 py-2 font-bold">{row.nomor}</td>
                                            <td rowSpan={4} className="border px-4 py-2 font-bold">{row.uraian}</td>
                                        </>
                                    )}
                                    <td className="border px-4 py-2">{masa}</td>
                                    <td className="border px-4 py-2">{row.jumlah[masaIndex]}</td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </TitleCard>
    );
};

export default BMTable;
