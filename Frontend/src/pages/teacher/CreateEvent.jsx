/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";



const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    totalTickets: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://schedulemyschool.onrender.com/api/event", // Update this URL with your backend endpoint
        formData,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
  

      if (response.status === 200) {
        setSuccess("Event created successfully!");
        setFormData({
          title: "",
          description: "",
          date: "",
          time: "",
          location: "",
          totalTickets: "",
        });
        setTimeout(() => navigate("/teacher-dashboard"), 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred while creating the event."
      );
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
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
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold text-blue-600 text-center mb-6">
            Create Event
          </h1>

          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}
          {success && (
            <p className="text-green-500 text-center mb-4">{success}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              ></textarea>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                Time
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label htmlFor="totalTickets" className="block text-sm font-medium text-gray-700">
                Total Tickets
              </label>
              <input
                type="number"
                id="totalTickets"
                name="totalTickets"
                value={formData.totalTickets}
                onChange={handleChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
            >
              Create Event
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
