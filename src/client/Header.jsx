import React from "react";
import "../assets/header.css"
import { DatePicker, Space, Table } from 'antd';
import { useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { baseUrl } from "../shared/Constants";
import { Navigate, useLocation, useNavigate } from "react-router";
import { Button, Modal } from 'antd';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import jwtDecode from 'jwt-decode'
const moment = require('moment')
const { RangePicker } = DatePicker;



const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [selectedRooms, setSelectedRooms] = useState([])
    const [destination, setDestination] = useState("")
    const [open, setOpen] = useState(false)
    const [data, setData] = useState([])
    const [header, setHeader] = useState([])
    const [openDate, setOpenDate] = useState(false)
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ])
    const [hotelRoom, setHotelRoom] = useState()
    const hotelId = useParams()
    // const hotelData = axios.get(`${baseUrl}/hotels/room/${hotelId}`)
    // const token = jwtDecode(sessionStorage.getItem('user'))
    // const newData = axios.get(`${baseUrl}/hotels/find/${hotelId}`)
    function disabledDate(current) {
        return current && current < moment().endOf('day');
    }

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start)
        let dates = []

        while (date <= end) {
            dates.push(new Date(date).getTime())
            date.setDate(date.getDate() + 1)
        }
        return dates
    }

    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate)
    var isTrue = false;

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDate.some((date) => {
            date.forEach(element => {

                const newDate = new Date(element).getTime()
                if (alldates.includes(newDate)) {
                    isTrue = alldates.includes(newDate)
                    return false
                }

            });

            return isTrue
        }
        );
        return !isFound
    }

    const selectHandler = (e) => {
        const checked = e.target.checked
        const value = e.target.value
        setSelectedRooms(
            checked
                ? [...selectedRooms, value]
                : selectedRooms.filter((item) => item !== value))
    }

    useEffect(() => {
        if (destination === " ") {
            console.log("in dest")
            navigate('*')
        }
    })

    const searchHandler = (e) => {
        console.log("in search")
        e.preventDefault()
        axios
            .get(`${baseUrl}/hotels?city=${destination}`)
            .then((res) => {
                console.log("city hotel details : ", res.data)
                setData(res.data)
                console.log(data)
            })
            .catch((err) => {
                console.log("Error : ", err)
            })

        if (!destination) {
            alert("Please enter destination")
        }
    }

    const reserveHandler = async () => {
        try {
            console.log("roomName", data)
            // await axios.post(`${baseUrl}/room/reserve/bookings`, { userName: token.name, hotelName: newData.data.name, city: newData.data.city })
            await Promise.all(selectedRooms.map(roomId => {
                const res = axios.put(`${baseUrl}/room/availability/${roomId}`, { dates: alldates },).then(res => {
                    return res.data
                })
                    .catch(err => {
                        console.log("error", err)
                    })
            }));
            setOpen(false)
            alert("Rooms reserved for you!")
            navigate("/")
        } catch (err) {
        }
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = async (data) => {
        const hotelData = await axios
            .get(`${baseUrl}/hotels/room/${data.Hotel_ID}`)
            .then((res) => {
                console.log("AXIOS : ", res.data)
            })
            .catch((err) => {
                console.log("Error : ", err)
            })
        // console.log("AXIOS : ", hotelData)
        // setIsModalOpen(true);
        console.log("DATA : ", data)
    };

    useEffect(() => {
        console.log("data", data)
    }, [data])

    useEffect(() => {
        const dataSource = data.map((e) => {
            return ({
                "Hotel_ID": e._id,
                "Hotel Name": e.name,
                "Address": e.address,
                "Distance": e.distance,
                "Rating": e.rating,
                "Cheapest Price": e.cheapestPrice
            })
        })
        setHeader(dataSource)

        console.log("source data", dataSource)
    }, [data])

    const column = [
        {
            title: 'Hotel Name',
            dataIndex: 'Hotel Name',
            key: 'Hotel Name',
        },
        {
            title: 'Address',
            dataIndex: 'Address',
            key: 'Address',
        },
        {
            title: 'Distance',
            dataIndex: 'Distance',
            key: ' Distance',
        },
        {
            title: 'Rating',
            dataIndex: 'Rating',
            key: 'Rating',
        },
        {
            title: 'Cheapest Price',
            dataIndex: 'Cheapest Price',
            key: 'Cheapest Price',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, data) => (
                <>
                    <Button type="primary" onClick={() => showModal(data)}> Book Now</Button>
                    <Modal title="Basic Modal" open={isModalOpen} >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        {/* <span>Select your rooms:</span>
                {hotelData.map(item => (
                    <div className="reserveItem">
                        <div className="itemInfo">
                            <div className="reserveTitle">{item.title}</div>
                            <div className="reserveDescription">{item.desc}</div>
                            <div className="reservePeople">
                                Max people: <b>{item.maxPeople}</b></div>
                        </div>
                        <div className="selectRooms">
                            {item.roomNumbers.map(roomNumber => (
                                <div className="room">
                                    <label>{roomNumber.number}</label>
                                    <input type="checkbox" value={roomNumber._id} onChange={selectHandler}
                                        disabled={!isAvailable(roomNumber)} 
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ))} */}
                        <Button onClick={reserveHandler}>Reserve Now!</Button>
                    </Modal>
                </>
            )
        }
    ]

    return (
        <div className="header">
            {console.log(data)}
            <div className='headerContainer'>
                <div className='headerItem'>
                    <Space className='date' direction="vertical" size={12}>
                        <RangePicker
                            onChange={item => setDates([item.selection])}
                            disabledDate={disabledDate} />
                    </Space>
                </div>

                <div className='headerItem'>
                    <input type="text" onChange={(e) => setDestination(e.target.value)} placeholder='Enter destination' className='search' />
                </div>

                <div className='headerItem'>
                    <button className='headerButton' onClick={(e) => searchHandler(e)}>Search</button>
                </div>
            </div>
            <div className="table">
                <table>
                    <th>
                        <tr><b>Hotel Name</b></tr>
                        <tr><b>Address</b></tr>
                        <tr><b>Distance</b></tr>
                        <tr><b>Rating</b></tr>
                        <tr><b>Cheapest Price</b></tr>
                    </th>
                    <tbody>
                        {data.length && data.map(e => {
                            return (
                                <tr key={e._id}>
                                    <td><b>{e.name}</b></td>
                                    <td><b>{e.address}</b></td>
                                    <td><b>{e.distance}</b></td>
                                    <td><b>{e.rating}</b></td>
                                    <td><b>{e.cheapestPrice}</b></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                {
                    column ? header && <Table columns={column} dataSource={header} /> : false
                }
            </div>
        </div>



    )
}

export default Header