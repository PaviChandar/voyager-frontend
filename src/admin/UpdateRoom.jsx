import React from "react";
import "../assets/updateRoom.css"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getSingleRoom, updateRoom } from "../action/action";

const UpdateRoom = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [hotels, setHotel] = useState([])
    const [hotelId, setHotelId] = useState(undefined);
    const [rooms, setRooms] = useState([]);
    const [success, setSuccess] = useState(false)
    const [submit, setSubmit] = useState(false)
    const [error, setError] = useState(false)
    const [credentials, setCredentials] = useState({
        title: '',
        price: '',
        maxPeople: '',
        desc: '',
        roomNumbers: []
    })

    let { id } = useParams()
    const { room } = useSelector(state => state.room)

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        setError(() => validate(credentials))
    }

    useEffect(() => {
        dispatch(getSingleRoom(id))
    }, [])

    useEffect(() => {
        if (room) {
            setCredentials({ ...room })
        }
    }, [room])

    const handleUpdate = (e) => {

        e.preventDefault();
        setError(() => validate(credentials))
        setSubmit(true)
        if (Object.keys(error).length === 0 && submit) {
            dispatch(updateRoom(id, credentials))
            setSuccess(true)
        }
    }

    useEffect(() => {
        if (success) {
            alert("Room updated successfully!")
            navigate('/admin/room')
        }
    }, [success])

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
        <div>
            <h1>Update Room</h1>
            <div className="newRoomItems">
                <input type="text" name="title" value={credentials.title} onChange={(e) => handleChange(e)} placeholder="title" />
                <span className="error">{error.title}</span>
                <input type="number" name="price" value={credentials.price} onChange={(e) => handleChange(e)} min="0" placeholder="price" />
                <span className="error">{error.price}</span>
                <input type="text" name="maxPeople" value={credentials.maxPeople} onChange={(e) => handleChange(e)} placeholder="maximum people" />
                <span className="error">{error.maxPeople}</span>
                <input type="text" name="desc" value={credentials.description} onChange={(e) => handleChange(e)} placeholder="description" />
                <label>Rooms</label>
                <input type="textarea" name="roomNumbers" onChange={(e) => setRooms(e.target.value)} disabled placeholder="enter room numbers" />
                <span className="error">{error.roomNumbers}</span>
                <label>Choose a hotel</label>
                <select id="hotelId" disabled
                    onChange={(e) => setHotelId(e.target.value)}>
                    {hotels &&
                        hotels.map((hotel) => (
                            <option key={hotel._id} value={hotel._id}>{hotel.name}</option>
                        ))}
                </select>
                <div className="button">
                    <button className="update" onClick={handleUpdate} >Update</button>
                    <button className="backButton" onClick={() => navigate(-1)} >Go Back</button>
                </div>
            </div>
        </div>
    )
}

export default UpdateRoom