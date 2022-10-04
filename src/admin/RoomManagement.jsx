import React from "react";
import "../assets/roomManagement.css"
import { useNavigate } from "react-router";
import { useState } from 'react';
import { baseUrl } from '../shared/utils/Constants';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteRoom } from '../action/action';
import axios from 'axios';
import { Space, Table } from 'antd';


const RoomManagement = () => {
    const navigate = useNavigate(false)
    const [success, setSuccess] = useState()
    const [room, setRoom] = useState([])
    const dispatch = useDispatch()
    const [dataSour, setdataSour] = useState([])

    const handleCreate = () => {
        navigate('/admin/room/create')
    }

    const deleteHandler = async (id, hotelId) => {
        dispatch(deleteRoom(id, hotelId))
    }
    useEffect(() => {
        axios
            .get(`${baseUrl}/room/`)
            .then((data) => {
                setRoom(() => (data.data))
            })
    }, [])

    useEffect(() => {
        if (success) {
            alert("Room deleted successfully")
            navigate('/admin')
        }
    }, [success])

    useEffect(() => {
        const dataSource = room.map((data) => {
            return ({
                "Room_ID": data._id,
                "Type": data.title,
                "Minimum Price": data.price,
                "Maximum People": data.maxPeople
            })
        })
        setdataSour(dataSource)

    }, [room])

    const column = [
        {
            title: 'Type',
            dataIndex: 'Type',
            key: 'Type',
        },
        {
            title: 'Minimum Price',
            dataIndex: 'Minimum Price',
            key: 'Minimum Price',
        },
        {
            title: 'Maximum People',
            dataIndex: 'Maximum People',
            key: 'Maximum People',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, data) => (
                <Space size="middle">
                    <button className="action" onClick={() => navigate(`/admin/room/update/${data.Room_ID}`)}>Update</button>
                    <button onClick={() => deleteHandler(data.Room_ID, data.hotelId)} className="action">Delete</button>
                </Space>
            )
        },
    ]

    return (
        <div>
            <h1>Available Rooms</h1>
            {
                column ? dataSour && <Table columns={column} dataSource={dataSour} /> : false
            }
            <button onClick={handleCreate} className="buttonHotel">Create New room</button>
            <button onClick={() => navigate('/admin')} className="backButton">Go Back</button>
        </div>
    )
}

export default RoomManagement




