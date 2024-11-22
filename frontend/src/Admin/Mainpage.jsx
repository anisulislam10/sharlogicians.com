import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Services from "./pages/ServicesPage";
import AddService from "./pages/AddService";
import AddClient from "./pages/AddClient";
import Topbar from "./components/Topbar";
import { FaServicestack, FaUsers, FaBriefcase } from "react-icons/fa";
import EditServices from "./pages/EditService";
import EditPortfolio from "./pages/EditPortfolio";
import AddPortfolio from "./pages/AddPortfolio";
import Portfolio from "./pages/PortfolioPage";
import Client from "./pages/ClientPage";
import EditClient from "./pages/EditClient";
import SignIn from "./pages/auth/Signin";

import "./app.css";

const Mainpage = () => {

    const menus = [
        { name: "Services", path: "/admin/services", icon: <FaServicestack /> },
        { name: "Clients", path: "/admin/clients", icon: <FaUsers /> },
        { name: "Portfolio", path: "/admin/portfolio", icon: <FaBriefcase /> },
    ];

    const profile = {
        image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        email: "admin",
    };

    return (
        
                <>
                    <Topbar />
                    <div className="app">
                        <Sidebar menus={menus} profile={profile} />
                        <div className="content">
                            <Routes>
                                <Route path="/services" element={<Services />} />
                                <Route path="/portfolio" element={<Portfolio />} />
                                <Route path="/clients" element={<Client />} />
                                <Route path="/service/edit-service/:id" element={<EditServices />} />
                                <Route path="/portfolio/edit-portfolio/:id" element={<EditPortfolio />} />
                                <Route path="/client/edit-client/:id" element={<EditClient />} />
                                <Route path="/service/add-service" element={<AddService />} />
                                <Route path="/portfolio/add-portfolio" element={<AddPortfolio />} />
                                <Route path="/client/add-client" element={<AddClient />} />
                                {/* <Route path="*" element={<Navigate to="/admin/services" />} /> */}
                            </Routes>
                        </div>
                    </div>
                </>
           
    );
};

export default Mainpage;
