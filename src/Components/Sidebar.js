import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { authActions } from "../Store/Auth";
import { FaHeart, FaHistory, FaCog, FaSignOutAlt } from "react-icons/fa"; // Importing necessary icons
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify"; // Importing Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const Sidebar = ({ data, setDpChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: ` Bearer ${localStorage.getItem("token")} `,
  };

  const [avatar, setAvatar] = useState(data?.avatar || ""); // State for avatar
  const [uploading, setUploading] = useState(false); // State for upload status
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
  const [modalImage, setModalImage] = useState(""); // State to store image URL for the modal

  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    toast.success("You have logged out successfully!"); // Success toast on logout
    navigate("/login");
  };

  const role = useSelector((state) => state.auth.role);

  const handleFileChange = async (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file); // Append file to FormData

    try {
      setUploading(true);

      const response = await axios.put(
        "http://localhost:5000/profile/update-avatar",
        formData,
        {
          headers,
        }
      );

      // Update the avatar state with the new image URL
      if (response?.data?.avatar) {
        setAvatar(response.data.avatar);
      }

      toast.success("Profile image updated successfully!"); // Success toast for avatar update
      setDpChange(true);
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Failed to upload profile image."); // Error toast on failure
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (data) {
      setAvatar(data.avatar); // Ensure avatar is updated when data changes
    }
  }, [data]);

  const openModal = () => {
    setModalImage(avatar || "/default-avatar.png"); // Set the avatar image to be displayed in the modal
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg flex flex-col h-screen shadow-lg">
      {/* Toast Container */}
      <ToastContainer />

      {/* Profile Section */}
      <div className="flex flex-col items-center justify-center mb-8">
        {/* Avatar */}
        <img
          src={avatar || "/default-avatar.png"} // Fallback to default avatar
          alt="Profile"
          className="h-32 w-32 rounded-full object-cover mb-4 border-4 border-indigo-600 cursor-pointer"
          onClick={openModal} // Open the modal when avatar is clicked
        />
        {/* Upload Input */}
        <label
          htmlFor="avatar-upload"
          className="cursor-pointer text-sm text-blue-600 hover:underline mb-2"
        >
          {uploading ? "Uploading..." : "Change Profile Picture"}
        </label>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
        />
        <h2 className="text-xl font-semibold text-gray-800 mt-4">
          {data?.username}
        </h2>
        <p className="text-sm text-gray-500">{data?.email}</p>
      </div>

      <div className="w-full mt-4 h-[1px] bg-zinc-300 mb-6"></div>

      {/* Navigation Links */}
      {role === "user" && (
        <div className="w-full flex flex-col items-center overflow-y-auto flex-grow">
          {" "}
          {/* Added flex-grow and overflow-y-auto */}
          <Link
            to="/profile"
            className="w-full text-center font-semibold py-2 px-3 mb-3 text-gray-700 hover:bg-indigo-600 hover:text-white rounded-md transition-all duration-300 flex items-center justify-center"
          >
            <FaHeart className="mr-2" /> Favourites
          </Link>
          <Link
            to="/profile/orderHistory"
            className="w-full text-center font-semibold py-2 px-3 mb-3 text-gray-700 hover:bg-indigo-600 hover:text-white rounded-md transition-all duration-300 flex items-center justify-center"
          >
            <FaHistory className="mr-2" /> Order History
          </Link>
          <Link
            to="/profile/settings"
            className="w-full text-center font-semibold py-2 px-3 mb-3 text-gray-700 hover:bg-indigo-600 hover:text-white rounded-md transition-all duration-300 flex items-center justify-center"
          >
            <FaCog className="mr-2" /> Settings
          </Link>
        </div>
      )}

      {role === "admin" && (
        <div className="w-full flex flex-col items-center overflow-y-auto flex-grow">
          {" "}
          {/* Added flex-grow and overflow-y-auto */}
          <Link
            to="/profile/all-orders"
            className="w-full text-center font-semibold py-2 px-3 mb-3 text-gray-700 hover:bg-indigo-600 hover:text-white rounded-md transition-all duration-300 flex items-center justify-center"
          >
            <FaHeart className="mr-2" /> All Orders
          </Link>
          <Link
            to="/profile/add-books"
            className="w-full text-center font-semibold py-2 px-3 mb-3 text-gray-700 hover:bg-indigo-600 hover:text-white rounded-md transition-all duration-300 flex items-center justify-center"
          >
            <FaHistory className="mr-2" /> Add Books
          </Link>
        </div>
      )}

      {/* Logout Button */}
      <button
        className="w-full bg-red-500 text-white font-semibold py-2 px-4 mt-8 rounded-md hover:bg-red-600 transition duration-300 flex items-center justify-center"
        onClick={handleLogout}
      >
        <FaSignOutAlt className="mr-2" /> Logout
      </button>

      {/* Modal for large profile image */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-4 rounded-lg relative"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside the modal
          >
            <img
              src={modalImage}
              alt="Profile"
              className="h-64 w-64 rounded-full object-cover"
            />
            {/* Close button (X icon) */}
            <div
              className="absolute top-2 right-2 text-white cursor-pointer text-3xl"
              onClick={closeModal}
            >
              &times; {/* This is the "X" close icon */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
