import React from 'react';
import {useNavigate} from "react-router-dom";

const HomeFeed = ({ token }) => {
    let navigate = useNavigate();
    function handleLogout() {
        sessionStorage.removeItem('token');
        navigate('/');
    }

    function handleCreatePost() {
        navigate('/new');
    }

    return (
        <div>
            <h3>Welcome back, {token.user.user_metadata.full_name}</h3>
            <button onClick={handleLogout}>Logout</button>
            <button className="new-post" onClick={handleCreatePost}> + </button>
        </div>
    )
}

export default HomeFeed