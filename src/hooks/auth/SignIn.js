// AuthService.js
import axios from "axios";
import { BASE_URL } from "../../utils/ApiConfig";

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/auth/login`, {
      email,
      password,
    });

    if (response.status === 200) {
      // Authentication successful, store the token in sessionStorage
      sessionStorage.setItem("token", response.data.data.access_token); 

      // Return the user data or a success message
      return response.data;
    } else {
      // Authentication failed, return an error message
      throw new Error("Authentication failed. Please check your credentials.");
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
    throw new Error("An error occurred. Please try again later.");
  }
};

