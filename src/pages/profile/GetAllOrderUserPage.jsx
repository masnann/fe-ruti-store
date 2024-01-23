import React, { useState, useEffect } from "react";
import { Pagination } from "../../components/pagination/Pagination";

const GetAllOrderUser = () => {
  // Simulasi data pesanan
  const [orders, setOrders] = useState([
    {
      id: 1,
      product: {
        name: "Product A",
        photo: "url_foto_product_a",
        // Tambahkan properti lain yang diperlukan untuk produk
      },
      quantity: 2,
      total: 200000,
      status: "Pending",
    },
    {
      id: 2,
      product: {
        name: "Product B",
        photo: "url_foto_product_b",
        // Tambahkan properti lain yang diperlukan untuk produk
      },
      quantity: 1,
      total: 100000,
      status: "Completed",
    },
    // ... tambahkan pesanan lainnya
  ]);

  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Filter pesanan berdasarkan status yang dipilih
    if (selectedStatus === "All") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(
        (order) => order.status === selectedStatus
      );
      setFilteredOrders(filtered);
    }

    // Hitung total halaman untuk pagination
    const totalOrders = filteredOrders.length;
    const pageSize = 5; // Jumlah pesanan yang ditampilkan per halaman
    const calculatedTotalPages = Math.ceil(totalOrders / pageSize);
    setTotalPages(calculatedTotalPages);

    // Atur currentPage agar tidak melebihi totalPages
    setCurrentPage((prevPage) => Math.min(prevPage, calculatedTotalPages));
  }, [selectedStatus, orders, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleAcceptOrder = (orderId) => {
    // Logika untuk menerima pesanan
    console.log(`Menerima pesanan ${orderId}`);
  };

  const handleReviewProduct = (productName) => {
    // Logika untuk menampilkan halaman review produk
    console.log(`Menampilkan halaman review untuk produk ${productName}`);
  };

  return (
    <div className="container mx-auto p-4 sm:p-8 min-h-screen bg-gray-100">
      <div className="container mx-auto lg:px-8 lg:max-w-7xl">
        <div className="bg-white rounded-lg shadow-lg p-4 lg:p-8 mt-4">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Daftar Pesanan
          </h2>

          {/* Filter Dropdown */}
          <div className="mb-4 float-end">
            <label htmlFor="statusFilter" className="text-sm font-medium mr-2">
              Filter Status:
            </label>
            <select
              id="statusFilter"
              className="border rounded-md p-2"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">Semua</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              {/* Tambahkan opsi status lainnya sesuai kebutuhan */}
            </select>
          </div>

          {/* Daftar Pesanan */}
          {filteredOrders
            .slice((currentPage - 1) * 5, currentPage * 5)
            .map((order) => (
              <div key={order.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    {order.product.photo ? (
                      <img
                        src={order.product.photo}
                        alt={`${order.product.name}`}
                        className="w-full h-full object-cover object-center"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300"></div>
                    )}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold mb-2">{order.product.name}</h3>
                    <p className="text-gray-600 mb-2">{`Quantity: ${order.quantity}`}</p>
                    <p className="text-gray-600 mb-2">{`Total Bayar: ${order.total}`}</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-2">{`Status: ${order.status}`}</p>
                <div className="flex justify-end">
                  {order.status === "Pending" && (
                    <button
                      onClick={() => handleAcceptOrder(order.id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
                    >
                      Terima Pesanan
                    </button>
                  )}
                  <button
                    onClick={() => handleReviewProduct(order.product.name)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Review Produk
                  </button>
                </div>
              </div>
            ))}
        </div>
        {/* Display Pagination */}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onChangePage={handlePageChange}
        />
      </div>
    </div>
  );
};

export default GetAllOrderUser;
