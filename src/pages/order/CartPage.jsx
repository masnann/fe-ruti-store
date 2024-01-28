import React, { useState, useEffect } from "react";
import getCartList from "../../hooks/order/GetCartApi";
import deleteCartItem from "../../hooks/order/DeleteCartApi";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCart, setSelectedCart] = useState([]);
  
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cartData = await getCartList();
        setCartItems(
          cartData.data.map((item) => ({
            ...item,
            discount: item.product.discount || 0,
            selected: false,
          }))
        );
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchCartData();
  }, []);

  const selectedItems = cartItems.filter((item) => item.selected);

  // Menghitung total harga produk tanpa diskon
  const totalPriceWithoutDiscount = selectedItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Menghitung total diskon yang diterapkan pada keranjang
  const totalDiscount = selectedItems.reduce(
    (total, item) => total + item.discount * item.quantity,
    0
  );

  // Menghitung total harga produk dengan diskon
  const totalPriceWithDiscount = totalPriceWithoutDiscount - totalDiscount;

  const updateQuantity = (itemId, newQuantity) => {
    newQuantity = Math.max(1, newQuantity);

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const toggleSelect = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, selected: !item.selected } : item
      )
    );

    setSelectedCart((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId)
        : [...prevSelected, itemId]
    );
  };

  const removeItem = async (itemId) => {
    try {
      await deleteCartItem(itemId);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
      window.location.reload();
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  return (
    <div className="bg-gray-100 p-4">
      <div className="container mx-auto p-4 mb-4 lg:px-8 lg:mx-auto lg:max-w-7xl">
        <h1 className="text-3xl font-semibold mb-6">Keranjang Belanja</h1>

        {isLoading && <p>Loading...</p>}

        {error && <p>Error fetching cart data: {error}</p>}

        {!isLoading && !error && cartItems.length === 0 && (
          <p>Keranjangmu kosong</p>
        )}

        {!isLoading && !error && cartItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className={`bg-white p-4 rounded-md shadow-md ${
                  item.selected ? "border-4 border-blue-500" : ""
                }`}
              >
                <img
                  src={
                    item.product.product_photos.length > 0
                      ? item.product.product_photos[0].url
                      : "placeholder-url"
                  }
                  alt={item.product.name}
                  className="w-full h-32 object-cover mb-4 rounded-md"
                />
                <h2 className="text-lg font-semibold mb-2">
                  {item.product.name}
                </h2>
                <p className="text-gray-600">Harga: Rp. {item.product.price}</p>
                <p className="text-gray-600">Diskon: Rp. {item.discount}</p>
                <p className="text-gray-600">Ukuran: {item.size}</p>

                <p className="text-gray-600">
                  Subtotal: Rp.{" "}
                  {(item.product.price - item.discount) * item.quantity}
                </p>
                <div className="flex items-center mb-4 mt-4">
                  <p className="text-gray-600 mr-2">Kuantitas:</p>
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
          <div className="bg-white p-8 rounded-md shadow-md mt-4">
            <h2 className="text-xl font-semibold mb-2">Total Harga</h2>

            <div className="flex justify-between mb-2">
              <p className="text-gray-600">Total Harga Tanpa Diskon:</p>
              <p className="text-gray-600">Rp. {totalPriceWithoutDiscount}</p>
            </div>

            <div className="flex justify-between mb-2">
              <p className="text-gray-600">Total Diskon:</p>
              <p className="text-gray-600">Rp. {totalDiscount}</p>
            </div>

            <div className="flex justify-between mb-2">
              <p className="text-gray-600">Total Harga Dengan Diskon:</p>
              <p className="text-gray-600 font-semibold">
                Rp. {totalPriceWithDiscount}
              </p>
            </div>
          </div>
        )}
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 float-end mb-4"
          onClick={() =>
            navigate("/order/checkout/cart", {
              state: { selectedCart: selectedItems },
            })
          }
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
