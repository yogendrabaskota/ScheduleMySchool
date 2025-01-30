/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Sidebar from "./component/Sidebar"; // Default sidebar for non-admin users
import AdminSidebar from "../admin/sidebar/Sidebar"; // Sidebar for admin users
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Button = ({ color, onClick, children, disabled }) => (
  <button
    className={`py-3 px-8 rounded-lg text-white font-semibold transition-all duration-300 focus:outline-none shadow-md transform hover:scale-105 ${
      disabled ? "opacity-50 cursor-not-allowed" : color
    }`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

const ProfileManager = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get userId from URL params
  const token = localStorage.getItem("token"); // Retrieve the auth token from localStorage
  const role = localStorage.getItem("role"); // Retrieve the role from localStorage
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

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

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action will delete your account permanently."
    );
    if (confirmDelete) {
      setIsSendingEmail(true);
      try {
        await axios.post("https://schedulemyschool.onrender.com/api/auth/delete", {
          email: email,
          
        },
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
        setIsSendingEmail(false);
      }
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(
        "https://schedulemyschool.onrender.com/api/auth/verifyOtp",
        { email: email, otp },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 200) {
        await axios.delete(`https://schedulemyschool.onrender.com/api/user/${id}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        alert("Account successfully deleted.");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Failed to verify OTP. Please try again.");
    }
  };

  return (
    <div className="flex">
      {role === "admin" ? (
        <AdminSidebar title="Admin Dashboard" />
      ) : (
        <Sidebar title="Dashboard" />
      )}

      <div className="w-full justify-center">
        <h1 className="text-4xl font-bold text-blue-700 mb-8"></h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center pt-5">
          <div className="flex justify-center">
            <Button color="bg-blue-500" onClick={() => navigate("/ticket")}>
              View Your Ticket
            </Button>
          </div>

          <div className="flex justify-center">
            <Button color="bg-green-500" onClick={() => navigate("/history")}>
              View Your History
            </Button>
          </div>

          <div className="flex justify-center">
            <Button
              color="bg-gray-500"
              onClick={handleDeleteAccount}
              disabled={isSendingEmail}
            >
              {isSendingEmail ? "Sending email..." : "Delete Your Account"}
            </Button>
          </div>
        </div>
      </div>

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

export default ProfileManager;