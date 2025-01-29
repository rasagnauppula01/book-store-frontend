import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai"; // Import the Close Icon
import { toast } from "react-toastify"; // Import Toastify

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const shippingCharges = 50; // Fixed shipping charges
  const navigate = useNavigate();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch cart items
  useEffect(() => {
    axios
      .get("https://book-store-database.onrender.com/Cart/get-cart", {
        headers,
      })
      .then((res) => {
        setCartItems(res.data.cart);
      })
      .catch((err) => console.error("Error fetching cart items:", err));
  }, []);

  // Calculate total amount dynamically whenever cart items change
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0);
    setTotalAmount(total);
  }, [cartItems]);

  // Remove item from cart
  const handleRemove = async (bookid) => {
    try {
      const response = await axios.delete(
        `https://book-store-database.onrender.com/Cart/remove-from-cart/${bookid}`,
        { headers }
      );
      if (response.status === 200) {
        setCartItems((prevItems) =>
          prevItems.filter((item) => item._id !== bookid)
        );
      }
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  // Handle Order Now
  const handleOrderNow = async () => {
    try {
      const orderData = {
        items: cartItems,
        totalAmount: totalAmount + shippingCharges,
      };

      const response = await axios.post(
        "https://book-store-database.onrender.com/order/place-order",
        orderData,
        { headers }
      );

      if (response.status === 200) {
        // Success toast
        toast.success("Order placed successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        });

        setCartItems([]);
        navigate("/profile/orderHistory");
      } else {
        // Error toast
        toast.error("Failed to place the order.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
        });
      }
    } catch (err) {
      console.error("Error placing order:", err);
      toast.error("An error occurred while placing the order.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-10">
      <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-12">
        Your Cart
      </h1>
      <div className="container mx-auto flex flex-col lg:flex-row gap-12 px-6">
        {/* Cart Items Section */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cartItems.map((product) => (
              <div
                key={product._id}
                className="relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-200"
              >
                <div className="flex justify-center p-4">
                  <img
                    alt={product.imageAlt}
                    src={product.file}
                    className="w-40 h-52 object-cover rounded-lg transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.title}
                  </h3>
                  <p className="text-xl font-bold text-indigo-700 mt-3">
                    ₹{product.price}
                  </p>
                  <button
                    onClick={() => handleRemove(product._id)}
                    className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
                  >
                    <AiOutlineClose size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {cartItems.length === 0 && (
            <div className="text-center mt-16">
              <p className="text-lg text-gray-600">Your cart is empty!</p>
              <a
                href="/all-book"
                className="mt-6 inline-block bg-blue-600 text-white font-medium rounded-md py-3 px-6 hover:bg-blue-700 transition duration-300"
              >
                Continue Shopping
              </a>
            </div>
          )}
        </div>

        {/* Order Summary Section */}
        <div className="w-full lg:w-1/3">
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Order Summary
            </h2>
            <div className="space-y-4">
              {cartItems.map((product) => (
                <div
                  key={product._id}
                  className="flex justify-between text-gray-800"
                >
                  <span>{product.title}</span>
                  <span>₹{product.price}</span>
                </div>
              ))}
              <hr className="my-4" />
              <div className="flex justify-between text-lg font-medium">
                <span>Subtotal:</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="flex justify-between text-lg font-medium mt-2">
                <span>Shipping:</span>
                <span>₹{shippingCharges}</span>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span>₹{(totalAmount + shippingCharges).toFixed(2)}</span>
              </div>
              <button
                onClick={handleOrderNow}
                className="mt-8 w-full bg-green-500 text-white font-medium py-3 rounded-md hover:bg-green-600 transition duration-300"
              >
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
