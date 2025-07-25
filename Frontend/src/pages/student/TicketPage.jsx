/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Sidebar from "./component/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";

const TicketPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [qrCodeData, setQrCodeData] = useState("");
  const [expandedTickets, setExpandedTickets] = useState({});

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
          return eventDate >= today;
        });

        setTickets(filteredTickets);
        setLoading(false);
      } catch (err) {
        setError("No tickets found. Please try again.");
        setLoading(false);
      }
    };

    fetchTickets();
  }, [token]);

  const toggleTicketExpand = (ticketId) => {
    setExpandedTickets((prev) => ({
      ...prev,
      [ticketId]: !prev[ticketId],
    }));
    setSelectedTicketId(ticketId);
    setQrCodeData("");
  };

  const handleQRClick = (ticketNumber) => {
    setQrCodeData(ticketNumber);
  };

  const handleNavigate = (ticketId) => {
    navigate(`/ticket/${ticketId}`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#FAFAFA]">
        {role !== "teacher" && <Sidebar title="Ticket Page" />}
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-[#3F51B5] border-t-transparent"></div>
            <h2 className="mt-4 text-xl font-semibold text-[#212121]">
              Loading your tickets...
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-[#FAFAFA]">
        {role !== "teacher" && <Sidebar title="Ticket Page" />}
        <div className="flex-1 p-8 flex items-center justify-center">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded max-w-md">
            <p className="font-semibold">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      {role !== "teacher" && <Sidebar title="Ticket Page" />}
      <div className="flex-1 p-6 md:p-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-[#3F51B5] mb-2">
            Your Tickets
          </h1>
          <p className="text-[#757575]">
            View and manage your upcoming event tickets
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
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              />
            </svg>
            <h3 className="text-xl font-semibold text-[#212121] mt-4">
              No tickets found
            </h3>
            <p className="text-[#757575] mt-2">
              You don&apos;t have any upcoming event tickets
            </p>
            <button
              onClick={() => navigate("/events")}
              className="mt-4 bg-[#3F51B5] hover:bg-[#303F9F] text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Browse Events
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="bg-[#3F51B5] p-4 text-white">
                  <h2 className="text-xl font-bold truncate">
                    {ticket.eventId.title}
                  </h2>
                  <p className="text-sm text-[#E0E0E0]">
                    {new Date(ticket.eventId.date).toLocaleDateString()} •{" "}
                    {ticket.eventId.time}
                  </p>
                </div>

                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-sm font-medium text-[#757575]">
                        Quantity
                      </p>
                      <p className="text-lg font-semibold">{ticket.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-[#757575]">
                        Status
                      </p>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ticket.paymentDetails.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {ticket.paymentDetails.status || "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-3">
                    <button
                      onClick={() => toggleTicketExpand(ticket._id)}
                      className="w-full flex justify-between items-center text-[#3F51B5] hover:text-[#303F9F] font-medium"
                    >
                      <span>
                        {expandedTickets[ticket._id]
                          ? "Hide details"
                          : "View details"}
                      </span>
                      <svg
                        className={`w-5 h-5 transform transition-transform ${
                          expandedTickets[ticket._id] ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {expandedTickets[ticket._id] && (
                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-[#757575]">
                            Location:
                          </span>
                          <span className="text-sm font-medium">
                            {ticket.eventId.location || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-[#757575]">
                            Ticket #:
                          </span>
                          <span className="text-sm font-medium">
                            {ticket.ticketNumber || "N/A"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-[#757575]">
                            Purchased by:
                          </span>
                          <span className="text-sm font-medium">
                            {ticket.userId.name || "N/A"}
                          </span>
                        </div>

                        <div className="flex space-x-2 mt-4">
                          <button
                            onClick={() => handleQRClick(ticket.ticketNumber)}
                            className="flex-1 bg-[#4CAF50] hover:bg-[#388E3C] text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors"
                          >
                            Show QR
                          </button>
                          <button
                            onClick={() => handleNavigate(ticket._id)}
                            className="flex-1 bg-[#3F51B5] hover:bg-[#303F9F] text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors"
                          >
                            View Ticket
                          </button>
                        </div>

                        {qrCodeData && selectedTicketId === ticket._id && (
                          <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col items-center">
                            <p className="text-sm font-medium text-[#757575] mb-2">
                              Scan this QR code for verification
                            </p>
                            <QRCodeCanvas
                              value={qrCodeData}
                              size={128}
                              bgColor="#FFFFFF"
                              fgColor="#3F51B5"
                              level="H"
                            />
                          </div>
                        )}
                      </div>
                    )}
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

export default TicketPage;
