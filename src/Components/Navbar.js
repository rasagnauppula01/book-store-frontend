import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi"; // For hamburger menu icons

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const items = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-book" },
    { title: "Cart", link: "/cart" },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  if (isLoggedIn) {
    if (role === "admin") {
      items.push({ title: "Admin Profile", link: "/profile" });
    } else {
      items.push({ title: "Profile", link: "/profile" });
    }
  }

  if (!isLoggedIn) {
    items.splice(2, 2); // Remove Cart and Profile links if not logged in
  }

  return (
    <div className="flex justify-between items-center p-4  sticky top-0 z-20 bg-zinc-800 shadow-lg border-b relative">
      {/* Logo Section */}
      <Link to="/" className="flex items-center space-x-2">
        <img
          className="w-12"
          src="https://img.pikbest.com/png-images/20241016/detailed-book-logo-vector-art_10968776.png!bw700"
          alt="Bookify Logo"
        />
        <h1 className="text-3xl font-bold font-serif text-gray-800 text-cyan-50 hover:text-blue-600 transition-all duration-300">
          Bookify
        </h1>
      </Link>

      {/* Menu for larger screens */}
      <div className="hidden md:flex items-center space-x-6">
        <div className="flex space-x-6 font-medium">
          {items.map((item, i) => (
            <Link
              to={item.link}
              className="text-lg text-cyan-50 hover:text-blue-500 font-semibold transition duration-300 ease-in-out transform hover:scale-105"
              key={i}
            >
              {item.title}
            </Link>
          ))}
        </div>

        {!isLoggedIn && (
          <div className="flex gap-4">
            <Link
              to="/login"
              className="px-4 py-2 text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Signup
            </Link>
          </div>
        )}
      </div>

      {/* Hamburger Menu for smaller screens */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-2xl text-cyan-50 focus:outline-none"
        >
          {menuOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md z-10 p-4 md:hidden">
          <div className="flex flex-col space-y-4">
            {items.map((item, i) => (
              <Link
                to={item.link}
                className="text-lg text-gray-800 hover:text-blue-500 font-medium transition duration-300"
                key={i}
                onClick={() => setMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            {!isLoggedIn && (
              <div className="flex flex-col gap-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white rounded-full transition duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
