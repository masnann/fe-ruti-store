// utils/api.js
import axios from 'axios';
import { BASE_URL } from '../../utils/ApiConfig';

export const getProductsByCategoryId = async (id, page = 1, pageSize = 10) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/category/product/list/${id}?page=${page}&page_size=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category ID:', error);
    throw error;
  }
};
