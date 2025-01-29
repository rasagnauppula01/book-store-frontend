import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        "hhttps://book-store-database.onrender.com/verify-otp",
        {
          email,
          otp,
          newPassword,
        }
      );

      if (response.status === 200) {
        toast.success("Password reset successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
        });

        navigate("/login");
      }
    } catch (error) {
      toast.error("Failed to reset password. Please try again.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-50 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="otp" className="block text-sm font-medium mb-1">
              OTP:
            </label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium mb-1"
            >
              New Password:
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition duration-200"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar
        />
      </div>
    </div>
  );
};

export default ResetPassword;
