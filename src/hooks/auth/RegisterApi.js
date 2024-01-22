import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/ApiConfig";

const useRegisterApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (email, password, name, phone) => {
    setIsLoading(true);

    try {
      // Make the API request to register a user
      const response = await axios.post(`${BASE_URL}/api/v1/auth/register`, {
        email,
        password,
        name,
        phone,
      });

      // Optionally, you can handle the success response here if needed
      console.log("Registration successful:", response.data);

      // Reset error state
      setError(null);
    } catch (error) {
      console.error("Error during registration:", error);

      if (error.response) {
        // The request was made, but the server responded with a status code
        // that falls out of the range of 2xx
        setError(error.response.data.message || "An error occurred");
        console.error("Backend error message:", error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        setError("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("An error occurred while setting up the request");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
};

export default useRegisterApi;
