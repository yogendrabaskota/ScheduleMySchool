/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Sidebar from "./component/Sidebar";
import axios from "axios";

const HistoryPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
