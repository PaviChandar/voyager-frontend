import React from "react";
import { useNavigate } from "react-router";
import { baseUrl } from "../shared/Constants";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteHotel, getAllHotels } from "../action/action";

const HotelManagement = () => {
    const navigate = useNavigate()
    const [success, setSuccess] = useState()
    const [hotel, setHotel] = useState([])
    const dispatch = useDispatch()

    const handleClick = () => {
        navigate('/admin/hotel/create')
    }

    const handleDelete = (id) => {
        dispatch(deleteHotel(id))
    }

    // dispatch(getAllHotels())

    useEffect(() => {
        // dispatch(getAllHotels())
        axios
        .get(`${baseUrl}/hotels/`)
        .then((data) => {
            setHotel(() => (data.data))
            console.log("HOTEL DATA : ", data)
        })
    },[])

    // useEffect(() => {
    //     if (success) {
    //         alert("Hotel deleted successfully")
    //         navigate('/admin')
    //     }
    // }, [success])

    return (
        <div>
            <h1>Available hotels</h1>
            <button onClick={handleClick}>Create New Hotel</button>
            <table className="hotelTable">
                <th>
                    <tr>
                        <td><b>Hotel ID</b></td>
                        <td><b>Hotel Name</b></td>
                        <td><b>City</b></td>
                        <td><b>Address</b></td>
                        <td><b>Rating</b></td>
                    </tr>
                </th>
                <tbody>
                        {hotel.length && hotel.map(e => {
                            return (
                                <tr key={e.id}>
                                    <td>{e._id}</td>
                                    <td>{e.name}</td>
                                    <td>{e.city}</td>
                                    <td>{e.address}</td>
                                    <td>{e.rating}</td>
                                    <button onClick={() => handleDelete(e._id)} className="deleteButton">Delete</button>
                                </tr>
                            )
                        })}
                    </tbody>
            </table>
        </div>
    )
}

export default HotelManagement