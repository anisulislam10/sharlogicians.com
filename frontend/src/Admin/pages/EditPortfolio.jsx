import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPortfolioById, updatePortfolio } from "../api/portfolioApi";
import './../styles/EditPortfolio.css'

const EditPortfolio = () => {
    const { id } = useParams(); // Extract Portfolio ID from the URL
    const navigate = useNavigate();
    const [portfolio, setPortfolio] = useState(null); // State for Portfolio data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch Portfolio data when component mounts
    useEffect(() => {
        const fetchPortfolio = async () => {
            try {
                const response = await getPortfolioById(id); // API call to get Portfolio by ID
                setPortfolio(response.portfolio); // Update state with fetched data
            } catch (err) {
                console.error("Error fetching Portfolio:", err);
                setError("Failed to fetch Portfolio data");
            } finally {
                setLoading(false); // Stop loading spinner
            }
        };

        fetchPortfolio();
    }, [id]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPortfolio((prevPortfolio) => ({
            ...prevPortfolio,
            [name]: value,
        }));
    };

    // Handle file input changes
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPortfolio((prevPortfolio) => ({
            ...prevPortfolio,
            image: file,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", portfolio.title);
        if (portfolio.image instanceof File) {
            formData.append("image", portfolio.image); // Append file only if updated
        }
        formData.append("type", portfolio.type);

        try {
            await updatePortfolio(id, formData); // Call API to update Portfolio
            alert("Portfolio updated successfully");
            navigate("/admin/portfolio"); // Redirect to Portfolio list
        } catch (error) {
            console.error("Error updating Portfolio:", error);
            alert("Failed to update Portfolio");
        }
    };

    if (loading) return <p>Loading Portfolio data...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="edit-service-page"> {/* Use same class as EditService */}
            <h1>Edit Portfolio</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={portfolio.title || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Image</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                    />
                    {portfolio.image && !(portfolio.image instanceof File) && (
                        <p>Current Image: {portfolio.image}</p>
                    )}
                </div>

                <div className="form-group">
                    <label>Type</label>
                    <input
                        type="text"
                        name="type"
                        value={portfolio.type || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit" className="btn-primary">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditPortfolio;
