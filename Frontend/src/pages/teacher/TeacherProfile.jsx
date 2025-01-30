/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./component/Sidebar";
import { jwtDecode } from "jwt-decode";

const Button = ({ color, onClick, children, small, disabled }) => (
  <button
    className={`${
      small ? "py-2 px-4 text-sm" : "py-3 px-8"
    } rounded-lg text-white font-semibold transition-all duration-300 focus:outline-none shadow-md transform hover:scale-105 ${
      disabled ? "opacity-50 cursor-not-allowed" : color
    }`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

const TeacherProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false); // New state

  // Decode email from JWT stored in localStorage
  let email = "";
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      email = decodedToken.email; // Extract email from token
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  const handleYourTicket = () => {
    navigate("/ticket");
  };

  const handleVerifyPage = () => {
    navigate("/verify-page");
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      setIsSendingEmail(true); // Start loading

      try {
        await axios.post(
          "http://localhost:5000/api/auth/delete",
          { email: email }, // Send email to backend
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        alert("OTP sent to your email. Please enter it to confirm deletion.");
        setShowOtpInput(true);
      } catch (error) {
        console.error("Error sending OTP:", error);
        alert("Failed to send OTP. Please try again.");
      } finally {
        setIsSendingEmail(false); // Stop loading
      }
    }
  };

  const handleVerifyOtp = async () => {
    try {
      console.log("Sending OTP:", otp);
      console.log("Sending email:", email);
      const response = await axios.post(
        "http://localhost:5000/api/auth/verifyOtp",
        { email: email, otp }, // Send email & OTP for verification
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        await axios.delete("http://localhost:5000/api/auth/confirmDelete", {
          headers: {
            Authorization: `${token}`,
          },
        });
        alert("Account successfully deleted.");
        navigate("/login");
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Failed to verify OTP. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 relative">
        {/* Centered Buttons */}
        <div className="flex flex-col items-center justify-center h-full space-y-6">
          <Button color="bg-blue-500" onClick={handleYourTicket}>
            Your Ticket
          </Button>
          <Button color="bg-green-500" onClick={handleVerifyPage}>
            Verify Page
          </Button>
        </div>

        {/* Delete Account Button */}
        <div className="absolute bottom-5 right-5">
          <Button color="bg-red-500" small onClick={handleDeleteAccount} disabled={isSendingEmail}>
            {isSendingEmail ? "Sending email..." : "Delete Account"}
          </Button>
        </div>
      </div>

      {/* OTP Input Box */}
      {showOtpInput && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-lg font-semibold mb-4">Enter OTP to Delete Account</h2>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="border px-4 py-2 rounded-md w-full mb-4"
              placeholder="Enter OTP"
            />
            <Button color="bg-red-500" onClick={handleVerifyOtp}>
              Verify OTP & Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherProfile;
