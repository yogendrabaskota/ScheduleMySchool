import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import {
  FiUser,
  FiMail,
  FiCheck,
  FiX,
  FiUserCheck,
  FiUserX,
} from "react-icons/fi";
import { FaUserShield } from "react-icons/fa";

const UserVerification = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    setIsAdmin(role === "admin");
  }, []);

  const token = localStorage.getItem("token");

  const fetchUnverifiedUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://schedulemyschool.onrender.com/api/user",
        { headers: { Authorization: token } }
      );
      const unverifiedUsers = response.data.data.filter(
        (user) => !user.isUserVerified
      );
      setUsers(unverifiedUsers);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleVerification = async (id, action) => {
    if (!isAdmin) {
      alert("You must be an admin to verify users.");
      return;
    }

    try {
      await axios.put(
        `https://schedulemyschool.onrender.com/api/auth/${action}User/${id}`,
        {},
        { headers: { Authorization: token } }
      );

      const actionText = action === "verify" ? "approved" : "rejected";
      alert(`User ${actionText} successfully!`);
      fetchUnverifiedUsers();
    } catch (err) {
      alert(err.response?.data?.message || `Failed to ${action} user`);
    }
  };

  useEffect(() => {
    fetchUnverifiedUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#FAFAFA]">
        <Sidebar />
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#3F51B5] border-t-transparent"></div>
            <p className="mt-4 text-lg font-medium text-[#212121]">
              Loading verification requests...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-[#FAFAFA]">
        <Sidebar />
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded max-w-md">
            <p className="font-semibold">{error}</p>
            <button
              onClick={fetchUnverifiedUsers}
              className="mt-2 text-sm text-[#3F51B5] hover:underline"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      <Sidebar />

      <div className="flex-1 p-6 md:p-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[#3F51B5] flex items-center">
                <FaUserShield className="mr-3" /> User Verification
              </h1>
              <p className="text-[#757575] mt-1">
                Review and manage user verification requests
              </p>
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {users.length} pending{" "}
              {users.length === 1 ? "request" : "requests"}
            </div>
          </div>
        </div>

        {/* User Cards */}
        {users.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <FiUserCheck className="h-16 w-16 mx-auto text-[#9E9E9E]" />
            <h3 className="text-xl font-semibold text-[#212121] mt-4">
              No Verification Requests
            </h3>
            <p className="text-[#757575] mt-2">
              All users are currently verified
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-[#3F51B5] flex items-center justify-center text-white text-xl mr-4">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{user.name}</h3>
                      <p className="text-sm text-[#757575] capitalize">
                        {user.role}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-[#757575]">
                      <FiMail className="mr-3" />
                      <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center text-[#757575]">
                      <FiUser className="mr-3" />
                      <span>Unverified Account</span>
                    </div>
                  </div>

                  {isAdmin ? (
                    <div className="flex space-x-3 mt-6">
                      <button
                        onClick={() => handleVerification(user._id, "verify")}
                        className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                      >
                        <FiCheck className="mr-2" /> Approve
                      </button>
                      <button
                        onClick={() => handleVerification(user._id, "reject")}
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                      >
                        <FiX className="mr-2" /> Reject
                      </button>
                    </div>
                  ) : (
                    <div className="mt-6 p-3 bg-yellow-100 text-yellow-800 rounded-lg text-sm">
                      Only admins can verify users
                    </div>
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
