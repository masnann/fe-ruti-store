import React, { useState } from "react";
import Modal from "react-modal";

const EditAddressForm = ({ isOpen, onRequestClose, initialData, onSubmit }) => {
  const [formData, setFormData] = useState(initialData);

  const provinces = ["Provinsi A", "Provinsi B", "Provinsi C"];
  const regencies = {
    "Provinsi A": ["Kabupaten X", "Kabupaten Y", "Kabupaten Z"],
    "Provinsi B": ["Kabupaten P", "Kabupaten Q", "Kabupaten R"],
    "Provinsi C": ["Kabupaten M", "Kabupaten N", "Kabupaten O"],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Implement logic to handle form submission
    onSubmit(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 border shadow-md rounded-md w-full max-w-md mx-auto"
    >
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-black text-center">Edit Alamat</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Nama Penerima:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
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
              htmlFor="province"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Provinsi:
            </label>
            <select
              id="province"
              name="province"
              value={formData.province}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Pilih Provinsi
              </option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="regency"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Kabupaten:
            </label>
            <select
              id="regency"
              name="regency"
              value={formData.regency}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Pilih Kabupaten
              </option>
              {formData.province &&
                regencies[formData.province] &&
                regencies[formData.province].map((regency) => (
                  <option key={regency} value={regency}>
                    {regency}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="subdistrict"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Kecamatan:
            </label>
            <input
              type="text"
              id="subdistrict"
              name="subdistrict"
              value={formData.subdistrict}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="street"
              className="block text-gray-600 text-sm font-medium mb-2"
            >
              Alamat:
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="flex items-center text-gray-600 text-sm font-medium">
              <input
                type="checkbox"
                name="isPrimary"
                checked={formData.isPrimary}
                onChange={handleChange}
                className="mr-2 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
              />
              Alamat Utama
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 w-full"
          >
            Edit Alamat
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EditAddressForm;
