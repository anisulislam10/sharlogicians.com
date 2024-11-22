import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/FormModal.css";
import { postServices } from "../api/servicesApi"; // Import the postServices function

const AddService = () => {
    const [formData, setFormData] = useState({ title: "", shortDescription: "", image: "" });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setFormData({ ...formData, [name]: files[0] });  // Store the file in state
        } else {
            setFormData({ ...formData, [name]: value });
        }
        // console.log(formData); // Log state after each change
    };

    const handleSave = async () => {
        try {
            const data = new FormData();
            // Append the form data to FormData object
            data.append("title", formData.title);
            data.append("shortDescription", formData.shortDescription);
            if (formData.image) {
                data.append("image", formData.image);  // Append the image file
            }

            // Send the form data to the backend
            await postServices(data); // Pass the FormData to the API postServices function
            // console.log("Service saved successfully:", formData);
            navigate("/admin/services"); // Navigate to Services page after success
        } catch (error) {

             // Show the error message in an alert
        const errorMessage = error.response?.data?.message || "An error occurred while saving the service.";
        alert(errorMessage);  // Display the error message
        // console.log(errorMessage); // Optional: log it to the console for debugging
        }
    };

    return (
        <div className="form">
            <h3>Add New Service</h3>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="shortDescription"
                placeholder="Short Description"
                value={formData.shortDescription}
                onChange={handleInputChange}
            />
            <input
                type="file"
                name="image"
                placeholder="Upload Image"
                onChange={handleInputChange} // No value attribute here as file input does not support it
            />
            <button type="button" onClick={handleSave}>Save</button>
            <button type="button" onClick={() => navigate("/admin/services")}>Cancel</button>
        </div>
    );
};

export default AddService;
