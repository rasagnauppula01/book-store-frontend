import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./Store/Auth";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Home from "./pages/Home";
import Allbooks from "./pages/Allbooks";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Profile from "./pages/profile";
import ViewBooksDetails from "./Components/ViewBooksDetails.js";
import Favourites from "./Components/Favourites";
import UserOrderHistory from "./Components/UserOrderHistory";
import Setting from "./Components/Setting";
import ResetPassword from "./Components/ResetPassword";
import Frogetpassword from "./Components/ForgotPassword";
import AllOrders from "./pages/AllOrders.js";
import AddBook from "./pages/AddBook.js";

const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem("id");
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedId && storedToken && storedRole) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(storedRole));
    }

    setAuthInitialized(true);
  }, [dispatch]);

  if (!authInitialized) {
    return <div>Initializing...</div>;
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/all-book" element={<Allbooks />} />
        <Route path="/login" element={isLoggedIn ? <Profile /> : <Login />} />
        <Route exact path="/signup" element={<Signup />} />

        {/* Cart Route */}
        <Route
          path="/cart"
          element={isLoggedIn ? <Cart /> : <Navigate to="/login" />}
        />

        {/* Profile Route */}
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
        >
          {role === "user" && <Route index element={<Favourites />} />}
          {role === "admin" && (
            <Route index path="/profile/all-orders" element={<AllOrders />} />
          )}
          {role === "admin" && <Route path="add-books" element={<AddBook />} />}
          <Route path="orderHistory" element={<UserOrderHistory />} />
          <Route path="settings" element={<Setting />} />
        </Route>

        <Route exact path="/view-details/:id" element={<ViewBooksDetails />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<Frogetpassword />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <hr />
      <Footer />
    </div>
  );
};

export default App;
