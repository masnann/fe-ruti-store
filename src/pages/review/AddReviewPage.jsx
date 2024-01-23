import React, { useState } from "react";

const AddReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const files = e.target.files;
    const photosArray = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setUploadedPhotos((prevPhotos) => [...prevPhotos, ...photosArray]);
  };

  const handleSubmitReview = () => {
    // Implement logic to submit the review to the backend
    // You can send 'rating', 'comment', and 'uploadedPhotos' to your API endpoint
    console.log("Submitting review:", { rating, comment, uploadedPhotos });

    // Reset the form after submitting
    setRating(0);
    setComment("");
    setUploadedPhotos([]);
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
              <div className="flex space-x-4">
                {uploadedPhotos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Ulasan Foto ${index + 1}`}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                ))}
              </div>
            )}
            <button
              onClick={handleSubmitReview}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Kirim Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReviewForm;
