import React, { useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import AddAddressForm from "../../components/modals/AddAddress";
import EditAddressForm from "../../components/modals/EditAddress";
import Sidebar from "../../components/sidebar/SidebarProfile";
import getAddressList from "../../hooks/profile/GetAddressApi";
import deleteAddress from "../../hooks/profile/DeleteAddressApi";
import Loading from "../../components/modals/Loading";
import Modal from "react-modal";
import DeleteConfirmationModal from "../../components/modals/Confirmation";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

const AddressSelectionPage = () => {
  const navigate = useNavigate();
  const [isAddAddressModalOpen, setAddAddressModalOpen] = useState(false);
  const [isEditAddressModalOpen, setEditAddressModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [selectedAddressForDeletion, setSelectedAddressForDeletion] =
    useState(null);
  const [error, setError] = useState(null);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const addressData = await getAddressList();
        setAddresses(addressData.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching address list:", error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddAddress = () => {
    setAddAddressModalOpen(true);
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    setEditAddressModalOpen(true);
  };

  const handleEditAddress = (address) => {
    setSelectedAddress(address);
    setEditAddressModalOpen(true);
  };

  const closeAddAddressModal = () => {
    setAddAddressModalOpen(false);
  };

  const closeEditAddressModal = () => {
    setEditAddressModalOpen(false);
  };

  const handleDeleteAddress = (deletedAddress) => {
    if (deletedAddress.is_primary) {
      setError("Alamat utama tidak dapat dihapus.");
    } else {
      setSelectedAddressForDeletion(deletedAddress);
      setDeleteConfirmationOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteAddress(selectedAddressForDeletion.id);
      const updatedAddresses = addresses.filter(
        (address) => address.id !== selectedAddressForDeletion.id
      );
      setAddresses(updatedAddresses);

      setDeleteConfirmationOpen(false);

      setError(null);
    } catch (error) {
      console.error("Error deleting address:", error.message);
      setError("Gagal menghapus alamat. Silakan coba lagi.");
    }
  };

  const handleCancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setError(null);
  };

  if (loading) {
    return <Loading />;
  }
  
  return (
    <div className="bg-gray-100 p-4">
      <div className="container mx-auto lg:px-8 lg:max-w-7xl">
        <div className="flex flex-wrap">
          <Sidebar />
          <div className="w-full lg:w-3/4 bg-white rounded-lg shadow-lg p-4 lg:p-8 mt-4 lg:mt-0">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Daftar Alamat
            </h2>
            {error && (
              <div className="text-red-500 mb-4">
                <p>{error}</p>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className="bg-white p-4 rounded-md shadow-md cursor-pointer mb-4 transition-transform transform hover:scale-105 relative"
                  onClick={() => handleSelectAddress(address)}
                >
                  <h1 className="font-semibold text-lg text-blue-700">
                    {address.accepted_name}
                  </h1>
                  <p className="text-sm text-gray-600">
                    {`${address.address}, ${address.city_name}, ${address.province_name}`}
                  </p>
                  {address.is_primary && (
                    <span className="text-sm text-orange-600">
                      Alamat Utama
                    </span>
                  )}
                  <button
                    className="absolute top-2 right-8 p-2 bg-gray-200 rounded-full mr-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditAddress(address);
                    }}
                  >
                    <PencilIcon className="h-4 w-4 text-gray-600" />
                  </button>
                  <button
                    className="absolute top-2 right-2 p-2 bg-red-200 rounded-full ml-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAddress(address);
                    }}
                  >
                    <TrashIcon className="h-4 w-4 text-red-600" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-2">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full sm:w-auto"
                onClick={handleAddAddress}
              >
                Tambah Alamat
              </button>
            </div>
          </div>

          <AddAddressForm
            isOpen={isAddAddressModalOpen}
            onRequestClose={closeAddAddressModal}
          />

          {/* Modal Edit Address */}
          {selectedAddress && (
            <EditAddressForm
              isOpen={isEditAddressModalOpen}
              onRequestClose={closeEditAddressModal}
              addressId={selectedAddress.id}
            />
          )}

          <DeleteConfirmationModal
            isOpen={isDeleteConfirmationOpen}
            onCancel={handleCancelDelete}
            onConfirm={handleConfirmDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default AddressSelectionPage;
