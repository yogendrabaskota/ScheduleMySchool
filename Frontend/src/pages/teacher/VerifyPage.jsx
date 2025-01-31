/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { QrReader } from "react-qr-reader";

const VerifyPage = () => {
  const [ticketNumber, setTicketNumber] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [ticketDetails, setTicketDetails] = useState(null); // State for ticket details
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleScan = async (data) => {
    if (data && data !== ticketNumber) {
      // Avoid duplicate verification for the same ticket
      setTicketNumber(data); // Get the ticket number from QR code
      try {
        const token = localStorage.getItem("token");
        // Fetch ticket details from the API
        const response = await axios.get(
          `https://schedulemyschool.onrender.com/api/ticket/verify/${data}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        console.log(response.data);
        if (response.status === 200 && response.data) {
          setStatusMessage("Ticket successfully verified!");
          setTicketDetails(response.data.ticket); // Save ticket details
        } else {
          setStatusMessage("Ticket not verified.");
          setTicketDetails(null); // Clear ticket details
        }
      } catch (err) {
        setStatusMessage("Error verifying ticket. Please try again.");
        setTicketDetails(null); // Clear ticket details
        console.error("Error fetching ticket:", err);
      }
    }
  };

  const handleError = (err) => {
    setError("Error accessing camera. Please check permissions.");
    console.error(err);
  };

  const resetVerification = () => {
    setTicketNumber(null); // Reset ticket number
    setStatusMessage(""); // Clear status message
    setTicketDetails(null); // Clear ticket details
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Verify Ticket</h1>

      {/* QR Reader */}
      <div className="w-72 h-72 mb-6">
        <QrReader
          onResult={(result, error) => {
            if (!!result) {
              handleScan(result?.text);
            }
            if (!!error) {
              handleError(error);
            }
          }}
          style={{ width: "100%" }}
        />
      </div>

      {/* Status Message */}
      {statusMessage && (
        <div
          className={`text-lg font-semibold mb-4 ${
            statusMessage.includes("successfully")
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {statusMessage}
        </div>
      )}

      {/* Ticket Details */}
      {ticketDetails && (
        <div className="p-4 bg-white rounded-lg shadow-md w-96">
          <h2 className="text-lg font-bold mb-2">Ticket Details</h2>
          <p>
            <strong>Event:</strong> {ticketDetails.eventId.title} <br />
            {/* <em>{ticketDetails.eventId.description}</em> */}
          </p>
          <p>
            <strong>Ticket Number:</strong> {ticketDetails.ticketNumber}
          </p>
          <p>
            <strong>Quantity:</strong> {ticketDetails.quantity}
          </p>
          <p>
            <strong>Payment Status:</strong>{" "}
            {ticketDetails.paymentDetails.status}
          </p>
          <p>
            <strong>User Name:</strong> {ticketDetails.userId.name}
          </p>
          <p>
            <strong>User Email:</strong> {ticketDetails.userId.email}
          </p>
          <p>
            <strong>Purchase Date:</strong>{" "}
            {new Date(ticketDetails.purchaseDate).toLocaleString()}
          </p>
          <p>
            <strong>Event Location:</strong> {ticketDetails.eventId.location}
          </p>
          <p>
  <strong>Expiry Date:</strong>{" "}
  {new Date(
    new Date(ticketDetails.eventId.date).setHours(23, 59, 59, 999)
  ).toLocaleString()}
</p>
        </div>
      )}

      {/* Reset and Back Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          className="px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 transition"
          onClick={() => navigate("/teacher-profile")}
        >
          Go Back
        </button>
        <button
          className="px-6 py-3 rounded-lg bg-gray-500 text-white font-semibold shadow-md hover:bg-gray-600 transition"
          onClick={resetVerification}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default VerifyPage;
