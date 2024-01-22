// utils/api.js
import axios from 'axios';
import { BASE_URL } from '../../utils/ApiConfig';

export const getProducts = async (page = 1, pageSize = 10) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/product/list?page=${page}&page_size=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    if (error.response) {
        setError(error.response.data.message || "An error occurred");
        console.error("Backend error message:", error.response.data.message);
      } else if (error.request) {
        setError("No response received from the server");
      } else {
        setError("An error occurred while setting up the request");
      }
    throw error;
  }
};
