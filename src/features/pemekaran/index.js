
import BermasalahTable from './components/BermasalahTable';

import { useDispatch } from 'react-redux'
import {showNotification} from '../common/headerSlice'
import { useState } from 'react'

function Pemekaran(){

    const dispatch = useDispatch()
 

    const updateDashboardPeriod = (newRange) => {
        // Dashboard range changed, write code to refresh your values
        dispatch(showNotification({message : `Period updated to ${newRange.startDate} to ${newRange.endDate}`, status : 1}))
    }

    const [activeChart, setActiveChart] = useState('JKBarChart');


    // const renderActiveChart = () => {
    //     switch (activeChart) {
    //       case 'JKBarChart':
    //         return <JKBarChart />;
    //       case 'XP57BarChart':
    //         return <XP57BarChart />;
    //       default:
    //         return null;
    //     }
    // };

    // const renderActiveTable = () => {
    //     switch (activeChart) {
    //       case 'JKBarChart':
    //         return <LineChart />;
    //       case 'XP57BarChart':
    //         return <LineChart />;
    //       default:
    //         return null;
    //     }
    // };

    // const renderActiveDetailTable = () => {
    //     switch (activeChart) {
    //       case 'JKBarChart':
    //         return <Table2 />;
    //       case 'XP57BarChart':
    //         return <Table3 />;
    //       default:
    //         return null;
    //     }
    // };

    

    return(
        <>
        {/** ---------------------- Select Period Content ------------------------- */}
            {/* <DashboardTopBar updateDashboardPeriod={updateDashboardPeriod}/> */}


        
        {/** ---------------------- Different stats content 1 ------------------------- */}

        {/** ---------------------- Different charts ------------------------- */}
            <div className="grid lg:grid-cols-1 mt-4 grid-cols-1 gap-6">
                <BermasalahTable />
            </div>


        {/** ---------------------- User source channels table  ------------------------- */}
      
        </>
    )
}

export default Pemekaran;