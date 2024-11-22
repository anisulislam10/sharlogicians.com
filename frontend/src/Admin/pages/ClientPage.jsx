import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  
import Table from "../components/clientTable/Table";
import { fetchClient } from "../api/clientsApi";
import Pagination from "../components/Pagination"; 
import './../styles/ServicesPage.css';

const Client  = () => {
    const [client, setClient] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1);   
    const clientPerPage = 5; 
    const navigate = useNavigate();

    useEffect(() => {
        const getClient = async () => {
            // console.log("Fetching client data...");
    
            try {
                setLoading(true); // Set loading to true before the API call
                
                const response = await fetchClient(currentPage, clientPerPage); // Fetch client data with pagination
                // console.log(response);
                
                setClient(response.data.ourClients); // Set the client data
                setTotalPages(Math.ceil(response.data.total / clientPerPage));  // Set total pages for pagination
                
            } catch (error) {
                console.error("Error fetching client:", error.message);
                console.log(`Failed to fetch client data: ${error.message}`);
            } finally {
                setLoading(false); // Set loading to false once the API call is complete
            }
        };
    
        getClient();
    }, [currentPage]); // Re-fetch data when currentPage changes

    const handlePageChange = (page) => {
        setCurrentPage(page); // Update current page when user changes page
    };

    return (
        <div className="menu-content">
            <button className="add-btn" onClick={() => navigate("/admin/client/add-client")}>Add Client</button>
            {loading ? (
                <p>Loading...</p> // Show loading message while fetching data
            ) : (
                <Table data={client} setData={setClient} type="client" />
            )}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange} // Handle page change event
            />
        </div>
    );
};

export default Client;
