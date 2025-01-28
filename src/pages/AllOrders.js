import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/order/get-all-orders",
        { headers }
      );
      console.log(response.data.data.splice(0, 5));

      if (response.status === 200) {
        setOrders(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to fetch orders.";
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdating(true);
    try {
      const response = await axios.put(
        `http://localhost:5000/order/update-status/${orderId}`,
        { status: newStatus },
        { headers }
      );
      if (response.status === 200) {
        toast.success("Order status updated successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
        fetchOrders(); // Refresh orders after status update
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to update order status.";
      toast.error(errorMessage, {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        <span className="ml-4 text-gray-600 text-lg">Loading orders...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
        All Orders
      </h1>
      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse bg-white rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">Order ID</th>
                <th className="px-4 py-2">Customer Name</th>
                <th className="px-4 py-2">Book Title</th>
                <th className="px-4 py-2">Total Price</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b">
                  <td className="px-4 py-2">{order._id}</td>
                  <td className="px-4 py-2">{order.user?.username}</td>
                  <td className="px-4 py-2">{order.book?.title}</td>
                  <td className="px-4 py-2">₹{order.book?.price}</td>
                  <td className="px-4 py-2">{order.status}</td>
                  <td className="px-4 py-2 space-x-2">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="border border-gray-300 rounded-md p-1"
                      disabled={updating}
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AllOrders;
