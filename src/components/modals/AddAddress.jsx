// src/components/modals/AddAddressForm.js
import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import getProvinceList from "../../hooks/profile/GetProvinceApi";
import getCityList from "../../hooks/profile/GetCityApi";
import createAddress from "../../hooks/profile/AddAddressApi";

const AddAddressForm = ({ isOpen, onRequestClose }) => {
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
    const fetchProvinces = async () => {
      try {
        const provinceData = await getProvinceList();
        setProvinces(provinceData);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    const fetchCitiesByProvince = async () => {
      try {
        if (formData.province_id) {
          const cityData = await getCityList(formData.province_id);
          setCities(cityData);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCitiesByProvince();
  }, [formData.province_id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({ ...prevData, [name]: checked }));
    } else if (name === "province_id") {
      const selectedProvince = provinces.find(
        (province) => province.province_id === value
      );
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        city_id: "",
        province_name: selectedProvince ? selectedProvince.province : "",
      }));
    } else if (name === "city_id") {
      const selectedCity = cities.find((city) => city.city_id === value);
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        city_name: selectedCity ? selectedCity.city_name : "",
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { province_name, city_name, ...restFormData } = formData;

      const createdAddress = await createAddress({
        ...restFormData,
        province_id: formData.province_id,
        city_id: formData.city_id,
        province_name,
        city_name,
      });

      console.log("Address created successfully:", createdAddress);
      onRequestClose();
      window.location.reload();
    } catch (error) {
      console.error("Error creating address:", error);
    }
  };

  const handleCancel = () => {
    setFormData({
      accepted_name: "",
      phone: "",
      province_id: "",
      province_name: "",
      city_id: "",
      city_name: "",
      address: "",
      is_primary: false,
    });
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 border shadow-md rounded-md w-full max-w-md mx-auto"
    >
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-black text-center">
          Tambah Alamat
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
              Nomor HP:
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
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full"
            >
              Tambah Alamat
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring focus:border-gray-500 w-full ml-2"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddAddressForm;
