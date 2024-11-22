import React, { useState } from "react";
import "./../styles/Topbar.css";

const Topbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleSignOut = () => {
        alert("Signed out successfully!"); // Replace with sign-out logic
    };

    return (
        <div className="topbar">
            <div className="topbar-content">
                {/* Logo Section */}
                <a href="/" className="logo-link">
                    <img
                        src="https://www.sharplogicians.com/img/newlogo/logo-white.png"
                        alt="Logo"
                        className="topbar-logo"
                    />
                </a>

                {/* Profile Section */}
                <div className="profile" onClick={toggleDropdown}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" // Replace with profile image URL
                        alt="Admin Profile"
                        className="profile-image"
                    />
                    <span className="profile-greeting">Hello, Admin</span>
                </div>

                {/* Dropdown Menu */}
                {showDropdown && (
                    <div className="dropdown-menu">
                        <div className="dropdown-item">
                            <strong>Admin</strong>
                            <p>admin@example.com</p>
                        </div>
                        <hr />
                        <button className="signout-button" onClick={handleSignOut}>
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Topbar;
