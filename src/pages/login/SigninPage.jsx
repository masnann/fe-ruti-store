import React, { useState } from "react";
import { login } from "../../hooks/auth/SignIn";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userData = await login(email, password);
      setIsLoading(false);

      // Authentication successful, you can redirect or perform other actions
      console.log("Sign-in successful", userData);
      setShowSuccessNotification(true);

      // Redirect after 3 seconds
      setTimeout(() => {
        setShowSuccessNotification(false);
        navigate("/");
      }, 3000);

      // Clear any previous errors
      setError("");
    } catch (error) {
      // Handle authentication error, show error message, etc.
      console.error("Sign-in failed", error.message);
      setError(error.message);
      setIsLoading(false); // Reset loading state in case of an error
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-8 min-h-screen bg-gray-100">
      <div className="p-6 lg:px-8 lg:mx-auto lg:max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:justify-center space-y-4 lg:space-y-0 lg:space-x-4 bg-white rounded-lg shadow-lg p-4 lg:p-8">
          <div className="flex items-center justify-center lg:w-1/2 p-2">
            <img
              src="https://res.cloudinary.com/dufa4bel6/image/upload/v1702302550/disappear/pvkmms1w5dvw3o85vvqf.png"
              alt="Gambar tentang kami"
              className="w-full h-auto rounded-lg shadow-lg mb-4 lg:mb-0"
            />
          </div>
          <div className="w-full lg:w-1/2 text-gray-600">
            <h2 className="text-4xl font-bold mb-4 mt-4 text-center">Masuk</h2>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Kata Sandi
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                disabled={isLoading}
              >
                {isLoading ? "Masuk..." : "Masuk"}
              </button>
              <p className="text-sm text-gray-500 text-center">
                Belum punya akun?{" "}
                <a href="/signup" className="text-blue-500 hover:underline">
                  Daftar
                </a>
              </p>
            </form>
            {showSuccessNotification && (
              <div className="bg-green-500 text-white rounded-md p-3 text-center mt-4">
                Login berhasil! Mengarahkan...
              </div>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
