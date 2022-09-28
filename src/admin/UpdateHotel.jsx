import React from "react";
import "../assets/updateHotel.css"
import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { getSingleHotel, registerHotel, updateHotel } from "../action/action";
import { useDispatch, useSelector } from "react-redux";

const UpdateHotel = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [success, setSuccess] = useState(false)
    const [credentials, setCredentials] = useState({
        name: '',
        type: 'Hotel',
        city: 'Berlin',
        address: '',
        desc: '',
        distance: '',
        rating: '',
        cheapestPrice: '',
        featured: false,
    })

    let { id } = useParams()
    console.log("id : ", id)

    const { hotel } = useSelector(state => state.hotel)

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        dispatch(getSingleHotel(id))
    }, [])

    useEffect(() => {
        if (hotel) {
            setCredentials({ ...hotel })
        }
    }, [hotel])

    const handleUpdate = () => {
        console.log("in update", credentials)
        dispatch(updateHotel(id, credentials))
        alert("Hotel updated successfully")
        navigate('/admin/hotel')
    }

    return (
        <div>
            <h1>Update Hotel</h1>
            <div className="hotelHeader">
                <div className="hotelContainer">
                    <input type="text" name="name" value={credentials.name} onChange={(e) => handleChange(e)} placeholder="hotel name" />
                    <label>Type</label>
                    <select name="type" onChange={(e) => handleChange(e)}>
                        <option>Hotel</option>
                    </select>
                    <label>City</label>
                    <select name="city" onChange={(e) => handleChange(e)}>
                        <option value="Berlin">Berlin</option>
                        <option value="Mystic Falls">Mystic Falls</option>
                        <option value="London">London</option>
                    </select>
                    <input type="text" name="address" value={credentials.address} onChange={(e) => handleChange(e)} placeholder="address" />
                    <input type="number" name="distance" value={credentials.distance} onChange={(e) => handleChange(e)} placeholder="distance" />
                    <input type="number" name="rating" value={credentials.rating} onChange={(e) => handleChange(e)} placeholder="rating" />
                    <input type="text" name="desc" value={credentials.desc} onChange={(e) => handleChange(e)} placeholder="description" />
                    <input type="number" name="cheapestPrice" value={credentials.cheapestPrice} onChange={(e) => handleChange(e)} placeholder="cheapest price" />
                    <label>Featured</label>
                    <select name="featured" onChange={(e) => handleChange(e)}>
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                    </select>
                    <button className="update" onClick={handleUpdate}>Update</button>
                    <button className="backButton" onClick={() => navigate(-1)}>Go Back</button>
                </div>
            </div>



        </div>
    )
}

export default UpdateHotel