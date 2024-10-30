import DashboardStats from './components/DashboardStats'
import UserGroupIcon from '@heroicons/react/24/outline/UserGroupIcon'
import CircleStackIcon from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon from '@heroicons/react/24/outline/CreditCardIcon'
import { useState, useEffect } from 'react';
import FlexBarChart from './components/pkb/charts/flexBarChart'

const statsData = [
    { title: "Target", value: "Rp 52T", icon: <UserGroupIcon className='w-8 h-8' />, description: "Total target PKB nasional" },
    { title: "Realisasi", value: "Rp 52.2T", icon: <CreditCardIcon className='w-8 h-8' />, description: "Total realisasi PKB nasional" },
    { title: "Persentase Realisasi Pajak", value: "103%", icon: <CircleStackIcon className='w-8 h-8' />, description: "Persentase Realisasi PKB" },
    // { title: "Active Users", value: "5.6k", icon: <UsersIcon className='w-8 h-8' />, description: "↙ 300 (18%)" },
];

const chartOptions = [
    { value: '1', label: 'Jumlah Kendaraan Bermotor' },
    { value: '3', label: 'Jumlah Kendaraan Bermotor Yang Menunggak Selama 5 Tahun' },
    { value: '4', label: 'Jumlah Kendaraan Bermotor Yang Menunggak Selama 7 Tahun' },
    { value: '5', label: 'Jumlah Kendaraan Bermotor Yang Membayar Pajak Tahun Berjalan' },
    { value: '6', label: 'Jumlah Kendaraan Bermotor Baru' },
    { value: '7', label: 'Nominal Kendaraan Bermotor Yang Menunggak Selama 5 Tahun (Dalam Rupiah)' },
    { value: '8', label: 'Nominal Kendaraan Bermotor Yang Menunggak Selama 7 Tahun (Dalam Rupiah)' },
    { value: '9', label: 'Nominal Kendaraan Bermotor Yang Menunggak Selama 1 Tahun (Dalam Rupiah)' },
    { value: '10-1', label: 'Jumlah Kendaraan Bermotor Yang Membayar Pajak Secara Online' },
    { value: '10-2', label: 'Jumlah Kendaraan Bermotor Yang Membayar Pajak Secara Offline' },
    { value: '11-1', label: 'Nominal Kendaraan Bermotor Yang Membayar Pajak Secara Online (Dalam Rupiah)' },
    { value: '11-2', label: 'Nominal Kendaraan Bermotor Yang Membayar Pajak Secara Offline (Dalam Rupiah)' },
    { value: '12-1', label: 'Jumlah Kendaraan Bermotor 1 Tahun Sebelum' },
    { value: '12-2', label: 'Jumlah Kendaraan Bermotor 2 Tahun Sebelum' },
    { value: '12-3', label: 'Jumlah Kendaraan Bermotor 3 Tahun Sebelum' },
    { value: '13-1', label: 'Jumlah Kendaraan Bermotor Yang Membayar 1 Tahun Sebelum' },
    { value: '13-2', label: 'Jumlah Kendaraan Bermotor Yang Membayar 2 Tahun Sebelum' },
    { value: '13-3', label: 'Jumlah Kendaraan Bermotor Yang Membayar 3 Tahun Sebelum' },
    { value: '14-1', label: 'Jumlah Kendaraan Bermotor Yang Tidak Membayar 1 Tahun Sebelum' },
    { value: '14-2', label: 'Jumlah Kendaraan Bermotor Yang Tidak Membayar 2 Tahun Sebelum' },
    { value: '14-3', label: 'Jumlah Kendaraan Bermotor Yang Tidak Membayar 3 Tahun Sebelum' },
    { value: '15-1', label: 'Nominal Kendaraan Bermotor Yang Membayar 1 Tahun Sebelum (Dalam Rupiah)' },
    { value: '15-2', label: 'Nominal Kendaraan Bermotor Yang Membayar 2 Tahun Sebelum (Dalam Rupiah)' },
    { value: '15-3', label: 'Nominal Kendaraan Bermotor Yang Membayar 3 Tahun Sebelum (Dalam Rupiah)' },
    { value: '16-1', label: 'Nominal Kendaraan Bermotor Yang Tidak Membayar 1 Tahun Sebelum (Dalam Rupiah)' },
    { value: '16-2', label: 'Nominal Kendaraan Bermotor Yang Tidak Membayar 2 Tahun Sebelum (Dalam Rupiah)' },
    { value: '16-3', label: 'Nominal Kendaraan Bermotor Yang Tidak Membayar 3 Tahun Sebelum (Dalam Rupiah)' },
];

