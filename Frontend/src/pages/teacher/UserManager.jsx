/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../admin/sidebar/Sidebar"; // Assuming Sidebar is a separate component

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState(""); // State to store user role
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("token");
  const getUserRole = () => localStorage.getItem("role");

  useEffect(() => {
    const role = getUserRole();
    if (role) {
      setUserRole(role);
    }
  }, []);

  const axiosInstance = axios.create({
    headers: {
      Authorization: `${getToken()}`,
    },
  });

  const fetchVerifiedUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("https://schedulemyschool.onrender.com/api/user/verified");
      setUsers(response.data.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users. Please try again.");
      setLoading(false);
    }
  };

  const handleSeeRequestClick = () => navigate("/user-verification");

  const handleProfile = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
      navigate(`/teacherprofile/${userId}`);
    } else {
      alert("User not authenticated!");
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchVerifiedUsers();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  const categorizedUsers = {
    teachers: users.filter((user) => user.role === "teacher"),
    students: users.filter((user) => user.role === "student"),
    guests: users.filter((user) => user.role === "guest"),
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Conditionally render Sidebar */}
      {userRole === "admin" ? (
        <Sidebar />
      ) : (
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
            <li>
              <button
                onClick={handleProfile}
                className="w-full text-left bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition duration-300"
              >
                Profile
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-grow p-8">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-bold">User Manager</h1>

          {userRole === "admin" && (
            <button
              onClick={handleSeeRequestClick}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              See Request
            </button>
          )}
        </div>

        {Object.keys(categorizedUsers).map((category) => (
          <div key={category} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 capitalize">{category}</h2>

            {categorizedUsers[category].length === 0 ? (
              <div className="text-center text-gray-500">No {category} found.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categorizedUsers[category].map((user) => (
                  <div
                    key={user._id}
                    className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
                  >
                    <h2 className="text-lg font-bold">{user.name}</h2>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                    <p>Status: {user.isUserVerified ? "Verified" : "Not Verified"}</p>
                    <button
                      onClick={() => navigate(`/user-details/${user._id}`)}
                      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            )}
            <hr className="my-6 border-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManager;
