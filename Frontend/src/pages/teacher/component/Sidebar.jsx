/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleProfile = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id; // Assuming the token contains a property `id`
      navigate(`/teacherprofile/${userId}`);
    } else {
      alert("User not authenticated!");
      navigate("/login");
    }
  };

  return (
    <div className="w-64 bg-white shadow-lg p-6">
      <h1 className="text-xl font-bold text-blue-600 mb-4">Teacher Dashboard</h1>
      <ul className="space-y-4">
        <li>
          <button
            onClick={() => handleNavigate("/create-event")}
            className="w-full text-left bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
          >
            Create Event
          </button>
        </li>
        <li>
          <button
            onClick={() => handleNavigate("/your-event")}
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
  );
};

export default Sidebar;
