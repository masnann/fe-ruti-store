import axios from 'axios';
import { BASE_URL } from '../../utils/ApiConfig';

const getCartList = async () => {
  try {
    const token = sessionStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found. Redirecting to login.');
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(`${BASE_URL}/api/v1/order/cart/list`, {
      headers,
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching cart list:', error);
    if (error.response) {
      throw new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      throw new Error('No response received from the server');
    } else {
      throw new Error('An error occurred while setting up the request');
    }
  }
};

export default getCartList;
