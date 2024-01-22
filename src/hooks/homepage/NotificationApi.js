import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/ApiConfig";

const useNotificationApi = () => {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Get the token from sessionStorage
        const token = sessionStorage.getItem("token");

        if (!token) {
          throw new Error("No token found");
        }

        // Set Authorization header
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Make the API request to get notifications
        const response = await axios.get(
          `${BASE_URL}/api/v1/notification/list`,
          { headers }
        );

        // Update the state with the notifications data
        setNotifications(response.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching notification:", error);

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

        setIsLoading(false);
      }
    };

    // Call the fetchNotifications function
    fetchNotifications();
  }, []); // Only run the effect once when the component mounts

  return { notifications, isLoading, error };
};

export default useNotificationApi;
