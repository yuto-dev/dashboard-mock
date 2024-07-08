import DashboardStats from './components/DashboardStats'
import AmountStats from './components/AmountStats'
import PageStats from './components/PageStats'

import UserGroupIcon  from '@heroicons/react/24/outline/UserGroupIcon'
import UsersIcon  from '@heroicons/react/24/outline/UsersIcon'
import CircleStackIcon  from '@heroicons/react/24/outline/CircleStackIcon'
import CreditCardIcon  from '@heroicons/react/24/outline/CreditCardIcon'
import UserChannels from './components/UserChannels'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import BarChartJakarta from './components/BarChartJakarta'
import BarChartBali from './components/BarChartBali'
import BarChartYogyakarta from './components/BarChartYogyakarta'
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

    const [activeChart, setActiveChart] = useState('BarChart1');

    const renderActiveChart = () => {
      switch (activeChart) {
        case 'BarChartJakarta':
          return <BarChartJakarta />;
        case 'BarChartYogyakarta':
          return <BarChartYogyakarta />;
        case 'BarChartBali':
          return <BarChartBali />;
        default:
          return <BarChartJakarta />;
      }
    };

    return(
        <>
        {/** ---------------------- Select Period Content ------------------------- */}
            {/* <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod}/> */}

            <div className="dropdown mb-4">
              <label tabIndex={0} className="btn btn-white m-1">Provinsi</label>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a onClick={() => setActiveChart('BarChartJakarta')}>DKI Jakarta</a></li>
                <li><a onClick={() => setActiveChart('BarChartYogyakarta')}>Daerah Istimewa Yogyakarta</a></li>
                <li><a onClick={() => setActiveChart('BarChartBali')}>Bali</a></li>
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
            <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <LineChart />
                {renderActiveChart()}
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