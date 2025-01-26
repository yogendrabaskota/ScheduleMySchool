/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./component/Sidebar";

const Button = ({ color, onClick, children, small }) => (
  <button
    className={`${
      small ? "py-2 px-4 text-sm" : "py-3 px-8"
    } rounded-lg text-white font-semibold transition-all duration-300 focus:outline-none shadow-md transform hover:scale-105 ${color} hover:${
      color === "bg-blue-500"
        ? "bg-blue-600"
        : color === "bg-green-500"
        ? "bg-green-600"
        : "bg-red-600"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const TeacherProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
      try {
        const response = await axios.delete(
          `https://schedulemyschool.onrender.com/api/user/${id}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        if (response.status === 200) {
          alert("Account successfully deleted.");
          navigate("/login");
        } else {
          alert("Failed to delete account. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("An error occurred. Please try again later.");
      }
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
          <Button color="bg-red-500" small onClick={handleDeleteAccount}>
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
