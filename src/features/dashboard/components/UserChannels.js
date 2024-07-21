import TitleCard from "../../../components/Cards/TitleCard"

const userSourceData = [
    {source : "DKI Jakarta", count : "9,416", conversionPercent : 103.48},
    {source : "Jawa Barat", count : "9,201", conversionPercent : 102.17},
    {source : "Riau", count : "1,592", conversionPercent : 115.89},
    {source : "Bali", count : "1,732", conversionPercent : 115.82},
    {source : "Jawa Timur", count : "7,782", conversionPercent : 103.77},
]

const getPaymentStatus = (status) => {
    if(status  === "Paid")return <div className="badge badge-success">{status}</div>
    if(status  === "Pending")return <div className="badge badge-error">{status}</div>
    else return <div className="badge badge-ghost">{status}</div>
}

function UserChannels(){
    return(
        <TitleCard title={"Data Provinsi"}>
             {/** Table Data */}
             <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th></th>
                        <th className="normal-case">Provinsi</th>
                        <th className="normal-case">Realisasi Pajak(Triliunan Rupiah)</th>
                        <th className="normal-case">Persentase</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            userSourceData.map((u, k) => {
                                return(
                                    <tr key={k}>
                                        <th>{k+1}</th>
                                        <td>{u.source}</td>
                                        <td>{u.count}</td>
                                        <td>{`${u.conversionPercent}%`}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </TitleCard>
    )
}

export default UserChannels