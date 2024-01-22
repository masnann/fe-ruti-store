import React, { useState } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 19.99,
      quantity: 2,
      image: "https://placekitten.com/150/150", // URL gambar produk
      selected: false,
    },
    {
      id: 2,
      name: "Product 2",
      price: 29.99,
      quantity: 1,
      image: "https://placekitten.com/150/150", // URL gambar produk
      selected: false,
    },
    // Tambahkan item lainnya sesuai kebutuhan
  ]);

  // Filter produk yang dipilih
  const selectedItems = cartItems.filter((item) => item.selected);

  // Menghitung total harga berdasarkan produk yang dipilih
  const totalPrice = selectedItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Menambah atau mengurangi kuantitas produk dalam keranjang
  const updateQuantity = (itemId, newQuantity) => {
    // Pastikan kuantitas tidak kurang dari 1
    newQuantity = Math.max(1, newQuantity);

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Menandai atau membatalkan tanda pada produk
  const toggleSelect = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Menghapus produk dari keranjang
  const removeItem = (itemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <div className="bg-gray-100 p-4">
      <div className="container mx-auto p-4 mb-4 lg:px-8 lg:mx-auto lg:max-w-7xl">
        <h1 className="text-3xl font-semibold mb-6">Keranjang Belanja</h1>

        {cartItems.length === 0 ? (
          <p>Keranjangmu kosong</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className={`bg-white p-4 rounded-md shadow-md ${
                  item.selected ? "border-4 border-blue-500" : ""
                }`}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover mb-4 rounded-md"
                />
                <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                <p className="text-gray-600">Harga: Rp. {item.price.toFixed(2)}</p>

                <p className="text-gray-600">
                  Subtotal: Rp. {(item.price * item.quantity).toFixed(2)}
                </p>
                <div className="flex items-center mb-4 mt-4">
                  <p className="text-gray-600 mr-2">Kuantitas:</p>
                  {/* Input untuk mengubah kuantitas produk */}
                  <input
                    type="number"
                    className="border border-gray-300 rounded-md py-1 px-2 text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                  />
                </div>

                <div className="flex justify-between items-center">
                  {/* Tombol untuk menandai atau membatalkan tanda pada produk */}
                  <button
                    className={`${
                      item.selected
                        ? "bg-blue-500 text-white"
                        : "bg-gray-500 text-gray-200"
                    } flex items-center justify-center px-4 py-2 rounded-md text-sm hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300`}
                    onClick={() => toggleSelect(item.id)}
                  >
                    {item.selected ? "Dipilih" : "Pilih"}
                  </button>

                  {/* Tombol untuk menghapus produk dari keranjang */}
                  <button
                    className="bg-red-500 text-white flex items-center justify-center px-4 py-2 rounded-md text-sm hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
                    onClick={() => removeItem(item.id)}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-2">Total Harga</h2>
            <p className="text-gray-600">Total: Rp. {totalPrice.toFixed(2)}</p>

            {/* Tombol Checkout */}
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              onClick={() => alert("Checkout button clicked")}
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
