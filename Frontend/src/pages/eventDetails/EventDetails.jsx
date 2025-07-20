import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const baseURL = "https://schedulemyschool.onrender.com";
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    setRole(storedRole);

    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseURL}/api/event/${id}`);
        setEvent(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setError("Failed to load event details");
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  const handleRegister = () => {
    navigate(`/ticket-purchase/${id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3F51B5]"></div>
          <p className="mt-4 text-[#212121]">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md text-center">
          <div className="text-red-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-[#212121] mb-2">
            Error Loading Event
          </h2>
          <p className="text-[#212121] mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#3F51B5] hover:bg-[#303F9F] text-white font-semibold py-2 px-6 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#212121]">Event not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-[#3F51B5] hover:text-[#303F9F] mb-6 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to Events
        </button>

        {/* Event Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Event Header */}
          <div className="bg-[#3F51B5] p-6 text-white">
            <h1 className="text-3xl font-bold">{event.title}</h1>
            <p className="text-[#E0E0E0] mt-2">{event.description}</p>
          </div>

          {/* Event Details */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex items-start">
                <div className="bg-[#00BCD4]/10 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#00BCD4]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#212121]">Location</h3>
                  <p className="text-[#212121]">{event.location}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#FF9800]/10 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#FF9800]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#212121]">Date</h3>
                  <p className="text-[#212121]">
                    {new Date(event.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#3F51B5]/10 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#3F51B5]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#212121]">Time</h3>
                  <p className="text-[#212121]">{event.time}</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-[#4CAF50]/10 p-3 rounded-full mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-[#4CAF50]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#212121]">
                    Tickets Available
                  </h3>
                  <p
                    className={`font-bold ${
                      event.totalTickets - event.ticketsBooked > 0
                        ? "text-[#4CAF50]"
                        : "text-[#F44336]"
                    }`}
                  >
                    {event.totalTickets - event.ticketsBooked > 0
                      ? `${event.totalTickets - event.ticketsBooked} remaining`
                      : "Sold Out"}
                  </p>
                </div>
              </div>
            </div>

            {event.createdby && (
              <div className="bg-[#FAFAFA] p-4 rounded-lg mb-6">
                <h3 className="font-semibold text-[#212121] mb-2">
                  Event Organizer
                </h3>
                <div className="flex items-center">
                  <div className="bg-[#3F51B5] text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
                    {event.createdby.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[#212121] font-medium">
                      {event.createdby.name}
                    </p>
                    <p className="text-[#757575] text-sm">
                      {event.createdby.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Register Button - Hidden for admin */}
            {role !== "admin" && (
              <button
                onClick={handleRegister}
                disabled={event.totalTickets - event.ticketsBooked <= 0}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors ${
                  event.totalTickets - event.ticketsBooked > 0
                    ? "bg-[#FF9800] hover:bg-[#F57C00] text-[#212121]"
                    : "bg-gray-400 cursor-not-allowed text-white"
                }`}
              >
                {event.totalTickets - event.ticketsBooked > 0
                  ? "Register Now"
                  : "Event Sold Out"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
