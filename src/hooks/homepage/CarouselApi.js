// utils/api.js
import axios from 'axios';
import { BASE_URL } from '../../utils/ApiConfig';

const getCarouselList = async (page = 1, pageSize = 10) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/home/carousel/list?page=${page}&page_size=${pageSize}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching carousel list:', error);
    if (error.response) {
      throw new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      throw new Error('No response received from the server');
    } else {
      throw new Error('An error occurred while setting up the request');
    }
  }
};

export default getCarouselList;
