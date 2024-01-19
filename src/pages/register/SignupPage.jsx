import React from "react";
import useRegisterApi from "../../hooks/auth/RegisterApi"; 
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { register, isLoading, error } = useRegisterApi(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the register function from the hook
      await register(email, password, name, phone);

      // Redirect to the login page upon successful registration
      navigate("/login");
    } catch (error) {
      // Handle any errors if needed
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 sm:p-8 min-h-screen bg-gray-100">
      <div className="flex flex-col lg:flex-row lg:justify-center space-y-4 lg:space-y-0 lg:space-x-4 bg-white rounded-lg shadow-lg p-4 lg:p-8">
        <div className="flex items-center justify-center lg:w-1/2 p-2">
          <img
            src="https://res.cloudinary.com/dufa4bel6/image/upload/v1702302550/disappear/pvkmms1w5dvw3o85vvqf.png"
            alt="Gambar tentang kami"
            className="w-full h-auto rounded-lg shadow-lg mb-4 lg:mb-0"
          />
        </div>
        <div className="w-full lg:w-1/2 text-gray-600">
          <h2 className="text-4xl font-bold mb-4 mt-4 text-center">Sign Up</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Your Email
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
              <label htmlFor="phone" className="text-sm font-medium">
                Your Phone
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Your Password
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
              disabled={isLoading} // Disable the button during loading
            >
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <p className="text-sm text-gray-500 text-center">
              Already have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Sign In
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
