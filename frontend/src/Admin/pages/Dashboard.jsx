import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import './../styles/Dashboard.css'

const Dashboard = () => {
    const navigate = useNavigate();

    const handleMenuSelect = (menu) => {
        navigate(`/${menu}`);
    };

    return (
        <div style={{ display: "flex" }}>
            <Sidebar onMenuSelect={handleMenuSelect} />
            <div style={{ marginLeft: "250px", padding: "20px", width: "100%" }}>
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
