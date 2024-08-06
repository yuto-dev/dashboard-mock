import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Pemekaran from '../../features/pemekaran'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Pemekaran Kepulauan Riau"}))
      }, [])


    return(
        <Pemekaran />
    )
}

export default InternalPage