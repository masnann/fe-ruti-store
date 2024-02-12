// CategoryItem.jsx
import React from "react";

const CategoryItem = ({ category, onClick }) => (
  <div
    className="category-slider-item"
    onClick={() => onClick(category.id)}
  >
    <div className="rounded-lg overflow-hidden shadow-sm p-2" style={{ borderRadius: "12px" }}>
      <div className="flex flex-col items-center">
        <img
          src={category.photo}
          alt={category.name}
          className="w-full h-40 object-cover rounded-lg"
          style={{ borderRadius: "12px" }}
        />
        <div className="text-center">
          <p className="text-lg font-semibold">{category.name}</p>
        </div>
      </div>
    </div>
  </div>
);

export default CategoryItem;
