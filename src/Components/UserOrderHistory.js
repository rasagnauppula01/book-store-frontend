import React, { useState, useEffect } from "react";
import axios from "axios";

const UserOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of items per page

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/order/get-order-history",
          { headers }
        );
        if (response.data && Array.isArray(response.data.data)) {
          setOrders(response.data.data);
        } else {
          setError("No orders found.");
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch order history.");
        setLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  // Calculate the total pages
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  // Get orders for the current page
  const currentOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          <p className="mt-4 text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Your Order History
      </h1>
      <div className="container mx-auto px-4">
        {orders.length === 0 ? (
          <div className="text-center mt-20">
            <p className="text-lg text-gray-600">No orders found!</p>
            <a
              href="/all-book"
              className="mt-6 inline-block rounded-lg bg-blue-500 px-6 py-3 text-white font-medium hover:bg-blue-600 transition"
            >
              Shop Now
            </a>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 gap-6">
              {currentOrders.map((order) => (
                <div
                  key={order._id}
                  className="rounded-lg bg-white shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    Order ID: {order._id}
                  </h2>
                  <ul className="divide-y divide-gray-200">
                    <li className="flex justify-between py-2">
                      <span className="text-gray-700 font-medium">
                        {order.book?.title || "Unknown Title"}
                      </span>
                      <span className="text-gray-700 font-medium">
                        ₹{order.book?.price || "Unknown Price"}
                      </span>
                    </li>
                  </ul>
                  <div className="mt-4 text-gray-700">
                    <p>
                      Status:{" "}
                      <span className="font-semibold">{order.status}</span>
                    </p>
                    <p>
                      Total:{" "}
                      <span className="font-semibold">
                        ₹{order.book?.price || "Unknown Price"}
                      </span>
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Ordered on: {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-10 space-x-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className={`px-4 py-2 rounded-l-md ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="px-4 py-2 bg-gray-200 border border-gray-300">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className={`px-4 py-2 rounded-r-md ${
                  currentPage === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserOrderHistory;
