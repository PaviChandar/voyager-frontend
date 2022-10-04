import React, { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "../action/action"
import "../assets/login.css"

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const handleRegister = () => {
        navigate('/registration')
    }

    useEffect(() => {
        if(sessionStorage.getItem('token')) {
            if (sessionStorage.getItem('role') === 'true') {
                navigate('/admin')
            } else {
                navigate('/')
            } 
        }
    })

    const handleClick = async (e) => {
        e.preventDefault()
        dispatch({ type: "LOGIN_START" })
        try {
            dispatch(loginUser(credentials))
            
        } catch (err) {
            console.log("error", err)
        }

    }
    return (
        <div className="login">
            <div className="loginContainer">
                <input type="text" placeholder="username" id="username" onChange={handleChange} className="loginName" />
                <input type="password" placeholder="password" id="password" onChange={handleChange} className="loginPassword" />
                <button onClick={handleClick} className="loginButton">Login</button>
                <h3><b>Not an user? Please click register to login</b></h3>
                <button onClick={handleRegister} className="loginButton">Register</button>
            </div>
        </div>
    )
}
export default Login