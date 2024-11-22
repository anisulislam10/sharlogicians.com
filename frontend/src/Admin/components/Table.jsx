import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteService } from "../api/servicesApi";  // Import deleteService API call
import "./../styles/Table.css";

const Table = ({ data = [], type, setData }) => {
    const navigate = useNavigate(); // Navigate function to redirect

    const handleEdit = (id) => {
        // Navigate to edit page
        navigate(`/service/edit-service/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            // Call the delete service API
            const result = await deleteService(id);
            if (result.status) {
                // Successfully deleted, update the UI
                setData((prevData) => prevData.filter((item) => item._id !== id));  // This is where setData is used
                alert("Service deleted successfully");
            } else {
                alert(result.message || "Error deleting service");
            }
        } catch (error) {
            console.error("Error deleting service:", error);
            alert("Error deleting service: " + error.message);
        }
    };

    if (!Array.isArray(data)) {
        console.error("Invalid data passed to Table component:", data);
        return <p>Invalid data provided.</p>;
    }

    const renderTableHeader = () => {
        if (type === "services") {
            return (
                <>
                    <th key="title">Title</th>
                    <th key="shortDescription">Short Description</th>
                    <th key="image">Image</th>
                    <th key="actions">Actions</th>
                </>
            );
        }
    };

    const renderTableData = () => {
        if (data && data.length > 0) {

        return data.map((item) => (
            <tr key={item._id}>
                {type === "services" && (
                    <>
                        <td key={`title-${item._id}`}>{item.title}</td>
                        <td key={`shortDescription-${item._id}`}>{item.shortDescription}</td>
                        <td key={`image-${item._id}`}><img src={item.image} alt="Service" width={100} /></td>
                        <td key={`actions-${item._id}`}>
                            <FaEdit
                                style={{ cursor: "pointer", marginRight: "10px", color: "#28a745" }}
                                onClick={() => handleEdit(item._id)}
                            />
                            <FaTrash
                                style={{ cursor: "pointer", color: "#dc3545" }}
                                onClick={() => handleDelete(item._id)}
                            />
                        </td>
                    </>
                )}
            </tr>
        ));
    }else{
        return (
            <tr>
                <td colSpan="4">No Service items available</td>
            </tr>
        );
    } 
    };

    return (
        <table>
            <thead>
                <tr>{renderTableHeader()}</tr>
            </thead>
            <tbody>{renderTableData()}</tbody>
        </table>
    );
};

export default Table;
