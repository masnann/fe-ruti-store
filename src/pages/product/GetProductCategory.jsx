import React, { useState, useEffect } from "react";
import { Pagination } from "../../components/pagination/Pagination";
import { getProductsByCategoryId } from "../../hooks/products/GetProductCategory";
import ProductItem from "../../components/home/ProductItem";
import Loading from "../../components/modals/Loading";
import { useNavigate, useParams } from "react-router-dom";

const GetAllProductCategory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (id) {
          const response = await getProductsByCategoryId(id, currentPage, 10);
          setProducts(response.data);
          setTotalPages(response.pagination.total_pages);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products by category ID:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

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
          <h2 className="text-2xl font-bold">Produk</h2>
          {/* <input
            type="text"
            placeholder="Cari produk..."
            className="border px-4 py-2 rounded-md"
          /> */}
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
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onChangePage={handlePageChange}
        />
      </div>
    </div>
  );
};

export default GetAllProductCategory;
