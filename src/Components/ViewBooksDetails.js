import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { FaHeart, FaShoppingCart, FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ViewBookDetails = () => {
  const [book, setBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { id } = useParams();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://book-store-database.onrender.com/book/get-book/${id}`
      )
      .then((res) => {
        setBook(res.data.book);
        setEditedBook(res.data.book);
      })
      .catch((error) => {
        console.error("Error fetching book details!", error);
      });
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(
        `https://book-store-database.onrender.com/book/update-books/${id}`,
        editedBook,
        { headers }
      );
      if (response.status === 200) {
        toast.success("Book updated successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        setBook(editedBook);
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error("Failed to update book.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleDelete = async () => {
    setShowDeleteModal(false); // Close modal after confirming

    try {
      const response = await axios.delete(
        `https://book-store-database.onrender.com/book/delete-books/${id}`,
        { headers }
      );
      if (response.status === 200) {
        toast.success("Book deleted successfully!", {
          position: "top-center",
          autoClose: 3000,
        });

        // Delay the navigation to allow the toast to be visible before redirecting
        setTimeout(() => {
          navigate("/all-book"); // Navigate to the books list (or homepage)
        }, 3000); // Delay of 3 seconds (same as autoClose of the toast)
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Failed to delete book.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleAddToFavorites = async () => {
    try {
      const response = await axios.put(
        "https://book-store-database.onrender.com/favourites/add-to-favourite",
        { bookId: id },
        { headers }
      );
      console.log(response)
      if (response.status === 200) {
        toast.success("Added to favorites!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
      else{
        toast.error("Already to favorites!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error adding to favorites:", error.response.data.success);
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.put(
        "https://book-store-database.onrender.com/Cart/add-to-cart",
        { bookId: id },
        { headers }
      );
      if (response.status === 200) {
        toast.success("Added to cart!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  if (!book) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
        Loading book details...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        {book.title}
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="relative flex-1 max-w-xs md:max-w-sm lg:max-w-md w-full bg-slate-100 p-6 rounded-lg shadow-lg flex items-center justify-center">
          <img
            alt={book.imageAlt}
            src={book.file}
            className="w-[60%] h-auto object-cover rounded-lg"
          />

          {isLoggedIn === true && role === "user" && (
            <div className="absolute top-0 right-0 mt-4 mr-4 space-y-5 space-x-2">
              <button
                className="bg-white p-2 rounded-full shadow hover:bg-red-500 hover:text-white transition duration-300 ease-in-out"
                onClick={handleAddToFavorites} // Trigger add to favorites
              >
                <FaHeart size={20} />
              </button>
              <button
                className="bg-white p-2 rounded-full shadow hover:bg-blue-500 hover:text-white transition duration-300 ease-in-out"
                onClick={handleAddToCart} // Trigger add to cart
              >
                <FaShoppingCart size={20} />
              </button>
            </div>
          )}

          {isLoggedIn === true && role === "admin" && (
            <div className="absolute top-0 right-0 mt-4 mr-4 space-y-5 space-x-2">
              <button
                className="bg-white p-2 rounded-full shadow hover:bg-yellow-500 hover:text-white transition duration-300 ease-in-out"
                onClick={() => setIsEditing(true)}
              >
                <FaEdit size={20} />
              </button>
              <button
                className="bg-white p-2 rounded-full shadow hover:bg-red-500 hover:text-white transition duration-300 ease-in-out"
                onClick={() => setShowDeleteModal(true)} // Show delete confirmation modal
              >
                <MdDeleteOutline size={20} />
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 w-full max-w-lg space-y-4">
          {isEditing ? (
            <>
              <input
                type="text"
                name="title"
                value={editedBook.title || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="number"
                name="price"
                value={editedBook.price || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <textarea
                name="desc"
                value={editedBook.desc || ""}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <button
                onClick={handleEditSubmit}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl font-medium text-gray-800">
                <b>Author:</b> {book.author}
              </h2>
              <p className="text-lg font-semibold text-gray-900">
                <b>Price:</b> ₹{book.price}
              </p>
              <p className="text-md text-gray-600">
                <b>Language:</b> {book.language}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                {book.desc.slice(0, 800)}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg w-1/3 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Are you sure you want to delete this book?
            </h2>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="ml-4 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default ViewBookDetails;
