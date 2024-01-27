import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import createReview from "../../hooks/products/CreateReviewApi";
import createPhotoReview from "../../hooks/products/CreateReviewPhotoApi";
import { FaTrash } from "react-icons/fa";

const AddReviewPage = () => {
  const { orderDetailsId, productId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const navigate = useNavigate();

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const files = e.target.files;
    const photosArray = Array.from(files);
    setUploadedPhotos([...uploadedPhotos, ...photosArray]);
  };

  const handlePreviewClick = (index) => {
    setCurrentPhotoIndex(index);
  };

  const handleDeletePreview = (index) => {
    const newPhotos = [...uploadedPhotos];
    newPhotos.splice(index, 1);
    setUploadedPhotos(newPhotos);
    setCurrentPhotoIndex(0); // Reset currentPhotoIndex to the first photo after deletion
  };

  const handleSubmitReview = async () => {
    try {
      setLoading(true);

      const reviewData = {
        product_id: parseInt(productId),
        order_details_id: parseInt(orderDetailsId),
        rating,
        description: comment,
      };

      console.log("Data yang dikirim ke API:", reviewData);

      // Call your API to create a review
      const createdReview = await createReview(reviewData);

      console.log("Review yang dibuat:", createdReview);

      // Upload photos for the created review
      const reviewId = createdReview.data.id;

      for (let i = 0; i < uploadedPhotos.length; i++) {
        const photoFormData = new FormData();
        photoFormData.append("review_id", reviewId);
        photoFormData.append("photo", uploadedPhotos[i]);

        console.log(`Mengunggah foto ke-${i + 1}:`, uploadedPhotos[i]);

        // Call your API to upload photo for the review
        await createPhotoReview(photoFormData);
      }

      console.log("Pengunggahan foto selesai.");

      // Reset the form after submitting
      setRating(0);
      setComment("");
      setUploadedPhotos([]);
      setLoading(false);

      // Redirect or navigate to a different page
      navigate(`/review/list`);
    } catch (error) {
      setError(error);
      setLoading(false);
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-8 min-h-screen bg-gray-100">
      <div className="container mx-auto lg:px-8 lg:max-w-7xl">
        <div className="bg-white rounded-lg shadow-lg p-4 lg:p-8 mt-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Review Produk</h2>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-center space-x-4">
              <label className="text-sm font-medium">Rating:</label>
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  onClick={() => handleRatingChange(value)}
                  className={`${
                    rating >= value ? "text-yellow-500" : "text-gray-300"
                  } hover:text-yellow-500 focus:outline-none`}
                >
                  ★
                </button>
              ))}
            </div>
            <div>
              <label className="text-sm font-medium">Komentar:</label>
              <textarea
                value={comment}
                onChange={handleCommentChange}
                rows="4"
                className="border rounded-md p-2 w-full mb-4"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Unggah Foto:</label>
              <input
                type="file"
                id="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                multiple
                className="border rounded-md p-2 w-full mb-4"
              />
            </div>
            {uploadedPhotos.length > 0 && (
              <div className="flex flex-wrap space-x-4">
                {uploadedPhotos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Ulasan Foto ${index + 1}`}
                      className={`w-24 h-24 object-cover rounded-md cursor-pointer ${
                        index === currentPhotoIndex
                          ? "border-2 border-blue-500"
                          : ""
                      }`}
                      onClick={() => handlePreviewClick(index)}
                    />
                    <button
                      onClick={() => handleDeletePreview(index)}
                      className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={handleSubmitReview}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Kirim Review"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReviewPage;
