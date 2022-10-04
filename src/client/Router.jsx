import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import AdminHome from "../admin/AdminHome";
import HotelManagement from "../admin/Hotelmanagement";
import RoomManagement from "../admin/RoomManagement";
import NewHotel from "../admin/NewHotel";
import NewRoom from "../admin/NewRoom";
import UpdateHotel from "../admin/UpdateHotel";
import UpdateRoom from "../admin/UpdateRoom";
import ValidateSession from "../shared/utils/Validate";
import ErrorNotFound from "./ErrorNotFound";


const Router = () => {
    const navigate = useNavigate()

    ValidateSession()

    let url = window.location.href

    useEffect(() => {
        if (sessionStorage.getItem('role') === 'true' && url.indexOf('/')) {
            navigate('/admin')
        } else if (sessionStorage.getItem('role') === 'false' && url.indexOf('/admin')) {
            navigate('/')
        }
    }, [])

    return (
        <div>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/registration' element={<Register />} />
                <Route path='/' element={<Home />} />

                <Route path='/admin' element={<AdminHome />} />
                <Route path='/admin/hotel' element={<HotelManagement />} />
                <Route path='/admin/room' element={<RoomManagement />} />
                <Route path='/admin/hotel/create' element={<NewHotel />} />
                <Route path='/admin/room/create' element={<NewRoom />} />
                <Route path='/admin/hotel/update/:id' element={<UpdateHotel />} />
                <Route path='/admin/room/update/:id' element={<UpdateRoom />} />

                <Route path="*" element={<ErrorNotFound />} />
            </Routes>

        </div>
    )
}

export default Router