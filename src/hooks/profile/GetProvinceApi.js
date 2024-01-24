// src\hooks\profile\GetProvinceApi.js
import axios from 'axios';
import { BASE_URL } from '../../utils/ApiConfig';

const getProvinceList = async () => {
  try {
    const token = sessionStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found. Redirecting to login.');
    }

    const response = await axios.get(`${BASE_URL}/api/v1/address/get-province`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data.data.rajaongkir.results;
  } catch (error) {
    console.error('Error fetching province list:', error);
    if (error.response) {
      throw new Error(error.response.data.message || 'An error occurred');
    } else if (error.request) {
      throw new Error('No response received from the server');
    } else {
      throw new Error('An error occurred while setting up the request');
    }
  }
};

export default getProvinceList;
