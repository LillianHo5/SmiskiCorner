import {Outlet, Link, useLocation, useNavigate} from "react-router-dom";
import './NavBar.css'
import React from "react";

const NavBar = ({ token }) => {
    let navigate = useNavigate()
    const location = useLocation();

    if (location.pathname === '/signup' || location.pathname === '/') {
        return null; // don't render the navbar on the signup page
    }

    function handleLogout() {
        sessionStorage.removeItem('token');
        navigate('/');
    }

    return (
        <div>
            <nav>
                <div className="navbar">
                    <Link className="links" style={{ color: "rgba(255, 255, 255, 0.87)" }} to="/home"><h4>Home</h4></Link>
                    <Link className="links" style={{ color: "rgba(255, 255, 255, 0.87)" }} to="/new"><h4>Create a Post</h4></Link>
                    <Link className="links" style={{color: "rgba(255, 255, 255, 0.87)" }} to="/profile"><h4>Profile</h4></Link>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </nav>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default NavBar;