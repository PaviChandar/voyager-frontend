import React from "react";
import "../assets/hotelManagement.css"
import { useNavigate } from "react-router";
import { baseUrl } from "../shared/utils/Constants";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteHotel, getAllHotels } from "../action/action";
import Sidebar from "./Sidebar";
import { Table, Space } from 'antd';

const HotelManagement = () => {

    const navigate = useNavigate()
    const [success, setSuccess] = useState()
    const [hotel, setHotel] = useState([])
    const dispatch = useDispatch()
    const [hotelSource, setHotelSource] = useState([])

    const handleClick = () => {
        navigate('/admin/hotel/create')
    }

    const handleDelete = async (id) => {
        dispatch(deleteHotel(id))
        if (window.confirm("Are you sure to delete hotel?")) {
            setSuccess(true)
        }
    }

    const handleUpdate = (id) => {
        navigate(`/admin/hotel/update/${id}`)
    }

    useEffect(() => {
        axios
            .get(`${baseUrl}/hotels/`)
            .then((data) => {
                setHotel(() => (data.data))
            })
    }, [])

    useEffect(() => {
        if (success) {
            alert("Hotel deleted successfully")
            navigate('/admin')
        }
    }, [success])

    useEffect(() => {
        const dataSource = hotel.map((e) => {
            return ({
                "Hotel_ID": e._id,
                "Hotel Name": e.name,
                "City": e.city,
                "Address": e.address,
                "Rating": e.rating
            })
        })
        setHotelSource(dataSource)
    }, [hotel])

    const column = [
        {
            title: 'Hotel Name',
            dataIndex: 'Hotel Name',
            key: 'Hotel Name',
        },
        {
            title: 'City',
            dataIndex: 'City',
            key: 'City',
        },
        {
            title: 'Address',
            dataIndex: 'Address',
            key: 'Address',
        },
        {
            title: 'Rating',
            dataIndex: 'Rating',
            key: 'Rating',
        },
        {
            title: 'Action',
            key: 'Action',
            render: (_, data) => (
                <Space size="middle">
                    <button onClick={() => handleUpdate(data.Hotel_ID)} className="action">Update</button>
                    <button onClick={() => handleDelete(data.Hotel_ID)} className="action" >Delete</button>
                </Space>
            )
        },
    ];

    return (
        <div className="hotel">
            <h1>Available hotels</h1>
            <div className="hotelItem">
                {
                    column ? hotelSource && <Table columns={column} dataSource={hotelSource} /> : false
                }
                <button onClick={handleClick} className="buttonHotel">Create New Hotel</button>
                <button onClick={() => navigate('/admin')} className="backButton">Go Back</button>
            </div>
        </div>
    )
}

export default HotelManagement