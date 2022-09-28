import { useNavigate } from 'react-router';
import { UserOutlined } from '@ant-design/icons';
import { DatePicker, Space } from 'antd';
import React, { useState } from 'react';
import '../assets/home.css'
import Navbar from './Navbar';
import { useEffect } from 'react';
import Header from './Header';
const { RangePicker } = DatePicker;

const Home = () => {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        if (sessionStorage.getItem('token'))
            setIsLoggedIn(true)
    })

    const handleLogin = () => {
        navigate('/login')
    }

    const handleRegister = () => {
        navigate('/registration')
    }

    const handleLogout = () => {
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('role')
        setIsLoggedIn(false)
    }

    const handleProfile = () => {
        navigate('/profile')
    }

    return (
        <div className='homeContainer'>
            <h1>VOYAGER</h1>
            <h2>Bon Voyage!</h2>
            <Navbar />
            <UserOutlined className="profile" onClick={handleProfile} />
            {isLoggedIn ?
                <>
                    <button className='homeLogin' onClick={handleLogout}>Logout</button>
                </> :
                <>
                    <button className='homeRegister' onClick={handleRegister}>Register</button>
                    <button className='homeLogin' onClick={handleLogin}>Login</button>
                </>}
                <Header />
        </div>
    )
}


export default Home;