/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "./component/Sidebar";

const Button = ({ color, onClick, children }) => (
  <button
    className={`py-3 px-8 rounded-lg text-white font-semibold transition-all duration-300 focus:outline-none shadow-md transform hover:scale-105 ${color} hover:${
      color === "bg-blue-500"
        ? "bg-blue-600"
        : color === "bg-green-500"
        ? "bg-green-600"
        : "bg-gray-600"
    }`}
    onClick={onClick}
  >
    {children}
  </button>
);

const TeacherProfile = () => {
  const { id } = useParams(); // Get user ID from URL params
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Retrieve token from localStorage

  const handleYourTicket = () => {
    navigate('/ticket')
    // Implement ticket fetching logic here
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
              Authorization: `${token}`, // Pass token in headers
            },
          }
        );

        if (response.status === 200) {
          alert("Account successfully deleted.");
          navigate("/login"); // Redirect to login after account deletions
        } else {
          alert("Failed to delete account. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting account:", error);
        alert("An error occurred. Please try again later.");
      }
    }
  };

  const handleViewUser = () => {
    // alert(`Viewing user details for user ID: ${id}`);

    navigate('/all-users')
    // Implement user detail view logic here
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center items-center bg-gray-100 p-6">
        {/* <h1 className="text-3xl font-bold text-gray-800 mb-6">Teacher Profile</h1> */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <Button color="bg-blue-500" onClick={handleYourTicket}>
            Your Ticket
          </Button>
          <Button color="bg-green-500" onClick={handleViewUser}>
            User Manager
          </Button>
          <Button color="bg-gray-500" onClick={handleDeleteAccount}>
            Delete Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
