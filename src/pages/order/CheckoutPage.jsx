import React, { useState } from "react";

const CheckoutPage = () => {
  const [address, setAddress] = useState({
    name: "Merya A",
    street: "Jalan Semangka No 21",
    subdistrict: "Kecamatan Sirsak",
    regency: "Kabupaten Jamur",
    province: "Kelapa Utama",
    is_primary: true,
  });

  const [note, setNote] = useState("");

  const product = {
    name: "Celana Pria",
    price: 25000,
    adminFee: 2000,
    shippingFee: 0,
    imageUrl: "https://placekitten.com/150/150",
  };

  const totalPayment = product.price + product.adminFee + product.shippingFee;

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  return (
    <div className="container mx-auto bg-gray-100 p-4">
     
      <div className="mb-4 lg:px-8 lg:mx-auto lg:max-w-7xl">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
         {/* Alamat */}
        <div className="bg-white p-8 rounded-md shadow-md">
          <h1 className="font-semibold text-lg mb-2">Alamat Pengiriman</h1>
          <p className="text-base mb-2">{address.name}</p>
          <p className="text-sm text-gray-600">
            {`${address.street}, ${address.subdistrict}, ${address.regency}, ${address.province}, ${address.is_primary},`}
          </p>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full sm:w-auto mt-4"
            onClick={() => alert("Buy Now button clicked")}
          >
            Ubah
          </button>
        </div>
      </div>

      {/* Produk */}
      <div className="lg:px-8 lg:mx-auto lg:max-w-7xl">
        <div className="bg-white p-2 rounded-md shadow-md">
          <div className="p-8">
            <h2 className="font-bold text-lg mb-4">Produk</h2>
            <div className="flex">
              <div className="w-25 h-25">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4">
                <p className="font-semibold text-base mb-2">{product.name}</p>
                <p className="text-base mb-2">Rp {product.price}</p>
                <p className="text-base mb-2">Jumlah: 1</p>
              </div>
            </div>

            {/* Form Catatan */}
            <div className="mb-4 mt-4">
              <label
                htmlFor="note"
                className="block text-base text-gray-700"
              >
                Catatan:
              </label>
              <input
                type="text"
                id="note"
                name="note"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md text-sm"
                placeholder="Masukan catatan untuk pembeli (optional)"
                value={note}
                onChange={handleNoteChange}
              />
            </div>

            <div className="flex justify-between mt-4">
              <p className="text-base mb-2">Total Biaya Produk:</p>
              <p className="text-base mb-2">Rp {product.price}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-base mb-2">Biaya Admin:</p>
              <p className="text-base mb-2">Rp {product.adminFee}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-base mb-2">Biaya Pengiriman: </p>
              <p className="text-base mb-2">Rp {product.shippingFee}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-base font-semibold mb-2">Total Bayar: </p>
              <p className="text-base font-semibold mb-2">Rp {totalPayment}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tombol Bayar Sekarang */}
      <div className="mt-4 lg:px-8 lg:mx-auto lg:max-w-7xl">
        <button className=" bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 font-bold py-2 px-4 rounded float-end mb-4 ">
          Bayar Sekarang
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
