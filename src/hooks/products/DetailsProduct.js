// useProductDetail.js
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../utils/ApiConfig";

const useProductDetail = (productId) => {
  const [productDetail, setProductDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        console.log("Fetching product detail for productId:", productId);
        const response = await axios.get(
          `${BASE_URL}/api/v1/product/details/${productId}`
        );
        setProductDetail(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product detail:", error);

        if (error.response) {
          setError(error.response.data.message || "An error occurred");
          console.error("Backend error message:", error.response.data.message);
        } else if (error.request) {
          setError("No response received from the server");
        } else {
          setError("An error occurred while setting up the request");
        }

        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [productId]);

  return { productDetail, loading, error };
};

export default useProductDetail;
