// GetAllProduct.jsx
import React, { useState, useEffect } from "react";
import ProductItem from "../../components/home/ProductItem";
import Loading from "../../components/modals/Loading";
import { useNavigate } from "react-router-dom";
import getProductRecommendations from "../../hooks/products/GetRecomendationProductApi";

const GetAllProductRecomendaton = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getProductRecommendations();
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/details/${productId}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-100 p-4">
      <div className="mb-4 lg:px-8 lg:mx-auto lg:max-w-7xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Produk Rekomendasi</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GetAllProductRecomendaton;
