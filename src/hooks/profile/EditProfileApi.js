import axios from 'axios';
import { BASE_URL } from '../../utils/ApiConfig';

const editUserProfile = async (formData) => {
  try {
    const token = sessionStorage.getItem('token');

    if (!token) {
      throw new Error('Token not found');
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data', 
    };

    const response = await axios.post(`${BASE_URL}/api/v1/user/edit-profile`, formData, {
      headers,
    });

    // Check if the response contains the success message
    if (response.data && response.data.message === 'Successfully retrieved edit profile') {
      return response.data; // You might return specific data if needed
    } else {
      throw new Error('Edit profile failed. Unexpected response.');
    }
  } catch (error) {
    console.error("Error editing profile:", error);

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

export default editUserProfile;
