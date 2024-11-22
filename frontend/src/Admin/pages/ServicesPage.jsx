import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom
import Table from "../components/Table";
import { fetchServices } from "../api/servicesApi";
import Pagination from "../components/Pagination"; // Import Pagination component
import './../styles/ServicesPage.css';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const [totalPages, setTotalPages] = useState(1);   // Track total pages
    const servicesPerPage = 5; // Number of services to display per page
    const navigate = useNavigate();  // Use the navigate function

    useEffect(() => {
        const getServices = async () => {
            try {
                const response = await fetchServices(currentPage, servicesPerPage);
                setServices(response.data.services); // Set the data from the API response
                setTotalPages(Math.ceil(response.data.total / servicesPerPage)); // Calculate total pages
            } catch (error) {
                console.error("Error fetching services:", error);
            } finally {
                setLoading(false);
            }
        };

        getServices();
    }, [currentPage]); // Trigger the fetch when currentPage changes

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="menu-content">
            <button className="add-btn" onClick={() => navigate("/admin/service/add-service")}>Add Service</button>
            {loading ? <p>Loading...</p> : <Table data={services} setData={setServices} type="services" />}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Services;
