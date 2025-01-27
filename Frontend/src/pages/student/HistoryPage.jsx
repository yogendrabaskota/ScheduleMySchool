/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Sidebar from "./component/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react"; // Import the QRCode component

const HistoryPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedTicketId, setSelectedTicketId] = useState(null); // Track selected ticket
  const [qrCodeData, setQrCodeData] = useState(""); // Track QR code data

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role"); // Get the user role from localStorage

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("https://schedulemyschool.onrender.com/api/ticket", {
          headers: {
            Authorization: `${token}`,
          },
        });

        // Filter tickets with event dates before today
        const today = new Date();
        const filteredTickets = response.data.data.filter((ticket) => {
          const eventDate = new Date(ticket.eventId.date);
          return eventDate < today; // Event date is before today
        });

        setTickets(filteredTickets);
        setLoading(false);
      } catch (err) {
        setError("No tickets found for past events. Please try again.");
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return (
      <div className="flex">
        {role !== "teacher" && <Sidebar title="History Page" />}
        <div className="w-full p-8 text-center">
          <h2 className="text-xl font-semibold">Loading history...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex">
        {role !== "teacher" && <Sidebar title="History Page" />}
        <div className="w-full p-8 text-center">
          <h2 className="text-xl font-semibold text-red-600">{error}</h2>
        </div>
      </div>
    );
  }

  const handleViewClick = (ticketId) => {
    setSelectedTicketId(ticketId); // Set the selected ticket
    setQrCodeData(""); // Reset QR code data when a new ticket is selected
  };

  const handleQRClick = (ticketId, ticketNumber) => {
    setQrCodeData(ticketNumber); // Set the ticket number as QR code data
  };

  const handleNavigate = async (_id) => {
    navigate(`/ticket/${_id}`);
  };

  return (
    <div className="flex">
      {role !== "teacher" && <Sidebar title="History Page" />}
      <div className="w-full bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Ticket History</h1>

        {tickets.length === 0 ? (
          <p className="text-lg text-gray-600">No past tickets found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
              >
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {ticket.eventId.title}
                </h2>
                <p className="text-sm text-gray-600">
                  <strong>Purchase Date:</strong>{" "}
                  {new Date(ticket.purchaseDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Quantity:</strong> {ticket.quantity}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Payment Status:</strong>{" "}
                  {ticket.paymentDetails.status || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Purchase By:</strong> {ticket.userId.name || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Ticket Number:</strong> {ticket.ticketNumber || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Event Date:</strong>{" "}
                  {new Date(ticket.eventId.date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Event Location:</strong>{" "}
                  {ticket.eventId.location || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Event Time:</strong> {ticket.eventId.time || "N/A"}
                </p>

                {/* View button */}
                <button
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={() => handleViewClick(ticket._id)}
                >
                  View
                </button>

                {/* Conditional rendering for additional buttons */}
                {selectedTicketId === ticket._id && (
                  <div className="mt-4 space-x-4">
                    <button
                      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                      onClick={() => handleQRClick(ticket._id, ticket.ticketNumber)}
                    >
                      QR verify
                    </button>
                    <button
                      className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600"
                      onClick={() => handleNavigate(ticket._id)}
                    >
                      View Ticket
                    </button>
                  </div>
                )}

                {/* Display QR code */}
                {qrCodeData && selectedTicketId === ticket._id && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      QR Code for Ticket
                    </h3>
                    <QRCodeCanvas value={qrCodeData} size={150} />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
