import React from "react";
import { Link } from "react-router-dom";
import "./../styles/Sidebar.css";
import './../styles/Dashboard.css'


const Sidebar = ({ menus = [], profile }) => { // Add `profile` prop for user details
    return (
        <div className="sidebar">
            {/* Profile Section */}
            <div className="profile-section">
                <img
                    src={profile?.image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} // Default image if none provided
                    alt="Profile"
                    className="profile-pic"
                />
                <p className="username">{profile?.username || "admin"}</p>
                <p className="email">{profile?.email || "user@example.com"}</p>
            </div>

            {/* Dashboard Header */}
            <h2 className="dashboard-text"></h2>

            {/* Menu List */}
            <ul>
                {menus.map((menu, index) => (
                    <li key={index}>
                        <Link to={menu.path}>{menu.icon} {menu.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Sidebar;
