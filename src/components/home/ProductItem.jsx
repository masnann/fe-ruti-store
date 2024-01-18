// ProductItem.jsx
import React from "react";

const ProductItem = ({ product }) => {
  const filledStars = Array.from({ length: Math.floor(product.rating) }).map((_, index) => (
    <svg
      key={index}
      className="w-5 h-5 fill-current text-yellow-500"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M12 2c-.2 0-.4.1-.6.3l-7.3 8.2L3 11.5V21h18v-9.5l-1.1-1.3L12.6 2.3c-.1-.1-.3-.1-.6-.1zM12 0l1.5 1.7L12 3l-1.5-1.3L12 0zm0 4l2.3 2.6c.2.2.4.2.6 0L18 4v4H6V4l3.1 3.5c.2.2.4.2.6 0L12 4z" />
    </svg>
  ));

  const emptyStars = Array.from({ length: 5 - Math.floor(product.rating) }).map((_, index) => (
    <svg
      key={index}
      className="w-5 h-5 fill-current text-gray-300"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M12 2c-.2 0-.4.1-.6.3l-7.3 8.2L3 11.5V21h18v-9.5l-1.1-1.3L12.6 2.3c-.1-.1-.3-.1-.6-.1zM12 0l1.5 1.7L12 3l-1.5-1.3L12 0zm0 4l2.3 2.6c.2.2.4.2.6 0L18 4v4H6V4l3.1 3.5c.2.2.4.2.6 0L12 4z" />
    </svg>
  ));

  return (
    <div className="product bg-white p-4 rounded-lg shadow-md">
      
      <img
        src={product.photos.url}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <div className="flex justify-between items-center mb-2">
        <p className="text-lg font-semibold">{product.name}</p>
        <div className="flex">{filledStars}{emptyStars}</div>
      </div>
      <p className="text-gray-700 mb-2 font-semibold">Rp. {product.price}</p>
    </div>
  );
};

export default ProductItem;
