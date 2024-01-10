import React, { useState } from "react";
import { useLoginForm } from "../../hooks/auth/login";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { email, setEmail, password, setPassword, error, handleLogin } =
    useLoginForm();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Menampilkan animasi memuat

    const loginSuccess = await handleLogin(e);
    setIsLoading(false); // Menyembunyikan animasi memuat setelah selesai

    if (loginSuccess) {
      setShowSuccessNotification(true); // Menampilkan notifikasi sukses
      setTimeout(() => {
        setShowSuccessNotification(false); // Menyembunyikan notifikasi setelah beberapa detik
        navigate("/");
      }, 3000); // Atur notifikasi tampil selama 3 detik
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-indigo-600">
            Login Page
          </h2>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:border-indigo-500"
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
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border-2 border-gray-300 rounded-md p-3 focus:outline-none focus:border-indigo-500"
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white rounded-md py-3 hover:bg-indigo-700 focus:outline-none"
            disabled={isLoading} // Menonaktifkan tombol saat memuat
          >
            {isLoading ? "Loading..." : "Login"} {/* Text tombol disesuaikan */}
          </button>
        </form>
        {showSuccessNotification && (
          <div className="bg-green-500 text-white rounded-md p-3 text-center">
            Login successful! Redirecting...
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
