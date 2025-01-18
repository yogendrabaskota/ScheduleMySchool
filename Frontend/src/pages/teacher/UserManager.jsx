/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Function to get the token from localStorage
  const getToken = () => {
    return localStorage.getItem("token"); // Adjust to sessionStorage if necessary
  };

  // Axios instance with token
  const axiosInstance = axios.create({
    headers: {
      Authorization: `${getToken()}`, // Add token to Authorization header
    },
  });

  // Fetch verified users
  const fetchVerifiedUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("http://localhost:5000/api/user/verified");
      setUsers(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
      setLoading(false);
    }
  };

  // Navigate to user verification page
  const handleSeeRequestClick = () => {
    navigate("/user-verification"); // Navigate to the user verification page using useNavigate
  };

  useEffect(() => {
    fetchVerifiedUsers();
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
              onClick={() => navigate("/all-users")}
              className="w-full text-left bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
            >
              All Users
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">User Manager</h1>
          <button
            onClick={handleSeeRequestClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            See Request
          </button>
        </div>

        {users.length === 0 ? (
          <div className="text-center text-gray-500">No verified users found.</div>
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
                <p>Status: {user.isUserVerified ? "Verified" : "Not Verified"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManager;
