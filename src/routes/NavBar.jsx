import { Outlet, Link, useLocation } from "react-router-dom";
import './NavBar.css'

const NavBar = () => {
    const location = useLocation();

    if (location.pathname === '/signup') {
        return null; // don't render the navbar on the signup page
    }

    return (
        <div>
            <nav>
                <div className="navbar">
                    <Link className="links" style={{ color: "rgba(255, 255, 255, 0.87)" }} to="/"><h4>Home</h4></Link>
                    <Link className="links" style={{ color: "rgba(255, 255, 255, 0.87)" }} to="/new"><h4>Create a Crewmate</h4></Link>
                    <Link className="links" style={{ color: "rgba(255, 255, 255, 0.87)" }} to="/gallery"><h4>Crewmate Gallery</h4></Link>
                    <Link className="links" style={{color: "rgba(255, 255, 255, 0.87)" }} to="/profile"><h4>Profile</h4></Link>
                </div>
            </nav>
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default NavBar;