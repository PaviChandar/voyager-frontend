import React from "react";
import Bookings from "./Bookings";
import Sidebar from "./Sidebar";
import "../assets/adminHome.css"
import Navbar from "./Navbar";

const AdminHome = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeItems">
                <Navbar className="navbar" />
                <div className="bookings">
                    <Bookings />
                </div>
            </div>
        </div>
    )
}

export default AdminHome