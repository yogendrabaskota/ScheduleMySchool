/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";



const EventCard = ({ id, title, description, location, date, time, availableTickets, ticketsBooked }) => {
  const eventDate = new Date(date);

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
      <div className="text-sm font-bold mb-3">
        <span className="font-semibold">🎟️ Ticket Booked: </span>{ticketsBooked}
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
  const baseURL = "https://schedulemyschool.onrender.com";
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const upcomingEvents = response.data.data.filter((event) => {
          const eventDate = new Date(event.date);
          return eventDate >= today;
        });

        setEvents(upcomingEvents);
      } catch (error) {
        console.error("Error fetching your events:", error.response?.data?.message || error.message);
      }
    };

    fetchEvents();
  }, [token]);
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

      {/* Main Content */}
      <div className="flex-grow p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Upcoming Events</h2>
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
                ticketsBooked={event.ticketsBooked}
              />
            ))
          ) : (
            <p className="text-gray-600 text-lg">No upcoming events found. Create one to get started!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default YourEvents;
