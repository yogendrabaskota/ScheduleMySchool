/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const handleCreateEvent = () => {
    navigate("/create-event"); // Redirect to Create Event page
  };

  const handleYourEvent = () => {
    navigate("/your-event"); // Redirect to Your Event page
  };

  const handleAllUsers = () => {
    navigate("/all-users"); // Redirect to All Users page
  };

  const handleProfile = () => {
    // Decode the token to get the user ID
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id; // Assuming the token contains a property `id`
      navigate(`/teacherprofile/${userId}`); // Redirect to the teacher profile page
    } else {
      alert("User not authenticated!");
      navigate("/login");
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6">
        <h1 className="text-xl font-bold text-blue-600 mb-4">Teacher Dashboard</h1>
        <ul className="space-y-4">
          <li>
            <button
              onClick={handleCreateEvent}
              className="w-full text-left bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
            >
              Create Event
            </button>
          </li>
          <li>
            <button
              onClick={handleYourEvent}
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
              onClick={handleAllUsers}
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
        {/* <div className="mt-8">
          <button
            onClick={handleLogout}
            className="w-full bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-300"
          >
            Logout
          </button>
        </div> */}
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Welcome to the Dashboard</h2>
        <p className="text-gray-600">
          Select an action from the left sidebar to get started.
        </p>
      </div>
    </div>
  );
};

export default TeacherDashboard;
