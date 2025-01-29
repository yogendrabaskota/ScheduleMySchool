/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";

const ReportPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/api/event");
        setEvents(response.data.data);
      } catch (err) {
        setError("Failed to fetch events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleGenerateReport = (eventId) => {
    navigate(`/event/report/${eventId}`);
  };

  const handleSeeDetails = (eventId) => {
    navigate(`/event-details/${eventId}`);
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  // Get today's date (without time)
  const today = new Date().setHours(0, 0, 0, 0);

  // Separate events into upcoming and past events
  const upcomingEvents = events.filter(event => new Date(event.date).setHours(0, 0, 0, 0) >= today);
  const pastEvents = events.filter(event => new Date(event.date).setHours(0, 0, 0, 0) < today);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow p-8">
        <h1 className="text-2xl font-bold mb-6">Event Reports</h1>

        {/* Upcoming Events */}
        <h2 className="text-xl font-semibold mb-4 text-green-600">Upcoming Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {upcomingEvents.length === 0 ? (
            <div className="text-gray-500">No upcoming events.</div>
          ) : (
            upcomingEvents.map(event => (
              <EventCard key={event._id} event={event} onGenerateReport={handleGenerateReport} onSeeDetails={handleSeeDetails} />
            ))
          )}
        </div>

        {/* Past Events */}
        <h2 className="text-xl font-semibold mb-4 text-red-600">Past Events</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pastEvents.length === 0 ? (
            <div className="text-gray-500">No past events.</div>
          ) : (
            pastEvents.map(event => (
              <EventCard key={event._id} event={event} onGenerateReport={handleGenerateReport} onSeeDetails={handleSeeDetails} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Extracted EventCard component for reusability
const EventCard = ({ event, onGenerateReport, onSeeDetails }) => (
  <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
    <h2 className="text-lg font-bold">{event.name}</h2>
    <strong><p>{event.title}</p></strong>
    <p>Date: {new Date(event.date).toLocaleDateString()}</p>
    <p>Location: {event.location}</p>
    <div className="mt-4 flex space-x-2">
      <button
        onClick={() => onGenerateReport(event._id)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
      >
        Generate Report
      </button>
      <button
        onClick={() => onSeeDetails(event._id)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
      >
        See Details
      </button>
    </div>
  </div>
);

export default ReportPage;
