import React, { useEffect, useState } from 'react'
import Layout from '../../components/shared/Layout/Layout'
import API from '../../services/API';
import moment from 'moment';
import { useSelector } from 'react-redux';

const Organisation = () => {
    const [data, setData] = useState([]);
    const { user } = useSelector(state => state.auth);

    const getOrg = async () => {
        try {
            if (user?.role === 'donar') {
                const { data } = await API.get('/inventory/getOrganisations');
                if (data?.success) {
                    setData(data?.organisations);
                }
            }

            if (user?.role === 'hospital') {
                const { data } = await API.get('/inventory/getOrgForHospital');
                if (data?.success) {
                    setData(data?.hospitals);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getOrg();
    }, [user])

    return (
        <Layout>
            <div className='container mt-4'>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map(record => (
                        <tr key={record._id}>
                            <td>{record.organisationName}</td>
                            <td>{record.email}</td>
                            <td>{record.phone}</td>
                            <td>{record.address}</td>
                            <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                        </tr>
                    ))}

                </tbody>
            </table>
            </div>
        </Layout>
    )
}

export default Organisation