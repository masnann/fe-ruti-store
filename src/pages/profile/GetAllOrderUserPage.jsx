import React, { useState, useEffect } from "react";
import { Pagination } from "../../components/pagination/Pagination";
import Sidebar from "../../components/sidebar/SidebarProfile";
import Loading from "../../components/modals/Loading";
import getOrdersList from "../../hooks/order/GetOrderUserApi";
import acceptOrder from "../../hooks/order/AcceptOrderApi";
import { useNavigate } from "react-router-dom";

const GetAllOrderUser = () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getOrdersList(currentPage, 10, selectedStatus);
        setFilteredOrders(response.data);
        setTotalPages(response.pagination.total_pages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, selectedStatus]);

  const handleAcceptOrder = async (id) => {
    try {
      await acceptOrder(id);
      const response = await getOrdersList(currentPage, 10, selectedStatus);
      setFilteredOrders(response.data);
      setTotalPages(response.pagination.total_pages);
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return <Loading />;
  }

  const handleDetailOrder = (id) => {
    navigate(`/user/profile/orders/details/${id}`);
  };

  return (
    <div className="bg-gray-100 p-4">
      <div className="container mx-auto lg:px-8 lg:max-w-7xl">
        <div className="flex flex-wrap">
          <Sidebar />
          <div className="w-full lg:w-3/4 bg-white rounded-lg shadow-lg p-4 lg:p-8 mt-4 lg:mt-0 flex flex-col">
            <h2 className="text-2xl font-bold text-center mb-2">
              DAFTAR PESANAN
            </h2>
            <div className="mb-2 mt-2 flex justify-end items-center mr-2">
              <label
                htmlFor="statusFilter"
                className="text-sm font-medium mr-2"
              >
                Filter:
              </label>
              <select
                id="statusFilter"
                className="border rounded-md p-2"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">Semua</option>
                <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                <option value="Proses">Proses</option>
                <option value="Pengiriman">Pengiriman</option>
                <option value="Selesai">Selesai</option>
                <option value="Gagal">Gagal</option>
              </select>
            </div>
            <div className="p-2">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white p-4 rounded-lg shadow-md mb-4"
                >
                  <p className="mb-4 font-semibold text-blue-500">
                    Nomor Pesanan: {order.id_order}
                  </p>

                  {order.order_details.map((orderDetail) => (
                    <div
                      key={orderDetail.id}
                      className="flex flex-col md:flex-row mt-4 border-b border-gray-300 pb-4"
                    >
                      <div className="w-full md:w-40 md:h-40 mb-4 md:mb-0">
                        <img
                          src={orderDetail.product.product_photos[0].url}
                          alt={orderDetail.product.name}
                          className="w-full h-full object-cover max-w-full max-h-full rounded-md shadow-md"
                        />
                      </div>
                      <div className="w-3/4 md:ml-4">
                        <div className="flex justify-between">
                          <p className="font-semibold text-base mb-2">
                            {orderDetail.product.name}
                          </p>
                          <p className="font-semibold text-base mb-2">
                            Rp. {orderDetail.total_price}
                          </p>
                        </div>
                        <p>Ukuran: {orderDetail.size}</p>
                        <p>Jumlah: {orderDetail.quantity}</p>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between mt-2">
                    <p className="font-semibold text-red-600">
                      Status Pesanan:
                    </p>
                    <p className="font-semibold text-red-600">
                      {order.order_status}
                    </p>
                  </div>
                  <div className="flex justify-between mt-2">
                    <p className="font-semibold mb-2 flex justify-end">
                      Total Pembayaran:
                    </p>
                    <p className="font-semibold mb-2">
                      Rp. {order.total_amount_paid}
                    </p>
                  </div>

                  <div className="flex justify-end mt-2">
                    {order.order_status !== "Selesai" &&
                      order.order_status !== "Gagal" && (
                        <button
                          className="bg-green-500 text-white px-2 py-1 rounded mr-2 sm:px-3 sm:py-1 sm:mr-2 md:px-4 md:py-2 md:mr-2"
                          onClick={() => handleAcceptOrder(order.id)}
                        >
                          Terima Pesanan
                        </button>
                      )}
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded sm:px-3 sm:py-1 sm:mr-2 md:px-4 md:py-2 md:mr-2"
                      onClick={() => handleDetailOrder(order.id)}
                    >
                      Detail Pesanan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
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

export default GetAllOrderUser;
