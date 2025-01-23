/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Sidebar from "./component/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TicketPage = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Authorization token
  const token = localStorage.getItem("token");

  useEffect(() => {




    // Fetch tickets from API
    const fetchTickets = async () => {

      try {
        const response = await axios.get("http://localhost:5000/api/ticket", {
          headers: {
            Authorization: `${token}`,
          },
        });

        console.log("response", response.data.data);
        setTickets(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch tickets. Please try again.");
        setLoading(false);
      }
    };
    const handleViewClick = (ticketId) => {
   
    };

    fetchTickets();
  }, []);


  if (loading) {
    return (
      <div className="flex">
        <Sidebar title="Ticket Page" />
        <div className="w-full p-8 text-center">
          <h2 className="text-xl font-semibold">Loading tickets...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex">
        <Sidebar title="Ticket Page" />
        <div className="w-full p-8 text-center">
          <h2 className="text-xl font-semibold text-red-600">{error}</h2>
        </div>
      </div>
    );
  }

  const handleViewClick = (ticketId) => {
    console.log(`View button clicked for ticket ID: ${ticketId}`);
    // Add your logic here (e.g., redirect to a detailed view page or show a modal)
  };

  return (
    <div className="flex">
      <Sidebar title="Ticket Page" />
      <div className="w-full bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Your Tickets</h1>

        {tickets.length === 0 ? (
          <p className="text-lg text-gray-600">No tickets found.</p>
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

                {/* <p className="text-sm text-gray-600">
                  <strong>Payment Method:</strong>{" "}
                  {ticket.paymentDetails.method || "N/A"}
                </p> */}
                <p className="text-sm text-gray-600">
                  <strong>Purchase By:</strong>{" "}
                  {ticket.userId.name || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Ticket Number:</strong>{" "}
                  {ticket.ticketNumber || "N/A"}
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
                  <strong>Event Time:</strong>{" "}
                  {ticket.eventId.time || "N/A"}
                </p>


                {/* <p className="text-sm text-gray-600">
                  <strong>Event:</strong>{" "}
                  {ticket.eventId
                    ? `${ticket.eventId.title} - ${ticket.eventId.location}`
                    : "No Event"}
                </p> */}

                <button
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  onClick={() => navigate(`/tickets/${ticket.ticketNumber}`)}
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketPage;
