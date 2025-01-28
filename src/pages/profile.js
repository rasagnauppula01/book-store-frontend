import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dpChange, setDpChange] = useState(false); // This will trigger re-render in Sidebar

  useEffect(() => {
    const fetchProfile = async () => {
      const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        const response = await axios.get(
          "http://localhost:5000/get-user-info",
          { headers }
        );
        setUser(response.data.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [dpChange]); // Add dpChange to re-fetch profile when dpChange is updated

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <span className="text-2xl text-gray-600">Loading...</span>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-12 flex flex-col md:flex-row min-h-screen py-8 gap-6">
      <div className="w-full md:w-1/4 lg:w-1/5">
        <Sidebar data={user} setDpChange={setDpChange} /> {/* Pass dpChange */}
      </div>
      <div className="w-full md:w-3/4 lg:w-4/5">
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
