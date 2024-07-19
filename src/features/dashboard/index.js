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
import BarChart from './components/BarChart'
import DashboardTopBar from './components/DashboardTopBar'
import { useDispatch } from 'react-redux'
import {showNotification} from '../common/headerSlice'
import DoughnutChart from './components/DoughnutChart'
import { useState } from 'react'

const statsData = [
    {title : "Anggaran", value : "Rp 52T", icon : <UserGroupIcon className='w-8 h-8'/>, description : "Total anggaran PKB nasional"},
    {title : "Realisasi", value : "Rp 52.2T", icon : <CreditCardIcon className='w-8 h-8'/>, description : "Total anggaran PKB nasional"},
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
          case 'JKP123BarChart':
            return <JKP123BarChart />;
          case 'JKXP123BarChart':
            return <JKXP123BarChart />;
          default:
            return null;
        }
    };

    return(
        <>
        {/** ---------------------- Select Period Content ------------------------- */}
            {/* <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod}/> */}

            <div className="dropdown mb-4">
              <label tabIndex={0} className="btn btn-white m-1">Select Chart</label>
              <ul 
                tabIndex={0} 
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 h-60 overflow-y-scroll flex flex-row"
              >
                <li className="w-full block"><a onClick={() => setActiveChart('JKBarChart')}>JK Bar Chart</a></li>
                <li className="w-full block"><a onClick={() => setActiveChart('XP57BarChart')}>XP57 Bar Chart</a></li>
                <li className="w-full block"><a onClick={() => setActiveChart('BPBarChart')}>BP Bar Chart</a></li>
                <li className="w-full block"><a onClick={() => setActiveChart('KBBarChart')}>KB Bar Chart</a></li>
                <li className="w-full block"><a onClick={() => setActiveChart('XPR157BarChart')}>XPR157 Bar Chart</a></li>
                <li className="w-full block"><a onClick={() => setActiveChart('POOBarChart')}>POO Bar Chart</a></li>
                <li className="w-full block"><a onClick={() => setActiveChart('POORBarChart')}>POOR Bar Chart</a></li>
                <li className="w-full block"><a onClick={() => setActiveChart('JKP123BarChart')}>JKP123 Bar Chart</a></li>
                <li className="w-full block"><a onClick={() => setActiveChart('JKXP123BarChart')}>JKXP123 Bar Chart</a></li>
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

        {/** ---------------------- Different charts ------------------------- */}
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <BPBarChart/>
                <KBBarChart />
            </div>
        
        {/** ---------------------- Different charts ------------------------- */}
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <XPR157BarChart/>
                <KBBarChart />
            </div>

        {/** ---------------------- Different charts ------------------------- */}
        <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <POOBarChart/>
                <POORBarChart />
            </div>

        {/** ---------------------- Different charts ------------------------- */}
        <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                {/* 13 */}
                <JKP123BarChart/> 
                {/* 14 */}
                <JKXP123BarChart />
            </div>
        
        {/** ---------------------- Different charts ------------------------- */}
        <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                {/* 15 */}
                <JKPR123BarChart/>
                <JKXPR123BarChart />
                {/* 16 */}
            </div>
                    
        {/** ---------------------- Different stats content 2 ------------------------- */}
{/*         
            <div className="grid lg:grid-cols-2 mt-10 grid-cols-1 gap-6">
                <AmountStats />
                <PageStats />
            </div> */}

        {/** ---------------------- User source channels table  ------------------------- */}
        
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <UserChannels />
                <DoughnutChart />
            </div>
        </>
    )
}

export default Dashboard