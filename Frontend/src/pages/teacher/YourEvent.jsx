/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EventCard = ({ id, title, description, location, date, time, availableTickets }) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow w-80 h-auto p-6 m-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <div className="text-gray-700 mb-3">
        <span className="font-semibold">📍 Location:</span> {location}
      </div>
      <div className="text-gray-700 mb-3">
        <span className="font-semibold">📅 Date:</span> {new Date(date).toLocaleDateString()}
      </div>
      <div className="text-gray-700 mb-3">
        <span className="font-semibold">⏰ Time:</span> {time}
      </div>
      <div className={`text-sm font-bold mb-3 ${availableTickets > 0 ? "text-green-500" : "text-red-500"}`}>
        🎟️ Available Tickets: {availableTickets > 0 ? availableTickets : "Sold Out"}
      </div>
      <div className="flex justify-between">
        <Link to={`/event/${id}`}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-lg">
            View Details
          </button>
        </Link>
        <Link to={`/event/update/${id}`}>
          <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold py-2 px-4 rounded-lg">
            Update Event
          </button>
        </Link>
      </div>
    </div>
  );
};

const YourEvents = () => {
  const [events, setEvents] = useState([]);
  const baseURL = "https://schedulemyschool.onrender.com"; // Update with your backend's base URL
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEvents = async () => {
      if (!token) {
        console.error("No token found. Please log in.");
        return;
      }

      try {
        const response = await axios.get(`${baseURL}/api/event/my`, {
          headers: { Authorization: `${token}` },
        });
        setEvents(response.data.data); // Update the events state
      } catch (error) {
        console.error("Error fetching your events:", error.response?.data?.message || error.message);
      }
    };

    fetchEvents();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-6">
        <h1 className="text-xl font-bold text-blue-600 mb-4">Teacher Dashboard</h1>
        <ul className="space-y-4">
          <li>
            <button
              onClick={() => (window.location.href = "/create-event")}
              className="w-full text-left bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
            >
              Create Event
            </button>
          </li>
          <li>
            <button
              onClick={() => (window.location.href = "/your-event")}
              className="w-full text-left bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              Your Event
            </button>
          </li>
          <li>
            <button
              onClick={() => (window.location.href = "/all-users")}
              className="w-full text-left bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
            >
              All Users
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Events</h2>
        <div className="flex flex-wrap justify-center items-center">
          {events.length > 0 ? (
            events.map((event) => (
              <EventCard
                key={event._id}
                id={event._id}
                title={event.title}
                description={event.description}
                location={event.location}
                date={event.date}
                time={event.time}
                availableTickets={event.totalTickets - event.ticketsBooked}
              />
            ))
          ) : (
            <p className="text-gray-600 text-lg">No events found. Create one to get started!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default YourEvents;
