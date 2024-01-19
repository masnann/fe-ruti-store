// utils/api.js
import axios from 'axios';
import { BASE_URL } from '../../utils/ApiConfig';

export const getArticles = async (page = 1, pageSize = 10) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/article/list?page=${page}&page_size=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};
