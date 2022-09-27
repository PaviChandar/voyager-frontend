import React, { useEffect } from "react";
import "../assets/newRoom.css"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getAllHotels, registerRoom } from "../action/action";
import { baseUrl } from "../shared/Constants";
import axios from "axios";

const NewRoom = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [hotels, setHotel] = useState([])
    const [hotelId, setHotelId] = useState(undefined);
    const [rooms, setRooms] = useState([]);
    const [success, setSuccess] = useState(false)
    const [credentials, setCredentials] = useState({
        title: '',
        price: '',
        maxPeople: '',
        desc: '',
        roomNumbers: []

    })

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleCreate = async (e) => {
        e.preventDefault();
        const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
        console.log("room numbers : ", roomNumbers)

        try {
            await axios
                .post(`${baseUrl}/room/${hotelId}`, { ...credentials, roomNumbers })
                .then(() => {
                    setSuccess(true)
                })
        } catch (err) {
            console.log(err);
        }

        dispatch(registerRoom(hotelId, credentials))
        // console.log("CREATE ROOM : ", credentials, hotelId)
        // setSuccess(true)
    }

    useEffect(() => {
        axios
        .get(`${baseUrl}/hotels/`)
        .then((data) => {
            setHotel(() => (data.data))
            // console.log("data : ", data)
        })
        if (success) {
            alert("Room created successfully")
            navigate('/admin')
        }
    },[])

    return (
        <div className="newRoomContainer">
            <h1>Create New Room</h1>
            <div className="newRoomItems">
                <input type="text" name="title" value={credentials.title} onChange={(e) => handleChange(e)} placeholder="title" />
                <input type="number" name="price" value={credentials.price} onChange={(e) => handleChange(e)} min="0" placeholder="price" />
                <input type="text" name="maxPeople" value={credentials.maxPeople} onChange={(e) => handleChange(e)} placeholder="maximum people" />
                <input type="text" name="desc" value={credentials.description} onChange={(e) => handleChange(e)} placeholder="description" />
                <label>Rooms</label>
                <input type="textarea" name="roomNumbers" onChange={(e) => setRooms(e.target.value)} placeholder="enter room numbers" />
                <label>Choose a hotel</label>
                <select id="hotelId"
                    onChange={(e) => setHotelId(e.target.value)}>
                    {hotels &&
                        hotels.map((hotel) => (
                            <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                        ))}
                </select>
                <div className="button">
                    <button onClick={(e) => handleCreate(e)} className="createButton">Create Room</button>
                    <button className="backButton">Go Back</button>
                </div>
            </div>
        </div>
    )
}

export default NewRoom