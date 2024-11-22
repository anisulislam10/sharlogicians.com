import React, { useEffect, useState } from "react";
import axios from "axios";


/*****************************************
dynamically Show Client logo on Client Page
*****************************************/
const BrandTwo = () => {
  const [Client, setClient] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_API_API_GET_BRAND);
        setClient(response.data.ourClients); 
      } catch (error) {
        console.error("Error fetching client data:", error);
      }
    };
    fetchClient();
  }, []); 

  return (
    <><h3>Brands Who Trusts Us.</h3><ul className="brand-style-2">
      {Client.map((client, index) => (
        <li key={client._id}>
          <img
            src={client.image} // Use the `image` field from the API response
            alt={`Logo Images ${index + 1}`}
            // Styling for consistent sizing
          />
        </li>
      ))}
    </ul></>
  );
};

export default BrandTwo;
