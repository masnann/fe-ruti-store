// OrderItem.jsx
import React from "react";

const OrderItem = ({ order }) => {
  const handleAcceptOrder = () => {
    // Logika untuk menerima pesanan
    console.log(`Menerima pesanan ${order.id}`);
  };

  const handleReviewProduct = () => {
    // Logika untuk menampilkan halaman review produk
    console.log(`Menampilkan halaman review untuk produk ${order.product.name}`);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex flex-col lg:flex-row justify-between items-center">
      <div className="lg:mr-4">
        <h3 className="text-lg font-semibold mb-2">{order.product.name}</h3>
        <p className="text-gray-600 mb-2">{`Status: ${order.status}`}</p>
      </div>
      <div className="mt-2 lg:mt-0 flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
        <button
          onClick={handleAcceptOrder}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Terima Pesanan
        </button>
        <button
          onClick={handleReviewProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Review Produk
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
