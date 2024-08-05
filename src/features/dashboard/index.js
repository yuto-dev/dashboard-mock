import DashboardStats from './components/DashboardStats'
import AmountStats from './components/AmountStats'
import PageStats from './components/PageStats'
import DynamicBarChart from './components/DynamicBarChart';
import PKBBarChart from './components/PKBBarChart';
import UserGroupIcon  from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon  from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon  from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon  from '@heroicons/react/24/outline/CreditCardIcon'
import UserChannels from './components/UserChannels'
import LineChart from './components/LineChart'

import JKBarChart from './components/pkb/charts/2JK'
import XP57BarChart from './components/pkb/charts/3XP57'
import BPBarChart from './components/pkb/charts/5BP'
import KBBarChart from './components/pkb/charts/6KB'
import XPR157BarChart from './components/pkb/charts/7XPR157';
import POOBarChart from './components/pkb/charts/10POO';
import POORBarChart from './components/pkb/charts/11POOR';
import JK123BarChart from './components/pkb/charts/12JK123';
import JKP123BarChart from './components/pkb/charts/13JKP123';
import JKXP123BarChart from './components/pkb/charts/14JKXP123';
import JKPR123BarChart from './components/pkb/charts/15JKPR123';
import JKXPR123BarChart from './components/pkb/charts/16JKXPR123';
import AdditionalChart from './components/pkb/charts/additional';
import AdditionalChartRupiah from './components/pkb/charts/additionalRupiah';

import Selisih13 from './components/pkb/tables/selisih/Selisih13';
import Selisih15 from './components/pkb/tables/selisih/Selisih15';

import Table2 from './components/pkb/tables/detail/Table2';
import Table3 from './components/pkb/tables/detail/Table3';
import Table5 from './components/pkb/tables/detail/Table5';
import Table6 from './components/pkb/tables/detail/Table6';
import Table7 from './components/pkb/tables/detail/Table7';
import Table10 from './components/pkb/tables/detail/Table10';
import Table11 from './components/pkb/tables/detail/Table11';
import Table12 from './components/pkb/tables/detail/Table12';
import Table13 from './components/pkb/tables/detail/Table13';
import Table14 from './components/pkb/tables/detail/Table14';
import Table15 from './components/pkb/tables/detail/Table15';
import Table16 from './components/pkb/tables/detail/Table16';

import BarChart from './components/BarChart'
import DashboardTopBar from './components/DashboardTopBar'
import { useDispatch } from 'react-redux'
import {showNotification} from '../common/headerSlice'
import DoughnutChart from './components/DoughnutChart'
import { useState } from 'react'

const statsData = [
    {title : "Target", value : "Rp 52T", icon : <UserGroupIcon className='w-8 h-8'/>, description : "Total target PKB nasional"},
    {title : "Realisasi", value : "Rp 52.2T", icon : <CreditCardIcon className='w-8 h-8'/>, description : "Total realisasi PKB nasional"},
    {title : "Persentase Realisasi Pajak", value : "103%", icon : <CircleStackIcon className='w-8 h-8'/>, description : "Persentase Realisasi PKB"},
    // {title : "Active Users", value : "5.6k", icon : <UsersIcon className='w-8 h-8'/>, description : "↙ 300 (18%)"},
]



