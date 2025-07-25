/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const TeacherProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  // Decode email from JWT
  let email = "";
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      email = decodedToken.email;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  const handleYourTicket = () => navigate("/ticket");
  const handleVerifyPage = () => navigate("/verify-page");
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      setIsSendingEmail(true);
      try {
        await axios.post(
          "https://schedulemyschool.onrender.com/api/auth/delete",
          { email },
          { headers: { Authorization: `${token}` } }
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
    setLoading(true);
    try {
      const response = await axios.post(
        "https://schedulemyschool.onrender.com/api/auth/verifyOtp",
        { email, otp },
        { headers: { Authorization: `${token}` } }
      );

      if (response.status === 200) {
        await axios.delete(
          "https://schedulemyschool.onrender.com/api/auth/confirmDelete",
          {
            headers: { Authorization: `${token}` },
          }
        );
        alert("Account successfully deleted.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex">
      {/* Sidebar */}
      <div className="w-72 bg-[#3F51B5] text-white p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Teacher Profile</h1>
          <div className="w-16 h-1 bg-[#00BCD4]"></div>
        </div>

        <div className="flex-1">
          <div className="bg-white/10 p-4 rounded-lg mb-6">
            <div className="bg-[#3F51B5] text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              {email ? email.charAt(0).toUpperCase() : "T"}
            </div>
            <h3 className="text-center font-semibold">
              {email || "Teacher Email"}
            </h3>
          </div>
        </div>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-[#212121] mb-6">
            Account Management
          </h2>

          <div className="space-y-6">
            <div className="bg-[#FAFAFA] p-6 rounded-lg border border-[#E0E0E0]">
              <h3 className="text-lg font-semibold text-[#212121] mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={handleYourTicket}
                  className="bg-[#3F51B5] hover:bg-[#303F9F] text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                    />
                  </svg>
                  Your Tickets
                </button>
                <button
                  onClick={handleVerifyPage}
                  className="bg-[#00BCD4] hover:bg-[#0097A7] text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                  Verification Page
                </button>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-[#212121] mb-3">
                Danger Zone
              </h3>
              <p className="text-[#757575] mb-4">
                Permanently delete your account and all associated data.
              </p>
              <button
                onClick={handleDeleteAccount}
                disabled={isSendingEmail}
                className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg transition-colors flex items-center"
              >
                {isSendingEmail ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Sending Email...
                  </>
                ) : (
                  "Delete Account"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Verification Modal */}
      {showOtpInput && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
            <h3 className="text-xl font-bold text-[#212121] mb-4">
              Account Deletion Confirmation
            </h3>
            <p className="text-[#757575] mb-6">
              We've sent an OTP to your email. Please enter it below to confirm
              account deletion.
            </p>

            <div className="mb-6">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-[#212121] mb-2"
              >
                Enter OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#3F51B5] focus:ring-2 focus:ring-[#3F51B5]/50 transition-colors"
                placeholder="6-digit OTP"
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowOtpInput(false)}
                className="flex-1 border border-gray-300 text-[#212121] font-medium py-2 px-4 rounded-lg transition-colors hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyOtp}
                disabled={loading || otp.length < 6}
                className={`flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors ${
                  loading || otp.length < 6
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Verifying...
                  </>
                ) : (
                  "Confirm Deletion"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherProfile;
