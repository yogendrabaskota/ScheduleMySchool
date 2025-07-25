/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Sidebar from "./component/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HistoryPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          "https://schedulemyschool.onrender.com/api/ticket",
          {
            headers: { Authorization: `${token}` },
          }
        );

        const today = new Date();
        const filteredTickets = response.data.data.filter((ticket) => {
          const eventDate = new Date(ticket.eventId.date);
          return eventDate < today;
        });

        setTickets(filteredTickets);
        setLoading(false);
      } catch (err) {
        setError("No tickets found for past events. Please try again.");
        setLoading(false);
      }
    };

    fetchTickets();
  }, [token]);

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#FAFAFA]">
        {role !== "teacher" && <Sidebar title="History" />}
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#3F51B5] border-t-transparent"></div>
            <h2 className="mt-4 text-xl font-semibold text-[#212121]">
              Loading your history...
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-[#FAFAFA]">
        {role !== "teacher" && <Sidebar title="History" />}
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
      {role !== "teacher" && <Sidebar title="History" />}
      <div className="flex-1 p-6 md:p-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-[#3F51B5] mb-2">
            Ticket History
          </h1>
          <p className="text-[#757575]">
            View your past event tickets and attendance
          </p>
        </div>

        {tickets.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-[#212121] mt-4">
              No past tickets found
            </h3>
            <p className="text-[#757575] mt-2">
              You haven&apos;t attended any events yet
            </p>
            <button
              onClick={() => navigate("/events")}
              className="mt-4 bg-[#3F51B5] hover:bg-[#303F9F] text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Browse Events
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-[#212121]">
                        {ticket.eventId.title}
                      </h2>
                      <p className="text-sm text-[#757575] mt-1">
                        {new Date(ticket.eventId.date).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        ticket.paymentDetails.status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {ticket.paymentDetails.status || "N/A"}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-[#757575]">
                        Location
                      </p>
                      <p className="text-sm">
                        {ticket.eventId.location || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#757575]">Time</p>
                      <p className="text-sm">{ticket.eventId.time || "N/A"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#757575]">
                        Tickets
                      </p>
                      <p className="text-sm">{ticket.quantity}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#757575]">
                        Ticket #
                      </p>
                      <p className="text-sm">{ticket.ticketNumber || "N/A"}</p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-[#757575]"
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
                        <span className="text-sm text-[#757575]">
                          Purchased on{" "}
                          {new Date(ticket.purchaseDate).toLocaleDateString()}
                        </span>
                      </div>
                      <button
                        onClick={() => navigate(`/ticket/${ticket._id}`)}
                        className="text-sm text-[#3F51B5] hover:text-[#303F9F] font-medium hover:underline"
                      >
                        View details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
