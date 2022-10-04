import React, { useEffect } from "react";
import "../assets/newRoom.css"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { getAllHotels, registerRoom } from "../action/action";
import { baseUrl } from "../shared/utils/Constants";
import axios from "axios";

const NewRoom = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [hotels, setHotel] = useState([])
    const [hotelId, setHotelId] = useState(undefined);
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [credentials, setCredentials] = useState({
        title: '',
        price: '',
        maxPeople: '',
        desc: '',
        roomNumbers: []

    })

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        setError(() => validate(credentials))
    }

    const handleCreate = (e) => {
        e.preventDefault();
        setError(() => validate(credentials))
        const roomNumbers = rooms.split(",").map((room) => ({ number: room }));
        if (Object.keys(error).length === 0 && submit) {
            dispatch(registerRoom(hotelId, { ...credentials, roomNumbers }))
            setSuccess(true)
        }
    }

    useEffect(() => {
        axios
            .get(`${baseUrl}/hotels/`)
            .then((data) => {
                setHotel(() => (data.data))
            })
        if (success) {
            alert("Room created successfully")
            navigate('/admin')
        }
    }, [])

    const validate = (value) => {
        const errors = {}

        if (!value.title) {
            errors.title = "*Room title is required"
        }
        if (!value.price) {
            errors.price = "*Room price is required"
        }
        if (!value.maxPeople) {
            errors.maxPeople = "*Maximum people is required"
        }
        if (!value.roomNumbers) {
            errors.roomNumbers = "*Room numbers are required"
        }

        return errors
    }

    return (
        <div className="newRoomContainer">
            <h1>Create New Room</h1>
            <div className="newRoomItems">
                <div>
                    <input type="text" name="title" value={credentials.title} onChange={(e) => handleChange(e)} placeholder="title" />
                    <span className="error">{error.title}</span>
                </div>
                <div>
                    <input type="number" name="price" value={credentials.price} onChange={(e) => handleChange(e)} min="0" placeholder="price" />
                    <span className="error">{error.price}</span>
                </div>
                <div>
                    <input type="text" name="maxPeople" value={credentials.maxPeople} onChange={(e) => handleChange(e)} placeholder="maximum people" />
                    <span className="error">{error.maxPeople}</span>
                </div>
                <input type="text" name="desc" value={credentials.description} onChange={(e) => handleChange(e)} placeholder="description" />
                <label>Rooms</label>
                <div>
                    <input type="textarea" name="roomNumbers" onChange={(e) => setRooms(e.target.value)} placeholder="enter room numbers" />
                    <span className="error">{error.roomNumbers}</span>
                </div>
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
                    <button className="backButton" onClick={() => navigate('/admin/room')}>Go Back</button>
                </div>
            </div>
        </div>
    )
}

export default NewRoom