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
    const [formError, setFormError] = useState(false)
    const [submit, setSubmit] = useState(false)
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

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        setFormError(() => validate(credentials))
    }

    const createHandler = (e) => {
        e.preventDefault()
        setFormError(() => validate(credentials))
        setSubmit(true)
        if (Object.keys(formError).length === 0 && submit) {
            dispatch(registerHotel(credentials))
            setSuccess(true)
        }
    }

    useEffect(() => {
        if (success) {
            alert("Hotel created successfully")
            navigate('/admin')
        }
    }, [success])

    const validate = (value) => {
        const errors = {}

        if (!value.name) {
            errors.name = "*Hotel name is required"
        }
        if (!value.address) {
            errors.address = "*Hotel address is required"
        }
        if (!value.desc) {
            errors.desc = "*Hotel description is required"
        }
        if (!value.distance) {
            errors.distance = "*Hotel distance is required"
        }
        if (!value.rating) {
            errors.rating = "*Rating is required"
        }
        if (!value.cheapestPrice) {
            errors.cheapestPrice = "*Price is required"
        }

        return errors
    }

    return (
        <div className="hotelHeader">
            <h1>Create New Hotel</h1>
            <div className="hotelContainer">
                <div>
                    <input type="text" name="name" value={credentials.name} onChange={(e) => handleChange(e)} placeholder="hotel name" />
                    <span className="error">{formError.name}</span>
                </div>
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
                <div>
                    <input type="text" name="address" value={credentials.address} onChange={(e) => handleChange(e)} placeholder="address" />
                    <span className="error">{formError.address}</span>
                </div>
                <div>
                    <input type="number" name="distance" value={credentials.distance} onChange={(e) => handleChange(e)} placeholder="distance" />
                    <span className="error">{formError.distance}</span>
                </div>
                <div>
                    <input type="number" name="rating" value={credentials.rating} onChange={(e) => handleChange(e)} placeholder="rating" />
                    <span className="error">{formError.rating}</span>
                </div>
                <div>
                    <input type="text" name="desc" value={credentials.desc} onChange={(e) => handleChange(e)} placeholder="description" />
                    <span className="error">{formError.desc}</span>
                </div>
                <div>
                    <input type="number" name="cheapestPrice" value={credentials.cheapestPrice} onChange={(e) => handleChange(e)} placeholder="cheapest price" />
                    <span className="error">{formError.cheapestPrice}</span>
                </div>
                <label>Featured</label>
                <select name="featured" onChange={(e) => handleChange(e)}>
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                </select>
                <div>
                    <button onClick={(e) => createHandler(e)} className="newHotelButton">Create</button>
                    <button className="backHotelButton" onClick={() => navigate('/admin')}>Go Back</button>
                </div>
            </div>
        </div>
    )
}

export default NewHotel