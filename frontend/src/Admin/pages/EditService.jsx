import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getServiceById, updateService } from "../api/servicesApi";
import './../styles/EditService.css'

const EditService = () => {
    const { id } = useParams(); // Extract service ID from the URL
    const navigate = useNavigate();
    const [service, setService] = useState(null); // State for service data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch service data when component mounts
    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await getServiceById(id); // API call to get service by ID
                setService(response.service); // Update state with fetched data
            } catch (err) {
                console.error("Error fetching service:", error);
                setError("Failed to fetch service data");
            } finally {
                setLoading(false); // Stop loading spinner
            }
        };

        fetchService();
    }, [id]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setService((prevService) => ({
            ...prevService,
            [name]: value,
        }));
    };

    // Handle file input changes
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setService((prevService) => ({
            ...prevService,
            image: file,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", service.title);
        formData.append("shortDescription", service.shortDescription);
        if (service.image instanceof File) {
            formData.append("image", service.image); // Append file only if updated
        }

        try {
            await updateService(id, formData); // Call API to update service
            alert("Service updated successfully");
            navigate("/admin/services"); // Redirect to services list
        } catch (error) {
            console.error("Error updating service:", error);
            // console.log("Failed to update service");
        }
    };

    if (loading) return <p>Loading service data...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="edit-service-page">
            <h1>Edit Service</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={service.title || ""}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Short Description</label>
                    <textarea
                        name="shortDescription"
                        value={service.shortDescription || ""}
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
                    {service.image && !(service.image instanceof File) && (
                        <p>Current Image: {service.image}</p>
                    )}
                </div>
                <button type="submit" className="btn-primary">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditService;
