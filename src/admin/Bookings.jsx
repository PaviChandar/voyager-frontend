import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Table } from "antd";
import axios from "axios";
import { useState } from "react";
import { baseUrl } from "../shared/utils/Constants";

const Bookings = () => {
    const [bookings, setBookings] = useState([])
    const [bookSource, setBookSource] = useState([])

    useEffect(() => {
        axios.
            get(`${baseUrl}/room/reserve/bookings`)
            .then((data) => {
                setBookings(() => (data.data))
            })
    }, [])

    useEffect(() => {
        const dataSource = bookings.map((e) => {
            return ({
                "Booking ID": e._id,
                "User Name": e.userName,
                "Hotel Name": e.hotelName
            })
        })
        setBookSource(dataSource)
    }, [bookings])


    const column = [
        {
            title: 'Booking ID',
            dataIndex: 'Booking ID',
            key: 'Booking ID',
        },
        {
            title: 'User Name',
            dataIndex: 'User Name',
            key: 'User Name',
        },
        {
            title: 'Hotel Name',
            dataIndex: 'Hotel Name',
            key: 'Hotel Name',
        },
    ]

    return (
        <div>
            {
                <Table columns={column} dataSource={bookSource} />
            }
        </div>
    )
}

export default Bookings