function Dashboard(){

    const dispatch = useDispatch()
 

    const updateDashboardPeriod = (newRange) => {
        // Dashboard range changed, write code to refresh your values
        dispatch(showNotification({message : `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status : 1}))
    }

    const [activeChart, setActiveChart] = useState('JKBarChart');

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

    const renderActiveChart = () => {
        switch (activeChart) {
          case 'JKBarChart':
            return <JKBarChart />;
          case 'XP57BarChart':
            return <XP57BarChart />;
          case 'BPBarChart':
            return <BPBarChart />;
          case 'KBBarChart':
            return <KBBarChart />;
          case 'XPR157BarChart':
            return <XPR157BarChart />;
          case 'POOBarChart':
            return <POOBarChart />;
          case 'POORBarChart':
            return <POORBarChart />;
          case 'JK123BarChart':
            return <JK123BarChart />;
          case 'JKP123BarChart':
            return <JKP123BarChart />;
          case 'JKXP123BarChart':
            return <JKXP123BarChart />;
          case 'JKPR123BarChart':
            return <JKPR123BarChart />;
          case 'JKXPR123BarChart':
            return <JKXPR123BarChart />;
          case 'additionalChart':
            return <AdditionalChart />;
          case 'additionalChartRupiah':
            return <AdditionalChartRupiah />;
          default:
            return null;
        }
    };

    const renderActiveTable = () => {
        switch (activeChart) {
          case 'JKBarChart':
            return <LineChart />;
          case 'XP57BarChart':
            return <LineChart />;
          case 'BPBarChart':
            return <LineChart />;
          case 'KBBarChart':
            return <LineChart />;
          case 'XPR157BarChart':
            return <LineChart />;
          case 'POOBarChart':
            return <LineChart />;
          case 'POORBarChart':
            return <LineChart />;
          case 'JK123BarChart':
            return <LineChart />;
        // 13
          case 'JKP123BarChart':
            return <Selisih13 />;
        // 14
          case 'JKXP123BarChart':
            return <Selisih13 />;
        // 15
          case 'JKPR123BarChart':
            return <Selisih15 />;
        // 16
          case 'JKXPR123BarChart':
            return <Selisih15 />;
          case 'additionalChart':
              return <Table2 />;
          case 'additionalChartRupiah':
              return <Table2 />;
          default:
            return null;
        }
    };

    const renderActiveDetailTable = () => {
        switch (activeChart) {
          case 'JKBarChart':
            return <Table2 />;
          case 'XP57BarChart':
            return <Table3 />;
          case 'BPBarChart':
            return <Table5 />;
          case 'KBBarChart':
            return <Table6 />;
          case 'XPR157BarChart':
            return <Table7 />;
          case 'POOBarChart':
            return <Table10 />;
          case 'POORBarChart':
            return <Table11 />;
          case 'JK123BarChart':
            return <Table12 />;
        // 13
          case 'JKP123BarChart':
            return <Table13 />;
        // 14
          case 'JKXP123BarChart':
            return <Table14 />;
        // 15
          case 'JKPR123BarChart':
            return <Table15 />;
        // 16
          case 'JKXPR123BarChart':
            return <Table16 />;
          case 'additionalChart':
            return <Table2 />;
          case 'additionalChartRupiah':
            return <Table2 />;
          default:
            return null;
        }
    };

    

    return(
        <>
        {/** ---------------------- Select Period Content ------------------------- */}
            {/* <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod}/> */}

            <div className="dropdown mb-4">
              <label tabIndex={0} className="btn btn-white m-1">Pilih Bagan</label>
              <ul 
                tabIndex={0} 
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 h-60 overflow-y-scroll flex flex-row"
              >
                <li className="w-full block"><a onClick={() => setActiveChart('JKBarChart')}>2. Jumlah Kendaraan per Tipe</a></li>
                <li className="w-full block"><a onClick={() => setActiveChart('XP57BarChart')}>3. Jumlah Kendaraan yang Tidak Membayar Pajak (5 Tahun dan 7 Tahun)</a></li>
                <li className="w-full block"><a onClick={() => setActiveChart('BPBarChart')}>5. Jumlah Kendaraan Bermotor Yang Membayar Pajak Tahun Berjalan</a></li>
                <li className="w-full block"><a onClick={() => setActiveChart('KBBarChart')}>6. Jumlah Kendaraan Baru 2024</a></li>
                <li className="w-full block"><a onClick={() => setActiveChart('XPR157BarChart')}>7. Jumlah Kendaraan yang Tidak Membayar Pajak 1, 5, dan 7 Tahun (Dalam Rupiah)</a></li>
                <li className="w-full block"><a onClick={() => setActiveChart('POOBarChart')}>10. Jumlah Pembayaran per Metode</a></li>
                <li className="w-full block"><a onClick={() => setActiveChart('POORBarChart')}>11. Jumlah Pembayaran per Metode (Dalam Rupiah)</a></li>
                <li className="w-full block"><a onClick={() => setActiveChart('JK123BarChart')}>12. Jumlah Kendaraan 2023, 2022, dan 2021</a></li>
                <li className="w-full block"><a onClick={() => setActiveChart('JKP123BarChart')}>13. Jumlah Kendaraan Bermotor yang Membayar Pajak 1,2 dan 3 Tahun Sebelum per Tipe</a></li>
                <li className="w-full block"><a onClick={() => setActiveChart('JKXP123BarChart')}>14. Jumlah Kendaraan Bermotor yang Tidak Membayar Pajak 1,2 dan 3 Tahun Sebelum per Tipe</a></li>
                <li className="w-full block"><a onClick={() => setActiveChart('JKPR123BarChart')}>15. Jumlah Kendaraan Bermotor yang Membayar Pajak 1,2 dan 3 Tahun Sebelum per Tipe (Dalam Rupiah)</a></li>
                <li className="w-full block"><a onClick={() => setActiveChart('JKXPR123BarChart')}>16. Jumlah Kendaraan Bermotor yang Tidak Membayar Pajak 1,2 dan 3 Tahun Sebelum per Tipe (Dalam Rupiah)</a></li>
                <li className="w-full block"><a onClick={() => setActiveChart('additionalChart')}>Jumlah Kendaraan Bermotor Yang Tidak Membayar Pajak</a></li>
                <li className="w-full block"><a onClick={() => setActiveChart('additionalChartRupiah')}>Nilai Kendaraan Bermotor Yang Tidak Membayar Pajak (Dalam Rupiah)</a></li>
              </ul>
            </div>
        
        {/** ---------------------- Different stats content 1 ------------------------- */}
            <div className="grid lg:grid-cols-3 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
                {
                    statsData.map((d, k) => {
                        return (
                            <DashboardStats key={k} {...d} colorIndex={k}/>
                        )
                    })
                }
            </div>

        {/** ---------------------- Different charts ------------------------- */}
            <div className="grid lg:grid-cols-1 mt-4 grid-cols-1 gap-6">
                {renderActiveChart()}
            </div>


        {/** ---------------------- User source channels table  ------------------------- */}
        
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                {renderActiveTable()}
                <DoughnutChart />
            </div>

            <div className="grid lg:grid-cols-1 mt-4 grid-cols-1 gap-6">
                {renderActiveDetailTable()}
            </div>
        </>
    )
}

export default Dashboard