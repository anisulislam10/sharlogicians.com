import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/admin/client";

// Fetch all Clients with pagination
export const fetchClient = (page = 1, limit = 5) => {
    const skip = (page - 1) * limit; // Calculate skip based on page and limit

    return axios.get(`${API_BASE_URL}/get`, {
      params: {
        skip: skip,
        limit: limit,
      },
    });
};

// Post a new client item
export const postClient = (clientData) => axios.post(`${API_BASE_URL}/post`, clientData);

// Delete an client
export const deleteClient = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
        return response.data;  // Return response data if delete is successful
    } catch (error) {
        console.error("Error deleting client:", error);
        throw new Error("Error deleting client: " + error.response?.data?.message || error.message);
    }
};

// Fetch a single client by ID
export const getClientById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching client by ID: ${error.message}`);
    }
};

// Update an client status
export const updateclient = async (id, formData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/update/${id}`, formData);
        return response.data;
    } catch (error) {
        throw new Error(`Error updating client status: ${error.message}`);
    }
};
