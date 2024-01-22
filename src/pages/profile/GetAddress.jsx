import React, { useState } from "react";
import { PencilIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import AddAddressForm from "../../components/modals/AddAddress";
import EditAddressForm from "../../components/modals/EditAddress";

const AddressSelectionPage = () => {
  const navigate = useNavigate();
  const [isAddAddressModalOpen, setAddAddressModalOpen] = useState(false);
  const [isEditAddressModalOpen, setEditAddressModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Merya A",
      street: "Jalan Semangka No 21",
      subdistrict: "Kecamatan Sirsak",
      regency: "Kabupaten Jamur",
      province: "Kelapa Utama",
      isPrimary: true,
    },
    {
      id: 2,
      name: "John Doe",
      street: "Sunset Boulevard 123",
      subdistrict: "West Hollywood",
      regency: "Los Angeles County",
      province: "California",
      isPrimary: false,
    },
    // Add more addresses as needed
  ]);

  const handleAddAddress = () => {
    setAddAddressModalOpen(true);
  };

  const handleSelectAddress = (selectedAddress) => {
    setSelectedAddress(selectedAddress);
    setEditAddressModalOpen(true);
  };

  const handleEditAddress = (editedAddress) => {
    // Implement your logic when the "Edit" button is clicked
    console.log("Edit Address:", editedAddress);
    setEditAddressModalOpen(false);
  };

  const closeAddAddressModal = () => {
    setAddAddressModalOpen(false);
  };

  const closeEditAddressModal = () => {
    setEditAddressModalOpen(false);
  };

  return (
    <div className="bg-gray-100 p-4">
      <div className="container mx-auto lg:px-8 lg:max-w-7xl">
        <h2 className="text-2xl font-bold mb-4 text-black text-center lg:text-left">
          Daftar Alamat
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="bg-white p-4 rounded-md shadow-md cursor-pointer mb-4 transition-transform transform hover:scale-105"
              onClick={() => handleSelectAddress(address)}
            >
              <h1 className="font-semibold text-lg text-blue-700">
                {address.name}
              </h1>
              <p className="text-sm text-gray-600">
                {`${address.street}, ${address.subdistrict}, ${address.regency}, ${address.province}`}
              </p>
              {address.isPrimary && (
                <span className="text-sm text-green-500">Alamat Utama</span>
              )}
              {/* Tombol "Edit" */}
              <button
                className="absolute top-2 right-2 p-2 bg-gray-200 rounded-full"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditAddress(address);
                }}
              >
                <PencilIcon className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full sm:w-auto"
            onClick={handleAddAddress}
          >
            Tambah Alamat
          </button>
        </div>

        {/* Modal Add Address */}
        <AddAddressForm
          isOpen={isAddAddressModalOpen}
          onRequestClose={closeAddAddressModal}
        />

        {/* Modal Edit Address */}
        {selectedAddress && (
          <EditAddressForm
            isOpen={isEditAddressModalOpen}
            onRequestClose={closeEditAddressModal}
            initialData={selectedAddress}
            onSubmit={handleEditAddress}
          />
        )}
      </div>
    </div>
  );
};

export default AddressSelectionPage;
