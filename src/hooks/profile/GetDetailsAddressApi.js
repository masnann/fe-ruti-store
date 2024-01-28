import axios from 'axios';
import { BASE_URL } from '../../utils/ApiConfig';

const getAddressDetails = async (addressId) => {
  try {
    const token = sessionStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found. Redirecting to login.');
    }

    const response = await axios.get(`${BASE_URL}/api/v1/address/details/${addressId}`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });

    return response.data.data; 
  } catch (error) {
    console.error('Error fetching address details:', error);
    if (error.response) {
      throw new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      throw new Error('No response received from the server');
    } else {
      throw new Error('An error occurred while setting up the request');
    }
  }
};

export default getAddressDetails;
