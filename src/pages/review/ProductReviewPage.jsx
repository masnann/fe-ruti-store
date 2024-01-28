// Import beberapa dependencies yang dibutuhkan
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Pagination } from "../../components/pagination/Pagination";
import useProductDetail from "../../hooks/products/DetailsProduct";
import getReviewsList from "../../hooks/products/GetProductReview";
import { useParams } from "react-router-dom";

const ProductReviewPage = () => {
  // Ambil parameter ID produk dari URL
  const { id } = useParams();

  // Gunakan ID produk dari URL untuk mendapatkan detail produk
  const {
    productDetail,
    loading: productLoading,
    error: productError,
  } = useProductDetail(id);

  // Gunakan ID produk dari URL untuk mendapatkan ulasan produk
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsResponse = await getReviewsList(id, currentPage);
        setReviews(reviewsResponse.data);
        setTotalPages(reviewsResponse.pagination.total_pages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setError("Error fetching reviews");
        setLoading(false);
      }
    };

    fetchReviews();
  }, [id, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (productLoading || loading) {
    return <p>Loading...</p>;
  }

  if (productError || error) {
    return <p>Error: {productError || error}</p>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-8 min-h-screen bg-gray-100">
      <div className="container mx-auto lg:px-8 lg:max-w-7xl">
        <div className="container mx-auto mt-2">
          {/* Display Product Information */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">
              {productDetail?.name || "Product Name"}
            </h1>
            <div className="flex items-center justify-center mt-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={24}
                  color={productDetail.rating >= star ? "#FFD700" : "#C0C0C0"}
                />
              ))}
              <span className="text-gray-600 ml-2 text-lg">
                {productDetail.rating}
              </span>
              <span className="text-gray-600 ml-2">
                ({productDetail.total_reviews} ulasan)
              </span>
            </div>
          </div>

          {/* Display Product Reviews or "Belum ada ulasan" message */}
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white p-6 rounded-lg shadow-md mb-4"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      {review.user.photo_profile ? (
                        <img
                          src={review.user.photo_profile}
                          alt={`${review.user.name}'s profile`}
                          className="w-full h-full object-cover object-center"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300"></div>
                      )}
                    </div>
                    <span className="font-semibold text-lg ml-4">
                      {review.user.name}
                    </span>
                  </div>
                  <div className="flex text-yellow-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        size={18}
                        color={review.rating >= star ? "#FFD700" : "#C0C0C0"}
                      />
                    ))}
                  </div>
                </div>
                {review.photos.length > 0 && (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {review.photos.map((photo) => (
                      <div key={photo.id}>
                        <img
                          className="h-40 w-full max-w-full rounded-lg object-cover object-center"
                          src={photo.url}
                          alt={`review-photo-${photo.id}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex items-center mt-4">
                  <span className="text-gray-600">{review.description}</span>
                </div>
              </div>
            ))
          ) : (
            <p>Belum ada ulasan untuk produk ini.</p>
          )}

          {/* Display Pagination */}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onChangePage={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductReviewPage;
