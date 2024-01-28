import React, { useState, useEffect } from "react";
import getAddressList from "../../hooks/profile/GetAddressApi";
import { useNavigate, useLocation } from "react-router-dom";
import createOrderFromCart from "../../hooks/order/CreateOrderByCartApi";
import Loading from "../../components/modals/Loading";
import AlamatModal from "../../components/modals/SelectAddress";

const OrderByCart = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [selectedCart, setSelectedCart] = useState(state?.selectedCart || []);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [note, setNote] = useState("");
  const [totalPriceWithoutDiscount, setTotalPriceWithoutDiscount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAlamatModalOpen, setAlamatModalOpen] = useState(false);

  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await getAddressList();
        setAddresses(data.data);
        const primaryAddress =
          data.data.find((addr) => addr.is_primary) || data.data[0];
        setSelectedAddress(primaryAddress);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching addresses:", error);
        setLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  useEffect(() => {
    calculateTotals();
  }, [selectedCart]);

  const calculateTotals = () => {
    let totalPrice = 0;
    let totalDiscountAmount = 0;

    selectedCart.forEach((item) => {
      const itemPrice = item.product.price * item.quantity;
      const itemDiscount = item.product.discount * item.quantity;

      totalPrice += itemPrice;
      totalDiscountAmount += itemDiscount;
    });

    setTotalPriceWithoutDiscount(totalPrice);
    setTotalDiscount(totalDiscountAmount);

    const adminFee = 2000;
    const shippingFee = 0;

    const totalPaymentAmount =
      totalPrice - totalDiscountAmount + adminFee + shippingFee;
    setTotalPayment(totalPaymentAmount);
    setLoading(false);
  };

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleAlamatModalOpen = () => {
    setAlamatModalOpen(true);
  };

  const handleAlamatSelect = (selectedAddressId) => {
    const selectedAddressObject = addresses.find(
      (address) => address.id === selectedAddressId
    );

    if (selectedAddressObject) {
      setSelectedAddress(selectedAddressObject);
      setAlamatModalOpen(false);
    } else {
      console.error("Alamat yang dipilih tidak valid");
    }
  };

  const handleCheckout = async () => {
    try {
      if (!selectedAddress) {
        alert("Mohon pilih alamat pengiriman!");
        return;
      }

      const checkoutData = {
        address_id: selectedAddress.id,
        note: note,
        cart_items: selectedCart.map((item) => ({
          id: item.id,
        })),
      };

      const response = await createOrderFromCart(checkoutData);

      if (response && response.data && response.data.redirect_url) {
        window.open(response.data.redirect_url, "_blank");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-100 p-4">
      <div className="container mx-auto p-4 mb-4 lg:px-8 lg:mx-auto lg:max-w-7xl">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        {/* Alamat */}
        <div className="bg-white p-8 rounded-md shadow-md mb-4">
          <h1 className="font-semibold text-lg mb-2">Alamat Pengiriman</h1>
          {selectedAddress && (
            <>
              <p className="text-base mb-2">{selectedAddress.accepted_name}</p>
              <div className="flex">
                <p className="text-sm text-gray-600 mr-4">
                  {`${selectedAddress.address}, ${selectedAddress.city_name}, ${selectedAddress.province_name}`}
                </p>
                {selectedAddress.is_primary && (
                  <span className="text-sm text-orange-600">Alamat Utama</span>
                )}
              </div>
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full sm:w-auto mt-4"
                onClick={handleAlamatModalOpen}
              >
                Ganti Alamat
              </button>
            </>
          )}
        </div>

        {/* Produk */}
        <div className="bg-white rounded-md shadow-md mb-4">
          <div className="p-8">
            <h2 className="font-bold text-lg mb-4">Produk</h2>
            {selectedCart.map((item) => (
              <div className="flex flex-col md:flex-row mb-4" key={item.id}>
                <div className="w-full md:w-40 md:h-40 mb-4 md:mb-0">
                  <img
                    src={item.product.product_photos[0].url}
                    alt={item.product.name}
                    className="w-full h-full object-cover max-w-full max-h-full"
                  />
                </div>
                <div className="md:ml-4 flex-1">
                  <div className="flex justify-between">
                    <p className="font-semibold text-base mb-2">
                      {item.product.name}
                    </p>
                    <p className="font-semibold text-base mb-2">
                      Rp. {item.product.price}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-base">Diskon: </p>
                    <p className="text-base">Rp. {item.product.discount}</p>
                  </div>
                  <p className="text-base ">Ukuran: {item.size}</p>
                  <p className="text-base ">Warna: {item.color}</p>
                  <p className="text-base mb-2">Jumlah: {item.quantity}</p>
                </div>
              </div>
            ))}
            <div className="mb-4 mt-4">
              <label
                htmlFor="note"
                className="block text-base text-gray-700 mb-2"
              >
                Catatan Pembeli (Opsional):
              </label>
              <input
                type="text"
                id="note"
                name="note"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-sm"
                placeholder="Tambahkan catatan untuk pesanan Anda (opsional)"
                value={note}
                onChange={handleNoteChange}
              />
            </div>

            <div className="flex justify-between mt-4">
              <p className="text-base mb-2">Subtotal Biaya Produk:</p>
              <p className="text-base">Rp {totalPriceWithoutDiscount}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-base mb-2">Subtotal Diskon Produk:</p>
              <p className="text-base">Rp {totalDiscount}</p>
            </div>

            <div className="flex justify-between mb-2">
              <p className="text-base">Biaya Admin:</p>
              <p className="text-base">Rp 2000</p>
            </div>
            <div className="flex justify-between  mb-2">
              <p className="text-base">Biaya Pengiriman: </p>
              <p className="text-base">Rp 0</p>
            </div>
            <div className="flex justify-between  mb-2">
              <p className="text-base font-bold">Total Bayar:</p>
              <p className="text-base font-bold">Rp {totalPayment}</p>
            </div>
          </div>
        </div>

        {/* Tombol Bayar Sekarang */}
        <button
          className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 font-bold py-2 px-4 rounded float-end mb-4"
          onClick={handleCheckout}
        >
          Bayar Sekarang
        </button>
      </div>
      <AlamatModal
        isOpen={isAlamatModalOpen}
        onClose={() => setAlamatModalOpen(false)}
        onAddressSelect={handleAlamatSelect}
      />
    </div>
  );
};

export default OrderByCart;
