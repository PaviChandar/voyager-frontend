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

    let { isAdmin } = useSelector(state => state.user)

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }

    const handleRegister = () => {
        navigate('/registration')
    }

    useEffect(() => {
        console.log("call effect", sessionStorage.getItem('role'))
        if (sessionStorage.getItem('role') !== null) {
            console.log("call effect in not null ", sessionStorage.getItem('role'))
            if (sessionStorage.getItem('role') === true) {
                console.log("", sessionStorage.getItem('role'))
                navigate('/admin')
            } else {
                console.log("not a admin")
                navigate('/')
            }
        }

    })

    const handleClick = async (e) => {
        e.preventDefault()
        console.log("entering")
        dispatch({ type: "LOGIN_START" })
        try {
            console.log("CREDENTIALS : ", credentials)
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
                <h3>Not an user? Please click register to login</h3>
                <button onClick={handleRegister} className="loginButton">Register</button>
            </div>
        </div>
    )
}
export default Login