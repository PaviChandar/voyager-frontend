import { useNavigate } from 'react-router';
import { UserOutlined } from '@ant-design/icons';
import { DatePicker, Space } from 'antd';
import React from 'react';
import '../assets/home.css'
const { RangePicker } = DatePicker;


const Home = () => {
    const navigate = useNavigate();
    
    const handleLogin = () => {
        navigate('/login')
    }

    const handleRegister = () => {
        navigate('/registration')
    }

    const handleProfile = () => {
        navigate('/profile')
    }

    return (
        <div className='homeContainer'>
            <h1>VOYAGER</h1>
            <button className='homeRegister' onClick={handleRegister}>Register</button>
            <button className='homeLogin' onClick={handleLogin}>Login</button>
            <UserOutlined className="profile" onClick={handleProfile}/>
            <div className='headerContainer'>
            <Space className='date'>
                <RangePicker />
            </Space>
            <input type="text" placeholder='Search hotels' className='search'/>
            </div>
        </div>
    )
}


export default Home;