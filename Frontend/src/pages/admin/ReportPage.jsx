/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import {
  FiCalendar,
  FiFileText,
  FiDownload,
  FiEye,
  FiClock,
  FiMapPin,
} from "react-icons/fi";

const ReportPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://schedulemyschool.onrender.com/api/event"
        );
        setEvents(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Calculate basic stats from events data
  const calculateStats = () => {
    const today = new Date().setHours(0, 0, 0, 0);
    const pastEvents = events.filter(
      (event) => new Date(event.date).setHours(0, 0, 0, 0) < today
    );

    return {
      totalEvents: events.length,
      pastEvents: pastEvents.length,
      upcomingEvents: events.length - pastEvents.length,
    };
  };

  const stats = calculateStats();
  const today = new Date().setHours(0, 0, 0, 0);
  const upcomingEvents = events.filter(
    (event) => new Date(event.date).setHours(0, 0, 0, 0) >= today
  );
  const pastEvents = events.filter(
    (event) => new Date(event.date).setHours(0, 0, 0, 0) < today
  );

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#FAFAFA]">
        <Sidebar />
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#3F51B5] border-t-transparent"></div>
            <p className="mt-4 text-lg font-medium text-[#212121]">
              Loading reports...
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
              onClick={() => window.location.reload()}
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
          <h1 className="text-2xl font-bold text-[#3F51B5] mb-2">
            Event Reports Dashboard
          </h1>
          <p className="text-[#757575]">
            Generate and view detailed event reports
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<FiCalendar className="text-[#3F51B5]" size={24} />}
            title="Total Events"
            value={stats.totalEvents}
          />
          <StatCard
            icon={<FiFileText className="text-[#4CAF50]" size={24} />}
            title="Upcoming Events"
            value={stats.upcomingEvents}
          />
          <StatCard
            icon={<FiDownload className="text-[#FF9800]" size={24} />}
            title="Past Events"
            value={stats.pastEvents}
          />
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#4CAF50] flex items-center">
              <FiClock className="mr-2" /> Upcoming Events
            </h2>
            <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full">
              {upcomingEvents.length} events
            </span>
          </div>

          {upcomingEvents.length === 0 ? (
            <EmptyState message="No upcoming events found" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  onGenerateReport={() =>
                    navigate(`/event/report/${event._id}`)
                  }
                  onSeeDetails={() => navigate(`/event/${event._id}`)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Past Events */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#F44336] flex items-center">
              <FiCalendar className="mr-2" /> Past Events
            </h2>
            <span className="bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full">
              {pastEvents.length} events
            </span>
          </div>

          {pastEvents.length === 0 ? (
            <EmptyState message="No past events found" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  onGenerateReport={() =>
                    navigate(`/event/report/${event._id}`)
                  }
                  onSeeDetails={() => navigate(`/event/${event._id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon, title, value }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-[#757575]">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className="p-3 rounded-full bg-opacity-20 bg-[#3F51B5]">{icon}</div>
    </div>
  </div>
);

// Event Card Component
const EventCard = ({ event, onGenerateReport, onSeeDetails }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
    <div className="p-6">
      <h3 className="text-lg font-bold text-[#3F51B5] mb-2">{event.title}</h3>
      <div className="flex items-center text-[#757575] mb-2">
        <FiCalendar className="mr-2" />
        <span>
          {new Date(event.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            weekday: "short",
          })}
        </span>
      </div>
      <div className="flex items-center text-[#757575] mb-4">
        <FiMapPin className="mr-2" />
        <span>{event.location}</span>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={onGenerateReport}
          className="flex-1 bg-[#3F51B5] hover:bg-[#303F9F] text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
        >
          <FiFileText className="mr-2" /> Report
        </button>
        <button
          onClick={onSeeDetails}
          className="flex-1 bg-white border border-[#3F51B5] text-[#3F51B5] hover:bg-[#3F51B5] hover:text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
        >
          <FiEye className="mr-2" /> Details
        </button>
      </div>
    </div>
  </div>
);

// Empty State Component
const EmptyState = ({ message }) => (
  <div className="bg-gray-50 rounded-lg p-8 text-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-16 w-16 mx-auto text-[#9E9E9E]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <p className="text-[#757575] mt-4">{message}</p>
  </div>
);

export default ReportPage;
