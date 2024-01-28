// SelectAddress.jsx
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import getAddressList from "../../hooks/profile/GetAddressApi";

const SelectAddress = ({ isOpen, onClose, onAddressSelect }) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const data = await getAddressList();
        setAddresses(data.data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, []);

  const handleAddressSelect = () => {
    console.log("Selected Address ID:", selectedAddressId);
    console.log("Addresses:", addresses);

    // Find the selected address by its ID
    const selectedAddress = addresses.find(
      (address) => address.id === parseInt(selectedAddressId, 10)
    );

    console.log("Selected Address:", selectedAddress);

    if (selectedAddress) {
      onAddressSelect(selectedAddress.id);
      onClose();
    } else {
      console.error("Alamat yang dipilih tidak valid");
    }
  };

  if (!addresses.length) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 border shadow-md rounded-md w-full max-w-md mx-auto sm:max-w-lg md:max-w-xl"
    >
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-black text-center">
          Pilih Alamat
        </h2>
        <div className="mb-4 sm:mb-8">
          <label
            htmlFor="address"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            Daftar Alamat:
          </label>
          <select
            id="address"
            name="address"
            value={selectedAddressId}
            onChange={(e) => setSelectedAddressId(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>
              Pilih Alamat
            </option>
            {addresses.map((address) => (
              <option key={address.id} value={address.id}>
                {address.accepted_name}: {address.address}, {address.city_name},{" "}
                {address.province_name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={handleAddressSelect}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full"
        >
          Pilih Alamat
        </button>
      </div>
    </Modal>
  );
};

export default SelectAddress;
