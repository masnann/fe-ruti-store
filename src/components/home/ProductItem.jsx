// ProductItem.jsx
import React from "react";
import { StarIcon } from "@heroicons/react/20/solid";

const ProductItem = ({ product, onClick }) => {
  const filledStars = Array.from({
    length: Math.floor(product.rating),
  }).map((_, index) => (
    <StarIcon key={index} className="w-5 h-5 text-yellow-500" />
  ));

  const emptyStars = Array.from({
    length: 5 - Math.floor(product.rating),
  }).map((_, index) => (
    <StarIcon key={index} className="w-5 h-5 text-gray-300" />
  ));

  return (
    <div
      className="product bg-white p-4 rounded-lg shadow-md cursor-pointer"
      onClick={onClick}
    >
      {product.photos.length > 0 && (
        <img
          src={product.photos[0].url}
          alt={product.name}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
      )}
      <div className="flex justify-between items-center mb-2">
        <p className="text-lg font-semibold">{product.name}</p>
        <div className="flex">
          {filledStars}
          {emptyStars}
        </div>
      </div>
      <p className="text-gray-700 mb-2 font-semibold">Rp. {product.price}</p>
    </div>
  );
};

export default ProductItem;
