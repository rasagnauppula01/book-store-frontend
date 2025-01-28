import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const Favourites = () => {
  const [fav, setFav] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get(
          "https://book-store-database.onrender.com/favourites/get-fav-book",
          { headers }
        );
        setFav(response.data.data); // Assuming `data.data` contains the list of favorite books
        console.log("Fetched favourites:", response.data.data); // Log the fetched data
      } catch (error) {
        console.error("Error fetching favourites:", error);
        toast.error("Error fetching favourites");
      }
    };

    fetchFavourites();
  }, []);

  if (fav.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600 text-lg">
        No favourites found!
      </div>
    ); // Show a message if no favourites are available
  }

  const handleBookRemove = async (bookId) => {
    try {
      const response = await axios.delete(
        "http://localhost:5000/favourites/remove-book-from-favourite",
        {
          headers: {
            ...headers,
            bookid: bookId, // Send the bookId in the headers
          },
        }
      );

      toast.success(response.data.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { background: "#4caf50", color: "#fff" }, // Green background with white text
      });

      // Delay the state update slightly to ensure the toast displays
      setTimeout(() => {
        setFav((prevFav) => prevFav.filter((book) => book._id !== bookId));
      }, 2100); // Delay just longer than `autoClose` duration
    } catch (error) {
      console.error("Error removing book from favourites:", error);
      toast.error("Error removing book from favourites", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { background: "#f44336", color: "#fff" }, // Red background with white text
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
        Your Favourites
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {fav.map((book) => (
          <div
            key={book._id}
            className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition transform hover:scale-105"
          >
            <div className="flex justify-center items-center mb-3">
              <img
                src={book.file} // Assuming `file` contains the book image URL
                alt={book.title}
                className="w-32 h-48 object-cover rounded-lg"
              />
            </div>
            <h2 className="text-md font-medium text-gray-800 truncate mb-2">
              {book.title}
            </h2>
            <p className="text-sm text-gray-600 truncate mb-2">{book.author}</p>
            <p className="text-sm font-semibold text-gray-900 mb-3">
              ₹{book.price}
            </p>
            <button
              className="w-full bg-red-500 text-white py-2 px-3 rounded-md text-sm"
              onClick={() => handleBookRemove(book._id)}
            >
              Remove from favourites
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Favourites;
