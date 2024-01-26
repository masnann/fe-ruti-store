import React from "react";

const OrderDetailPage = ({ order }) => {
  const mockOrderDetail = {
    message: "Update order successfully",
    data: {
      id: "80bc96b2-6170-4157-bb71-1d215c4dd5ed",
      id_order: "ORDER015",
      address_id: 1,
      user_id: 2,
      note: "Special instructions for the order",
      grand_total_quantity: 4,
      grand_total_price: 178000,
      shipment_fee: 0,
      admin_fees: 2000,
      grand_total_discount: 0,
      total_amount_paid: 180000,
      order_status: "Selesai",
      payment_status: "Menunggu Konfirmasi",
      created_at: "2024-01-18T13:06:40.128067Z",
      address: {
        id: 1,
        user_id: 2,
        accepted_name: "John Doe 4",
        phone: "123456789",
        province_name: "Sample Province",
        city_name: "Sample City",
        address: "123 Main Street",
        is_primary: false,
      },
      user: {
        id: 2,
        email: "user21@example.com",
        phone: "0981823123333333",
        name: "Admin Ruti 2",
        photo_profile:
          "https://res.cloudinary.com/dufa4bel6/image/upload/v1706011143/disappear/lrwm5w43sc67xilvvp9n.png",
      },
      order_details: [
        {
          id: 15,
          order_id: "80bc96b2-6170-4157-bb71-1d215c4dd5ed",
          product_id: 12,
          is_reviewed: true,
          size: "",
          quantity: 2,
          total_gram_plastic: 0,
          total_price: 80000,
          total_discount: 0,
          product: {
            id: 12,
            name: "Baju Kuning",
            price: 50000,
            discount: 0,
            product_photos: [
              {
                id: 3,
                product_id: 12,
                url: "https://res.cloudinary.com/dufa4bel6/image/upload/v1705503815/disappear/qdegk8yad71loqx5x5gm.png",
              },
            ],
          },
        },
        {
          id: 16,
          order_id: "80bc96b2-6170-4157-bb71-1d215c4dd5ed",
          product_id: 12,
          is_reviewed: false,
          size: "",
          quantity: 2,
          total_gram_plastic: 0,
          total_price: 98000,
          total_discount: 2000,
          product: {
            id: 12,
            name: "Baju Kuning",
            price: 50000,
            discount: 0,
            product_photos: [
              {
                id: 3,
                product_id: 12,
                url: "https://res.cloudinary.com/dufa4bel6/image/upload/v1705503815/disappear/qdegk8yad71loqx5x5gm.png",
              },
            ],
          },
        },
      ],
    },
  };

  const isAnyProductNotReviewed = mockOrderDetail.data.order_details.some(
    (orderDetail) => !orderDetail.is_reviewed
  );

  return (
    <div className="bg-gray-100 p-4">
      <div className="container mx-auto p-4 mb-4 lg:px-8 lg:mx-auto lg:max-w-7xl">
        <div className="bg-white p-8 rounded-md shadow-md mb-4">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Detail Pesanan
          </h2>

          <div className="mb-4 font-semibold text-blue-500">
            <p>Nomor Pesanan: {mockOrderDetail.data.id_order}</p>
          </div>

          <div className="flex flex-col lg:flex-row mb-4">
            <div className="lg:w-3/4 mb-4 lg:mb-0">
              <div className="mb-4 font-semibold text-lg">Detail Produk</div>
              {mockOrderDetail.data.order_details.map((orderDetail) => (
                <div
                  key={orderDetail.id}
                  className="flex flex-col md:flex-row mt-4 items-center border-b border-gray-300 pb-4"
                >
                  <div className="w-full md:w-40 md:h-40 mb-4 md:mb-0">
                    <img
                      src={orderDetail.product.product_photos[0].url}
                      alt={orderDetail.product.name}
                      className="w-full h-full object-cover max-w-full max-h-full rounded-md shadow-md"
                    />
                  </div>
                  <div className="w-3/4 md:ml-4">
                    <p className="font-semibold text-xl">
                      {orderDetail.product.name}
                    </p>
                    <p>Ukuran: {orderDetail.size}</p>
                    <p>Jumlah: {orderDetail.quantity}</p>
                    <p>Total Harga: Rp. {orderDetail.total_price}</p>
                    <button
                      className={`${
                        orderDetail.is_reviewed
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
                      } text-white px-6 py-2 rounded-md mt-2 w-full sm:w-auto`}
                      disabled={orderDetail.is_reviewed}
                      onClick={() => {
                        if (!orderDetail.is_reviewed) {
                          alert(
                            `Anda sudah mereview produk ${orderDetail.product.name}`
                          );
                        }
                      }}
                    >
                      {orderDetail.is_reviewed
                        ? "Sudah Direview"
                        : "Review Produk"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:w-1/4">
              <div className="mb-4 font-semibold text-lg">
                Alamat Pengiriman
              </div>
              <p>{mockOrderDetail.data.address.accepted_name}</p>
              <p>{mockOrderDetail.data.address.phone}</p>
              <p>{`${mockOrderDetail.data.address.address}, ${mockOrderDetail.data.address.city_name}, ${mockOrderDetail.data.address.province_name}`}</p>

              <div className="mt-4 font-semibold text-lg">
                Informasi Pembeli
              </div>
              <img
                src={mockOrderDetail.data.user.photo_profile}
                alt={mockOrderDetail.data.user.name}
                className="w-16 h-16 object-cover rounded-full mb-2"
              />
              <p>{mockOrderDetail.data.user.name}</p>
              <p>{mockOrderDetail.data.user.phone}</p>
            </div>
          </div>
          <p className="font-semibold mb-2 text-red-600 flex justify-end">
            Status Pesanan: {mockOrderDetail.data.order_status}
          </p>
          <div className="flex justify-end mt-2">
            {mockOrderDetail.data.order_status === "Selesai" && (
              <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full sm:w-auto">
                Terima Pesanan
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderDetailPage;
