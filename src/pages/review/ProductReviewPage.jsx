import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Pagination } from "../../components/pagination/Pagination";

// Data produk dan ulasan statis
const productData = {
  id: 1,
  name: "Product A",
  description: "Deskripsi produk A...",
  total_review: 12,
  rating: 4,
  reviews: [
    {
      id: 1,
      user: {
        name: "User1",
        photo_profile: "url_foto_profile_user1", // Gantilah dengan URL foto profile yang sesuai
      },
      rating: 4,
      description: "Ulasan pengguna 1...",
      photos: [
        {
          id: 1,
          url: "url_foto_ulasan_user1", // Gantilah dengan URL foto ulasan yang sesuai
        },
      ],
    },
    {
      id: 2,
      user: {
        name: "User2",
        photo_profile: "url_foto_profile_user2", // Gantilah dengan URL foto profile yang sesuai
      },
      rating: 5,
      description: "Ulasan pengguna 2...",
      photos: [
        {
          id: 2,
          url: "url_foto_ulasan_user2", // Gantilah dengan URL foto ulasan yang sesuai
        },
      ],
    },
    // ... tambahkan ulasan lainnya
  ],
};

const ProductReviewPage = () => {
  // Menggunakan data produk dan ulasan statis
  const reviews = productData.reviews;
  const totalReviews = productData.total_review;
  const averageRating = productData.rating;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container mx-auto p-4 sm:p-8 min-h-screen bg-gray-100">
      <div className="container mx-auto lg:px-8 lg:max-w-7xl">
        <div className="container mx-auto mt-2">
          {/* Display Product Information */}
          <div className="mb-4 text-center">
            <h1 className="text-3xl font-bold mb-2">
              {productData.name}
            </h1>
            <div className="flex items-center justify-center mt-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={18}
                  color={averageRating >= star ? "#FFD700" : "#C0C0C0"}
                />
              ))}
               <span className="text-gray-600 ml-4">({totalReviews} ulasan)</span>
            </div>
            <div className="flex items-center mt-2 justify-center">
    
            </div>
          </div>

          {/* Display Product Reviews */}
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-lg shadow-md mb-4"
            >
              <div className="flex items-center mb-4">
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
                <div className="flex text-yellow-500 mt-1 ml-4">
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
          ))}

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
