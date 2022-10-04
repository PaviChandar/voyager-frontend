import React from "react";
import "../assets/updateRoom.css"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getSingleRoom, registerRoom, updateRoom } from "../action/action";

const UpdateRoom = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [hotels, setHotel] = useState([])
    const [hotelId, setHotelId] = useState(undefined);
    const [rooms, setRooms] = useState([]);
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
    }

    useEffect(() => {
        dispatch(getSingleRoom(id))
    }, [])

    useEffect(() => {
        if(room) {
            setCredentials({...room})
        }
    },[room])

    const handleUpdate = () => {
        dispatch(updateRoom(id, credentials))
        alert("Room updated successfully!")
        navigate('/admin/room')

    }

    return (
        <div>
            <h1>Update Room</h1>
            <div className="newRoomItems">
                <input type="text" name="title" value={credentials.title} onChange={(e) => handleChange(e)} placeholder="title" />
                <input type="number" name="price" value={credentials.price} onChange={(e) => handleChange(e)} min="0" placeholder="price" />
                <input type="text" name="maxPeople" value={credentials.maxPeople} onChange={(e) => handleChange(e)} placeholder="maximum people" />
                <input type="text" name="desc" value={credentials.description} onChange={(e) => handleChange(e)} placeholder="description" />
                <label>Rooms</label>
                <input type="textarea" name="roomNumbers" onChange={(e) => setRooms(e.target.value)} disabled placeholder="enter room numbers" />
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