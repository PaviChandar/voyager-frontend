import React from "react";
import { useNavigate } from "react-router";
import { useState } from 'react';
import { baseUrl } from '../shared/Constants';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { deleteRoom, getAllRooms } from '../action/action';
import axios from 'axios';


const RoomManagement = () => {
    const navigate = useNavigate(false)
    const [success, setSuccess] = useState()
    const [room, setRoom] = useState([])
   const dispatch = useDispatch()

    const handleCreate = () => {
        navigate('/admin/room/create')
    }

    const deleteHandler = async (id, hotelId) => {
        console.log("in delete")
        // dispatch(deleteRoom(id, hotelId))
        try {
            console.log("room:hotel: " , id,hotelId)
            await axios
                .delete(`${baseUrl}/room/${id}/${hotelId}`)
                .then(() => {
                    setSuccess(true)
                })
        } catch (err) {
            console.log("error", err)
        }
    }
    // dispatch(getAllRooms())

    useEffect(() => {
        // dispatch(getAllRooms())
        axios
        .get(`${baseUrl}/room/`)
        .then((data) => {
            setRoom(() => (data.data))
            console.log("DATA : ", data)
        })
    },[])

    useEffect(() => {
        if (success) { 
            alert("Room deleted successfully")
            navigate('/admin')
        }
    }, [success])

    return (
        <div>
            <h1>Available Rooms</h1>
            <button onClick={handleCreate}>Create New room</button>
                <table  className="table">
                    <th>
                        <tr>
                            <td><b>Room ID</b></td>
                            <td><b>Type</b></td>
                            <td><b>Minimum Price</b></td>
                            <td><b>Maximum people</b></td>
                        </tr>
                    </th>
                    <tbody>
                        {room.length && room.map(e => {
                            return (
                                <tr key={e.id}>
                                    <td>{e._id}</td>
                                    <td>{e.title}</td>
                                    <td>{e.price}</td>
                                    <td>{e.maxPeople}</td>
                                    <button className="roomDelete" 
                                    onClick={() => deleteHandler(e._id, e._hotelId)}
                                    >Delete</button>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

        </div>
    )
}

export default RoomManagement




