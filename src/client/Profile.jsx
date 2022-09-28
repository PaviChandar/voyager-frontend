import React from "react";
import { useSelector } from "react-redux";
import "../assets/profile.css"

const Profile = () => {

    const { user } = useSelector(state => state.user)

    return (
        <div>
            <h1>User Profile Update</h1>
            <div className="profileContainer">
                <div className="profileItems">
                    <input type="text" placeholder="username" className="profileInput" />
                    <input type="password" placeholder="old password" className="profileInput" />
                    <input type="password" placeholder="new password" className="profileInput" />
                    <button className="profileButton">Update</button>
                </div>
            </div>
        </div>
    )
}

export default Profile