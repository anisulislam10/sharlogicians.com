import axios from "axios";
import process from "process";


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL_CLIENT;
console.log("client base url:", API_BASE_URL)
// console.log('Environment:', process.env);

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
