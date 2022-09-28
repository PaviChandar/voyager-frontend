import React from "react";
import "../assets/newHotel.css"
import { useNavigate } from "react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerHotel } from "../action/action";
import { useEffect } from "react";

const NewHotel = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [success, setSuccess] = useState(false)
    const [credentials, setCredentials] = useState({
        name: '',
        type:'Hotel',
        city:'Berlin',
        address:'',
        desc    :'',
        distance:'',
        rating:'',
        cheapestPrice:'',
        featured: false,
    })

    const handleChange = (e) => {
        setCredentials((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const createHandler = (e) => {
        e.preventDefault()
        dispatch(registerHotel(credentials))
        console.log("CREATE: ", credentials)
        setSuccess(true)
    }

    useEffect(() => {
        if(success) {
            alert("Hotel created successfully")
            navigate('/admin')
        }
    })

    return (
        <div className="hotelHeader">
            <h1>Create New Hotel</h1>
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
                <button onClick={(e) => createHandler(e)}  className="newHotelButton">Create</button>
                <button className="newHotelButton">Go Back</button>
            </div>
        </div>
    )
}

export default NewHotel