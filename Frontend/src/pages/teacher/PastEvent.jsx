/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const PastEventCard = ({ id, title, description, location, date, time }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-[#212121]">{title}</h2>
          <span className="bg-[#FF9800]/10 text-[#FF9800] text-xs font-semibold px-2.5 py-0.5 rounded">
            Past Event
          </span>
        </div>
        <p className="text-[#757575] text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-[#00BCD4] mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-sm text-[#212121]">{location}</span>
          </div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-[#00BCD4] mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm text-[#212121]">
              {new Date(date).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-[#00BCD4] mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm text-[#212121]">{time}</span>
          </div>
        </div>

        <Link to={`/event/report/${id}`}>
          <button className="w-full bg-[#3F51B5] hover:bg-[#303F9F] text-white font-medium py-2 px-4 rounded-lg transition-colors">
            Generate Report
          </button>
        </Link>
      </div>
    </div>
  );
};

const PastEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseURL = "https://schedulemyschool.onrender.com";
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleNavigation = (path) => navigate(path);
  const handleProfile = () => {
    if (token) {
      const decodedToken = jwtDecode(token);
      navigate(`/teacherprofile/${decodedToken.id}`);
    } else {
      alert("User not authenticated!");
      navigate("/login");
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  useEffect(() => {
    const fetchEvents = async () => {
      if (!token) {
        console.error("No token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${baseURL}/api/event/my`, {
          headers: { Authorization: `${token}` },
        });

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const pastEvents = response.data.data.filter((event) => {
          const eventDate = new Date(event.date);
          return eventDate < yesterday;
        });

        setEvents(pastEvents);
      } catch (error) {
        console.error(
          "Error fetching past events:",
          error.response?.data?.message || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [token]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      {/* Sidebar */}
      <div className="w-72 bg-[#3F51B5] text-white p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Teacher Dashboard</h1>
          <div className="w-16 h-1 bg-[#00BCD4]"></div>
        </div>

        <nav className="flex-1">
          <ul className="space-y-3">
            <li>
              <button
                onClick={() => handleNavigation("/create-event")}
                className="w-full flex items-center space-x-3 bg-[#FF9800] hover:bg-[#F57C00] text-[#212121] font-medium py-3 px-4 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Create Event</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("/your-event")}
                className="w-full flex items-center space-x-3 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Your Events</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("/past-event")}
                className="w-full flex items-center space-x-3 bg-white/20 text-white font-medium py-3 px-4 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Past Events</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation("/all-users")}
                className="w-full flex items-center space-x-3 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                </svg>
                <span>User Manager</span>
              </button>
            </li>
            <li>
              <button
                onClick={handleProfile}
                className="w-full flex items-center space-x-3 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Profile</span>
              </button>
            </li>
          </ul>
        </nav>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-[#212121]">Past Events</h2>
            <div className="text-sm text-[#757575]">
              {events.length} {events.length === 1 ? "event" : "events"} found
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3F51B5]"></div>
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <PastEventCard
                  key={event._id}
                  id={event._id}
                  title={event.title}
                  description={event.description}
                  location={event.location}
                  date={event.date}
                  time={event.time}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
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
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-medium text-[#212121] mt-4">
                No Past Events Found
              </h3>
              <p className="text-[#757575] mt-2">
                You haven't organized any events yet or all events are upcoming.
              </p>
              <button
                onClick={() => handleNavigation("/create-event")}
                className="mt-4 bg-[#3F51B5] hover:bg-[#303F9F] text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Create New Event
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PastEvents;
