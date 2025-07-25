import { useState } from "react";
import Sidebar from "./component/Sidebar";
import AdminSidebar from "../admin/sidebar/Sidebar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ProfileManager = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Get user email from token
  let email = "";
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      email = decodedToken.email;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

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
          { headers: { Authorization: token } }
        );
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
    setIsDeleting(true);
    try {
      const response = await axios.post(
        "https://schedulemyschool.onrender.com/api/auth/verifyOtp",
        { email, otp },
        { headers: { Authorization: token } }
      );

      if (response.status === 200) {
        await axios.delete(
          `https://schedulemyschool.onrender.com/api/user/${id}`,
          {
            headers: { Authorization: token },
          }
        );
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
        alert("Account successfully deleted.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Invalid OTP. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#FAFAFA]">
      {role === "admin" ? (
        <AdminSidebar title="Admin Dashboard" />
      ) : (
        <Sidebar title="Dashboard" />
      )}

      <div className="flex-1 p-6 md:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[#3F51B5]">
                  Profile Management
                </h1>
                <p className="text-[#757575] mt-1">
                  Manage your account settings
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-[#3F51B5] flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {email ? email.charAt(0).toUpperCase() : "U"}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{email}</p>
                    <p className="text-sm text-[#757575] capitalize">
                      {role} Account
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* View Tickets Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
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
                </div>
                <h3 className="text-lg font-semibold text-center mb-2">
                  Your Tickets
                </h3>
                <p className="text-[#757575] text-sm text-center mb-4">
                  View and manage your event tickets
                </p>
                <button
                  onClick={() => navigate("/ticket")}
                  className="w-full bg-[#3F51B5] hover:bg-[#303F9F] text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  View Tickets
                </button>
              </div>
            </div>

            {/* View History Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-center mb-2">
                  Event History
                </h3>
                <p className="text-[#757575] text-sm text-center mb-4">
                  Review your past event attendance
                </p>
                <button
                  onClick={() => navigate("/history")}
                  className="w-full bg-[#4CAF50] hover:bg-[#388E3C] text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  View History
                </button>
              </div>
            </div>

            {/* Delete Account Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-100 text-red-600 mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-center mb-2">
                  Account Settings
                </h3>
                <p className="text-[#757575] text-sm text-center mb-4">
                  Manage your account preferences
                </p>
                <button
                  onClick={handleDeleteAccount}
                  disabled={isSendingEmail}
                  className={`w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center ${
                    isSendingEmail ? "opacity-75" : ""
                  }`}
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
                      Sending OTP...
                    </>
                  ) : (
                    "Delete Account"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OTP Verification Modal */}
      {showOtpInput && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#212121]">
                Confirm Account Deletion
              </h3>
              <button
                onClick={() => setShowOtpInput(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <p className="text-[#757575] mb-6">
              We&apos;ve sent a verification code to your email address. Please
              enter it below to confirm account deletion.
            </p>

            <div className="mb-6">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-[#212121] mb-2"
              >
                Verification Code
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#3F51B5] focus:ring-2 focus:ring-[#3F51B5]/50 transition-colors"
                placeholder="Enter 6-digit code"
                maxLength="6"
              />
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowOtpInput(false)}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleVerifyOtp}
                disabled={isDeleting || otp.length < 6}
                className={`flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center ${
                  isDeleting || otp.length < 6 ? "opacity-75" : ""
                }`}
              >
                {isDeleting ? (
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
                    Deleting...
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

export default ProfileManager;
