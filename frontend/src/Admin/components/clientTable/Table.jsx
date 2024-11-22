import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteClient } from "../../api/clientsApi";  
import "./../../styles/Table.css";

const Table = ({ data = [], type, setData }) => {
    const navigate = useNavigate(); // Navigate function to redirect

    const handleEdit = (id) => {
        // Navigate to edit page
        navigate(`/client/edit-client/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            // Call the delete client API
            const result = await deleteClient(id);
            if (result.status) {
                // Successfully deleted, update the UI
                setData((prevData) => prevData.filter((item) => item._id !== id));  // This is where setData is used
                alert("Client deleted successfully");
            } else {
                alert(result.message || "Error deleting client");
            }
        } catch (error) {
            console.error("Error deleting client:", error);
            alert("Error deleting client: " + error.message);
        }
    };
    if (!Array.isArray(data)) {
        console.error("Invalid data passed to Table component:", data);
        return <p>Invalid data provided.</p>;
    }

    const renderTableHeader = () => {
        if (type === "client") {
            return (
                <>
                    
                    <th key="image">Image</th>
                    <th key="actions">Actions</th>
                </>
            );
        }
    };

    const renderTableData = () => {
        // Log the data here to check if it is passed correctly
        // console.log("Data in Table: ", data);
        // Check if data exists and has items
        if (data && data.length > 0) {
            return data.map((item) => (
                <tr key={item._id}>
                    {type === "client" && (
                        <>
                           
                            <td key={`image-${item._id}`}><img src={item.image} alt="client" width={100} /></td>
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
        } else {
            return (
                <tr>
                    <td colSpan="4">No client items available</td>
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
