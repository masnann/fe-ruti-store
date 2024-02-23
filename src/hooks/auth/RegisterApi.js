import axios from 'axios';
import { BASE_URL } from '../../utils/ApiConfig';

const registerUser = async (userData) => {
  const apiUrl = `${BASE_URL}/api/v1/auth/register`;

  try {
    const response = await axios.post(apiUrl, userData);

    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    if (error.response) {
      throw new Error(error.response.data.message || 'An error occurred during registration');
    } else if (error.request) {
      throw new Error('No response received from the server');
    } else {
      throw new Error('An error occurred while setting up the request');
    }
  }
};

export default registerUser;
