// GetAllProduct.jsx
import React, { useState, useEffect } from "react";
import { Pagination } from "../../components/pagination/Pagination";
import { getProducts } from "../../hooks/products/GetAllProduct";
import ProductItem from "../../components/home/ProductItem";
import Loading from "../../components/modals/Loading";
import { useNavigate } from "react-router-dom";

const GetAllProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getProducts(currentPage, 10);
        setProducts(response.data);
        setTotalPages(response.pagination.total_pages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/details/${productId}`);
  };

  return (
    <div className="bg-gray-100 p-4">
      <div className="mb-4 lg:px-8 lg:mx-auto lg:max-w-7xl">
        <h2 className="text-2xl font-bold mb-4">Produk</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading ? (
            <Loading />
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            products.map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                onClick={() => handleProductClick(product.id)}
              />
            ))
          )}
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onChangePage={handlePageChange}
        />
      </div>
    </div>
  );
};

export default GetAllProduct;
