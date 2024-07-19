import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Subtitle from '../../../components/Typography/Subtitle'
import { setPageTitle } from '../../common/headerSlice'

function RegulasiContent(){

    const dispatch = useDispatch()



    return(
        <>
            <article className="prose">
              <h1 className="">Regulasi</h1>


              {/* Introduction */}
              <h2 className="" id="getstarted1">Dasar Hukum Pertimbangan</h2>
              {/* <p>A free dashboard template using <span className='font-bold'>Daisy UI</span> and react js. With the help of Dasisy UI, it comes with <span className='font-bold'>fully customizable and themable CSS</span> and power of Tailwind CSS utility classes. We have also added <span className='font-bold'>redux toolkit</span>  and configured it for API calls and state management.</p> 
              <p>User authentication has been implemented using JWT token method (ofcourse you need backend API for generating and verifying token). This template can be used to start your next SaaS project or build new internal tools in your company.</p> */}
              <h4> Daftar Regulasi </h4>
              <ul>
                <li><a href="https://peraturan.bpk.go.id/Download/189520/UU%20Nomor%201%20Tahun%202022.pdf" target="_blank">Undang-Undang Nomor 1 Tahun 2022 tentang Hubungan Keuangan antara Pemerintah Pusat dan Pemerintah Daerah</a></li>
                <li><a href="https://peraturan.bpk.go.id/Download/308745/PP%20Nomor%2035%20Tahun%202023.pdf" target="_blank">Peraturan Pemerintah Nomor 35 Tahun 2023 tentang Ketentuan Umum Pajak Daerah dan Retribusi Daerah;</a></li>
                <li><a href="https://peraturan.bpk.go.id/Download/63411/Perpres_05_2015.pdf" target="_blank">Peraturan Presiden Nomor 5 Tahun 2015 tentang Penyelenggaraan SAMSAT;</a></li>
                <li><a href="https://peraturan.bpk.go.id/Download/298609/PERGUB%20NO.%201%20TAHUN%202023.pdf" target="_blank">Peraturan Daerah Provinsi tentang Dasar Pengenaan PKB dan BBNKB;</a></li>
                <li>
                  <p>Peraturan Kepala Daerah tentang:</p>
                  <ul>
                    <li><p>Dasar Pengenaan PKB</p></li>
                    <li><p>Dasar Pengenaan BBNKB</p></li>
                    <li><p>Opsen PKB dan OPSEN BBNKB</p></li>
                  </ul>
                </li>
              </ul>

              
              




        
            </article>
        </>
    )
}

export default RegulasiContent