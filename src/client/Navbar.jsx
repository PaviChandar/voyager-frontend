import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Navbar = () => {

    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const logoutHandler = (e) => {
        console.log("in log out")
        e.preventDefault()
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('role')
    }

    useEffect(() => {
        if (sessionStorage.getItem('token'))
            setIsLoggedIn(true)
    })

    console.log("Logged in : ", isLoggedIn)

    // const registerHandler = () => {
    //     navigate('/registration')
    // }

    // const loginHandler = () => {
    //     navigate('/login')
    // }

    return (
        <>{
            // isLoggedIn ? <>yes</> : <>no</>
        }</>
        // <div>
        //     {isLoggedIn ? (
        //         <Link to='/'>
        //             <button onClick={(e) => logoutHandler(e)} >Logout</button>
        //         </Link>
        //     ) : (
        //         <div>
        //             <Link to='/registration'>
        //                 <button
        //                 // onClick={registerHandler}
        //                 >Register</button>
        //             </Link>
        //             <Link to='/login'>
        //                 <button
        //                 //    onClick={loginHandler}
        //                 >Login</button>
        //             </Link>
        //         </div>
        //     )}
        // </div>
    )
}

export default Navbar