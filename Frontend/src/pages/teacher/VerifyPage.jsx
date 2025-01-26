/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { QrReader } from "react-qr-reader";

const VerifyPage = () => {
  const [ticketNumber, setTicketNumber] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleScan = async (data) => {
    if (data) {
      setTicketNumber(data); // Get the ticket number from QR code
      try {
        // Fetch ticket details from the API
        const response = await axios.get(
          `https://schedulemyschool.onrender.com/api/ticket/verify/${data}`
        );

        if (response.status === 200 && response.data) {
          setStatusMessage("Ticket successfully verified!");
        } else {
          setStatusMessage("Ticket not verified.");
        }
      } catch (err) {
        setStatusMessage("Error verifying ticket. Please try again.");
        console.error("Error fetching ticket:", err);
      }
    }
  };

  const handleError = (err) => {
    setError("Error accessing camera. Please check permissions.");
    console.error(err);
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

      {/* Back Button */}
      <button
        className="px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold shadow-md hover:bg-blue-600 transition"
        onClick={() => navigate("/teacher-profile")}
      >
        Go Back
      </button>
    </div>
  );
};

export default VerifyPage;
