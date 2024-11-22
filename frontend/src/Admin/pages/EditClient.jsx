import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getClientById, updateclient } from "../api/clientsApi";
import './../styles/EditClient.css'

const EditClient = () => {
    const { id } = useParams(); // Extract client ID from the URL
    const navigate = useNavigate();
    const [client, setClient] = useState(null); // State for client data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch client data when component mounts
    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await getClientById(id); // API call to get client by ID
                setClient(response.ourClients); // Update state with fetched data
            } catch (err) {
                console.error("Error fetching client:", err);
                setError("Failed to fetch client data");
            } finally {
                setLoading(false); // Stop loading spinner
            }
        };

        fetchClient();
    }, [id]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setClient((prevClient) => ({
            ...prevClient,
            [name]: value,
        }));
    };

    // Handle file input changes
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setClient((prevClient) => ({
            ...prevClient,
            image: file,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (client.image instanceof File) {
            formData.append("image", client.image); // Append file only if updated
        }

        try {
            await updateclient(id, formData); // Call API to update client
            alert("client updated successfully");
            navigate("/admin/clients"); // Redirect to client list
        } catch (error) {
            console.error("Error updating client:", error);
            alert("Failed to update client");
        }
    };

    if (loading) return <p>Loading client data...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="edit-service-page"> {/* Use same class as EditService */}
            <h1>Edit Client</h1>
            <form onSubmit={handleSubmit}>
                

                <div className="form-group">
                    <label>Image</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                    />
                    {client.image && !(client.image instanceof File) && (
                        <p>Current Image: {client.image}</p>
                    )}
                </div>

                

                <button type="submit" className="btn-primary">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default EditClient;
