import React from "react";
import "../assets/header.css"
import { DatePicker, Space, Table, Tooltip } from 'antd';
import { AppstoreFilled } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../shared/utils/Constants";
import {  useNavigate } from "react-router";
import { Button, Modal } from 'antd';
import { useEffect } from "react";
import jwtDecode from 'jwt-decode'
const moment = require('moment')
const { RangePicker } = DatePicker;

const Header = () => {
    const navigate = useNavigate()
    const [selectedRooms, setSelectedRooms] = useState([])
    const [destination, setDestination] = useState("")
    const [data, setData] = useState([])
    const [header, setHeader] = useState([])
    const [roomList, setRoomList] = useState([])
    const [hotelId, setHotelId] = useState("")
    const [oldDates, setOldDates] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ])

    if (sessionStorage.getItem('token')) {
        var token = jwtDecode(sessionStorage.getItem('token'))
    }

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


    useEffect(() => {
        console.log("range", oldDates)
    }, [oldDates])

    const alldates = getDatesInRange(oldDates[0], oldDates[1])
    var isTrue = false;

    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDate.some((date) => {
            date.forEach(element => {
                const newDate = new Date(element).getTime()
                if (alldates.includes(newDate)) {
                    isTrue = alldates.includes(newDate)
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
            navigate('*')
        }
    })

    const searchHandler = (e) => {
        e.preventDefault()
        axios
            .get(`${baseUrl}/hotels?city=${destination}`)
            .then((res) => {
                setData(res.data)
                setHotelId(res.data._id)
            })
            .catch((err) => {
                console.log("Error : ", err)
            })

        if (!destination) {
            alert("Please enter destination")
        }
    }

    const reserveHandler = async () => {
        await axios.get(`${baseUrl}/hotels/find/${hotelId}`)
            .then(async (res) => {
                await axios.post(`${baseUrl}/room/reserve/bookings`, { userName: token.name, hotelName: res.data.name, city: res.data.city })
                    .then(async (res) => {
                        return res.data
                    })
                    .catch((err) => {
                        console.log("ERROR : ", err)
                    })
            })
            .catch(err => {
                console.log("error", err)
            })
        await Promise.all(selectedRooms.map(roomId => {
            const res = axios.put(`${baseUrl}/room/availability/${roomId}`, { dates: alldates },)
                .then((res) => {
                    return res.data
                })
                .catch(err => {
                    console.log("error", err)
                })
        }));
        alert("Rooms reserved!")
        navigate("/")

    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = async (data) => {
        setHotelId(data)
        const hotelData = await axios
            .get(`${baseUrl}/hotels/room/${data}`)
            .then((res) => {
                setRoomList(res.data)
            })
            .catch((err) => {
                console.log("Error : ", err)
            })

        roomList.length !== 0 && setIsModalOpen(true)
    };

    useEffect(() => {
        console.log("roomList", roomList)
    }, [roomList])

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
                    <Tooltip title="The price will vary based on selected rooms">
                        <AppstoreFilled />
                    </Tooltip>
                    <Button onClick={() => showModal(data.Hotel_ID)}> Book Now</Button>
                    <Modal title="Basic Modal" open={isModalOpen} onCancel={() => setIsModalOpen(false)} >
                        <span>Select your rooms:</span>
                        {roomList && roomList.map(item => (

                            <div className="reserveItem">
                                <div className="itemInfo">
                                    <div>{item.title}</div>
                                    <div>{item.desc}</div>
                                    <div>
                                        Max people: <b>{item.maxPeople}</b></div>
                                </div>
                                <div className="selectRooms">
                                    {item.roomNumbers && item.roomNumbers.map(roomNumber => (
                                        <div className="room">
                                            <label>{roomNumber.number}</label>
                                            <input type="checkbox" value={roomNumber._id} onChange={selectHandler}
                                                disabled={!isAvailable(roomNumber)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                        ))
                        }
                        <Button
                            onClick={() => reserveHandler()}
                        >Reserve Now!</Button>

                    </Modal>
                </>
            )
        }
    ]

    return (
        <div className="header">
            <div className='headerContainer'>
                <div className='headerItem'>
                    <Space className='date' direction="vertical" size={12}>
                        <RangePicker
                            onChange={item => setOldDates([item[0]._d, item[1]._d])}
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
            {
                column ? header && <Table columns={column} dataSource={header} /> : false
            }
        </div>
    )
}

export default Header;