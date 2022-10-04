import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ValidateSession() {

  
    const navigate = useNavigate();

    const ValidateSession = () => {
        let url = window.location.href;

        //free routes
        if (url.indexOf('login') > -1 || url.indexOf('registration') > -1 ) {   
            return true;
        }

         //Check if login
        if (sessionStorage.getItem("token"))
            return true;
        else {
            return false;
        }
    }

    useEffect(() => {
        if (!ValidateSession()) {
            navigate('/login')
        }
    })
}

export default ValidateSession;