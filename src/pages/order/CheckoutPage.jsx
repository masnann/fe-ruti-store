// CheckoutPage.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useProductDetail from "../../hooks/products/DetailsProduct";
import Loading from "../../components/modals/Loading";
import AlamatModal from "../../components/modals/SelectAddress";
import getAddressList from "../../hooks/profile/GetAddressApi";
import createOrder from "../../hooks/order/OrderApi";

const CheckoutPage = () => {
  const location = useLocation();
  const { state } = location;

  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [note, setNote] = useState("");
  const [totalPayment, setTotalPayment] = useState(0);
  const [isAlamatModalOpen, setAlamatModalOpen] = useState(false);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await getAddressList();
        setAddresses(data.data);
        const primaryAddress =
          data.data.find((addr) => addr.is_primary) || data.data[0];
        setSelectedAddress(primaryAddress);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const { productId, selectedSize, selectedColor, quantity } =
    state && state.orderDetails ? state.orderDetails : {};

  const { productDetail, loading, error } = useProductDetail(productId);

  useEffect(() => {
    if (productDetail) {
      const productPrice = productDetail.price || 0;
      const adminFee = 2000;
      const shippingFee = 0;

      const discountPerProduct = productDetail.discount || 0;
      const totalDiscount = discountPerProduct * quantity;

      const totalPrice =
        productPrice * quantity - totalDiscount + adminFee + shippingFee;

      setTotalPayment(totalPrice);
    }
  }, [productDetail, quantity]);

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
        alert("Pilih alamat terlebih dahulu");
        return;
      }

      // Data pesanan
      const orderData = {
        address_id: selectedAddress.id,
        product_id: productId,
        size: selectedSize,
        color: selectedColor,
        quantity,
        note,
      };
      console.log("Data Pesanan:", orderData);

      // Membuat pesanan
      const orderResponse = await createOrder(orderData);

      if (orderResponse.message === "Order created successfully") {
        // Pesanan berhasil dibuat, arahkan pengguna ke redirect_url
        alert("Pesanan berhasil dibuat!");
        if (orderResponse.data.redirect_url) {
          window.location.href = orderResponse.data.redirect_url;
        } else {
          alert("Redirect URL tidak tersedia");
        }
      } else {
        // Gagal membuat pesanan, tanggapi sesuai kebutuhan
        alert(`Gagal membuat pesanan: ${orderResponse.message}`);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Terjadi kesalahan saat melakukan pembayaran. Silakan coba lagi.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto bg-gray-100 p-4">
      <div className="mb-4 lg:px-8 lg:mx-auto lg:max-w-7xl">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        {/* Alamat */}
        <div className="bg-white p-8 rounded-md shadow-md">
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
      </div>

      {/* Produk */}
      <div className="lg:px-8 lg:mx-auto lg:max-w-7xl">
        <div className="bg-white rounded-md shadow-md">
          <div className="p-8">
            <h2 className="font-bold text-lg mb-4">Produk</h2>
            {productDetail && (
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-40 md:h-40 mb-4 md:mb-0">
                  <img
                    src={productDetail.photos[0].url}
                    alt={productDetail.name}
                    className="w-full h-full object-cover max-w-full max-h-full"
                  />
                </div>
                <div className="md:ml-4 flex-1">
                  <div className="flex justify-between">
                    <p className="font-semibold text-base mb-2">
                      {productDetail.name}
                    </p>
                    <p className="font-semibold text-base mb-2">
                      Rp. {productDetail.price}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-base">Diskon: </p>
                    <p className="text-base">Rp. {productDetail.discount}</p>
                  </div>
                  <p className="text-base ">Ukuran: {selectedSize}</p>
                  <p className="text-base ">Warna: {selectedColor}</p>
                  <p className="text-base ">Jumlah: {quantity}</p>
                </div>
              </div>
            )}
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
              <p className="text-base">
                Rp {productDetail ? productDetail.price * quantity : 0}
              </p>
            </div>
            <div className="flex justify-between">
              <p className="text-base mb-2">Subtotal Diskon Produk:</p>
              <p className="text-base">
                {" "}
                Rp {productDetail ? productDetail.discount * quantity : 0}
              </p>
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
              <p className="text-base">Total Bayar:</p>
              <p className="text-base font-bold">Rp {totalPayment}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tombol Bayar Sekarang */}
      <div className="mt-4 lg:px-8 lg:mx-auto lg:max-w-7xl">
        <button
          className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 font-bold py-2 px-4 rounded float-end mb-4"
          onClick={handleCheckout}
        >
          Bayar Sekarang
        </button>
      </div>

      {/* Tambahkan modal alamat */}
      <AlamatModal
        isOpen={isAlamatModalOpen}
        onClose={() => setAlamatModalOpen(false)}
        onAddressSelect={handleAlamatSelect}
      />
    </div>
  );
};

export default CheckoutPage;
