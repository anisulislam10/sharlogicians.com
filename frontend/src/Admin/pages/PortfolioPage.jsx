import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  
import Table from "../components/poerfolioTable/Table";
import { fetchPortfolio } from "../api/portfolioApi";
import Pagination from "../components/Pagination"; 
import './../styles/ServicesPage.css';

const Portfolio  = () => {
    const [portfolio, setPortfolio] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalPages, setTotalPages] = useState(1);   
    const portfolioPerPage = 5; 
    const navigate = useNavigate();

    useEffect(() => {
        const getPortfolio = async () => {
            // console.log("Fetching portfolio data...");
    
            try {
                setLoading(true); // Set loading to true before the API call
                
                const response = await fetchPortfolio(currentPage, portfolioPerPage); // Fetch portfolio data with pagination
                
                setPortfolio(response.data.portfolio); // Set the portfolio data
                setTotalPages(Math.ceil(response.data.total / portfolioPerPage));  // Set total pages for pagination
                
            } catch (error) {
                console.error("Error fetching portfolio:", error.message);
                console.log(`Failed to fetch portfolio data: ${error.message}`);
            } finally {
                setLoading(false); // Set loading to false once the API call is complete
            }
        };
    
        getPortfolio();
    }, [currentPage]); // Re-fetch data when currentPage changes

    const handlePageChange = (page) => {
        setCurrentPage(page); // Update current page when user changes page
    };

    return (
        <div className="menu-content">
            <button className="add-btn" onClick={() => navigate("/admin/portfolio/add-portfolio")}>Add Portfolio</button>
            {loading ? (
                <p>Loading...</p> // Show loading message while fetching data
            ) : (
                <Table data={portfolio} setData={setPortfolio} type="portfolio" />
            )}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange} // Handle page change event
            />
        </div>
    );
};

export default Portfolio;
