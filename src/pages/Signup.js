import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import { Link } from "react-router-dom"; // Import Link for navigation
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post(
        "https://book-store-database.onrender.com/Signup",
        formData
      );
      navigate("/login");
      toast.success(response.data.message || "Signup successful!", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "An error occurred.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-50 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-1"
            >
              Name:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-sm font-medium mb-1">
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Link to Login page */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-600">
              Login
            </Link>
          </p>
        </div>

        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
        />
      </div>
    </div>
  );
};

export default Signup;
