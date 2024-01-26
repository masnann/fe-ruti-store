import axios from 'axios';
import { BASE_URL } from '../../utils/ApiConfig';

const getProductRecommendations = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/product/recommendation-user`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching product recommendations:', error);
    if (error.response) {
      throw new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      throw new Error('No response received from the server');
    } else {
      throw new Error('An error occurred while setting up the request');
    }
  }
};

export default getProductRecommendations;
