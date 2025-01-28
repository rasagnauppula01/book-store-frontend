import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Allbooks = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for shimmer effect
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const booksPerPage = 15; // Books per page

  useEffect(() => {
    axios
      .get("http://localhost:5000/book/get-book")
      .then((res) => {
        setBooks(res.data.book);
        setFilteredBooks(res.data.book); // Set filtered books initially to all books
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false); // Set loading to false if an error occurs
      });
  }, []);

  useEffect(() => {
    // Filter books based on the search query
    const result = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredBooks(result);
    setCurrentPage(1); // Reset to the first page when the search query changes
  }, [searchQuery, books]);

  // Paginate the filtered books
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold font-serif text-center mb-8 text-gray-800">
        All Books
      </h1>
      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search books by title or author..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 w-full sm:w-1/2 lg:w-1/3 border rounded-lg shadow-md"
        />
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {loading ? (
          // Shimmer effect when loading
          Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="group bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 animate-pulse"
            >
              <div className="flex items-center justify-center p-4">
                <div className="bg-gray-300 h-44 w-36 rounded-lg" />
              </div>
              <div className="p-4">
                <div className="h-6 bg-gray-300 rounded mb-2" />
                <div className="h-4 bg-gray-300 rounded mb-2" />
                <div className="h-4 bg-gray-300 rounded mb-2" />
                <div className="h-3 bg-gray-300 rounded mb-2" />
              </div>
            </div>
          ))
        ) : currentBooks.length > 0 ? (
          currentBooks.map((book) => (
            <div
              key={book._id}
              className="group bg-white shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <Link to={`/view-details/${book._id}`}>
                <div className="flex items-center justify-center">
                  <img
                    alt={book.imageAlt}
                    src={book.file}
                    className="w-36 h-44 rounded-lg p-1 transition duration-300 group-hover:opacity-80"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-800 truncate">
                    {book.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500">
                    <b>Author:</b> {book.author}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    <b>Price:</b> ₹{book.price}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    <b>Language:</b> {book.language}
                  </p>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                    {book.desc}
                  </p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No books found</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l-md hover:bg-gray-400 disabled:opacity-50"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 border-t border-b border-gray-300 ${
              currentPage === index + 1
                ? "bg-indigo-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r-md hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Allbooks;
