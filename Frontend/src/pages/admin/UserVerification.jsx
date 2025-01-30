/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar"; // Import Sidebar component

const UserVerification = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isTeacher, setIsTeacher] = useState(false);
  const navigate = useNavigate();

  const getUserRole = () => localStorage.getItem("role");

  useEffect(() => {
    const role = getUserRole();
    if (role === "admin") setIsTeacher(true);
  }, []);

  const token = localStorage.getItem("token");

  const axiosInstance = axios.create({
    headers: { Authorization: `${token}` },
  });

  const fetchUnverifiedUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("https://schedulemyschool.onrender.com/api/user");
      const unverifiedUsers = response.data.data.filter((user) => !user.isUserVerified);
      setUsers(unverifiedUsers);
    } catch {
      setError("Failed to fetch users. Please try again.");
    }
    setLoading(false);
  };

  const approveUser = async (id) => {
    if (!isTeacher) {
      alert("You must be an admin to approve users.");
      return;
    }
    try {
      await axiosInstance.put(`https://schedulemyschool.onrender.com/api/auth/verifyUser/${id}`);
      alert("User approved successfully!");
      fetchUnverifiedUsers();
    } catch {
      alert("Failed to approve user. Please try again.");
    }
  };

  const rejectUser = async (id) => {
    if (!isTeacher) {
      alert("You must be an admin to reject users.");
      return;
    }
    try {
      await axiosInstance.put(`https://schedulemyschool.onrender.com/api/auth/rejectUser/${id}`);
      alert("User rejected successfully!");
      fetchUnverifiedUsers();
    } catch {
      alert("Failed to reject user. Please try again.");
    }
  };

  useEffect(() => {
    fetchUnverifiedUsers();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar /> {/* Sidebar Component */}

      <div className="flex-grow p-8">
        <h1 className="text-2xl font-bold mb-6">User Verification</h1>

        {users.length === 0 ? (
          <div className="text-center text-gray-500">No verification request found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div key={user._id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
                <h2 className="text-lg font-bold">{user.name}</h2>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
                <div className="flex justify-between mt-4">
                  {isTeacher ? (
                    <>
                      <button
                        onClick={() => approveUser(user._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectUser(user._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <p className="text-red-500">Only admin can approve or reject users.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserVerification;
