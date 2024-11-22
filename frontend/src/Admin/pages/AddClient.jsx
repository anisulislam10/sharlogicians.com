import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/FormModal.css";
import { postClient } from "../api/clientsApi"; // Import the  function

const AddClient = () => {
  const [formData, setFormData] = useState({  image: "", });
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
     
      if (formData.image) {
        data.append("image", formData.image);  // Append the image file
      }
      console.log("FormData:", data);


      // Send the form data to the backend
      await postClient(data); // Pass the FormData to the API postportfolio function
      // console.log("Portfolio saved successfully:", formData);
      navigate("/admin/clients"); // Navigate to portfolio page after success
    } catch (error) {
      // Show the error message in an alert
      const errorMessage = error.response?.data?.message || "An error occurred while saving the Client.";
      alert(errorMessage);  // Display the error message
      // console.log(errorMessage); // Optional: log it to the console for debugging
    }
  };

  return (
    <div className="form">
      <h3>Add New Client</h3>
      
      <input
        type="file"
        name="image"
        placeholder="Upload Image"
        onChange={handleInputChange} // No value attribute here as file input does not support it
      />
      
      <button type="button" onClick={handleSave}>Save</button>
      <button type="button" onClick={() => navigate("/admin/client")}>Cancel</button>
    </div>
  );
};

export default AddClient;
