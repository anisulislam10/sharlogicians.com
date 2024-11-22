import axios from "axios";

const API_BASE_URL =import.meta.env.VITE_API_BASE_URL_PORTFOLIO;

// Fetch all portfolio items with pagination
export const fetchPortfolio = (page = 1, limit = 5) => {
    const skip = (page - 1) * limit; // Calculate skip based on page and limit
  
    return axios.get(`${API_BASE_URL}/get`, {
      params: {
        skip: skip,
        limit: limit,
      },
    });
  };
  

// post portfolio 
export const postPortfolio = (portfolioData) => axios.post(`${API_BASE_URL}/post`, portfolioData);

// delete portfolio 
export const deletePortfolio = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/delete/${id}`);
        return response.data;  // Return response data if delete is successful
    } catch (error) {
        console.error("Error deleting portfolio:", error);
        throw new Error("Error deleting portfolio: " + error.response?.data?.message || error.message);
    }
};

// Fetch a single portfolio by ID
export const getPortfolioById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(`Error fetching portfolio by ID: ${error.message}`);
    }
};

// Update a portfolio
export const updatePortfolio = async (id, formData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/update/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(`Error updating portfolio: ${error.message}`);
    }
};
