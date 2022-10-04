import "../assets/sidebar.css"
import React from "react";
import { DashboardOutlined } from "@ant-design/icons";
import { CreditCardOutlined } from "@ant-design/icons";
import { AppstoreOutlined } from "@ant-design/icons";
import { FullscreenExitOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {

  const navigate = useNavigate()

  const handleLogout = (e) => {
    e.preventDefault()
    sessionStorage.removeItem('role')
    sessionStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="sidebar">
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/admin" style={{ textDecoration: "none" }}>
            <li>
              <DashboardOutlined className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">LISTS</p>
          <Link to="/admin/hotel" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardOutlined className="icon" />
              <span>Hotels</span>
            </li>
          </Link>
          <Link to="/admin/room" style={{ textDecoration: "none" }}>
            <li>
              <AppstoreOutlined className="icon" />
              <span>Rooms</span>
            </li>
          </Link>

          <Link to="/login" style={{ textDecoration: "none" }}>
            <li>
              <FullscreenExitOutlined className="icon" />
              <div onClick={(e) => handleLogout(e)} >Logout</div>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;