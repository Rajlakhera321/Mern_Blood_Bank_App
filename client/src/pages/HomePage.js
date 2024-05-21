import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Spinner from "../components/shared/Spinner";
import { toast } from "react-toastify";
import Layout from '../components/shared/Layout/Layout';
import Modal from "../components/shared/modal/Modal"
import API from '../services/API';
import moment from "moment";

const HomePage = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);

  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/getInventoryDetails")
      if (data?.success) {
        setData(data?.details)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBloodRecords();
  }, []);
  return (
    <Layout>
      {error && <span>{toast(error)}</span>}
      {loading ? (<Spinner />) : (
        <>
          <div className='container'>
            <h4 className='ms-4' data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ cursor: 'pointer' }}>
              <i className='fa-solid fa-plus text-success py-4'></i>
              Add Inventory
            </h4>
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
                {data?.map(record => (
                  <tr key={record._id}>
                    <td>{record.bloodGroup}</td>
                    <td>{record.inventoryType}</td>
                    <td>{record.quantity}</td>
                    <td>{record.donarEmail}</td>
                    <td>{moment(record.createdAt).format('DD/MM/YYYY hh:mm A')}</td>
                  </tr>
                ))}

              </tbody>
            </table>
            <Modal />
          </div>
        </>
      )}
    </Layout>
  )
}

export default HomePage;