import React, { useState } from "react";
import { Route, Routes } from "react-router";
import Register from "./Register";
import Login from "./Login";
import Home from "./Home";
import Profile from "./Profile";
import AdminHome from "../admin/AdminHome";
import HotelManagement from "../admin/Hotelmanagement";
import RoomManagement from "../admin/RoomManagement";
import NewHotel from "../admin/NewHotel";
import NewRoom from "../admin/NewRoom";

const Router = () => {

    // useEffect
    // setrole , check redux state, islogin=true
    // 404 - button - go to home - role based re-direct dashboard
    // no user-then, login 
    return (
        <div>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/registration' element={<Register />} />
                {/* role based */}
                <Route path='/' element={<Home />} />
                <Route path='/profile' element={<Profile />} />

                <Route path='/admin' element={<AdminHome />} />
                <Route path='/admin/hotel' element={<HotelManagement />} />
                <Route path='/admin/room' element={<RoomManagement />} />
                <Route path='/admin/hotel/create' element={<NewHotel />} />
                <Route path='/admin/room/create' element={<NewRoom />} />
            </Routes>
        </div>
    )
}

export default Router