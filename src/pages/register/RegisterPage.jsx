import React, { useState } from "react";
import useRegister from "../../hooks/auth/register";

const Register = () => {
  const {
    formData,
    handleChange,
    handleSubmit,
    error,
    isLoading,
    successMessage,
  } = useRegister();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
      <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
            Register
          </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name:
            </label>
            <input
              type="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Phone:
            </label>
            <input
              type="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white rounded-md py-2 hover:bg-indigo-600 focus:outline-none relative"
            disabled={isLoading}
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
              </div>
            )}
            Register
          </button>
        </form>
        {/* Tampilkan pesan success setelah register berhasil */}
        {successMessage && (
          <div className="text-green-500 mb-4">{successMessage}</div>
        )}
        {/* ... */}
      </div>
    </div>
  );
};

export default Register;