function Dashboard() {
    const [selectedChart, setSelectedChart] = useState('1'); // State for the selected chart
    const [chartLabel, setChartLabel] = useState('Jumlah Kendaraan Bermotor'); // State for the selected chart's label
    const [provinces, setProvinces] = useState([]); // State for province options
    const [kodeProp, setKodeProp] = useState('0'); // State for selected province code
    const [kabupatens, setKabupatens] = useState([]); // State for kabupaten options
    const [kodeKab, setKodeKab] = useState('0'); // State for selected kabupaten code
    const apiUrl = process.env.REACT_APP_API_URL;
    const handleDropdownChange = (event) => {
        const selectedOption = chartOptions.find(option => option.value === event.target.value);
        setSelectedChart(selectedOption.value); // Update selected chart based on dropdown
        setChartLabel(selectedOption.label); // Update the label for the selected chart
    };
    
    const handleProvinceChange = (event) => {
        const selectedKodeProp = event.target.value;
        setKodeProp(selectedKodeProp); // Update selected province code
        setKodeKab('0'); // Reset kabupaten code when province changes
        if (selectedKodeProp === '0') {
            setKabupatens([]); // Clear kabupaten options if national level is selected
        } else {
            fetchKabupatens(selectedKodeProp); // Fetch kabupatens based on selected province
        }
    };

    const handleKabupatenChange = (event) => {
        setKodeKab(event.target.value); // Update selected kabupaten code
    };

    // Fetch list of provinces from the API
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await fetch(`${apiUrl}/api/provinces`);
                const data = await response.json();
                setProvinces(data); // Set the provinces state with the fetched data
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };

        fetchProvinces();
    }, []);

    // Fetch list of kabupatens based on selected province
    const fetchKabupatens = async (kodeProp) => {
        try {
            const response = await fetch(`${apiUrl}/api/kabupaten/${kodeProp}`);
            const data = await response.json();
            setKabupatens(data); // Set the kabupatens state with the fetched data
        } catch (error) {
            console.error('Error fetching kabupatens:', error);
        }
    };

    // Inline styles for dropdown container
    const containerStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '10px', // Space between dropdowns
        marginBottom: '1rem', // Margin below the dropdowns
        marginTop: '1rem',
    };

    return (
        <>
            {/** ---------------------- Different stats content 1 ------------------------- */}
            <div className="grid lg:grid-cols-3 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
                {
                    statsData.map((d, k) => {
                        return (
                            <DashboardStats key={k} {...d} colorIndex={k} />
                        )
                    })
                }
            </div>

            {/* Dropdown menu to select chart, province, and kabupaten */}
            <div style={containerStyle}>
                <div>
                    <label htmlFor="chartSelect" className="block mt-2 mb-2 text-sm font-medium text-gray-700">Pilih Chart:</label>
                    <select
                        id="chartSelect"
                        className="input input-bordered w-72"
                        onChange={handleDropdownChange}
                        value={selectedChart}
                        label={chartLabel}
                    >
                        {chartOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.value} {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="provinceSelect" className="block mt-2 mb-2 text-sm font-medium text-gray-700">Pilih Provinsi:</label>
                    <select
                        id="provinceSelect"
                        className="input input-bordered w-72"
                        onChange={handleProvinceChange}
                        value={kodeProp}
                    >
                        <option value="0">Tingkat Nasional</option>
                        {provinces.map(province => (
                            <option key={province.kode_prop} value={province.kode_prop}>
                                {province.nama_daerah}
                            </option>
                        ))}
                    </select>
                </div>

                {kodeProp !== '0' && (
                    <div>
                        <label htmlFor="kabupatenSelect" className="block mb-2 text-sm font-medium text-gray-700">Pilih Kabupaten:</label>
                        <select
                            id="kabupatenSelect"
                            className="input input-bordered w-72"
                            onChange={handleKabupatenChange}
                            value={kodeKab}
                        >
                            <option value="0">Semua Kabupaten/Kota</option>
                            {kabupatens.map(kabupaten => (
                                <option key={kabupaten.kode_kab} value={kabupaten.kode_kab}>
                                    {kabupaten.nama_daerah}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* Display the selected chart based on the dropdown value */}
            <div>
                {selectedChart && (
                    <FlexBarChart kode_chart={selectedChart} kode_prop={kodeProp} kode_kab={kodeKab} chartLabel={chartLabel} />
                )}
            </div>
        </>
    );
}

export default Dashboard;
