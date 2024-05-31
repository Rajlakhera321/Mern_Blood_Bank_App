import React, { useEffect, useState } from 'react';
import Header from '../../components/shared/Layout/Header';
import API from '../../services/API';
import moment from 'moment';

const Analytics = () => {
    const [data, setData] = useState([]);
    const [inventoryData, setInventory] = useState([]);
    const colors = ["#884A39", "#C38154", "#FFC26F", "#4F709C", "#4942E4", "#0079FF", "#FF0060", "#22A699"];

    const getBloodGroupData = async () => {
        try {
            const { data } = await API.get('/analytics/bloodDetailsData');
            if (data?.success) {
                setData(data?.bloodGroupData);
                console.log(data);
            }
        } catch (error) {

        }
    }
    useEffect(() => {
        getBloodGroupData();
    }, [])

    const getBloodRecords = async () => {
        try {
            const { data } = await API.get("/inventory/getRecentInventory")
            if (data?.success) {
                setInventory(data?.inventory)
                console.log(data,"data is here now");
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBloodRecords();
    }, []);
    return (
        <>
            <Header />
            <div className="d-flex flex-row flex-wrap">
                {data.map((record, i) => (
                    <div className="card m-2 p-1" key={i} style={{ width: '18rem', backgroundColor: `${colors[i]}` }}>
                        <div className="card-body">
                            <h1 className="card-title bg-light text-dark text-center">{record.bloodGroup}</h1>
                            <p className="card-text">
                                Total In: <b>{record.totalIn}</b> (ML)
                            </p>
                            <p className="card-text">
                                Total Out: <b>{record.totalOut}</b> (ML)
                            </p>
                        </div>
                        <div className="card-footer text-light bg-dark text-center">
                            Total available: <b>{record.availableBlood}</b> (ML)
                        </div>
                    </div>

                ))}
            </div>
            <div className='container my-3'>
                <h1 className='my-3'>Recent Blood Transactions</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Blood Group</th>
                            <th scope="col">Inventory Type</th>
                            <th scope="col">Quantity (ML)</th>
                            <th scope="col">Donar Email</th>
                            <th scope="col">Time & Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryData?.map(record => (
                            <tr key={record._id}>
                                <td>{record.bloodGroup}</td>
                                <td>{record.inventoryType}</td>
                                <td>{record.quantity}</td>
                                <td>{record.email}</td>
                                <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Analytics