import React from 'react';
import {useNavigate} from "react-router-dom";

const HomeFeed = ({ token }) => {
    let navigate = useNavigate();
    function handleLogout() {
        sessionStorage.removeItem('token');
        navigate('/');
    }

    return (
        <div>
            <h3>Welcome back, {token.user.user_metadata.full_name}</h3>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default HomeFeed