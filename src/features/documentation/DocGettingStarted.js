import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import { setPageTitle, showNotification } from "../common/headerSlice"
import GettingStartedNav from "./components/GettingStartedNav"
import ReadMe from "./components/GettingStartedContent"
import GettingStartedContent from "./components/GettingStartedContent"
import RegulasiContent from "./components/RegulasiContent"



function GettingStarted(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Regulasi"}))
      }, [])


    return(
        <>
            <div className="bg-base-100  flex overflow-hidden  rounded-lg" style={{height : "82vh"}}>
                    {/* <div className="flex-none p-4">
                        <GettingStartedNav activeIndex={1}/>
                    </div> */}

                    <div className="flex justify-center grow pt-16 overflow-y-scroll">
                        <RegulasiContent />
                    </div>

                </div>
           
        </>
    )
}

export default GettingStarted