/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserVerification = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isTeacher, setIsTeacher] = useState(false); // State to track if the logged-in user is a teacher
  const navigate = useNavigate();

  // Function to get the token and role from localStorage
  const getUserRole = () => {
    return localStorage.getItem("role"); // Assuming the role is saved in localStorage
  };

  // Check if the user is a teacher
  useEffect(() => {
    const role = getUserRole();
    if (role === "teacher") {
      setIsTeacher(true); // Only allow approve/reject actions if the role is teacher
    }
  }, []);

  const token = localStorage.getItem("token");
  // Axios instance with token
  const axiosInstance = axios.create({
    headers: {
      Authorization: `${token}`, // Add token to Authorization header
    },
  });

  // Fetch unverified users
  const fetchUnverifiedUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("https://schedulemyschool.onrender.com/api/user");
      const unverifiedUsers = response.data.data.filter(user => !user.isUserVerified);
      setUsers(unverifiedUsers);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
      setLoading(false);
    }
  };

  // Approve user
  const approveUser = async (id) => {
    if (!isTeacher) {
      alert("You must be a teacher to approve users.");
      return;
    }
    try {
      await axiosInstance.put(`http://localhost:5000/api/auth/verifyUser/${id}`);
      alert("User approved successfully!");
      fetchUnverifiedUsers(); // Refresh the list after approval
    } catch (err) {
      alert("Failed to approve user. Please try again.");
    }
  };

  // Reject user
  const rejectUser = async (id) => {
    if (!isTeacher) {
      alert("You must be a teacher to reject users.");
      return;
    }
    try {
      await axiosInstance.put(`http://localhost:5000/api/auth/rejectUser/${id}`); // Assuming DELETE request
      alert("User rejected successfully!");
      fetchUnverifiedUsers(); // Refresh the list after rejection
    } catch (err) {
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
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6">
        <h1 className="text-xl font-bold text-blue-600 mb-4">Teacher Dashboard</h1>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => navigate("/create-event")}
              className="w-full text-left bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
            >
              Create Event
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/your-event")}
              className="w-full text-left bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              Your Event
            </button>
          </li>
          <li>
          <button
              onClick={() => navigate("/past-event")}
              className="w-full text-left bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300"
            >
              Past Event
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/all-users")}
              className="w-full text-left bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
            >
              User Manager
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">User Verification</h1>
        </div>

        {users.length === 0 ? (
          <div className="text-center text-gray-500">No verification request found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
              >
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
                    <p className="text-red-500">Only teachers can approve or reject users.</p>
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
