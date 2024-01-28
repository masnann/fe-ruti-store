import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import getProvinceList from "../../hooks/profile/GetProvinceApi";
import getCityList from "../../hooks/profile/GetCityApi";
import getAddressDetails from "../../hooks/profile/GetDetailsAddressApi";
import updateAddressDetails from "../../hooks/profile/EditAddressApi";

const EditAddressForm = ({ isOpen, onRequestClose, onSubmit, addressId }) => {
  const [formData, setFormData] = useState({
    accepted_name: "",
    phone: "",
    province_id: "",
    province_name: "",
    city_id: "",
    city_name: "",
    address: "",
    is_primary: false,
  });

  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchAddressDetails = async () => {
      try {
        const addressDetails = await getAddressDetails(addressId);
        setFormData(addressDetails);
      } catch (error) {
        console.error("Error fetching address details:", error.message);
      }
    };

    const fetchProvinceList = async () => {
      try {
        const provinceList = await getProvinceList();
        setProvinces(provinceList);
      } catch (error) {
        console.error("Error fetching province list:", error.message);
      }
    };

    fetchAddressDetails();
    fetchProvinceList();
  }, [addressId]);

  useEffect(() => {
    const fetchCityList = async () => {
      try {
        const cityList = await getCityList(formData.province_id);
        setCities(cityList);
      } catch (error) {
        console.error("Error fetching city list:", error.message);
      }
    };

    if (formData.province_id) {
      fetchCityList();
    }
  }, [formData.province_id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      await updateAddressDetails(addressId, formData);
      onRequestClose();
      window.location.reload();
    } catch (error) {
      console.error('Error updating address:', error.message);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 border shadow-md rounded-md w-full max-w-md mx-auto"
    >
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-black text-center">
          Edit Alamat
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="accepted_name"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Nama Penerima:
            </label>
            <input
              type="text"
              id="accepted_name"
              name="accepted_name"
              value={formData.accepted_name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Nomor Hp:
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="province_id"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Provinsi:
            </label>
            <select
              id="province_id"
              name="province_id"
              value={formData.province_id}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Pilih Provinsi
              </option>
              {provinces.map((province) => (
                <option key={province.province_id} value={province.province_id}>
                  {province.province}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="city_id"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Kota/Kabupaten:
            </label>
            <select
              id="city_id"
              name="city_id"
              value={formData.city_id}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Pilih Kota/Kabupaten
              </option>
              {cities.map((city) => (
                <option key={city.city_id} value={city.city_id}>
                  {city.city_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Alamat:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center text-gray-600 text-sm font-medium">
              <input
                type="checkbox"
                name="is_primary"
                checked={formData.is_primary}
                onChange={handleChange}
                className="mr-2 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
              />
              Alamat Utama
            </label>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full"
            >
              Edit Alamat
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default EditAddressForm;
