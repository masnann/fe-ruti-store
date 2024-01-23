import axios from 'axios';
import { BASE_URL } from '../../utils/ApiConfig';

const getUserProfile = async () => {
  try {
    const token = sessionStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found. Redirecting to login.');
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(`${BASE_URL}/api/v1/user/get-profile`, null, {
      headers,
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching profile:", error);

    if (error.response) {
      console.error("Backend error message:", error.response.data.message);
    } else if (error.request) {
    
      console.error("No response received from the server");
    } else {
      console.error("An error occurred while setting up the request");
    }
    throw error;
  }
};

export default getUserProfile;
