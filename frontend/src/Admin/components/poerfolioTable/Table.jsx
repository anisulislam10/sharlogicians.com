import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deletePortfolio } from "../../api/portfolioApi";  // Import deletePortfolio API call
import "./../../styles/Table.css";

const Table = ({ data = [], type, setData }) => {
    const navigate = useNavigate(); // Navigate function to redirect

    const handleEdit = (id) => {
        // Navigate to edit page
        navigate(`/portfolio/edit-portfolio/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            // Call the delete Portfolio API
            const result = await deletePortfolio(id);
            if (result.status) {
                // Successfully deleted, update the UI
                setData((prevData) => prevData.filter((item) => item._id !== id));  // This is where setData is used
                alert("Portfolio deleted successfully");
            } else {
                alert(result.message || "Error deleting Portfolio");
            }
        } catch (error) {
            console.error("Error deleting Portfolio:", error);
            alert("Error deleting Portfolio: " + error.message);
        }
    };
    if (!Array.isArray(data)) {
        console.error("Invalid data passed to Table component:", data);
        return <p>Invalid data provided.</p>;
    }

    const renderTableHeader = () => {
        if (type === "portfolio") {
            return (
                <>
                    <th key="title">Title</th>
                    <th key="image">Image</th>
                    <th key="type">Type</th>
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
                    {type === "portfolio" && (
                        <>
                            <td key={`title-${item._id}`}>{item.title}</td>
                            <td key={`image-${item._id}`}><img src={item.image} alt="Portfolio" width={100} /></td>
                            <td key={`type-${item._id}`}>{item.type}</td>
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
                    <td colSpan="4">No portfolio items available</td>
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
