import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/FormModal.css";
import { postPortfolio } from "../api/portfolioApi"; // Import the postPortfolio function

const AddPortfolio = () => {
  const [formData, setFormData] = useState({ title: "", image: "", type: "" });
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
      if (formData.image) {
        data.append("image", formData.image);  // Append the image file
      }
      data.append("type", formData.type);  // Ensure type is appended correctly

      // Send the form data to the backend
      await postPortfolio(data); // Pass the FormData to the API postportfolio function
      // console.log("Portfolio saved successfully:", formData);
      navigate("/admin/portfolio"); // Navigate to portfolio page after success
    } catch (error) {
      // Show the error message in an alert
      const errorMessage = error.response?.data?.message || "An error occurred while saving the portfolio.";
      alert(errorMessage);  // Display the error message
      // console.log(errorMessage); // Optional: log it to the console for debugging
    }
  };

  return (
    <div className="form">
      <h3>Add New portfolio</h3>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleInputChange}
      />
      <input
        type="file"
        name="image"
        placeholder="Upload Image"
        onChange={handleInputChange} // No value attribute here as file input does not support it
      />
      <select
        name="type"
        value={formData.type}
        onChange={handleInputChange} // Ensure correct type is selected
      >
        <option value="">Select Type</option>
        <option value="Magento">Magento</option>
        <option value="Wordpress">Wordpress</option>
        <option value="Drupal">Drupal</option>
        <option value="All">All</option>
      </select>

      <button type="button" onClick={handleSave}>Save</button>
      <button type="button" onClick={() => navigate("/admin/portfolio")}>Cancel</button>
    </div>
  );
};

export default AddPortfolio;
