import React, { useState } from "react";
import useRegister from "../../hooks/auth/register";

const Register = () => {
    const { formData, handleChange, handleSubmit, error, isLoading, successMessage } = useRegister();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:border-indigo-500"
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
